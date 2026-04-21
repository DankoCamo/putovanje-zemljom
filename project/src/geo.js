// Load world geo data (TopoJSON from Natural Earth via world-atlas)
// and build window.COUNTRY_GEO: { [iso2]: { type: "Polygon"|"MultiPolygon", coordinates: [...] } }
//
// world-atlas uses numeric ISO 3166-1 codes (id field). We map numeric -> alpha-2 here.

(function () {
  // Numeric ISO 3166-1 -> alpha-2 (only the codes we need — full table)
  const NUM_TO_ISO2 = {
    "004":"AF","008":"AL","010":"AQ","012":"DZ","016":"AS","020":"AD","024":"AO","028":"AG",
    "031":"AZ","032":"AR","036":"AU","040":"AT","044":"BS","048":"BH","050":"BD","051":"AM",
    "052":"BB","056":"BE","060":"BM","064":"BT","068":"BO","070":"BA","072":"BW","076":"BR",
    "084":"BZ","086":"IO","090":"SB","092":"VG","096":"BN","100":"BG","104":"MM","108":"BI",
    "112":"BY","116":"KH","120":"CM","124":"CA","132":"CV","136":"KY","140":"CF","144":"LK",
    "148":"TD","152":"CL","156":"CN","158":"TW","162":"CX","166":"CC","170":"CO","174":"KM",
    "175":"YT","178":"CG","180":"CD","184":"CK","188":"CR","191":"HR","192":"CU","196":"CY",
    "203":"CZ","204":"BJ","208":"DK","212":"DM","214":"DO","218":"EC","222":"SV","226":"GQ",
    "231":"ET","232":"ER","233":"EE","234":"FO","238":"FK","239":"GS","242":"FJ","246":"FI",
    "248":"AX","250":"FR","254":"GF","258":"PF","260":"TF","262":"DJ","266":"GA","268":"GE",
    "270":"GM","275":"PS","276":"DE","288":"GH","292":"GI","296":"KI","300":"GR","304":"GL",
    "308":"GD","312":"GP","316":"GU","320":"GT","324":"GN","328":"GY","332":"HT","334":"HM",
    "336":"VA","340":"HN","344":"HK","348":"HU","352":"IS","356":"IN","360":"ID","364":"IR",
    "368":"IQ","372":"IE","376":"IL","380":"IT","384":"CI","388":"JM","392":"JP","398":"KZ",
    "400":"JO","404":"KE","408":"KP","410":"KR","414":"KW","417":"KG","418":"LA","422":"LB",
    "426":"LS","428":"LV","430":"LR","434":"LY","438":"LI","440":"LT","442":"LU","446":"MO",
    "450":"MG","454":"MW","458":"MY","462":"MV","466":"ML","470":"MT","474":"MQ","478":"MR",
    "480":"MU","484":"MX","492":"MC","496":"MN","498":"MD","499":"ME","500":"MS","504":"MA",
    "508":"MZ","512":"OM","516":"NA","520":"NR","524":"NP","528":"NL","531":"CW","533":"AW",
    "534":"SX","535":"BQ","540":"NC","548":"VU","554":"NZ","558":"NI","562":"NE","566":"NG",
    "570":"NU","574":"NF","578":"NO","580":"MP","581":"UM","583":"FM","584":"MH","585":"PW",
    "586":"PK","591":"PA","598":"PG","600":"PY","604":"PE","608":"PH","612":"PN","616":"PL",
    "620":"PT","624":"GW","626":"TL","630":"PR","634":"QA","638":"RE","642":"RO","643":"RU",
    "646":"RW","652":"BL","654":"SH","659":"KN","660":"AI","662":"LC","663":"MF","666":"PM",
    "670":"VC","674":"SM","678":"ST","682":"SA","686":"SN","688":"RS","690":"SC","694":"SL",
    "702":"SG","703":"SK","704":"VN","705":"SI","706":"SO","710":"ZA","716":"ZW","724":"ES",
    "728":"SS","729":"SD","732":"EH","740":"SR","744":"SJ","748":"SZ","752":"SE","756":"CH",
    "760":"SY","762":"TJ","764":"TH","768":"TG","772":"TK","776":"TO","780":"TT","784":"AE",
    "788":"TN","792":"TR","795":"TM","796":"TC","798":"TV","800":"UG","804":"UA","807":"MK",
    "818":"EG","826":"GB","831":"GG","832":"JE","833":"IM","834":"TZ","840":"US","850":"VI",
    "854":"BF","858":"UY","860":"UZ","862":"VE","876":"WF","882":"WS","887":"YE","894":"ZM"
  };
  // Kosovo is sometimes coded -99 in Natural Earth; we map by name later.

  // Minimal topojson decoder (just what we need — feature decoding from TopoJSON 3)
  function topoFeature(topo, name) {
    const o = topo.objects[name];
    if (!o) return null;
    const arcs = topo.arcs;
    const transform = topo.transform;

    function decodeArc(i) {
      const rev = i < 0;
      const arc = arcs[rev ? ~i : i].map(p => p.slice());
      // Delta-decode
      if (transform) {
        let x = 0, y = 0;
        for (let j = 0; j < arc.length; j++) {
          x += arc[j][0]; y += arc[j][1];
          arc[j][0] = x * transform.scale[0] + transform.translate[0];
          arc[j][1] = y * transform.scale[1] + transform.translate[1];
        }
      }
      return rev ? arc.reverse() : arc;
    }

    function buildRing(arcIndices) {
      const ring = [];
      arcIndices.forEach((ai, idx) => {
        const arc = decodeArc(ai);
        if (idx > 0) arc.shift(); // skip shared point
        ring.push(...arc);
      });
      return ring;
    }

    function buildPoly(arcs2) {
      return arcs2.map(buildRing);
    }

    return {
      type: "FeatureCollection",
      features: o.geometries.map(g => {
        let coords;
        if (g.type === "Polygon") coords = buildPoly(g.arcs);
        else if (g.type === "MultiPolygon") coords = g.arcs.map(buildPoly);
        return { type: "Feature", id: g.id, properties: g.properties || {}, geometry: { type: g.type, coordinates: coords } };
      })
    };
  }

  window.COUNTRY_GEO = {}; // iso2 -> geometry
  window.COUNTRY_BORDER_LINES = []; // array of polylines [[lng,lat], ...] for drawing on globe
  window.GEO_READY = false;

  async function load() {
    try {
      const res = await fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json");
      const topo = await res.json();
      const fc = topoFeature(topo, "countries");

      // Build iso2 -> feature
      const nameToIso2 = {
        "Kosovo": "XK", "S. Sudan": "SS", "Dem. Rep. Congo": "CD",
        "Central African Rep.": "CF", "Eq. Guinea": "GQ", "Dominican Rep.": "DO",
        "Côte d'Ivoire": "CI", "Ivory Coast": "CI", "Bosnia and Herz.": "BA",
        "North Macedonia": "MK", "Czechia": "CZ", "Eswatini": "SZ"
      };

      fc.features.forEach(f => {
        const num = String(f.id).padStart(3, "0");
        let iso2 = NUM_TO_ISO2[num];
        if (!iso2 && f.properties && f.properties.name) {
          iso2 = nameToIso2[f.properties.name];
        }
        if (iso2) {
          window.COUNTRY_GEO[iso2] = f.geometry;
        }
      });

      // Build border polylines from topojson arcs directly (for globe rendering)
      // We just use the outer rings of every country — a single line sweep over features
      const lines = [];
      function addRings(geom) {
        if (!geom) return;
        if (geom.type === "Polygon") {
          geom.coordinates.forEach(ring => lines.push(ring));
        } else if (geom.type === "MultiPolygon") {
          geom.coordinates.forEach(poly => poly.forEach(ring => lines.push(ring)));
        }
      }
      Object.values(window.COUNTRY_GEO).forEach(addRings);
      window.COUNTRY_BORDER_LINES = lines;

      window.GEO_READY = true;
      window.dispatchEvent(new Event("geo-ready"));
    } catch (err) {
      console.error("Failed to load geo data:", err);
    }
  }
  load();
})();
