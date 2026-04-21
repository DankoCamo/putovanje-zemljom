// Globe.jsx — Three.js 3D interactive globe with real Earth texture
const { useEffect, useRef, useState } = React;

function Globe({ countries, onSelectCountry, theme, rotationSpeed, showCapitals, showBorders, continentColors, focusIso }) {
  const mountRef = useRef(null);
  const stateRef = useRef({});
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const THREE = window.THREE;
    if (!THREE) { console.error("THREE not loaded"); return; }

    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);
    const earthRadius = 1;

    // Load real Earth texture (public domain NASA-style map)
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 6,
      specular: 0x222233
    });
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(earthRadius, 96, 96), earthMat);
    earthGroup.add(earthMesh);

    const textureUrls = {
      light: 'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg',
      dark: 'https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg',
      topo: 'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png'
    };

    function loadTex(dark) {
      loader.load(dark ? textureUrls.dark : textureUrls.light, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace || tex.colorSpace;
        earthMat.map = tex;
        earthMat.needsUpdate = true;
      }, undefined, () => {
        // fallback: fill canvas
        const canvas = document.createElement('canvas');
        canvas.width = 1024; canvas.height = 512;
        const ctx = canvas.getContext('2d');
        const g = ctx.createLinearGradient(0,0,0,512);
        g.addColorStop(0, dark ? '#1a3a6b' : '#7ab8e8');
        g.addColorStop(1, dark ? '#1a3a6b' : '#4a98d8');
        ctx.fillStyle = g; ctx.fillRect(0,0,1024,512);
        earthMat.map = new THREE.CanvasTexture(canvas);
        earthMat.needsUpdate = true;
      });
    }
    loadTex(theme === 'dark');

    // Atmosphere glow
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying vec3 vNormal; uniform vec3 glowColor; void main() { float intensity = pow(0.72 - dot(vNormal, vec3(0, 0, 1.0)), 2.5); gl_FragColor = vec4(glowColor, 1.0) * intensity; }`,
      uniforms: { glowColor: { value: new THREE.Color(theme === 'dark' ? 0x6bb6ff : 0x9bd4ff) } },
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(earthRadius * 1.08, 64, 64), atmosphereMat);
    earthGroup.add(atmosphere);

    function latLngToVec3(lat, lng, radius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    // Country borders group (lines drawn on sphere)
    const bordersGroup = new THREE.Group();
    earthGroup.add(bordersGroup);

    function buildBorders() {
      while (bordersGroup.children.length) {
        const c = bordersGroup.children.pop();
        c.geometry?.dispose(); c.material?.dispose();
      }
      const lines = window.COUNTRY_BORDER_LINES || [];
      if (!lines.length) return;
      const isDark = stateRef.current.theme === 'dark';
      const mat = new THREE.LineBasicMaterial({
        color: isDark ? 0xffee88 : 0xffffff,
        transparent: true,
        opacity: 0.95,
        depthWrite: false
      });
      const glowMat = new THREE.LineBasicMaterial({
        color: isDark ? 0xffaa33 : 0x1a1f36,
        transparent: true,
        opacity: 0.6,
        depthWrite: false
      });
      const r1 = earthRadius * 1.004;
      const r2 = earthRadius * 1.006;
      lines.forEach(ring => {
        if (!ring || ring.length < 2) return;
        const pts1 = [], pts2 = [];
        for (let i = 0; i < ring.length; i++) {
          const [lng, lat] = ring[i];
          pts1.push(latLngToVec3(lat, lng, r1));
          pts2.push(latLngToVec3(lat, lng, r2));
        }
        const geomGlow = new THREE.BufferGeometry().setFromPoints(pts1);
        const geomMain = new THREE.BufferGeometry().setFromPoints(pts2);
        bordersGroup.add(new THREE.Line(geomGlow, glowMat));
        bordersGroup.add(new THREE.Line(geomMain, mat));
      });
    }
    if (window.GEO_READY) buildBorders();
    else window.addEventListener('geo-ready', buildBorders, { once: true });

    const pinsGroup = new THREE.Group();
    earthGroup.add(pinsGroup);
    const pinObjects = [];
    countries.forEach(c => {
      if (c.continent === 'Antarctica') return;
      const lat = (c.capitalLat != null) ? c.capitalLat : c.lat;
      const lng = (c.capitalLng != null) ? c.capitalLng : c.lng;
      const pos = latLngToVec3(lat, lng, earthRadius * 1.008);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.005, 10, 10), new THREE.MeshBasicMaterial({ color: 0xff3b7f }));
      dot.position.copy(pos); dot.userData.country = c;
      pinsGroup.add(dot);
      const ring = new THREE.Mesh(new THREE.SphereGeometry(0.009, 10, 10), new THREE.MeshBasicMaterial({ color: 0xff3b7f, transparent: true, opacity: 0.35 }));
      ring.position.copy(pos); ring.userData.country = c;
      pinsGroup.add(ring);
      pinObjects.push({ dot, ring, country: c, pos });
    });

    let isDragging = false, dragMoved = false;
    let prev = { x: 0, y: 0 };
    let autoRotate = true;
    let targetRotY = 0, targetRotX = 0;
    let curRotY = 0, curRotX = 0;

    function onDown(e) {
      isDragging = true; dragMoved = false; autoRotate = false;
      const p = e.touches ? e.touches[0] : e;
      prev.x = p.clientX; prev.y = p.clientY;
    }
    function onMove(e) {
      const p = e.touches ? e.touches[0] : e;
      if (isDragging) {
        const dx = p.clientX - prev.x, dy = p.clientY - prev.y;
        if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved = true;
        targetRotY += dx * 0.005;
        targetRotX += dy * 0.005;
        targetRotX = Math.max(-Math.PI/2.2, Math.min(Math.PI/2.2, targetRotX));
        prev.x = p.clientX; prev.y = p.clientY;
      } else {
        const rect = renderer.domElement.getBoundingClientRect();
        const mx = ((p.clientX - rect.left) / rect.width) * 2 - 1;
        const my = -((p.clientY - rect.top) / rect.height) * 2 + 1;
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({ x: mx, y: my }, camera);
        const hits = raycaster.intersectObjects(pinsGroup.children);
        // Filter to visible pins only
        const visibleHits = hits.filter(h => h.object.visible);
        if (visibleHits.length && visibleHits[0].object.userData.country) {
          const c = visibleHits[0].object.userData.country;
          setTooltip({ name: c.name, capital: c.capital, x: p.clientX - rect.left, y: p.clientY - rect.top });
          renderer.domElement.style.cursor = 'pointer';
          return;
        }
        setTooltip(null);
        renderer.domElement.style.cursor = 'grab';
      }
    }
    function onUp() { isDragging = false; }
    function onClick(e) {
      if (dragMoved) return;
      const rect = renderer.domElement.getBoundingClientRect();
      const p = e.changedTouches ? e.changedTouches[0] : e;
      const mx = ((p.clientX - rect.left) / rect.width) * 2 - 1;
      const my = -((p.clientY - rect.top) / rect.height) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera({ x: mx, y: my }, camera);
      const hits = raycaster.intersectObjects(pinsGroup.children).filter(h => h.object.visible);
      if (hits.length && hits[0].object.userData.country) {
        stateRef.current.onSelectCountry(hits[0].object.userData.country);
      }
    }
    function onWheel(e) {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.002;
      camera.position.z = Math.max(1.05, Math.min(6, camera.position.z));
    }

    const dom = renderer.domElement;
    dom.style.display = 'block';
    dom.style.width = '100%';
    dom.style.height = '100%';
    dom.addEventListener('mousedown', onDown);
    dom.addEventListener('mousemove', onMove);
    dom.addEventListener('mouseup', onUp);
    dom.addEventListener('mouseleave', onUp);
    dom.addEventListener('click', onClick);
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('touchstart', onDown, { passive: true });
    dom.addEventListener('touchmove', onMove, { passive: true });
    dom.addEventListener('touchend', (e) => { onUp(); onClick(e); });

    // Robust resize using ResizeObserver
    function resize() {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    window.addEventListener('resize', resize);

    let rafId, pulseTime = 0;
    function animate() {
      rafId = requestAnimationFrame(animate);
      pulseTime += 0.04;
      if (autoRotate) targetRotY += (stateRef.current.rotationSpeed ?? 0.0015);
      curRotY += (targetRotY - curRotY) * 0.1;
      curRotX += (targetRotX - curRotX) * 0.1;
      earthGroup.rotation.y = curRotY;
      earthGroup.rotation.x = curRotX;

      const pulse = 1 + Math.sin(pulseTime) * 0.25;
      bordersGroup.visible = !!stateRef.current.showBorders;
      pinObjects.forEach(po => {
        po.ring.scale.setScalar(pulse);
        // Visibility: hide pins on far side of sphere relative to camera
        const worldPos = new THREE.Vector3();
        po.dot.getWorldPosition(worldPos);
        const camToPoint = worldPos.clone().sub(camera.position).normalize();
        const pointNormal = worldPos.clone().normalize();
        const d = camToPoint.dot(pointNormal);
        const vis = d < -0.05;
        po.dot.visible = vis && stateRef.current.showCapitals;
        po.ring.visible = vis && stateRef.current.showCapitals;
      });
      renderer.render(scene, camera);
    }
    animate();

    stateRef.current = {
      scene, camera, renderer, earthGroup, pinObjects, earthMat, atmosphereMat, loadTex,
      bordersGroup, buildBorders,
      theme: theme,
      rotationSpeed: rotationSpeed,
      showCapitals: showCapitals,
      showBorders: showBorders,
      onSelectCountry: onSelectCountry,
      focusOn: (iso) => {
        const c = countries.find(x => x.iso === iso);
        if (!c) return;
        autoRotate = false;
        const lat = (c.capitalLat != null) ? c.capitalLat : c.lat;
        const lng = (c.capitalLng != null) ? c.capitalLng : c.lng;
        targetRotY = -(lng * Math.PI / 180) - Math.PI / 2;
        targetRotX = lat * Math.PI / 180;
      }
    };

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      dom.removeEventListener('mousedown', onDown);
      dom.removeEventListener('mousemove', onMove);
      dom.removeEventListener('mouseup', onUp);
      dom.removeEventListener('mouseleave', onUp);
      dom.removeEventListener('click', onClick);
      dom.removeEventListener('wheel', onWheel);
      if (dom.parentNode) dom.parentNode.removeChild(dom);
      renderer.dispose();
    };
  }, []);

  // React to prop changes without re-initializing
  useEffect(() => { stateRef.current.rotationSpeed = rotationSpeed; }, [rotationSpeed]);
  useEffect(() => { stateRef.current.showCapitals = showCapitals; }, [showCapitals]);
  useEffect(() => { stateRef.current.showBorders = showBorders; }, [showBorders]);
  useEffect(() => { stateRef.current.onSelectCountry = onSelectCountry; }, [onSelectCountry]);
  useEffect(() => {
    stateRef.current.theme = theme;
    if (stateRef.current.loadTex) stateRef.current.loadTex(theme === 'dark');
    if (stateRef.current.atmosphereMat) {
      stateRef.current.atmosphereMat.uniforms.glowColor.value = new window.THREE.Color(theme === 'dark' ? 0x6bb6ff : 0x9bd4ff);
    }
    if (stateRef.current.buildBorders) stateRef.current.buildBorders();
  }, [theme]);
  useEffect(() => { if (focusIso && stateRef.current.focusOn) stateRef.current.focusOn(focusIso); }, [focusIso]);

  return (
    <div ref={mountRef} className="globe-canvas" style={{ position: 'absolute', inset: 0 }}>
      {tooltip && (
        <div className="globe-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <strong>{tooltip.name.hr || tooltip.name.en}</strong>
          <span style={{ opacity: 0.75, marginLeft: 8 }}>· {tooltip.capital.hr || tooltip.capital.en}</span>
        </div>
      )}
    </div>
  );
}

window.Globe = Globe;
