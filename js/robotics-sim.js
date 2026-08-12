/* ==========================================================================
   Naufaldo Portfolio - Advanced Robotics Simulation Engines
   1. Fuzzy-Tuned PID DDMR & APF Multi-Agent Formation Control (ICCAS 2025 / IJCAS 2026)
   2. Mathematical Kinematic Model to Dynamic Simulation (Eqs to 2D Plot)
   3. Vision-Based Leader-Follower Camera Tracking (OpenCV Distance Detection)
   4. Drone Swarm Flocking Dynamics & Altitude Modulation (SICE FES 2025)
   5. Autonomous Indoor Exploration: Floodfill vs. Frontier-Based (ICCAS 2024)
   6. LiDAR SLAM Autonomous Navigation System (IJRA 2024)
   7. Path Tracking vs. Trajectory Tracking Interactive Comparison
   ========================================================================== */

function resizeCanvasToWrapper(canvas) {
  if (!canvas || !canvas.parentElement) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width || 750;
  canvas.height = rect.height || 420;
}

// --- MODULE 1: Fuzzy-Tuned PID DDMR Multi-Agent Formation Control (ICCAS 2025) ---
class ICCASPIDDDMRSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.formation = "triangle"; // triangle, circle, line
    this.isRunning = true;

    // Leader Robot (DDMR)
    this.leader = {
      x: this.width * 0.35,
      y: this.height * 0.5,
      targetX: this.width * 0.65,
      targetY: this.height * 0.5,
      angle: 0,
      speed: 2.2,
      radius: 14
    };

    // Follower Robots (DDMR Swarm)
    this.followers = [
      { x: this.leader.x - 40, y: this.leader.y - 40, angle: 0, radius: 10, color: "#00f2fe" },
      { x: this.leader.x - 40, y: this.leader.y + 40, angle: 0, radius: 10, color: "#4facfe" },
      { x: this.leader.x - 70, y: this.leader.y, angle: 0, radius: 10, color: "#8b5cf6" }
    ];

    // APF Obstacles
    this.obstacles = [
      { x: this.width * 0.5, y: this.height * 0.35, radius: 25 },
      { x: this.width * 0.5, y: this.height * 0.65, radius: 22 }
    ];

    this.kp = 0.12;
    this.bindEvents();
    this.loop();
  }

  resize() {
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  bindEvents() {
    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.leader.targetX = e.clientX - rect.left;
      this.leader.targetY = e.clientY - rect.top;
    });
  }

  setFormation(type) {
    this.formation = type;
  }

  addObstacle() {
    this.obstacles.push({
      x: Math.random() * (this.width - 100) + 50,
      y: Math.random() * (this.height - 100) + 50,
      radius: Math.floor(Math.random() * 15) + 15
    });
  }

  reset() {
    this.obstacles = [
      { x: this.width * 0.5, y: this.height * 0.35, radius: 25 },
      { x: this.width * 0.5, y: this.height * 0.65, radius: 22 }
    ];
    this.leader.x = this.width * 0.3;
    this.leader.y = this.height * 0.5;
    this.leader.targetX = this.width * 0.7;
    this.leader.targetY = this.height * 0.5;
  }

  getFormationOffsets() {
    const dist = 45;
    if (this.formation === "triangle") {
      return [
        { dx: -dist, dy: -dist * 0.8 },
        { dx: -dist, dy: dist * 0.8 },
        { dx: -dist * 1.7, dy: 0 }
      ];
    } else if (this.formation === "circle") {
      return [
        { dx: Math.cos(0) * dist, dy: Math.sin(0) * dist },
        { dx: Math.cos((2*Math.PI)/3) * dist, dy: Math.sin((2*Math.PI)/3) * dist },
        { dx: Math.cos((4*Math.PI)/3) * dist, dy: Math.sin((4*Math.PI)/3) * dist }
      ];
    } else { // Line
      return [
        { dx: -dist, dy: 0 },
        { dx: -dist * 2, dy: 0 },
        { dx: -dist * 3, dy: 0 }
      ];
    }
  }

  update() {
    if (!this.isRunning) return;

    const dx = this.leader.targetX - this.leader.x;
    const dy = this.leader.targetY - this.leader.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 3) {
      this.leader.angle = Math.atan2(dy, dx);
      let moveX = Math.cos(this.leader.angle) * this.leader.speed;
      let moveY = Math.sin(this.leader.angle) * this.leader.speed;

      this.obstacles.forEach(obs => {
        const odx = this.leader.x - obs.x;
        const ody = this.leader.y - obs.y;
        const odist = Math.hypot(odx, ody);
        const minSafety = obs.radius + this.leader.radius + 35;
        if (odist < minSafety && odist > 0) {
          const force = (minSafety - odist) / minSafety * 3.8;
          moveX += (odx / odist) * force;
          moveY += (ody / odist) * force;
        }
      });

      this.leader.x += moveX;
      this.leader.y += moveY;
    }

    const offsets = this.getFormationOffsets();
    this.followers.forEach((fol, idx) => {
      const off = offsets[idx];
      const targetX = this.leader.x + (off.dx * Math.cos(this.leader.angle) - off.dy * Math.sin(this.leader.angle));
      const targetY = this.leader.y + (off.dx * Math.sin(this.leader.angle) + off.dy * Math.cos(this.leader.angle));

      const fdx = targetX - fol.x;
      const fdy = targetY - fol.y;
      let fMoveX = fdx * (this.kp * 1.5);
      let fMoveY = fdy * (this.kp * 1.5);

      this.obstacles.forEach(obs => {
        const odx = fol.x - obs.x;
        const ody = fol.y - obs.y;
        const odist = Math.hypot(odx, ody);
        const minSafety = obs.radius + fol.radius + 25;
        if (odist < minSafety && odist > 0) {
          const force = (minSafety - odist) / minSafety * 3.0;
          fMoveX += (odx / odist) * force;
          fMoveY += (ody / odist) * force;
        }
      });

      fol.x += fMoveX;
      fol.y += fMoveY;
      fol.angle = Math.atan2(fdy, fdx);
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.strokeStyle = "rgba(255,255,255,0.03)";
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 30) {
      this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, this.height); this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 30) {
      this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(this.width, y); this.ctx.stroke();
    }

    this.ctx.strokeStyle = "#00f2fe";
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([4, 4]);
    this.ctx.beginPath();
    this.ctx.arc(this.leader.targetX, this.leader.targetY, 14, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    this.obstacles.forEach(obs => {
      this.ctx.fillStyle = "rgba(239, 68, 68, 0.25)";
      this.ctx.strokeStyle = "#ef4444";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    });

    this.followers.forEach(fol => {
      this.ctx.strokeStyle = "rgba(0, 242, 254, 0.35)";
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.moveTo(this.leader.x, this.leader.y);
      this.ctx.lineTo(fol.x, fol.y);
      this.ctx.stroke();
    });

    this.followers.forEach(fol => {
      this.ctx.save();
      this.ctx.translate(fol.x, fol.y);
      this.ctx.rotate(fol.angle);

      this.ctx.fillStyle = "#64748b";
      this.ctx.fillRect(-7, -13, 14, 4);
      this.ctx.fillRect(-7, 9, 14, 4);

      this.ctx.fillStyle = fol.color;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, fol.radius, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    });

    this.ctx.save();
    this.ctx.translate(this.leader.x, this.leader.y);
    this.ctx.rotate(this.leader.angle);

    this.ctx.shadowColor = "#00f2fe";
    this.ctx.shadowBlur = 12;
    this.ctx.fillStyle = "#f59e0b";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.leader.radius, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = "#fff";
    this.ctx.beginPath();
    this.ctx.moveTo(this.leader.radius + 5, 0);
    this.ctx.lineTo(-4, -5);
    this.ctx.lineTo(-4, 5);
    this.ctx.fill();

    this.ctx.restore();
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

// --- MODULE 2: Mathematical Model to Simulation Engine ---
class MathModelSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.wr = 3.0;
    this.wl = 2.0;
    this.r = 0.05;
    this.L = 0.25;

    this.robot = {
      x: this.width * 0.2,
      y: this.height * 0.5,
      theta: 0,
      trail: []
    };

    this.dt = 0.05;
    this.loop();
  }

  resize() {
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  setWheelVelocities(wr, wl) {
    this.wr = parseFloat(wr);
    this.wl = parseFloat(wl);
  }

  resetTrajectory() {
    this.robot.x = this.width * 0.2;
    this.robot.y = this.height * 0.5;
    this.robot.theta = 0;
    this.robot.trail = [];
  }

  update() {
    const v = (this.r / 2) * (this.wr + this.wl) * 35;
    const w = (this.r / this.L) * (this.wr - this.wl);

    this.robot.theta += w * this.dt;
    this.robot.x += Math.cos(this.robot.theta) * v * this.dt;
    this.robot.y += Math.sin(this.robot.theta) * v * this.dt;

    if (this.robot.x > this.width) this.robot.x = 0;
    if (this.robot.x < 0) this.robot.x = this.width;
    if (this.robot.y > this.height) this.robot.y = 0;
    if (this.robot.y < 0) this.robot.y = this.height;

    this.robot.trail.push({ x: this.robot.x, y: this.robot.y });
    if (this.robot.trail.length > 250) this.robot.trail.shift();

    const telV = document.getElementById("mathTelV");
    const telW = document.getElementById("mathTelW");
    if (telV) telV.textContent = `${((this.r / 2) * (this.wr + this.wl)).toFixed(2)} m/s`;
    if (telW) telW.textContent = `${w.toFixed(2)} rad/s`;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.strokeStyle = "rgba(255,255,255,0.03)";
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 30) {
      this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, this.height); this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 30) {
      this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(this.width, y); this.ctx.stroke();
    }

    this.ctx.strokeStyle = "#8b5cf6";
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.robot.trail.forEach((pt, i) => {
      if (i === 0) this.ctx.moveTo(pt.x, pt.y);
      else this.ctx.lineTo(pt.x, pt.y);
    });
    this.ctx.stroke();

    this.ctx.save();
    this.ctx.translate(this.robot.x, this.robot.y);
    this.ctx.rotate(this.robot.theta);

    this.ctx.fillStyle = "#10b981";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 15, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.strokeStyle = "#00f2fe";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(25, 0);
    this.ctx.stroke();

    this.ctx.restore();
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

