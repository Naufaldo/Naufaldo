/* ==========================================================================
   Naufaldo Portfolio - Advanced Robotics Simulation Engines
   1. PID Control of Differential-Drive Mobile Robot (DDMR) + APF (ICCAS 2025)
   2. Swarm Quadcopters Boids Flocking + Altitude Modulation + APF (SICE FES 2025)
   3. Indoor Exploration: Floodfill vs. Frontier-Based Method (ICCAS 2024)
   4. LiDAR SLAM Autonomous Navigation System (IJRA 2024)
   ========================================================================== */

// --- MODULE 1: PID Control of DDMR + APF ---
class PIDDDMRSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = this.canvas.clientWidth || 700;
    this.height = this.canvas.height = this.canvas.clientHeight || 420;

    // Robot state
    this.robot = {
      x: 80,
      y: this.height / 2,
      theta: 0,
      v: 0,
      w: 0,
      radius: 14,
      trail: []
    };

    // Target goal
    this.goal = { x: this.width - 100, y: this.height / 2 };

    // Obstacles
    this.obstacles = [
      { x: this.width * 0.4, y: this.height * 0.4, radius: 25 },
      { x: this.width * 0.6, y: this.height * 0.6, radius: 22 }
    ];

    // PID Gains
    this.kp = 0.08;
    this.ki = 0.0001;
    this.kd = 0.15;

    this.integralError = 0;
    this.prevError = 0;
    this.isRunning = true;

    this.bindEvents();
    this.loop();
  }

  bindEvents() {
    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.goal.x = e.clientX - rect.left;
      this.goal.y = e.clientY - rect.top;
      this.integralError = 0;
    });
  }

  updateParams(kp, ki, kd) {
    this.kp = kp;
    this.ki = ki;
    this.kd = kd;
  }

  update() {
    if (!this.isRunning) return;

    // Distance and orientation error
    const dx = this.goal.x - this.robot.x;
    const dy = this.goal.y - this.robot.y;
    const dist = Math.hypot(dx, dy);
    
    const targetTheta = Math.atan2(dy, dx);
    let errorTheta = targetTheta - this.robot.theta;

    // Normalize error angle (-PI to PI)
    while (errorTheta > Math.PI) errorTheta -= 2 * Math.PI;
    while (errorTheta < -Math.PI) errorTheta += 2 * Math.PI;

    // PID control for angular velocity (w)
    this.integralError += errorTheta;
    const derivativeError = errorTheta - this.prevError;
    this.prevError = errorTheta;

    this.robot.w = (this.kp * errorTheta) + (this.ki * this.integralError) + (this.kd * derivativeError);

    // Linear velocity with APF slowdown near obstacles
    let baseV = Math.min(dist * 0.05, 2.5);
    
    // Repulsive APF force
    let repX = 0, repY = 0;
    this.obstacles.forEach(obs => {
      const odx = this.robot.x - obs.x;
      const ody = this.robot.y - obs.y;
      const odist = Math.hypot(odx, ody);
      const minSafety = obs.radius + this.robot.radius + 35;
      if (odist < minSafety && odist > 0) {
        const force = (minSafety - odist) / minSafety * 4.0;
        repX += (odx / odist) * force;
        repY += (ody / odist) * force;
      }
    });

    if (dist > 5) {
      this.robot.theta += this.robot.w;
      this.robot.x += Math.cos(this.robot.theta) * baseV + repX;
      this.robot.y += Math.sin(this.robot.theta) * baseV + repY;

      // Keep trail
      this.robot.trail.push({ x: this.robot.x, y: this.robot.y });
      if (this.robot.trail.length > 120) this.robot.trail.shift();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw Grid
    this.ctx.strokeStyle = "rgba(255,255,255,0.03)";
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 30) {
      this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, this.height); this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 30) {
      this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(this.width, y); this.ctx.stroke();
    }

    // Draw Trail
    this.ctx.strokeStyle = "rgba(0, 242, 254, 0.4)";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.robot.trail.forEach((pt, i) => {
      if (i === 0) this.ctx.moveTo(pt.x, pt.y);
      else this.ctx.lineTo(pt.x, pt.y);
    });
    this.ctx.stroke();

    // Draw Goal
    this.ctx.fillStyle = "#10b981";
    this.ctx.beginPath();
    this.ctx.arc(this.goal.x, this.goal.y, 10, 0, Math.PI * 2);
    this.ctx.fill();

    // Draw Obstacles
    this.obstacles.forEach(obs => {
      this.ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
      this.ctx.strokeStyle = "#ef4444";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    });

    // Draw DDMR Robot Body
    this.ctx.save();
    this.ctx.translate(this.robot.x, this.robot.y);
    this.ctx.rotate(this.robot.theta);

    // Wheels
    this.ctx.fillStyle = "#64748b";
    this.ctx.fillRect(-10, -18, 20, 5);
    this.ctx.fillRect(-10, 13, 20, 5);

    // Chassis
    this.ctx.fillStyle = "#00f2fe";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.robot.radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Heading direction
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(18, 0);
    this.ctx.stroke();

    this.ctx.restore();
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

