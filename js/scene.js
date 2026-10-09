/* ═══════════════════════════════════════════════
   COMFY — Three.js hero scene
   A soft, stylized floating bed with pillow clouds
   ═══════════════════════════════════════════════ */
import * as THREE from "three";

const canvas = document.getElementById("bed-canvas");
if (canvas) {
  initBedScene(canvas);
}

function initBedScene(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf7f1e8, 14, 34);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(5.4, 3.1, 8.2);
  camera.lookAt(0, 0.55, 0);

  /* ── Palette ─────────────────────────────── */
  const C = {
    cream: 0xfdf9f2,
    linen: 0xf3ead9,
    clay: 0xc97b58,
    clayDeep: 0xa85f3f,
    sage: 0x9aab8c,
    wood: 0x8a6a52,
    ink: 0x2b211b,
  };

  /* ── Lights ──────────────────────────────── */
  scene.add(new THREE.HemisphereLight(0xfff6e8, 0xd9c9b4, 1.05));

  const key = new THREE.DirectionalLight(0xfff2df, 2.6);
  key.position.set(6, 9, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 30;
  key.shadow.camera.left = -10;
  key.shadow.camera.right = 10;
  key.shadow.camera.top = 10;
  key.shadow.camera.bottom = -10;
  key.shadow.bias = -0.0004;
  key.shadow.radius = 6;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xc97b58, 1.1);
  rim.position.set(-7, 4, -6);
  scene.add(rim);

  const fill = new THREE.PointLight(0xffe9d2, 12, 22);
  fill.position.set(-3, 3.5, 4);
  scene.add(fill);

  /* ── Ground shadow catcher ───────────────── */
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(16, 64),
    new THREE.ShadowMaterial({ opacity: 0.16 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  ground.receiveShadow = true;
  scene.add(ground);

  /* ── Materials ───────────────────────────── */
  const matLinen = new THREE.MeshStandardMaterial({
    color: C.linen, roughness: 0.92, metalness: 0.0,
  });
  const matCream = new THREE.MeshStandardMaterial({
    color: C.cream, roughness: 0.85, metalness: 0.0,
  });
  const matClay = new THREE.MeshStandardMaterial({
    color: C.clay, roughness: 0.7, metalness: 0.05,
  });
  const matSage = new THREE.MeshStandardMaterial({
    color: C.sage, roughness: 0.9, metalness: 0.0,
  });
  const matWood = new THREE.MeshStandardMaterial({
    color: C.wood, roughness: 0.6, metalness: 0.08,
  });

  /* ── Bed group ───────────────────────────── */
  const bed = new THREE.Group();
  scene.add(bed);

  // Headboard — tall rounded slab with stitched panel feel
  const headboard = new THREE.Mesh(
    new THREE.BoxGeometry(4.6, 2.5, 0.35, 4, 4, 1),
    matLinen
  );
  headboard.position.set(0, 1.55, -2.15);
  headboard.castShadow = headboard.receiveShadow = true;
  bed.add(headboard);

  // Bed frame base
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 0.5, 4.6),
    matWood
  );
  frame.position.set(0, 0.45, 0.35);
  frame.castShadow = frame.receiveShadow = true;
  bed.add(frame);

  // Mattress — layered look: base + plush top
  const mattress = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 0.55, 4.4),
    matCream
  );
  mattress.position.set(0, 0.98, 0.35);
  mattress.castShadow = mattress.receiveShadow = true;
  bed.add(mattress);

  const mattressTop = new THREE.Mesh(
    new THREE.BoxGeometry(4.24, 0.22, 4.44),
    matLinen
  );
  mattressTop.position.set(0, 1.36, 0.35);
  mattressTop.castShadow = mattressTop.receiveShadow = true;
  bed.add(mattressTop);

  // Pillow-top dimples (small spheres scattered on surface)
  const dimpleGeo = new THREE.SphereGeometry(0.09, 10, 10);
  const dimpleMat = new THREE.MeshStandardMaterial({ color: 0xe9dcc6, roughness: 0.95 });
  for (let i = 0; i < 26; i++) {
    const d = new THREE.Mesh(dimpleGeo, dimpleMat);
    const gx = (Math.random() - 0.5) * 3.5;
    const gz = (Math.random() - 0.5) * 3.6 + 0.2;
    d.position.set(gx, 1.47, gz);
    d.scale.set(1, 0.5, 1);
    d.castShadow = true;
    bed.add(d);
  }

  // Two pillows leaning on headboard
  const pillowGeo = new THREE.SphereGeometry(0.62, 24, 24);
  const pillowMat = new THREE.MeshStandardMaterial({ color: 0xfffdf7, roughness: 0.98 });
  const pillowA = new THREE.Mesh(pillowGeo, pillowMat);
  pillowA.scale.set(1.15, 0.42, 0.78);
  pillowA.position.set(-0.85, 1.72, -1.45);
  pillowA.rotation.set(-0.35, 0, 0.08);
  pillowA.castShadow = pillowA.receiveShadow = true;
  bed.add(pillowA);

  const pillowB = pillowA.clone();
  pillowB.position.set(0.85, 1.72, -1.45);
  pillowB.rotation.set(-0.35, 0, -0.08);
  bed.add(pillowB);

  // Throw blanket — clay colored, draped at the foot
  const blanket = new THREE.Mesh(
    new THREE.BoxGeometry(4.28, 0.34, 2.0),
    matClay
  );
  blanket.position.set(0, 1.58, 1.65);
  blanket.rotation.x = -0.06;
  blanket.castShadow = blanket.receiveShadow = true;
  bed.add(blanket);

  // Blanket fold (sage accent stripe)
  const fold = new THREE.Mesh(
    new THREE.BoxGeometry(4.29, 0.1, 0.28),
    matSage
  );
  fold.position.set(0, 1.76, 0.85);
  fold.rotation.x = -0.06;
  bed.add(fold);

  // Legs
  const legGeo = new THREE.CylinderGeometry(0.09, 0.07, 0.5, 12);
  const legPos = [[-2, 2.35], [2, 2.35], [-2, -1.65], [2, -1.65]];
  legPos.forEach(([x, z]) => {
    const leg = new THREE.Mesh(legGeo, matWood);
    leg.position.set(x, 0.22, z);
    leg.castShadow = true;
    bed.add(leg);
  });

  /* ── Floating pillow clouds ──────────────── */
  const cloudGeo = new THREE.SphereGeometry(1, 20, 20);
  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xfffdf6, roughness: 1, transparent: true, opacity: 0.96,
  });
  const clouds = [];
  const cloudSpots = [
    [-3.4, 2.6, -1.2, 0.55],
    [3.2, 3.1, -2.4, 0.42],
    [2.6, 1.4, 2.6, 0.5],
    [-2.8, 1.6, 2.9, 0.46],
    [0.2, 4.0, 1.2, 0.36],
    [-1.4, 0.6, 3.6, 0.3],
    [3.6, 0.9, 0.4, 0.32],
  ];
  cloudSpots.forEach(([x, y, z, s], i) => {
    const cloud = new THREE.Group();
    for (let j = 0; j < 3; j++) {
      const puff = new THREE.Mesh(cloudGeo, cloudMat);
      puff.position.set(j * 0.55 - 0.55, Math.sin(j * 2.1) * 0.14, Math.cos(j * 1.7) * 0.18);
      puff.scale.setScalar(0.72 - j * 0.08);
      cloud.add(puff);
    }
    cloud.position.set(x, y, z);
    cloud.scale.setScalar(s * 2.1);
    cloud.userData = {
      baseY: y,
      speed: 0.5 + Math.random() * 0.5,
      phase: i * 1.3,
      spin: (Math.random() - 0.5) * 0.15,
    };
    clouds.push(cloud);
    scene.add(cloud);
  });

  /* ── Drifting dust motes ─────────────────── */
  const moteCount = 90;
  const moteGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(moteCount * 3);
  const moteData = [];
  for (let i = 0; i < moteCount; i++) {
    const x = (Math.random() - 0.5) * 14;
    const y = Math.random() * 6;
    const z = (Math.random() - 0.5) * 10;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    moteData.push({ x, y, z, speed: 0.1 + Math.random() * 0.25, phase: Math.random() * Math.PI * 2 });
  }
  moteGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const moteMat = new THREE.PointsMaterial({
    color: 0xd9b48f, size: 0.055, transparent: true, opacity: 0.7,
    sizeAttenuation: true, depthWrite: false,
  });
  const motes = new THREE.Points(moteGeo, moteMat);
  scene.add(motes);

  /* ── Interaction ─────────────────────────── */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener("pointermove", (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let scrollY = 0;
  window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

  /* ── Resize ──────────────────────────────── */
  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Pull camera back on narrow screens
    const isNarrow = w < 920;
    camera.position.z = isNarrow ? 10.5 : 8.2;
    camera.position.x = isNarrow ? 4.6 : 5.4;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  /* ── Animate ─────────────────────────────── */
  const clock = new THREE.Clock();
  let running = true;
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) clock.getDelta();
  });

  function tick() {
    requestAnimationFrame(tick);
    if (!running) return;

    const t = clock.getElapsedTime();

    // Smooth mouse easing
    mouse.x += (mouse.tx - mouse.x) * 0.045;
    mouse.y += (mouse.ty - mouse.y) * 0.045;

    // Bed: gentle idle rotation + mouse parallax + scroll drift
    bed.rotation.y = Math.sin(t * 0.16) * 0.12 + mouse.x * 0.28;
    bed.position.y = Math.sin(t * 0.55) * 0.045 + mouse.y * -0.12 - scrollY * 0.0016;
    bed.rotation.x = -mouse.y * 0.04;

    // Clouds bob & drift
    clouds.forEach((c) => {
      const u = c.userData;
      c.position.y = u.baseY + Math.sin(t * u.speed + u.phase) * 0.28;
      c.rotation.y += u.spin * 0.016;
      c.position.x += Math.sin(t * 0.2 + u.phase) * 0.0012;
    });

    // Motes rise slowly
    const pos = moteGeo.attributes.position;
    for (let i = 0; i < moteCount; i++) {
      const m = moteData[i];
      let y = m.y + t * m.speed * 0.12;
      if (y > 6.2) y = 0;
      pos.setY(i, y);
      pos.setX(i, m.x + Math.sin(t * 0.4 + m.phase) * 0.22);
    }
    pos.needsUpdate = true;

    // Camera subtle parallax
    camera.position.x = 5.4 + mouse.x * 0.5;
    camera.position.y = 3.1 - mouse.y * 0.35;
    camera.lookAt(0, 0.7, 0);

    renderer.render(scene, camera);
  }
  tick();
}