// --- MODULE 3: OpenCV Vision-Based Leader-Follower ---
class OpenCVVisionSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.leader = { x: this.width * 0.6, y: this.height * 0.5 };
    this.follower = { x: this.width * 0.2, y: this.height * 0.5, theta: 0, fov: Math.PI / 3, camRange: 180 };
    
    this.targetDist = 70;
    this.detectedDist = 0;
    this.detectedAngle = 0;
    this.isDetected = false;

    this.bindEvents();
    this.loop();
  }

  resize() {
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  bindEvents() {
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.leader.x = e.clientX - rect.left;
      this.leader.y = e.clientY - rect.top;
    });
  }

  update() {
    const dx = this.leader.x - this.follower.x;
    const dy = this.leader.y - this.follower.y;
    const dist = Math.hypot(dx, dy);
    const angleToLeader = Math.atan2(dy, dx);

    let angleDiff = angleToLeader - this.follower.theta;
    while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

    if (dist <= this.follower.camRange && Math.abs(angleDiff) <= this.follower.fov / 2) {
      this.isDetected = true;
      this.detectedDist = dist;
      this.detectedAngle = angleDiff;

      this.follower.theta += angleDiff * 0.1;
      const speedErr = dist - this.targetDist;
      const v = Math.max(-1.5, Math.min(speedErr * 0.06, 2.5));

      this.follower.x += Math.cos(this.follower.theta) * v;
      this.follower.y += Math.sin(this.follower.theta) * v;
    } else {
      this.isDetected = false;
      this.follower.theta += 0.015;
    }

    const camStatus = document.getElementById("visionStatus");
    const camDist = document.getElementById("visionDist");
    if (camStatus) {
      camStatus.textContent = this.isDetected ? "TRACKING (OpenCV Box Found)" : "SEARCHING (Target Lost)";
      camStatus.style.color = this.isDetected ? "#10b981" : "#ef4444";
    }
    if (camDist) {
      camDist.textContent = this.isDetected ? `${Math.round(this.detectedDist)} px` : "--";
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.strokeStyle = "rgba(255,255,255,0.03)";
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 30) {
      this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, this.height); this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 30) {
      this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(this.width, y); this.ctx.stroke();
    }

    this.ctx.save();
    this.ctx.translate(this.follower.x, this.follower.y);
    this.ctx.rotate(this.follower.theta);

    this.ctx.fillStyle = this.isDetected ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)";
    this.ctx.strokeStyle = this.isDetected ? "#10b981" : "#ef4444";
    this.ctx.lineWidth = 1.5;

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.arc(0, 0, this.follower.camRange, -this.follower.fov / 2, this.follower.fov / 2);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.fillStyle = "#00f2fe";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 14, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(8, -4, 6, 8);

    this.ctx.restore();

    this.ctx.fillStyle = "#f59e0b";
    this.ctx.beginPath();
    this.ctx.arc(this.leader.x, this.leader.y, 14, 0, Math.PI * 2);
    this.ctx.fill();

    if (this.isDetected) {
      this.ctx.strokeStyle = "#10b981";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(this.leader.x - 20, this.leader.y - 20, 40, 40);

      this.ctx.fillStyle = "#10b981";
      this.ctx.font = "11px monospace";
      this.ctx.fillText(`Target: ${Math.round(this.detectedDist)}px`, this.leader.x - 25, this.leader.y - 25);
    }
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