// --- MODULE 2: Drone Swarm Flocking & Altitude Modulation (SICE FES 2025) ---
class DroneSwarmSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = this.canvas.clientWidth || 700;
    this.height = this.canvas.height = this.canvas.clientHeight || 420;

    this.drones = [];
    this.numDrones = 12;
    this.target = { x: this.width * 0.7, y: this.height * 0.5 };
    this.time = 0;

    this.initDrones();
    this.bindEvents();
    this.loop();
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
      // 1. Cohesion & Goal attraction
      let gdx = this.target.x - d.x;
      let gdy = this.target.y - d.y;
      let gdist = Math.hypot(gdx, gdy);
      
      d.vx += (gdx / gdist) * 0.12;
      d.vy += (gdy / gdist) * 0.12;

      // 2. Separation between drones
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

      // 3. Sinusoidal Altitude Modulation (SICE FES 2025 Research Feature)
      d.altitude = 15 + Math.sin(this.time * 2 + d.phase) * 8;

      // Speed limit
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

    // Draw Grid
    this.ctx.strokeStyle = "rgba(255,255,255,0.03)";
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 40) {
      this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, this.height); this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 40) {
      this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(this.width, y); this.ctx.stroke();
    }

    // Target Marker
    this.ctx.strokeStyle = "#8b5cf6";
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([5, 5]);
    this.ctx.beginPath();
    this.ctx.arc(this.target.x, this.target.y, 16, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // Draw Quadcopters
    this.drones.forEach(d => {
      // Shadow (indicates altitude)
      const shadowRadius = Math.max(3, 10 - d.altitude * 0.3);
      this.ctx.fillStyle = "rgba(0,0,0,0.3)";
      this.ctx.beginPath();
      this.ctx.arc(d.x, d.y + d.altitude * 0.8, shadowRadius, 0, Math.PI * 2);
      this.ctx.fill();

      // Drone Body (X-Frame Quadcopter)
      this.ctx.save();
      this.ctx.translate(d.x, d.y);

      this.ctx.strokeStyle = "#00f2fe";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(-10, -10); this.ctx.lineTo(10, 10);
      this.ctx.moveTo(10, -10); this.ctx.lineTo(-10, 10);
      this.ctx.stroke();

      // Rotors
      this.ctx.fillStyle = "rgba(139, 92, 246, 0.8)";
      [-10, 10].forEach(rx => {
        [-10, 10].forEach(ry => {
          this.ctx.beginPath();
          this.ctx.arc(rx, ry, 4, 0, Math.PI * 2);
          this.ctx.fill();
        });
      });

      // Center LED
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

// --- MODULE 3: Indoor Exploration (Floodfill vs Frontier-Based) (ICCAS 2024) ---
class IndoorExplorationSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = this.canvas.clientWidth || 700;
    this.height = this.canvas.height = this.canvas.clientHeight || 420;

    this.cols = 20;
    this.rows = 12;
    this.cellW = this.width / this.cols;
    this.cellH = this.height / this.rows;

    this.grid = [];
    this.mode = "frontier"; // "frontier" or "floodfill"
    this.exploredCount = 0;
    this.isExploring = false;

    this.initGrid();
  }

  initGrid() {
    this.grid = [];
    this.exploredCount = 0;
    for (let r = 0; r < this.rows; r++) {
      const row = [];
      for (let c = 0; c < this.cols; c++) {
        // Random obstacles
        const isWall = (r > 0 && r < this.rows - 1 && c > 0 && c < this.cols - 1) && Math.random() < 0.22;
        row.push({
          row: r,
          col: c,
          isWall: isWall,
          visited: false,
          isFrontier: false
        });
      }
      this.grid.push(row);
    }
    // Start node
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
        // Frontier priority (closest unvisited boundary)
        queue.sort((a, b) => (a.r + a.c) - (b.r + b.c));
      }

      const current = queue.shift();
      const cell = this.grid[current.r][current.c];

      if (!cell.visited) {
        cell.visited = true;
        this.exploredCount++;
      }

      // Check 4 neighbors
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

// --- MODULE 4: LiDAR SLAM Autonomous Navigation (IJRA 2024) ---
class LiDARSLAMSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = this.canvas.clientWidth || 700;
    this.height = this.canvas.height = this.canvas.clientHeight || 420;

    this.robot = { x: this.width * 0.3, y: this.height * 0.5, angle: 0 };
    this.obstacles = [
      { x: this.width * 0.5, y: this.height * 0.3, w: 100, h: 20 },
      { x: this.width * 0.5, y: this.height * 0.7, w: 20, h: 100 },
      { x: this.width * 0.7, y: this.height * 0.5, w: 60, h: 60 }
    ];

    this.rays = 36; // 360 degree scan
    this.scanData = [];
    this.bindEvents();
    this.loop();
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

    // Cast 36 LiDAR Rays
    for (let i = 0; i < this.rays; i++) {
      const angle = this.robot.angle + (i * (Math.PI * 2 / this.rays));
      let rayDist = 200; // max LiDAR range

      // Ray march
      for (let d = 0; d < 200; d += 4) {
        const rx = this.robot.x + Math.cos(angle) * d;
        const ry = this.robot.y + Math.sin(angle) * d;

        // Check canvas boundary or obstacle hit
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

    // Draw Obstacles
    this.ctx.fillStyle = "#475569";
    this.obstacles.forEach(obs => {
      this.ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
    });

    // Draw LiDAR Rays & Point Cloud Hits
    this.scanData.forEach(ray => {
      const hx = this.robot.x + Math.cos(ray.angle) * ray.dist;
      const hy = this.robot.y + Math.sin(ray.angle) * ray.dist;

      // Laser Ray
      this.ctx.strokeStyle = "rgba(0, 242, 254, 0.15)";
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(this.robot.x, this.robot.y);
      this.ctx.lineTo(hx, hy);
      this.ctx.stroke();

      // Hit Point (Point Cloud)
      this.ctx.fillStyle = "#00f2fe";
      this.ctx.beginPath();
      this.ctx.arc(hx, hy, 2.5, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Draw Hexapod Robot Center
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
