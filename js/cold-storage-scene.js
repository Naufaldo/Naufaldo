(() => {
  const initScene = () => {
    const canvas = document.getElementById("coldStorageCanvas");
    const wrapper = document.getElementById("coldStorageScene");
    if (!canvas || !wrapper || !window.THREE || !THREE.OrbitControls) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(8.2, 6.3, 10.4);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputEncoding = THREE.sRGBEncoding;

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0.25, 1.3, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enableZoom = false;
  controls.minDistance = 8;
  controls.maxDistance = 16;
  controls.maxPolarAngle = Math.PI * 0.49;

  // Ergonomic mobile touch: single finger scrolls page; two fingers rotate 3D scene
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    controls.touches = {
      ONE: THREE.TOUCH.NONE,
      TWO: THREE.TOUCH.ROTATE
    };
  }
  controls.update();

  scene.add(new THREE.HemisphereLight(0xc9efff, 0x142335, 1.35));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(-3, 8, 6);
  keyLight.castShadow = true;
  scene.add(keyLight);
  const blueLight = new THREE.PointLight(0x43bdf2, 1.2, 12);
  blueLight.position.set(-1.4, 2.4, 1.2);
  scene.add(blueLight);

  const materials = {
    floor: new THREE.MeshStandardMaterial({ color: 0x7c97a9, roughness: 0.72, metalness: 0.22 }),
    wall: new THREE.MeshStandardMaterial({ color: 0xa9c9d8, roughness: 0.62, metalness: 0.12, transparent: true, opacity: 0.28, side: THREE.DoubleSide }),
    edge: new THREE.LineBasicMaterial({ color: 0x9bd9ee, transparent: true, opacity: 0.78 }),
    unit: new THREE.MeshStandardMaterial({ color: 0x293e4e, roughness: 0.48, metalness: 0.5 }),
    steel: new THREE.MeshStandardMaterial({ color: 0x8ca8b8, roughness: 0.35, metalness: 0.72 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x142431, roughness: 0.55, metalness: 0.36 }),
    cold: new THREE.MeshStandardMaterial({ color: 0x48c9ed, emissive: 0x0d5b7b, emissiveIntensity: 0.7, roughness: 0.3, metalness: 0.25 }),
    hot: new THREE.MeshStandardMaterial({ color: 0xf17c4c, emissive: 0x75250d, emissiveIntensity: 0.55, roughness: 0.35, metalness: 0.3 })
  };

  const addBox = (parent, size, position, material, edges = false) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    if (edges) {
      const lines = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), materials.edge);
      lines.position.copy(mesh.position);
      parent.add(lines);
    }
    return mesh;
  };

  const room = new THREE.Group();
  scene.add(room);
  addBox(room, [5.1, 0.18, 3.5], [0, 0, 0], materials.floor, true);
  addBox(room, [5.1, 3.35, 0.12], [0, 1.66, -1.72], materials.wall, true);
  addBox(room, [0.12, 3.35, 3.5], [-2.49, 1.66, 0], materials.wall, true);
  addBox(room, [5.1, 0.1, 3.5], [0, 3.32, 0], materials.wall, true);

  for (let index = 0; index < 8; index++) {
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.018, 3.25, 0.025), materials.edge);
    seam.position.set(-2.15 + index * 0.61, 1.66, -1.645);
    room.add(seam);
  }

  const evaporator = new THREE.Group();
  evaporator.position.set(-0.15, 2.72, -1.28);
  room.add(evaporator);
  addBox(evaporator, [2.15, 0.34, 0.72], [0, 0, 0], materials.dark, true);
  addBox(evaporator, [2.0, 0.09, 0.58], [0, -0.22, 0], materials.cold);
  for (let index = 0; index < 17; index++) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.29, 0.5), materials.steel);
    fin.position.set(-0.92 + index * 0.115, -0.12, 0.03);
    evaporator.add(fin);
  }

  const fans = [];
  for (let index = 0; index < 3; index++) {
    const fan = new THREE.Group();
    fan.position.set(-0.65 + index * 0.65, -0.01, 0.4);
    evaporator.add(fan);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.07, 16), materials.steel);
    hub.rotation.x = Math.PI / 2;
    fan.add(hub);
    for (let bladeIndex = 0; bladeIndex < 3; bladeIndex++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.27, 0.035), materials.cold);
      blade.rotation.z = bladeIndex * (Math.PI * 2 / 3);
      fan.add(blade);
    }
    fans.push(fan);
  }

  const unit = new THREE.Group();
  unit.position.set(3.72, 0, -0.45);
  scene.add(unit);
  addBox(unit, [1.5, 1.65, 1.32], [0, 0.84, 0], materials.unit, true);
  addBox(unit, [1.3, 0.08, 1.12], [0, 1.68, 0], materials.steel);
  addBox(unit, [1.12, 0.83, 0.08], [0, 0.92, 0.68], materials.dark);

  const coil = new THREE.Group();
  coil.position.set(0, 1.03, 0.74);
  unit.add(coil);
  for (let index = 0; index < 12; index++) {
    const tube = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.018, 6, 40, Math.PI), materials.hot);
    tube.rotation.z = Math.PI / 2;
    tube.position.y = -0.34 + index * 0.062;
    coil.add(tube);
  }

  const compressor = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.37, 0.72, 24), materials.dark);
  compressor.position.set(0, 0.45, 0.83);
  unit.add(compressor);
  const compressorTop = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.08, 20), materials.hot);
  compressorTop.position.set(0, 0.84, 0.83);
  unit.add(compressorTop);

  const pipe = (points, material, radius = 0.035) => {
    const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)));
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, radius, 8, false), material);
    mesh.castShadow = true;
    scene.add(mesh);
    return curve;
  };

  const hotPath = pipe([
    [3.72, 1.3, 0.4], [3.72, 2.35, 0.35], [3.3, 2.62, 0.15], [2.2, 2.62, -0.4],
    [1.55, 2.72, -1.02], [0.85, 2.72, -1.28]
  ], materials.hot);
  const coldPath = pipe([
    [-0.9, 2.5, -1.28], [-1.5, 2.35, -1.05], [-1.75, 1.8, -0.35], [-1.55, 0.4, 0.25],
    [1.45, 0.4, 0.25], [3.0, 0.42, 0.32], [3.72, 0.62, 0.4]
  ], materials.cold);
  const hotParticles = [];
  const coldParticles = [];
  const heatParticles = [];
  const particleGeometry = new THREE.SphereGeometry(0.075, 12, 10);
  for (let index = 0; index < 8; index++) {
    const hotParticle = new THREE.Mesh(particleGeometry, new THREE.MeshBasicMaterial({ color: 0xffb078 }));
    const coldParticle = new THREE.Mesh(particleGeometry, new THREE.MeshBasicMaterial({ color: 0x92edff }));
    const heatParticle = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffa16f }));
    scene.add(hotParticle, coldParticle, heatParticle);
    hotParticles.push(hotParticle);
    coldParticles.push(coldParticle);
    heatParticles.push(heatParticle);
  }

  const heatGeometry = new THREE.BufferGeometry();
  const heatPositions = new Float32Array(8 * 3);
  heatGeometry.setAttribute("position", new THREE.BufferAttribute(heatPositions, 3));
  const heatLines = new THREE.LineSegments(heatGeometry, new THREE.LineBasicMaterial({ color: 0xff8058, transparent: true, opacity: 0.76 }));
  scene.add(heatLines);

  const floorGrid = new THREE.GridHelper(12, 24, 0x5c9bb8, 0x31526a);
  floorGrid.position.y = -0.105;
  floorGrid.material.transparent = true;
  floorGrid.material.opacity = 0.22;
  scene.add(floorGrid);

  let isPlaying = true;
  let elapsed = 0;
  const flowToggle = document.getElementById("coldFlowToggle");
  const viewReset = document.getElementById("coldViewReset");
  flowToggle?.addEventListener("click", () => {
    isPlaying = !isPlaying;
    flowToggle.innerHTML = `<i class="fa fa-${isPlaying ? "pause" : "play"}"></i>`;
    flowToggle.setAttribute("aria-label", isPlaying ? "Pause thermal flow" : "Resume thermal flow");
    flowToggle.title = isPlaying ? "Pause thermal flow" : "Resume thermal flow";
  });
  viewReset?.addEventListener("click", () => {
    camera.position.set(8.2, 6.3, 10.4);
    controls.target.set(0.25, 1.3, 0);
    controls.update();
  });

  const resizeScene = () => {
    const bounds = wrapper.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    camera.aspect = bounds.width / bounds.height;
    camera.updateProjectionMatrix();
    renderer.setSize(bounds.width, bounds.height, false);
    renderer.render(scene, camera);
  };
  resizeScene();
  const resizeObserver = new ResizeObserver(resizeScene);
  resizeObserver.observe(wrapper);
  window.addEventListener("resize", resizeScene, { passive: true });

  let isVisible = true;
  let animId = null;
  if ("IntersectionObserver" in window) {
    const visibilityObserver = new IntersectionObserver((entries) => {
      const visible = entries[0]?.isIntersecting ?? true;
      if (visible && !isVisible) {
        isVisible = true;
        if (!animId) animId = requestAnimationFrame(animate);
      } else if (!visible) {
        isVisible = false;
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }
    }, { threshold: 0.05 });
    visibilityObserver.observe(wrapper);
  }

  const animate = () => {
    if (!isVisible) {
      animId = null;
      return;
    }
    animId = requestAnimationFrame(animate);
    if (isPlaying) elapsed += 0.006;
    controls.update();
    fans.forEach((fan, index) => {
      fan.rotation.z = elapsed * (index % 2 === 0 ? 1 : -1) * 2.2;
    });
    hotParticles.forEach((particle, index) => {
      particle.position.copy(hotPath.getPoint((elapsed * 0.12 + index / hotParticles.length) % 1));
      particle.scale.setScalar(0.72 + Math.sin(elapsed * 5 + index) * 0.2);
    });
    coldParticles.forEach((particle, index) => {
      particle.position.copy(coldPath.getPoint((elapsed * 0.1 + index / coldParticles.length) % 1));
      particle.scale.setScalar(0.72 + Math.sin(elapsed * 4 + index) * 0.2);
    });
    heatParticles.forEach((particle, index) => {
      const phase = (elapsed * 0.32 + index / heatParticles.length) % 1;
      particle.position.set(-1.8 + index * 0.52, 0.45 + phase * 1.45, 1.4);
    });
    for (let index = 0; index < 4; index++) {
      const x = -1.8 + index * 0.72;
      const phase = elapsed * 2 + index * 0.9;
      heatPositions[index * 6] = x;
      heatPositions[index * 6 + 1] = 1.38 + Math.sin(phase) * 0.12;
      heatPositions[index * 6 + 2] = 1.35;
      heatPositions[index * 6 + 3] = x;
      heatPositions[index * 6 + 4] = 2.2 + Math.sin(phase) * 0.12;
      heatPositions[index * 6 + 5] = 1.35;
    }
    heatGeometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  };
  animate();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      (window.requestIdleCallback || ((cb) => setTimeout(cb, 50)))(initScene);
    });
  } else {
    (window.requestIdleCallback || ((cb) => setTimeout(cb, 50)))(initScene);
  }
})();