// --- MODULE 4: Swarm Quadcopters Flocking (SICE FES 2025) ---
class DroneSwarmSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.drones = [];
    this.numDrones = 12;
    this.target = { x: this.width * 0.7, y: this.height * 0.5 };
    this.time = 0;

    this.initDrones();
    this.bindEvents();
    this.loop();
  }

  resize() {
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  initDrones() {
    this.drones = [];
    for (let i = 0; i < this.numDrones; i++) {
      this.drones.push({
        x: Math.random() * 200 + 50,
        y: Math.random() * 200 + 100,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        altitude: 10 + Math.sin(i) * 5,
        phase: i * 0.5
      });
    }
  }

  bindEvents() {
    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.target.x = e.clientX - rect.left;
      this.target.y = e.clientY - rect.top;
    });
  }

  update() {
    this.time += 0.04;

    this.drones.forEach((d, i) => {
      let gdx = this.target.x - d.x;
      let gdy = this.target.y - d.y;
      let gdist = Math.hypot(gdx, gdy);
      
      d.vx += (gdx / gdist) * 0.12;
      d.vy += (gdy / gdist) * 0.12;

      this.drones.forEach((other, j) => {
        if (i !== j) {
          let odx = d.x - other.x;
          let ody = d.y - other.y;
          let odist = Math.hypot(odx, ody);
          if (odist < 30 && odist > 0) {
            d.vx += (odx / odist) * 0.35;
            d.vy += (ody / odist) * 0.35;
          }
        }
      });

      d.altitude = 15 + Math.sin(this.time * 2 + d.phase) * 8;

      const speed = Math.hypot(d.vx, d.vy);
      if (speed > 2.8) {
        d.vx = (d.vx / speed) * 2.8;
        d.vy = (d.vy / speed) * 2.8;
      }

      d.x += d.vx;
      d.y += d.vy;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.strokeStyle = "rgba(255,255,255,0.03)";
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 40) {
      this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, this.height); this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 40) {
      this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(this.width, y); this.ctx.stroke();
    }

    this.ctx.strokeStyle = "#8b5cf6";
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([5, 5]);
    this.ctx.beginPath();
    this.ctx.arc(this.target.x, this.target.y, 16, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    this.drones.forEach(d => {
      const shadowRadius = Math.max(3, 10 - d.altitude * 0.3);
      this.ctx.fillStyle = "rgba(0,0,0,0.3)";
      this.ctx.beginPath();
      this.ctx.arc(d.x, d.y + d.altitude * 0.8, shadowRadius, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.save();
      this.ctx.translate(d.x, d.y);

      this.ctx.strokeStyle = "#00f2fe";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(-10, -10); this.ctx.lineTo(10, 10);
      this.ctx.moveTo(10, -10); this.ctx.lineTo(-10, 10);
      this.ctx.stroke();

      this.ctx.fillStyle = "rgba(139, 92, 246, 0.8)";
      [-10, 10].forEach(rx => {
        [-10, 10].forEach(ry => {
          this.ctx.beginPath();
          this.ctx.arc(rx, ry, 4, 0, Math.PI * 2);
          this.ctx.fill();
        });
      });

      this.ctx.fillStyle = "#10b981";
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 3, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    });
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

// --- MODULE 5: Indoor Exploration (Floodfill vs Frontier) ---
class IndoorExplorationSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.cols = 20;
    this.rows = 12;
    this.cellW = this.width / this.cols;
    this.cellH = this.height / this.rows;

    this.grid = [];
    this.mode = "frontier";
    this.isExploring = false;

    this.initGrid();
  }

  resize() {
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellW = this.width / this.cols;
    this.cellH = this.height / this.rows;
    this.draw();
  }

  initGrid() {
    this.grid = [];
    for (let r = 0; r < this.rows; r++) {
      const row = [];
      for (let c = 0; c < this.cols; c++) {
        const isWall = (r > 0 && r < this.rows - 1 && c > 0 && c < this.cols - 1) && Math.random() < 0.22;
        row.push({ row: r, col: c, isWall: isWall, visited: false, isFrontier: false });
      }
      this.grid.push(row);
    }
    this.grid[0][0].isWall = false;
    this.grid[0][0].visited = true;
    this.draw();
  }

  setMode(mode) {
    this.mode = mode;
    this.initGrid();
  }

  startExploration() {
    if (this.isExploring) return;
    this.isExploring = true;
    
    let queue = [{ r: 0, c: 0 }];

    const step = () => {
      if (queue.length === 0) {
        this.isExploring = false;
        return;
      }

      if (this.mode === "frontier") {
        queue.sort((a, b) => (a.r + a.c) - (b.r + b.c));
      }

      const current = queue.shift();
      const cell = this.grid[current.r][current.c];

      if (!cell.visited) {
        cell.visited = true;
      }

      const neighbors = [
        { r: current.r - 1, c: current.c },
        { r: current.r + 1, c: current.c },
        { r: current.r, c: current.c - 1 },
        { r: current.r, c: current.c + 1 }
      ];

      neighbors.forEach(n => {
        if (n.r >= 0 && n.r < this.rows && n.c >= 0 && n.c < this.cols) {
          const nCell = this.grid[n.r][n.c];
          if (!nCell.isWall && !nCell.visited && !queue.some(q => q.r === n.r && q.c === n.c)) {
            nCell.isFrontier = true;
            queue.push(n);
          }
        }
      });

      this.draw();
      setTimeout(step, 60);
    };

    step();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.grid[r][c];
        const x = c * this.cellW;
        const y = r * this.cellH;

        if (cell.isWall) {
          this.ctx.fillStyle = "#334155";
        } else if (cell.visited) {
          this.ctx.fillStyle = "rgba(0, 242, 254, 0.25)";
        } else if (cell.isFrontier) {
          this.ctx.fillStyle = "rgba(245, 158, 11, 0.5)";
        } else {
          this.ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
        }

        this.ctx.fillRect(x, y, this.cellW - 1, this.cellH - 1);
      }
    }
  }
}

// --- MODULE 6: LiDAR SLAM Autonomous Navigation ---
class LiDARSLAMSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.robot = { x: this.width * 0.3, y: this.height * 0.5, angle: 0 };
    this.obstacles = [
      { x: this.width * 0.5, y: this.height * 0.3, w: 100, h: 20 },
      { x: this.width * 0.5, y: this.height * 0.7, w: 20, h: 100 },
      { x: this.width * 0.7, y: this.height * 0.5, w: 60, h: 60 }
    ];

    this.rays = 36;
    this.scanData = [];
    this.bindEvents();
    this.loop();
  }

  resize() {
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  bindEvents() {
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.robot.x = e.clientX - rect.left;
      this.robot.y = e.clientY - rect.top;
    });
  }

  update() {
    this.robot.angle += 0.02;
    this.scanData = [];

    for (let i = 0; i < this.rays; i++) {
      const angle = this.robot.angle + (i * (Math.PI * 2 / this.rays));
      let rayDist = 200;

      for (let d = 0; d < 200; d += 4) {
        const rx = this.robot.x + Math.cos(angle) * d;
        const ry = this.robot.y + Math.sin(angle) * d;

        if (rx < 0 || rx > this.width || ry < 0 || ry > this.height) {
          rayDist = d;
          break;
        }

        const hit = this.obstacles.some(obs => 
          rx >= obs.x && rx <= obs.x + obs.w && ry >= obs.y && ry <= obs.y + obs.h
        );

        if (hit) {
          rayDist = d;
          break;
        }
      }

      this.scanData.push({ angle, dist: rayDist });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = "#475569";
    this.obstacles.forEach(obs => {
      this.ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
    });

    this.scanData.forEach(ray => {
      const hx = this.robot.x + Math.cos(ray.angle) * ray.dist;
      const hy = this.robot.y + Math.sin(ray.angle) * ray.dist;

      this.ctx.strokeStyle = "rgba(0, 242, 254, 0.15)";
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(this.robot.x, this.robot.y);
      this.ctx.lineTo(hx, hy);
      this.ctx.stroke();

      this.ctx.fillStyle = "#00f2fe";
      this.ctx.beginPath();
      this.ctx.arc(hx, hy, 2.5, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.fillStyle = "#f59e0b";
    this.ctx.beginPath();
    this.ctx.arc(this.robot.x, this.robot.y, 10, 0, Math.PI * 2);
    this.ctx.fill();
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

// --- MODULE 7: Path Tracking vs Trajectory Tracking Simulation ---
class TrackingComparisonSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.t = 0;
    this.mode = "trajectory"; // "path" vs "trajectory"

    // Sinusoidal Path Geometry
    this.getPathPoint = (x) => {
      return this.height * 0.5 + Math.sin(x * 0.015) * 80;
    };

    this.robot = { x: 50, y: this.getPathPoint(50), angle: 0, trail: [] };
    this.loop();
  }

  resize() {
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  setMode(mode) {
    this.mode = mode;
    this.robot.x = 50;
    this.robot.y = this.getPathPoint(50);
    this.robot.trail = [];
    this.t = 0;
  }

  update() {
    this.t += 0.05;

    if (this.mode === "trajectory") {
      // Trajectory Tracking: Strictly synchronized with time t!
      const targetX = 50 + (this.t * 22) % (this.width - 100);
      const targetY = this.getPathPoint(targetX);
      
      const dx = targetX - this.robot.x;
      const dy = targetY - this.robot.y;
      this.robot.angle = Math.atan2(dy, dx);
      
      this.robot.x += dx * 0.15;
      this.robot.y += dy * 0.15;
    } else {
      // Path Tracking: Pure Pursuit spatial progress (adjusts speed to follow curve)
      this.robot.x += 1.8;
      if (this.robot.x > this.width - 50) this.robot.x = 50;

      const targetY = this.getPathPoint(this.robot.x + 20);
      const dy = targetY - this.robot.y;
      this.robot.y += dy * 0.12;
      this.robot.angle = Math.atan2(dy, 20);
    }

    this.robot.trail.push({ x: this.robot.x, y: this.robot.y });
    if (this.robot.trail.length > 200) this.robot.trail.shift();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Grid
    this.ctx.strokeStyle = "rgba(255,255,255,0.03)";
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 40) {
      this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, this.height); this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 40) {
      this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(this.width, y); this.ctx.stroke();
    }

    // Desired Path (Spatial Reference)
    this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([6, 6]);
    this.ctx.beginPath();
    for (let x = 30; x < this.width - 30; x += 5) {
      const y = this.getPathPoint(x);
      if (x === 30) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // Actual Robot Executed Path
    this.ctx.strokeStyle = this.mode === "trajectory" ? "#8b5cf6" : "#00f2fe";
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.robot.trail.forEach((pt, i) => {
      if (i === 0) this.ctx.moveTo(pt.x, pt.y);
      else this.ctx.lineTo(pt.x, pt.y);
    });
    this.ctx.stroke();

    // Robot Node
    this.ctx.save();
    this.ctx.translate(this.robot.x, this.robot.y);
    this.ctx.rotate(this.robot.angle);

    this.ctx.fillStyle = this.mode === "trajectory" ? "#8b5cf6" : "#00f2fe";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 12, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = "#fff";
    this.ctx.beginPath();
    this.ctx.moveTo(14, 0);
    this.ctx.lineTo(-4, -4);
    this.ctx.lineTo(-4, 4);
    this.ctx.fill();

    this.ctx.restore();
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}
