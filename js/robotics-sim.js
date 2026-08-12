/* ============================================================
   Naufaldo Portfolio — Advanced Robotics Simulation Engine v3
   7 Interactive Simulation Modules
   ============================================================ */

function resizeCanvasToWrapper(canvas) {
  if (!canvas || !canvas.parentElement) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width || 750;
  canvas.height = rect.height || 420;
}

// ── MODULE 1: Fuzzy PID DDMR Multi-Agent Formation Control (ICCAS 2025) ────
class ICCASPIDDDMRSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.formation = "triangle";
    this.trajMode = "manual"; // "manual" | "lemniscate" | "circular"
    this.t = 0;
    this.simSpeed = 1.0;

    this.leader = {
      x: this.width * 0.35,
      y: this.height * 0.5,
      targetX: this.width * 0.65,
      targetY: this.height * 0.5,
      angle: 0,
      speed: 2.2,
      radius: 14,
      trail: []
    };

    this.followers = [
      { x: this.leader.x - 45, y: this.leader.y - 35, angle: 0, radius: 10, color: "#00f2fe", trail: [] },
      { x: this.leader.x - 45, y: this.leader.y + 35, angle: 0, radius: 10, color: "#4facfe", trail: [] },
      { x: this.leader.x - 80, y: this.leader.y,       angle: 0, radius: 10, color: "#a855f7", trail: [] }
    ];

    this.obstacles = [
      { x: this.width * 0.45, y: this.height * 0.35, radius: 24 },
      { x: this.width * 0.55, y: this.height * 0.65, radius: 22 }
    ];

    this.kp = 0.16;
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
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (this.trajMode === "manual") {
        this.leader.targetX = clickX;
        this.leader.targetY = clickY;
      }
    });
  }

  setMotionMode(mode) {
    this.trajMode = mode;
    this.t = 0;
    this.leader.trail = [];
    this.followers.forEach(f => f.trail = []);
  }

  setFormation(type) {
    this.formation = type;
  }

  addObstacle() {
    this.obstacles.push({
      x: Math.random() * (this.width - 120) + 60,
      y: Math.random() * (this.height - 120) + 60,
      radius: Math.floor(Math.random() * 12) + 18
    });
  }

  clearObstacles() {
    this.obstacles = [];
  }

  reset() {
    this.t = 0;
    this.leader.x = this.width * 0.30;
    this.leader.y = this.height * 0.50;
    this.leader.targetX = this.width * 0.70;
    this.leader.targetY = this.height * 0.50;
    this.leader.angle = 0;
    this.leader.trail = [];

    this.followers.forEach((f, idx) => {
      f.x = this.leader.x - 40 - idx * 20;
      f.y = this.leader.y + (idx === 0 ? -30 : idx === 1 ? 30 : 0);
      f.angle = 0;
      f.trail = [];
    });

    this.obstacles = [
      { x: this.width * 0.45, y: this.height * 0.35, radius: 24 },
      { x: this.width * 0.55, y: this.height * 0.65, radius: 22 }
    ];
  }

  getFormationOffsets() {
    const dist = 48;
    if (this.formation === "triangle") {
      return [
        { dx: -dist, dy: -dist * 0.85 },
        { dx: -dist, dy:  dist * 0.85 },
        { dx: -dist * 1.75, dy: 0 }
      ];
    }
    if (this.formation === "circle") {
      return [
        { dx: Math.cos(0) * dist,             dy: Math.sin(0) * dist },
        { dx: Math.cos((2 * Math.PI) / 3) * dist, dy: Math.sin((2 * Math.PI) / 3) * dist },
        { dx: Math.cos((4 * Math.PI) / 3) * dist, dy: Math.sin((4 * Math.PI) / 3) * dist }
      ];
    }
    // Line formation (Abreast)
    return [
      { dx: -dist * 0.6, dy: -dist * 1.1 },
      { dx: -dist * 0.6, dy:  dist * 1.1 },
      { dx: -dist * 1.2, dy: 0 }
    ];
  }

  getTrajectoryPoint(t) {
    const cx = this.width * 0.5;
    const cy = this.height * 0.5;

    if (this.trajMode === "lemniscate") {
      // Bernoulli Lemniscate (Figure-8)
      const A = this.width * 0.34;
      const B = this.height * 0.28;
      return {
        x: cx + A * Math.sin(t),
        y: cy + (B / 2) * Math.sin(2 * t)
      };
    }
    if (this.trajMode === "circular") {
      // Circular Orbital Trajectory
      const R = Math.min(this.width, this.height) * 0.32;
      return {
        x: cx + R * Math.cos(t),
        y: cy + R * Math.sin(t)
      };
    }
    return { x: this.leader.targetX, y: this.leader.targetY };
  }

  update() {
    // 1. Leader Motion (Manual Target vs Continuous Trajectory)
    if (this.trajMode === "manual") {
      const dx = this.leader.targetX - this.leader.x;
      const dy = this.leader.targetY - this.leader.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 4) {
        this.leader.angle = Math.atan2(dy, dx);
        let mx = Math.cos(this.leader.angle) * this.leader.speed;
        let my = Math.sin(this.leader.angle) * this.leader.speed;

        // Leader APF Obstacle Avoidance
        this.obstacles.forEach(obs => {
          const odx = this.leader.x - obs.x;
          const ody = this.leader.y - obs.y;
          const od = Math.hypot(odx, ody);
          const min = obs.radius + this.leader.radius + 35;
          if (od < min && od > 0) {
            const f = Math.pow((min - od) / min, 2) * 4.2;
            mx += (odx / od) * f;
            my += (ody / od) * f;
          }
        });

        this.leader.x += mx;
        this.leader.y += my;
        this.leader.angle = Math.atan2(my, mx);
      }
    } else {
      // Trajectory Tracking (Lemniscate / Circular)
      this.t += 0.016 * this.simSpeed;
      const refPt = this.getTrajectoryPoint(this.t);
      const nextRefPt = this.getTrajectoryPoint(this.t + 0.05);

      const dx = refPt.x - this.leader.x;
      const dy = refPt.y - this.leader.y;

      let mx = dx * 0.12 + (nextRefPt.x - refPt.x) * 1.5;
      let my = dy * 0.12 + (nextRefPt.y - refPt.y) * 1.5;

      // Leader APF Obstacle Avoidance along trajectory
      this.obstacles.forEach(obs => {
        const odx = this.leader.x - obs.x;
        const ody = this.leader.y - obs.y;
        const od = Math.hypot(odx, ody);
        const min = obs.radius + this.leader.radius + 35;
        if (od < min && od > 0) {
          const f = Math.pow((min - od) / min, 2) * 4.5;
          mx += (odx / od) * f;
          my += (ody / od) * f;
        }
      });

      this.leader.x += mx;
      this.leader.y += my;
      this.leader.angle = Math.atan2(my, mx);
    }

    // Leader trail update
    if (this.leader.trail.length === 0 || Math.hypot(this.leader.x - this.leader.trail[this.leader.trail.length - 1].x, this.leader.y - this.leader.trail[this.leader.trail.length - 1].y) > 6) {
      this.leader.trail.push({ x: this.leader.x, y: this.leader.y });
      if (this.leader.trail.length > 60) this.leader.trail.shift();
    }

    // 2. Followers Swarm Formation Control + APF Obstacle Avoidance
    const offs = this.getFormationOffsets();
    const ca = Math.cos(this.leader.angle);
    const sa = Math.sin(this.leader.angle);

    this.followers.forEach((fol, idx) => {
      const off = offs[idx];
      // Target position in world coordinates
      const tx = this.leader.x + off.dx * ca - off.dy * sa;
      const ty = this.leader.y + off.dx * sa + off.dy * ca;

      const fdx = tx - fol.x;
      const fdy = ty - fol.y;

      // PID Formation Attraction
      let fx = fdx * (this.kp * 1.4);
      let fy = fdy * (this.kp * 1.4);

      // APF Obstacle Repulsion
      this.obstacles.forEach(obs => {
        const odx = fol.x - obs.x;
        const ody = fol.y - obs.y;
        const od = Math.hypot(odx, ody);
        const min = obs.radius + fol.radius + 30;
        if (od < min && od > 0) {
          const repForce = Math.pow((min - od) / min, 2) * 4.0;
          fx += (odx / od) * repForce;
          fy += (ody / od) * repForce;
        }
      });

      // Inter-Follower Collision Avoidance
      this.followers.forEach((otherFol, oIdx) => {
        if (idx !== oIdx) {
          const cdx = fol.x - otherFol.x;
          const cdy = fol.y - otherFol.y;
          const cd = Math.hypot(cdx, cdy);
          const safeDist = fol.radius + otherFol.radius + 12;
          if (cd < safeDist && cd > 0) {
            const sepForce = ((safeDist - cd) / safeDist) * 2.0;
            fx += (cdx / cd) * sepForce;
            fy += (cdy / cd) * sepForce;
          }
        }
      });

      fol.x += fx;
      fol.y += fy;
      fol.angle = Math.atan2(fy, fx);

      // Follower trail update
      if (fol.trail.length === 0 || Math.hypot(fol.x - fol.trail[fol.trail.length - 1].x, fol.y - fol.trail[fol.trail.length - 1].y) > 6) {
        fol.trail.push({ x: fol.x, y: fol.y });
        if (fol.trail.length > 40) fol.trail.shift();
      }
    });
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Grid Background
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, this.height); ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(this.width, y); ctx.stroke();
    }

    // 2. Reference Trajectory Path (for Lemniscate / Circular)
    if (this.trajMode === "lemniscate" || this.trajMode === "circular") {
      ctx.strokeStyle = "rgba(0, 242, 254, 0.22)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let s = 0; s <= Math.PI * 2 + 0.1; s += 0.08) {
        const pt = this.getTrajectoryPoint(s);
        if (s === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      // Draw Manual Click Target
      ctx.strokeStyle = "#00f2fe";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(this.leader.targetX, this.leader.targetY, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 3. Draw APF Obstacles
    this.obstacles.forEach(obs => {
      // APF Potential Zone Halo
      ctx.fillStyle = "rgba(239, 68, 68, 0.10)";
      ctx.beginPath();
      ctx.arc(obs.x, obs.y, obs.radius + 28, 0, Math.PI * 2);
      ctx.fill();

      // Obstacle Body
      ctx.fillStyle = "rgba(239, 68, 68, 0.28)";
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    // 4. Draw Trails
    this.followers.forEach(fol => {
      if (fol.trail.length > 1) {
        ctx.strokeStyle = "rgba(0, 242, 254, 0.18)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        fol.trail.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      }
    });

    if (this.leader.trail.length > 1) {
      ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      this.leader.trail.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
    }

    // 5. Draw Formation Tether Lines (Leader to Followers)
    this.followers.forEach(fol => {
      ctx.strokeStyle = "rgba(0, 242, 254, 0.4)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(this.leader.x, this.leader.y);
      ctx.lineTo(fol.x, fol.y);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // 6. Draw Followers (DWMR)
    this.followers.forEach(fol => {
      ctx.save();
      ctx.translate(fol.x, fol.y);
      ctx.rotate(fol.angle);

      // Differential Wheels
      ctx.fillStyle = "#64748b";
      ctx.fillRect(-7, -13, 14, 4);
      ctx.fillRect(-7, 9, 14, 4);

      // Follower Chassis
      ctx.fillStyle = fol.color;
      ctx.beginPath();
      ctx.arc(0, 0, fol.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Heading indicator
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(fol.radius + 3, 0);
      ctx.lineTo(fol.radius - 3, -3);
      ctx.lineTo(fol.radius - 3, 3);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    });

    // 7. Draw Virtual Leader (Gold with Glow)
    ctx.save();
    ctx.translate(this.leader.x, this.leader.y);
    ctx.rotate(this.leader.angle);

    ctx.shadowColor = "#f59e0b";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(0, 0, this.leader.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Leader Direction Arrow
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(this.leader.radius + 6, 0);
    ctx.lineTo(-4, -6);
    ctx.lineTo(-4, 6);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // 8. HUD Overlay
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    ctx.font = "11px monospace";
    ctx.fillText(
      `Mode: ${this.trajMode.toUpperCase()} | Formasi: ${this.formation.toUpperCase()} | Obstacles: ${this.obstacles.length}`,
      10,
      18
    );
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

// ── MODULE 2: Mathematical Kinematic Model + PID Trajectory Control ──────────
class MathModelSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width; this.height = this.canvas.height;
    this.wr = 3.0; this.wl = 2.0; this.r = 0.05; this.L = 0.25;
    this.simMode = "openloop";
    this.trajectoryType = "sinusoidal";
    this.pid = { kp: 2.5, ki: 0.01, kd: 0.8, errI: 0, errPrev: 0 };
    this.t = 0;
    this.refTrail = [];
    this.robot = { x: this.width*0.2, y: this.height*0.5, theta: 0, trail: [] };
    this.dt = 0.05;
    this.loop();
  }

  resize() { resizeCanvasToWrapper(this.canvas); this.width=this.canvas.width; this.height=this.canvas.height; }

  setWheelVelocities(wr, wl) { this.wr = parseFloat(wr); this.wl = parseFloat(wl); }
  setSimMode(mode) { this.simMode = mode; this.resetTrajectory(); }
  setPIDGains(kp, ki, kd) { this.pid.kp=kp; this.pid.ki=ki; this.pid.kd=kd; }
  setTrajectoryType(type) { this.trajectoryType=type; this.resetTrajectory(); }

  resetTrajectory() {
    this.robot.x=this.width*0.2; this.robot.y=this.height*0.5; this.robot.theta=0;
    this.robot.trail=[]; this.refTrail=[]; this.t=0; this.pid.errI=0; this.pid.errPrev=0;
  }

  getRefPoint(t) {
    const cx=this.width*0.5, cy=this.height*0.5, R=Math.min(this.width,this.height)*0.32;
    switch(this.trajectoryType) {
      case "circular":
        return { x: cx+R*Math.cos(t*0.45), y: cy+R*Math.sin(t*0.45) };
      case "lemniscate": {
        const a=t*0.35, s=Math.sin(a), d=1+s*s;
        return { x: cx+R*Math.cos(a)/d, y: cy+R*s*Math.cos(a)/d };
      }
      case "square": {
        const side=(t*0.3)%4;
        if(side<1) return{x:cx-R+side*R*2,y:cy-R};
        if(side<2) return{x:cx+R,y:cy-R+(side-1)*R*2};
        if(side<3) return{x:cx+R-(side-2)*R*2,y:cy+R};
        return{x:cx-R,y:cy+R-(side-3)*R*2};
      }
      default: // sinusoidal
        return { x: 60+(t*18)%(this.width-120), y: cy+Math.sin(t*0.9)*R*0.55 };
    }
  }

  update() {
    this.t += this.dt;
    if (this.simMode === "pid") {
      const ref = this.getRefPoint(this.t);
      this.refTrail.push({x:ref.x,y:ref.y});
      if(this.refTrail.length>400) this.refTrail.shift();
      const dx=ref.x-this.robot.x, dy=ref.y-this.robot.y;
      const dist=Math.hypot(dx,dy), targetAngle=Math.atan2(dy,dx);
      let err=targetAngle-this.robot.theta;
      while(err>Math.PI) err-=2*Math.PI; while(err<-Math.PI) err+=2*Math.PI;
      this.pid.errI+=err*this.dt; this.pid.errI=Math.max(-3,Math.min(3,this.pid.errI));
      const d=(err-this.pid.errPrev)/this.dt; this.pid.errPrev=err;
      const omega=this.pid.kp*err+this.pid.ki*this.pid.errI+this.pid.kd*d;
      const v=Math.min(dist*1.2,180);
      this.robot.theta+=omega*this.dt;
      this.robot.x+=Math.cos(this.robot.theta)*v*this.dt;
      this.robot.y+=Math.sin(this.robot.theta)*v*this.dt;
      const eEl=document.getElementById("pidErrTheta"), vEl=document.getElementById("pidVel");
      if(eEl) eEl.textContent=err.toFixed(3); if(vEl) vEl.textContent=v.toFixed(1);
    } else {
      const v=(this.r/2)*(this.wr+this.wl)*35, w=(this.r/this.L)*(this.wr-this.wl);
      this.robot.theta+=w*this.dt;
      this.robot.x+=Math.cos(this.robot.theta)*v*this.dt;
      this.robot.y+=Math.sin(this.robot.theta)*v*this.dt;
      if(this.robot.x>this.width) this.robot.x=0; if(this.robot.x<0) this.robot.x=this.width;
      if(this.robot.y>this.height) this.robot.y=0; if(this.robot.y<0) this.robot.y=this.height;
      const tV=document.getElementById("mathTelV"), tW=document.getElementById("mathTelW");
      if(tV) tV.textContent=`${((this.r/2)*(this.wr+this.wl)).toFixed(2)} m/s`;
      if(tW) tW.textContent=`${w.toFixed(2)} rad/s`;
    }
    this.robot.trail.push({x:this.robot.x,y:this.robot.y});
    if(this.robot.trail.length>300) this.robot.trail.shift();
  }

  draw() {
    const ctx=this.ctx;
    ctx.clearRect(0,0,this.width,this.height);
    ctx.strokeStyle="rgba(255,255,255,0.03)"; ctx.lineWidth=1;
    for(let x=0;x<this.width;x+=30){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,this.height);ctx.stroke();}
    for(let y=0;y<this.height;y+=30){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(this.width,y);ctx.stroke();}
    if(this.simMode==="pid" && this.refTrail.length>1) {
      ctx.strokeStyle="rgba(245,158,11,0.4)"; ctx.lineWidth=2; ctx.setLineDash([6,4]);
      ctx.beginPath();
      this.refTrail.forEach((pt,i)=>i===0?ctx.moveTo(pt.x,pt.y):ctx.lineTo(pt.x,pt.y));
      ctx.stroke(); ctx.setLineDash([]);
      const ref=this.getRefPoint(this.t);
      ctx.strokeStyle="#f59e0b"; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(ref.x,ref.y,8,0,Math.PI*2); ctx.stroke();
    }
    ctx.strokeStyle=this.simMode==="pid"?"#00f2fe":"#8b5cf6"; ctx.lineWidth=2.5;
    ctx.beginPath(); this.robot.trail.forEach((pt,i)=>i===0?ctx.moveTo(pt.x,pt.y):ctx.lineTo(pt.x,pt.y)); ctx.stroke();
    ctx.save(); ctx.translate(this.robot.x,this.robot.y); ctx.rotate(this.robot.theta);
    ctx.fillStyle="#10b981"; ctx.beginPath(); ctx.arc(0,0,15,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="#00f2fe"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(25,0); ctx.stroke();
    ctx.restore();
    ctx.fillStyle="rgba(255,255,255,0.45)"; ctx.font="11px monospace";
    ctx.fillText(this.simMode==="pid"?`PID Trajectory → ${this.trajectoryType.toUpperCase()}`:"Open-Loop ωr/ωl", 8, 18);
  }

  loop() { this.update(); this.draw(); requestAnimationFrame(()=>this.loop()); }
}

// ── MODULE 3: OpenCV Vision-Based Leader-Follower ────────────────────────────
class OpenCVVisionSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width=this.canvas.width; this.height=this.canvas.height;
    this.leader={x:this.width*0.6,y:this.height*0.5};
    this.follower={x:this.width*0.2,y:this.height*0.5,theta:0,fov:Math.PI/3,camRange:180};
    this.targetDist=70; this.detectedDist=0; this.detectedAngle=0; this.isDetected=false;
    this.bindEvents(); this.loop();
  }

  resize() { resizeCanvasToWrapper(this.canvas); this.width=this.canvas.width; this.height=this.canvas.height; }

  bindEvents() {
    this.canvas.addEventListener("mousemove",(e)=>{
      const rect=this.canvas.getBoundingClientRect();
      this.leader.x=e.clientX-rect.left; this.leader.y=e.clientY-rect.top;
    });
  }

  update() {
    const dx=this.leader.x-this.follower.x, dy=this.leader.y-this.follower.y;
    const dist=Math.hypot(dx,dy), aToL=Math.atan2(dy,dx);
    let aDiff=aToL-this.follower.theta;
    while(aDiff>Math.PI) aDiff-=2*Math.PI; while(aDiff<-Math.PI) aDiff+=2*Math.PI;
    if(dist<=this.follower.camRange && Math.abs(aDiff)<=this.follower.fov/2){
      this.isDetected=true; this.detectedDist=dist; this.detectedAngle=aDiff;
      this.follower.theta+=aDiff*0.1;
      const spErr=dist-this.targetDist, v=Math.max(-1.5,Math.min(spErr*0.06,2.5));
      this.follower.x+=Math.cos(this.follower.theta)*v; this.follower.y+=Math.sin(this.follower.theta)*v;
    } else { this.isDetected=false; this.follower.theta+=0.015; }
    const cs=document.getElementById("visionStatus"), cd=document.getElementById("visionDist");
    if(cs){cs.textContent=this.isDetected?"TRACKING (OpenCV Box Found)":"SEARCHING (Target Lost)"; cs.style.color=this.isDetected?"#10b981":"#ef4444";}
    if(cd) cd.textContent=this.isDetected?`${Math.round(this.detectedDist)} px`:"--";
  }

  draw() {
    const ctx=this.ctx;
    ctx.clearRect(0,0,this.width,this.height);
    ctx.strokeStyle="rgba(255,255,255,0.03)"; ctx.lineWidth=1;
    for(let x=0;x<this.width;x+=30){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,this.height);ctx.stroke();}
    for(let y=0;y<this.height;y+=30){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(this.width,y);ctx.stroke();}
    ctx.save(); ctx.translate(this.follower.x,this.follower.y); ctx.rotate(this.follower.theta);
    ctx.fillStyle=this.isDetected?"rgba(16,185,129,0.15)":"rgba(239,68,68,0.15)";
    ctx.strokeStyle=this.isDetected?"#10b981":"#ef4444"; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,this.follower.camRange,-this.follower.fov/2,this.follower.fov/2); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle="#00f2fe"; ctx.beginPath(); ctx.arc(0,0,14,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="#fff"; ctx.fillRect(8,-4,6,8);
    ctx.restore();
    ctx.fillStyle="#f59e0b"; ctx.beginPath(); ctx.arc(this.leader.x,this.leader.y,14,0,Math.PI*2); ctx.fill();
    if(this.isDetected){
      ctx.strokeStyle="#10b981"; ctx.lineWidth=2; ctx.strokeRect(this.leader.x-20,this.leader.y-20,40,40);
      ctx.fillStyle="#10b981"; ctx.font="11px monospace"; ctx.fillText(`Target: ${Math.round(this.detectedDist)}px`,this.leader.x-25,this.leader.y-25);
    }
  }

  loop() { this.update(); this.draw(); requestAnimationFrame(()=>this.loop()); }
}

// ── MODULE 4: Path Tracking vs Trajectory Tracking ───────────────────────────
class TrackingComparisonSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width=this.canvas.width; this.height=this.canvas.height;
    this.t=0; this.simTime=0; this.mode="path"; this.simSpeed=1.0;
    this.startX=50; this.startOffsetY=0;
    this.getPathPoint=(x)=>this.height*0.5+this.startOffsetY+Math.sin(x*0.015)*80;
    this.robot={x:this.startX,y:this.getPathPoint(this.startX),angle:0,trail:[]};
    this.loop();
  }

  resize() { resizeCanvasToWrapper(this.canvas); this.width=this.canvas.width; this.height=this.canvas.height; }

  setMode(mode) {
    this.mode=mode; this.robot.x=this.startX; this.robot.y=this.getPathPoint(this.startX);
    this.robot.trail=[]; this.t=0; this.simTime=0;
  }

  setStartPosition(x, offsetY) {
    this.startX=x; this.startOffsetY=offsetY;
    this.robot.x=this.startX; this.robot.y=this.getPathPoint(this.startX);
    this.robot.trail=[]; this.t=0; this.simTime=0;
  }

  setSimSpeed(s) { this.simSpeed=s; }

  update() {
    this.t+=this.simSpeed*0.5; this.simTime+=0.016;
    if(this.mode==="trajectory"){
      const tx=this.startX+(this.t*22*this.simSpeed*0.03)%(this.width-100), ty=this.getPathPoint(tx);
      const dx=tx-this.robot.x, dy=ty-this.robot.y;
      this.robot.angle=Math.atan2(dy,dx); this.robot.x+=dx*0.15; this.robot.y+=dy*0.15;
    } else {
      this.robot.x+=1.8*this.simSpeed*0.1;
      if(this.robot.x>this.width-50){this.robot.x=this.startX; this.robot.trail=[];}
      const ty=this.getPathPoint(this.robot.x+20), dy=ty-this.robot.y;
      this.robot.y+=dy*0.12; this.robot.angle=Math.atan2(dy,20);
    }
    this.robot.trail.push({x:this.robot.x,y:this.robot.y});
    if(this.robot.trail.length>200) this.robot.trail.shift();
    const tEl=document.getElementById("timer3Label");
    if(tEl) tEl.textContent=`${this.simTime.toFixed(1)}s`;
  }

  draw() {
    const ctx=this.ctx;
    ctx.clearRect(0,0,this.width,this.height);
    ctx.strokeStyle="rgba(255,255,255,0.03)"; ctx.lineWidth=1;
    for(let x=0;x<this.width;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,this.height);ctx.stroke();}
    for(let y=0;y<this.height;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(this.width,y);ctx.stroke();}
    ctx.strokeStyle="rgba(255,255,255,0.2)"; ctx.lineWidth=2; ctx.setLineDash([6,6]);
    ctx.beginPath();
    for(let x=30;x<this.width-30;x+=5){const y=this.getPathPoint(x);x===30?ctx.moveTo(x,y):ctx.lineTo(x,y);}
    ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle=this.mode==="trajectory"?"#8b5cf6":"#00f2fe"; ctx.lineWidth=3;
    ctx.beginPath(); this.robot.trail.forEach((pt,i)=>i===0?ctx.moveTo(pt.x,pt.y):ctx.lineTo(pt.x,pt.y)); ctx.stroke();
    ctx.save(); ctx.translate(this.robot.x,this.robot.y); ctx.rotate(this.robot.angle);
    ctx.fillStyle=this.mode==="trajectory"?"#8b5cf6":"#00f2fe";
    ctx.beginPath(); ctx.arc(0,0,12,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="#fff"; ctx.beginPath(); ctx.moveTo(14,0); ctx.lineTo(-4,-4); ctx.lineTo(-4,4); ctx.fill();
    ctx.restore();
    ctx.fillStyle="rgba(255,255,255,0.45)"; ctx.font="11px monospace";
    ctx.fillText(this.mode==="trajectory"?"Trajectory Tracking — Time-Sync (terikat waktu t)":"Path Tracking — Pure Pursuit (bebas waktu)", 8, 18);
  }

  loop() { this.update(); this.draw(); requestAnimationFrame(()=>this.loop()); }
}

// ── MODULE 5: Drone Swarm Flocking with Configurable Params ─────────────────
class DroneSwarmSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width=this.canvas.width; this.height=this.canvas.height;
    this.numDrones=12; this.cohesion=0.30; this.separation=40; this.alignment=0.20;
    this.target={x:this.width*0.7,y:this.height*0.5};
    this.time=0; this.drones=[]; this.obstacles=[];
    this.addObstacleMode=false;
    this.initDrones(); this.bindEvents(); this.loop();
  }

  resize() { resizeCanvasToWrapper(this.canvas); this.width=this.canvas.width; this.height=this.canvas.height; }

  setDroneCount(n) { this.numDrones=n; this.initDrones(); }
  setCohesion(v)   { this.cohesion=v; }
  setSeparation(v) { this.separation=v; }
  setAlignment(v)  { this.alignment=v; }
  clearObstacles() { this.obstacles=[]; }
  toggleObstacleMode() { this.addObstacleMode=!this.addObstacleMode; }

  initDrones() {
    this.drones=[];
    for(let i=0;i<this.numDrones;i++){
      this.drones.push({x:Math.random()*200+50,y:Math.random()*200+100,vx:(Math.random()-0.5)*2,vy:(Math.random()-0.5)*2,altitude:10+Math.sin(i)*5,phase:i*0.5});
    }
  }

  bindEvents() {
    this.canvas.addEventListener("click",(e)=>{
      const rect=this.canvas.getBoundingClientRect();
      const x=e.clientX-rect.left, y=e.clientY-rect.top;
      if(this.addObstacleMode) this.obstacles.push({x,y,radius:22+Math.random()*12});
      else { this.target.x=x; this.target.y=y; }
    });
  }

  update() {
    this.time+=0.04;
    const n=this.drones.length;
    this.drones.forEach((d,i)=>{
      // Cohesion toward target
      let gdx=this.target.x-d.x, gdy=this.target.y-d.y, gd=Math.hypot(gdx,gdy);
      if(gd>0){gdx/=gd;gdy/=gd;}
      // Separation from other drones
      let sdx=0, sdy=0;
      this.drones.forEach((o,j)=>{
        if(i===j) return;
        const dx=d.x-o.x, dy=d.y-o.y, dist=Math.hypot(dx,dy);
        if(dist<this.separation&&dist>0){sdx+=(dx/dist)*(1-dist/this.separation);sdy+=(dy/dist)*(1-dist/this.separation);}
      });
      // Alignment
      let avgVx=0,avgVy=0;
      this.drones.forEach((o,j)=>{if(i!==j){avgVx+=o.vx;avgVy+=o.vy;}});
      avgVx/=(n-1||1); avgVy/=(n-1||1);
      // Obstacle avoidance
      let obdx=0,obdy=0;
      this.obstacles.forEach(obs=>{
        const dx=d.x-obs.x,dy=d.y-obs.y,dist=Math.hypot(dx,dy),safe=obs.radius+35;
        if(dist<safe&&dist>0){const f=(safe-dist)/safe*3;obdx+=dx/dist*f;obdy+=dy/dist*f;}
      });
      d.vx+=gdx*this.cohesion+sdx*1.2+(avgVx-d.vx)*this.alignment+obdx;
      d.vy+=gdy*this.cohesion+sdy*1.2+(avgVy-d.vy)*this.alignment+obdy;
      const sp=Math.hypot(d.vx,d.vy); if(sp>3.5){d.vx=d.vx/sp*3.5;d.vy=d.vy/sp*3.5;}
      d.x+=d.vx; d.y+=d.vy;
      d.altitude=10+Math.sin(this.time+d.phase)*5;
      d.x=Math.max(10,Math.min(this.width-10,d.x)); d.y=Math.max(10,Math.min(this.height-10,d.y));
    });
  }

  draw() {
    const ctx=this.ctx;
    ctx.clearRect(0,0,this.width,this.height);
    ctx.strokeStyle="rgba(255,255,255,0.03)"; ctx.lineWidth=1;
    for(let x=0;x<this.width;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,this.height);ctx.stroke();}
    for(let y=0;y<this.height;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(this.width,y);ctx.stroke();}
    ctx.strokeStyle="#8b5cf6"; ctx.lineWidth=2; ctx.setLineDash([5,5]);
    ctx.beginPath(); ctx.arc(this.target.x,this.target.y,16,0,Math.PI*2); ctx.stroke(); ctx.setLineDash([]);
    this.obstacles.forEach(obs=>{
      ctx.fillStyle="rgba(239,68,68,0.25)"; ctx.strokeStyle="#ef4444"; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(obs.x,obs.y,obs.radius,0,Math.PI*2); ctx.fill(); ctx.stroke();
    });
    this.drones.forEach(d=>{
      const sr=Math.max(3,10-d.altitude*0.3);
      ctx.fillStyle="rgba(0,0,0,0.3)"; ctx.beginPath(); ctx.arc(d.x,d.y+d.altitude*0.8,sr,0,Math.PI*2); ctx.fill();
      ctx.save(); ctx.translate(d.x,d.y);
      ctx.strokeStyle="#00f2fe"; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(-10,-10); ctx.lineTo(10,10); ctx.moveTo(10,-10); ctx.lineTo(-10,10); ctx.stroke();
      ctx.fillStyle="rgba(139,92,246,0.8)";
      [[-10,-10],[10,-10],[-10,10],[10,10]].forEach(([rx,ry])=>{ctx.beginPath();ctx.arc(rx,ry,4,0,Math.PI*2);ctx.fill();});
      ctx.fillStyle="#10b981"; ctx.beginPath(); ctx.arc(0,0,3,0,Math.PI*2); ctx.fill();
      ctx.restore();
    });
    ctx.fillStyle="rgba(255,255,255,0.45)"; ctx.font="11px monospace";
    ctx.fillText(`${this.drones.length} Drones | Coh:${this.cohesion.toFixed(2)} Sep:${this.separation} Aln:${this.alignment.toFixed(2)}${this.addObstacleMode?" | [CLICK = OBSTACLE]":""}`, 8, 18);
  }

  loop() { this.update(); this.draw(); requestAnimationFrame(()=>this.loop()); }
}

// ── MODULE 6: Indoor Exploration — 2D LiDAR SLAM & Frontier vs Floodfill (ICCAS 2024) ──
class IndoorExplorationSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // Clean, lightweight grid for 100% stability and zero lag
    this.cols = 24;
    this.rows = 14;
    this.cellW = this.width / this.cols;
    this.cellH = this.height / this.rows;

    this.mapType = "phoenix";
    this.mode = "frontier";
    this.simSpeed = 1.5;
    this.isExploring = false;
    this.isPaused = false;
    this.completeness = 0;
    this.elapsedTime = 0;
    this.lidarRange = 110;
    this.lidarRays = 24;
    this.lidarSpinAngle = 0;

    this.robot = {
      x: 0,
      y: 0,
      r: 2,
      c: 2,
      targetR: 2,
      targetC: 2,
      heading: 0,
      radius: 9,
      isMoving: false,
      trail: [],
      plannedPath: []
    };

    this.trueGrid = [];
    this.knownGrid = [];
    this.frontiers = [];
    this.totalReachableCells = 1;

    this.initMap(this.mapType);
    this.loop();
  }

  resize() {
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellW = this.width / this.cols;
    this.cellH = this.height / this.rows;
    this.robot.x = (this.robot.c + 0.5) * this.cellW;
    this.robot.y = (this.robot.r + 0.5) * this.cellH;
    this.draw();
  }

  setMap(mapType) {
    this.mapType = mapType;
    this.isExploring = false;
    this.isPaused = false;
    this.initMap(mapType);
  }

  setMode(mode) {
    this.mode = mode;
    this.draw();
  }

  setSpeed(s) {
    this.simSpeed = Math.max(0.5, s);
    const l = document.getElementById("exploreSpeedLabel6");
    if (l) l.textContent = `${this.simSpeed.toFixed(1)}×`;
  }

  togglePause() {
    if (!this.isExploring) {
      this.startExploration();
      return;
    }
    this.isPaused = !this.isPaused;
    const isEn = typeof currentLang !== "undefined" && currentLang === "en";
    this.updateStatus(this.isPaused ? (isEn ? "PAUSED" : "DIJEDA (PAUSED)") : (isEn ? "EXPLORING & MAPPING" : "MENJELAJAH & MEMETAKAN"));
  }

  initMap(mapType) {
    this.isExploring = false;
    this.isPaused = false;
    this.elapsedTime = 0;
    this.robot.trail = [];
    this.robot.plannedPath = [];
    this.robot.isMoving = false;
    this.frontiers = [];

    // 1. Build Ground Truth Maze based on Paper Benchmarks (24x14)
    this.trueGrid = [];
    this.knownGrid = [];

    for (let r = 0; r < this.rows; r++) {
      const tRow = [], kRow = [];
      for (let c = 0; c < this.cols; c++) {
        let isWall = (r === 0 || r === this.rows - 1 || c === 0 || c === this.cols - 1);

        if (!isWall) {
          if (mapType === "phoenix") {
            // Phoenix World: Intricate maze
            if (c === 8 && (r < 5 || r > 8)) isWall = true;
            if (c === 15 && (r > 3 && r < 11)) isWall = true;
            if (r === 4 && ((c > 2 && c < 7) || (c > 9 && c < 14))) isWall = true;
            if (r === 9 && ((c > 4 && c < 12) || (c > 16 && c < 22))) isWall = true;
            if (c === 19 && (r > 2 && r < 8)) isWall = true;
          } else if (mapType === "complex_zee") {
            // Complex Zee: Long Z-shaped hallways
            if (r === 4 && c < 18) isWall = true;
            if (r === 9 && c > 5) isWall = true;
            if (c === 10 && (r > 4 && r < 9)) isWall = true;
            if (c === 16 && (r > 1 && r < 4)) isWall = true;
          } else if (mapType === "mememan") {
            // Mememan World: Curved room perimeter + central pillar
            const cx = this.cols / 2, cy = this.rows / 2;
            const dist = Math.hypot((c - cx) * 0.75, r - cy);
            if (dist > 6.2) isWall = true;
            if (Math.abs(r - cy) < 2 && Math.abs(c - cx) < 2) isWall = true;
          }
        }

        tRow.push(isWall ? 1 : 0);
        kRow.push(-1); // -1 = Unknown Fog-of-War
      }
      this.trueGrid.push(tRow);
      this.knownGrid.push(kRow);
    }

    // Set starting position
    this.robot.r = 2;
    this.robot.c = 2;
    this.robot.targetR = 2;
    this.robot.targetC = 2;
    this.trueGrid[this.robot.r][this.robot.c] = 0;
    this.robot.x = (this.robot.c + 0.5) * this.cellW;
    this.robot.y = (this.robot.r + 0.5) * this.cellH;
    this.robot.heading = 0;

    // Count reachable free cells
    let count = 0;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.trueGrid[r][c] === 0) count++;
      }
    }
    this.totalReachableCells = count || 1;

    // Initial 360 LiDAR scan
    this.performLiDARScan();
    const isEn = typeof currentLang !== "undefined" && currentLang === "en";
    this.updateStatus(isEn ? "READY" : "SIAP");
    this.draw();
  }

  startExploration() {
    if (this.completeness >= 95.0) this.initMap(this.mapType);
    this.isExploring = true;
    this.isPaused = false;
    const isEn = typeof currentLang !== "undefined" && currentLang === "en";
    this.updateStatus(isEn ? "EXPLORING & MAPPING" : "MENJELAJAH & MEMETAKAN");
  }

  performLiDARScan() {
    try {
      // 360 Ray-Casting to carve out Fog-of-War
      for (let i = 0; i < this.lidarRays; i++) {
        const angle = i * (Math.PI * 2 / this.lidarRays);
        for (let d = 0; d < this.lidarRange; d += 6) {
          const rx = this.robot.x + Math.cos(angle) * d;
          const ry = this.robot.y + Math.sin(angle) * d;
          const c = Math.floor(rx / this.cellW);
          const r = Math.floor(ry / this.cellH);

          if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) break;

          if (this.trueGrid[r][c] === 1) {
            this.knownGrid[r][c] = 100; // Wall
            break;
          } else {
            this.knownGrid[r][c] = 0;   // Free space
          }
        }
      }

      // Extract Frontiers (known free cells bordering unknown cells)
      this.frontiers = [];
      let discoveredFree = 0;

      for (let r = 1; r < this.rows - 1; r++) {
        for (let c = 1; c < this.cols - 1; c++) {
          if (this.knownGrid[r][c] === 0) {
            discoveredFree++;
            const hasUnknown = (
              this.knownGrid[r - 1][c] === -1 ||
              this.knownGrid[r + 1][c] === -1 ||
              this.knownGrid[r][c - 1] === -1 ||
              this.knownGrid[r][c + 1] === -1
            );
            if (hasUnknown) {
              this.frontiers.push({ r, c, x: (c + 0.5) * this.cellW, y: (r + 0.5) * this.cellH });
            }
          }
        }
      }

      // Calculate Map Completeness Percentage
      this.completeness = Math.min(100, (discoveredFree / this.totalReachableCells) * 100);

      const compEl = document.getElementById("exploreCompleteness6");
      const barEl = document.getElementById("exploreProgressBar6");
      const timerEl = document.getElementById("exploreTimer6");

      if (compEl) compEl.textContent = `${this.completeness.toFixed(1)}%`;
      if (barEl) barEl.style.width = `${this.completeness.toFixed(1)}%`;
      if (timerEl) timerEl.textContent = `${this.elapsedTime.toFixed(1)}s`;
    } catch (e) {
      console.warn("LiDAR scan notice:", e);
    }
  }

  findNextNavigationStep() {
    if (this.completeness >= 96.0 || this.frontiers.length === 0) {
      this.isExploring = false;
      const isEn = typeof currentLang !== "undefined" && currentLang === "en";
      this.updateStatus(isEn ? "100% EXPLORATION COMPLETE" : "EKSPLORASI SELESAI (100%)");
      return null;
    }

    const startR = this.robot.r;
    const startC = this.robot.c;

    // Fast, lightweight BFS through known free cells
    const queue = [{ r: startR, c: startC, path: [] }];
    const visited = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
    visited[startR][startC] = true;

    let bestGoalPath = null;

    while (queue.length > 0) {
      const curr = queue.shift();

      // Check if curr is a target frontier cell (or unexplored target in floodfill)
      const isTarget = this.mode === "frontier"
        ? this.frontiers.some(f => f.r === curr.r && f.c === curr.c && (curr.r !== startR || curr.c !== startC))
        : (curr.r !== startR || curr.c !== startC) && this.frontiers.some(f => f.r === curr.r && f.c === curr.c);

      if (isTarget) {
        bestGoalPath = curr.path;
        break;
      }

      const neighbors = [
        { r: curr.r - 1, c: curr.c },
        { r: curr.r + 1, c: curr.c },
        { r: curr.r, c: curr.c - 1 },
        { r: curr.r, c: curr.c + 1 }
      ];

      for (const n of neighbors) {
        if (n.r >= 0 && n.r < this.rows && n.c >= 0 && n.c < this.cols) {
          if (!visited[n.r][n.c] && this.knownGrid[n.r][n.c] === 0) {
            visited[n.r][n.c] = true;
            queue.push({
              r: n.r,
              c: n.c,
              path: curr.path.concat([{ r: n.r, c: n.c }])
            });
          }
        }
      }
    }

    if (bestGoalPath && bestGoalPath.length > 0) {
      this.robot.plannedPath = bestGoalPath;
      return bestGoalPath[0]; // Next adjacent step
    }

    // Fallback: Check immediate adjacent free neighbors
    const adj = [
      { r: startR - 1, c: startC }, { r: startR + 1, c: startC },
      { r: startR, c: startC - 1 }, { r: startR, c: startC + 1 }
    ];
    for (const a of adj) {
      if (a.r >= 0 && a.r < this.rows && a.c >= 0 && a.c < this.cols) {
        if (this.knownGrid[a.r][a.c] === 0) return a;
      }
    }

    // Finished
    this.isExploring = false;
    const isEn = typeof currentLang !== "undefined" && currentLang === "en";
    this.updateStatus(isEn ? "100% EXPLORATION COMPLETE" : "EKSPLORASI SELESAI (100%)");
    return null;
  }

  updateStatus(msg) {
    const el = document.getElementById("exploreStatus6");
    if (el) el.textContent = msg;
  }

  update() {
    this.lidarSpinAngle = (this.lidarSpinAngle + 0.16) % (Math.PI * 2);

    if (!this.isExploring || this.isPaused) return;

    this.elapsedTime += 0.016 * this.simSpeed;

    if (!this.robot.isMoving) {
      // Choose next adjacent navigation step
      const next = this.findNextNavigationStep();
      if (next) {
        this.robot.targetR = next.r;
        this.robot.targetC = next.c;
        this.robot.isMoving = true;
      }
    } else {
      // Smoothly move from current cell to target cell
      const targetX = (this.robot.targetC + 0.5) * this.cellW;
      const targetY = (this.robot.targetR + 0.5) * this.cellH;

      const dx = targetX - this.robot.x;
      const dy = targetY - this.robot.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 3.0) {
        // Arrived at target cell
        this.robot.r = this.robot.targetR;
        this.robot.c = this.robot.targetC;
        this.robot.x = targetX;
        this.robot.y = targetY;
        this.robot.trail.push({ x: targetX, y: targetY });
        if (this.robot.trail.length > 40) this.robot.trail.shift();

        this.robot.isMoving = false;
        this.performLiDARScan();
      } else {
        const step = Math.min(dist, 2.5 * this.simSpeed);
        this.robot.heading = Math.atan2(dy, dx);
        this.robot.x += (dx / dist) * step;
        this.robot.y += (dy / dist) * step;
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Dark Unknown Background
    ctx.fillStyle = "#040812";
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Explored Free Space & Discovered Walls
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const state = this.knownGrid[r][c];
        if (state === -1) continue;

        const x = c * this.cellW, y = r * this.cellH;

        if (state === 0) {
          ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
          ctx.fillRect(x, y, this.cellW, this.cellH);
          ctx.strokeStyle = "rgba(0, 242, 254, 0.08)";
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x, y, this.cellW, this.cellH);
        } else if (state === 100) {
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(x, y, this.cellW, this.cellH);
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, this.cellW, this.cellH);
        }
      }
    }

    // 3. Highlight Frontiers (Glowing Amber Dots)
    this.frontiers.forEach(f => {
      ctx.fillStyle = "rgba(245, 158, 11, 0.9)";
      ctx.beginPath();
      ctx.arc(f.x, f.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. Draw Planned Path
    if (this.robot.plannedPath && this.robot.plannedPath.length > 0) {
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(this.robot.x, this.robot.y);
      this.robot.plannedPath.forEach(pt => {
        ctx.lineTo((pt.c + 0.5) * this.cellW, (pt.r + 0.5) * this.cellH);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 5. Draw Robot Traversed Trail
    if (this.robot.trail.length > 1) {
      ctx.strokeStyle = "rgba(0, 242, 254, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      this.robot.trail.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
    }

    // 6. Draw 24 360 LiDAR Laser Scan Rays
    for (let i = 0; i < this.lidarRays; i++) {
      const angle = i * (Math.PI * 2 / this.lidarRays);
      let rayDist = this.lidarRange;

      for (let d = 4; d < this.lidarRange; d += 6) {
        const rx = this.robot.x + Math.cos(angle) * d;
        const ry = this.robot.y + Math.sin(angle) * d;
        const c = Math.floor(rx / this.cellW);
        const r = Math.floor(ry / this.cellH);

        if (r < 0 || r >= this.rows || c < 0 || c >= this.cols || this.trueGrid[r][c] === 1) {
          rayDist = d;
          break;
        }
      }

      const hx = this.robot.x + Math.cos(angle) * rayDist;
      const hy = this.robot.y + Math.sin(angle) * rayDist;

      ctx.strokeStyle = "rgba(0, 242, 254, 0.16)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(this.robot.x, this.robot.y);
      ctx.lineTo(hx, hy);
      ctx.stroke();

      ctx.fillStyle = "#00f2fe";
      ctx.beginPath();
      ctx.arc(hx, hy, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // 7. Draw Robot (TurtleBot Chassis + Spinning LiDAR)
    ctx.save();
    ctx.translate(this.robot.x, this.robot.y);
    ctx.rotate(this.robot.heading);

    // Chassis
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(0, 0, this.robot.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Direction arrow
    ctx.fillStyle = "#00f2fe";
    ctx.beginPath();
    ctx.moveTo(this.robot.radius + 3, 0);
    ctx.lineTo(this.robot.radius - 4, -3.5);
    ctx.lineTo(this.robot.radius - 4, 3.5);
    ctx.closePath();
    ctx.fill();

    // Spinning LiDAR Turret Dome
    ctx.rotate(this.lidarSpinAngle - this.robot.heading);
    ctx.fillStyle = "#090d16";
    ctx.beginPath();
    ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.restore();
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}


// ── MODULE 7: LiDAR SLAM + TurtleBot / Auto-Navigation Control ───────────────
class LiDARSLAMSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // Polar Radar Canvas for Robot Point-of-View
    this.polarCanvas = document.getElementById("canvasLidarPolar");
    this.polarCtx = this.polarCanvas ? this.polarCanvas.getContext("2d") : null;

    // Robot state (chassis heading distinct from spinning LiDAR sensor)
    this.robot = {
      x: this.width * 0.22,
      y: this.height * 0.50,
      heading: 0,       // Orientation of robot body (chassis)
      radius: 12
    };

    this.targetMouse = { x: this.robot.x, y: this.robot.y };
    this.lidarSpinAngle = 0; // Spinning laser turret angle
    this.rays = 72;          // High-resolution 360 LiDAR rays
    this.maxRange = 240;     // Max scan range in pixels
    this.scanData = [];
    this.ctrlMode = "mouse";
    this.linearSpeed = 2.2;
    this.rotSpeed = 0.045;
    this.keys = { w: false, s: false, a: false, d: false, q: false, e: false };

    this.initRoomObstacles();
    this.bindEvents();
    this.loop();
  }

  resize() {
    resizeCanvasToWrapper(this.canvas);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.initRoomObstacles();
  }

  initRoomObstacles() {
    const w = this.width, h = this.height;
    // Realistic Indoor Room Floorplan: Outer Walls, Partitions, Doors, Pillars, Desks
    this.obstacles = [
      // Outer boundary walls (thickness 8px)
      { x: 8, y: 8, w: w - 16, h: 8 },                 // Top wall
      { x: 8, y: h - 16, w: w - 16, h: 8 },             // Bottom wall
      { x: 8, y: 8, w: 8, h: h - 16 },                 // Left wall
      { x: w - 16, y: 8, w: 8, h: h - 16 },             // Right wall

      // Room 1 Partition (Control Room - Left) with doorway opening
      { x: w * 0.34, y: 8, w: 8, h: h * 0.38 },         // Top partition
      { x: w * 0.34, y: h * 0.58, w: 8, h: h * 0.40 },  // Bottom partition (Doorway in between)

      // Room 2 Partition (Lab / Office - Right) with doorway
      { x: w * 0.68, y: 8, w: 8, h: h * 0.48 },         // Divider
      { x: w * 0.68, y: h * 0.68, w: w * 0.30, h: 8 },  // Horizontal divider

      // Concrete Columns / Structural Pillars
      { x: w * 0.18, y: h * 0.72, w: 20, h: 20 },
      { x: w * 0.52, y: h * 0.28, w: 20, h: 20 },

      // Equipment Desks / Server Racks
      { x: w * 0.80, y: h * 0.25, w: 38, h: 22 },
      { x: w * 0.12, y: h * 0.25, w: 30, h: 30 }
    ];

    // Room Label Coordinates for blueprint aesthetic
    this.roomLabels = [
      { name: "OFFICE LAB 1", x: w * 0.16, y: h * 0.18 },
      { name: "CENTRAL CORRIDOR", x: w * 0.51, y: h * 0.54 },
      { name: "RESEARCH ROOM 2", x: w * 0.82, y: h * 0.16 },
      { name: "STORAGE BAY", x: w * 0.82, y: h * 0.84 }
    ];
  }

  setMode(mode) {
    this.ctrlMode = mode;
    this.keys = { w: false, s: false, a: false, d: false, q: false, e: false };
    this.targetMouse.x = this.robot.x;
    this.targetMouse.y = this.robot.y;
  }

  resetPosition(customX, customY) {
    const defaultX = this.width * 0.22;
    const defaultY = this.height * 0.50;
    const targetX = (customX !== undefined) ? customX : defaultX;
    const targetY = (customY !== undefined) ? customY : defaultY;

    if (!this.checkWallCollision(targetX, targetY, this.robot.radius + 2)) {
      this.robot.x = targetX;
      this.robot.y = targetY;
    } else {
      this.robot.x = defaultX;
      this.robot.y = defaultY;
    }

    this.robot.heading = 0;
    this.targetMouse.x = this.robot.x;
    this.targetMouse.y = this.robot.y;
    this.keys = { w: false, s: false, a: false, d: false, q: false, e: false };
    this.resolveWallStuck();
  }

  resolveWallStuck() {
    if (this.checkWallCollision(this.robot.x, this.robot.y, this.robot.radius)) {
      for (let r = 5; r <= 80; r += 5) {
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
          const testX = this.robot.x + Math.cos(a) * r;
          const testY = this.robot.y + Math.sin(a) * r;
          if (testX > 20 && testX < this.width - 20 && testY > 20 && testY < this.height - 20) {
            if (!this.checkWallCollision(testX, testY, this.robot.radius + 2)) {
              this.robot.x = testX;
              this.robot.y = testY;
              return;
            }
          }
        }
      }
    }
  }

  bindEvents() {
    this.canvas.addEventListener("mousemove", (e) => {
      if (this.ctrlMode !== "mouse") return;
      const rect = this.canvas.getBoundingClientRect();
      this.targetMouse.x = e.clientX - rect.left;
      this.targetMouse.y = e.clientY - rect.top;
    });

    // Click canvas to immediately reposition/teleport robot if not inside wall
    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      if (!this.checkWallCollision(clickX, clickY, this.robot.radius + 2)) {
        this.robot.x = clickX;
        this.robot.y = clickY;
        this.targetMouse.x = clickX;
        this.targetMouse.y = clickY;
      }
    });

    document.addEventListener("keydown", (e) => {
      if (this.ctrlMode !== "wasd") return;
      const k = e.key.toLowerCase();
      if (["w", "a", "s", "d", "q", "e"].includes(k)) { this.keys[k] = true; e.preventDefault(); }
      if (e.key === "ArrowUp") { this.keys.w = true; e.preventDefault(); }
      if (e.key === "ArrowDown") { this.keys.s = true; e.preventDefault(); }
      if (e.key === "ArrowLeft") { this.keys.a = true; e.preventDefault(); }
      if (e.key === "ArrowRight") { this.keys.d = true; e.preventDefault(); }
    });

    document.addEventListener("keyup", (e) => {
      const k = e.key.toLowerCase();
      if (["w", "a", "s", "d", "q", "e"].includes(k)) this.keys[k] = false;
      if (e.key === "ArrowUp") this.keys.w = false;
      if (e.key === "ArrowDown") this.keys.s = false;
      if (e.key === "ArrowLeft") this.keys.a = false;
      if (e.key === "ArrowRight") this.keys.d = false;
    });
  }

  checkWallCollision(x, y, radius) {
    for (let i = 0; i < this.obstacles.length; i++) {
      const obs = this.obstacles[i];
      const closestX = Math.max(obs.x, Math.min(x, obs.x + obs.w));
      const closestY = Math.max(obs.y, Math.min(y, obs.y + obs.h));
      const dist = Math.hypot(x - closestX, y - closestY);
      if (dist < radius) return true;
    }
    return false;
  }

  moveForward(dir, speed = this.linearSpeed) {
    const nx = this.robot.x + Math.cos(this.robot.heading) * speed * dir;
    const ny = this.robot.y + Math.sin(this.robot.heading) * speed * dir;
    if (!this.checkWallCollision(nx, ny, this.robot.radius + 2)) {
      this.robot.x = nx;
      this.robot.y = ny;
    }
  }

  update() {
    // 1. Update spinning LiDAR turret (continuous 360 scan)
    this.lidarSpinAngle = (this.lidarSpinAngle + 0.16) % (Math.PI * 2);

    // 2. Robot body movement according to control mode (ROBOT DOES NOT SPIN UNLESS STEERED)
    if (this.ctrlMode === "mouse") {
      const dx = this.targetMouse.x - this.robot.x;
      const dy = this.targetMouse.y - this.robot.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 8) {
        const targetHeading = Math.atan2(dy, dx);
        let hDiff = targetHeading - this.robot.heading;
        while (hDiff > Math.PI) hDiff -= 2 * Math.PI;
        while (hDiff < -Math.PI) hDiff += 2 * Math.PI;
        this.robot.heading += hDiff * 0.12; // Smooth rotation to face movement direction
        this.moveForward(1, Math.min(dist * 0.08, 2.4));
      }
    } else if (this.ctrlMode === "wasd") {
      if (this.keys.w) this.moveForward(1, 2.2);
      if (this.keys.s) this.moveForward(-1, 1.6);
      if (this.keys.a || this.keys.q) this.robot.heading -= this.rotSpeed;
      if (this.keys.d || this.keys.e) this.robot.heading += this.rotSpeed;
    } else if (this.ctrlMode === "auto") {
      // Reactive Navigation: analyze front, left, and right LiDAR clearance
      const getSectorMin = (minAngle, maxAngle) => {
        const matching = this.scanData.filter(r => {
          let diff = r.angle - this.robot.heading;
          while (diff > Math.PI) diff -= 2 * Math.PI;
          while (diff < -Math.PI) diff += 2 * Math.PI;
          return diff >= minAngle && diff <= maxAngle;
        });
        return matching.length > 0 ? Math.min(...matching.map(r => r.dist)) : this.maxRange;
      };

      const frontDist = getSectorMin(-0.45, 0.45);
      const leftDist  = getSectorMin(-1.40, -0.45);
      const rightDist = getSectorMin(0.45, 1.40);

      if (frontDist < 65) {
        // Steer away toward side with maximum clearance
        const steerDir = leftDist > rightDist ? -this.rotSpeed * 1.5 : this.rotSpeed * 1.5;
        this.robot.heading += steerDir;
        if (frontDist > 30) this.moveForward(1, 0.8);
      } else {
        this.moveForward(1, 1.8);
      }
    }

    // Keep heading normalized [-PI, PI]
    while (this.robot.heading > Math.PI) this.robot.heading -= 2 * Math.PI;
    while (this.robot.heading < -Math.PI) this.robot.heading += 2 * Math.PI;

    // Resolve any collision clipping
    this.resolveWallStuck();

    // 3. 360-Degree LiDAR Ray Casting against all room walls and obstacles
    this.scanData = [];
    for (let i = 0; i < this.rays; i++) {
      const rayAngle = (i * (Math.PI * 2 / this.rays));
      let rayDist = this.maxRange;

      // Fast ray marching
      for (let d = 4; d <= this.maxRange; d += 3.5) {
        const rx = this.robot.x + Math.cos(rayAngle) * d;
        const ry = this.robot.y + Math.sin(rayAngle) * d;

        let hit = false;
        for (let j = 0; j < this.obstacles.length; j++) {
          const obs = this.obstacles[j];
          if (rx >= obs.x && rx <= obs.x + obs.w && ry >= obs.y && ry <= obs.y + obs.h) {
            hit = true;
            break;
          }
        }
        if (hit) {
          rayDist = d;
          break;
        }
      }

      // Compute angle relative to robot body heading (for on-board robot view)
      let relAngle = rayAngle - this.robot.heading;
      while (relAngle > Math.PI) relAngle -= 2 * Math.PI;
      while (relAngle < -Math.PI) relAngle += 2 * Math.PI;

      this.scanData.push({
        angle: rayAngle,
        dist: rayDist,
        relAngle: relAngle
      });
    }

    // 4. Update HUD and Sensor Metrics
    this.updateHUDAndMetrics();
  }

  updateHUDAndMetrics() {
    const hudX = document.getElementById("lidarX"), hudY = document.getElementById("lidarY");
    const hudH = document.getElementById("lidarHeading"), hudM = document.getElementById("lidarMode");
    if (hudX) hudX.textContent = Math.round(this.robot.x);
    if (hudY) hudY.textContent = Math.round(this.robot.y);
    if (hudH) hudH.textContent = `${(((this.robot.heading * 180 / Math.PI) % 360 + 360) % 360).toFixed(0)}°`;
    if (hudM) hudM.textContent = this.ctrlMode.toUpperCase();

    // Helper for relative sector distance in meters (1 px = 0.02m scale)
    const getRelAvg = (minA, maxA) => {
      const subset = this.scanData.filter(r => r.relAngle >= minA && r.relAngle <= maxA);
      if (subset.length === 0) return "--";
      const avg = subset.reduce((acc, r) => acc + r.dist, 0) / subset.length;
      return (avg * 0.02).toFixed(2) + " m";
    };

    const dF = document.getElementById("lidarDistF");
    const dL = document.getElementById("lidarDistL");
    const dR = document.getElementById("lidarDistR");
    const dB = document.getElementById("lidarDistB");

    if (dF) dF.textContent = getRelAvg(-0.35, 0.35);
    if (dL) dL.textContent = getRelAvg(-1.85, -1.25);
    if (dR) dR.textContent = getRelAvg(1.25, 1.85);
    if (dB) dB.textContent = getRelAvg(2.70, 3.14) || getRelAvg(-3.14, -2.70);
  }

  draw() {
    // 1. Draw World Room Canvas
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Blueprint grid background
    ctx.strokeStyle = "rgba(0, 242, 254, 0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, this.height); ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(this.width, y); ctx.stroke();
    }

    // Room Blueprint Labels
    ctx.fillStyle = "rgba(0, 242, 254, 0.15)";
    ctx.font = "bold 9px monospace";
    this.roomLabels.forEach(lbl => ctx.fillText(lbl.name, lbl.x, lbl.y));

    // Draw Room Walls and Furniture
    this.obstacles.forEach(o => {
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(o.x, o.y, o.w, o.h);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.2;
      ctx.strokeRect(o.x, o.y, o.w, o.h);
    });

    // Draw 360 LiDAR Laser Rays (Cyan / Emerald beam lines)
    this.scanData.forEach(ray => {
      const hx = this.robot.x + Math.cos(ray.angle) * ray.dist;
      const hy = this.robot.y + Math.sin(ray.angle) * ray.dist;
      ctx.strokeStyle = "rgba(0, 242, 254, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(this.robot.x, this.robot.y);
      ctx.lineTo(hx, hy);
      ctx.stroke();

      // Return point hit on wall
      ctx.fillStyle = "#00f2fe";
      ctx.beginPath();
      ctx.arc(hx, hy, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Robot Body (TurtleBot Chassis) facing this.robot.heading
    ctx.save();
    ctx.translate(this.robot.x, this.robot.y);
    ctx.rotate(this.robot.heading);

    // Left and Right Drive Wheels
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(-6, -this.robot.radius - 3, 12, 4);
    ctx.fillRect(-6, this.robot.radius - 1, 12, 4);

    // Robot Main Chassis Circle
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(0, 0, this.robot.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Front Direction Pointer Arrow (Chassis Heading)
    ctx.fillStyle = "#00f2fe";
    ctx.beginPath();
    ctx.moveTo(this.robot.radius + 3, 0);
    ctx.lineTo(this.robot.radius - 5, -4);
    ctx.lineTo(this.robot.radius - 5, 4);
    ctx.closePath();
    ctx.fill();

    // Spinning LiDAR Turret Dome on top of robot (Spins 360 without spinning robot body!)
    ctx.rotate(this.lidarSpinAngle - this.robot.heading);
    ctx.fillStyle = "#090d16";
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Laser Emitter Diode (Spinning beam indicator)
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(4, 0, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // 2. Draw Onboard LiDAR Polar Radar Scope Preview (Robot Point of View)
    this.drawPolarScope();
  }

  drawPolarScope() {
    if (!this.polarCtx || !this.polarCanvas) return;
    const pctx = this.polarCtx;
    const cw = this.polarCanvas.width, ch = this.polarCanvas.height;
    const cx = cw / 2, cy = ch / 2, maxR = cx - 12;

    pctx.clearRect(0, 0, cw, ch);

    // Polar Grid Background Rings
    pctx.lineWidth = 1;
    [0.25, 0.50, 0.75, 1.0].forEach((ratio, idx) => {
      const r = maxR * ratio;
      pctx.strokeStyle = "rgba(0, 242, 254, 0.18)";
      pctx.beginPath();
      pctx.arc(cx, cy, r, 0, Math.PI * 2);
      pctx.stroke();

      pctx.fillStyle = "rgba(0, 242, 254, 0.4)";
      pctx.font = "8px monospace";
      pctx.fillText(`${(ratio * 4.8).toFixed(1)}m`, cx + 3, cy - r + 9);
    });

    // Azimuth Crosshair Axes
    pctx.strokeStyle = "rgba(0, 242, 254, 0.25)";
    pctx.beginPath();
    pctx.moveTo(cx, 8); pctx.lineTo(cx, ch - 8);
    pctx.moveTo(8, cy); pctx.lineTo(cw - 8, cy);
    pctx.stroke();

    // Azimuth Direction Labels (FWD, LEFT, RIGHT, BACK relative to Robot Chassis)
    pctx.fillStyle = "#00f2fe";
    pctx.font = "bold 8px monospace";
    pctx.fillText("FWD", cx - 7, 10);
    pctx.fillText("BACK", cx - 10, ch - 2);
    pctx.fillText("L", 2, cy + 3);
    pctx.fillText("R", cw - 8, cy + 3);

    // Sweeping Radar Beam (Angle in Polar relative frame)
    const sweepRelAngle = this.lidarSpinAngle - this.robot.heading;
    pctx.save();
    pctx.translate(cx, cy);
    pctx.rotate(sweepRelAngle - Math.PI / 2);
    const grad = pctx.createRadialGradient(0, 0, 0, 0, 0, maxR);
    grad.addColorStop(0, "rgba(0, 242, 254, 0.35)");
    grad.addColorStop(1, "rgba(0, 242, 254, 0.0)");
    pctx.fillStyle = grad;
    pctx.beginPath();
    pctx.moveTo(0, 0);
    pctx.arc(0, 0, maxR, -0.2, 0.2);
    pctx.closePath();
    pctx.fill();
    pctx.restore();

    // Plot Point Cloud Returns in Polar Coordinates relative to Robot Front
    this.scanData.forEach(ray => {
      const r = (ray.dist / this.maxRange) * maxR;
      // relAngle: 0 = FWD (Up in canvas: y-axis negative)
      const px = cx + r * Math.sin(ray.relAngle);
      const py = cy - r * Math.cos(ray.relAngle);

      pctx.fillStyle = ray.dist < 80 ? "#ef4444" : "#10b981";
      pctx.beginPath();
      pctx.arc(px, py, 2.2, 0, Math.PI * 2);
      pctx.fill();
    });

    // Center Robot Icon in Scope
    pctx.fillStyle = "#f59e0b";
    pctx.beginPath();
    pctx.arc(cx, cy, 4, 0, Math.PI * 2);
    pctx.fill();
    pctx.strokeStyle = "#fff";
    pctx.lineWidth = 1.5;
    pctx.beginPath();
    pctx.moveTo(cx, cy);
    pctx.lineTo(cx, cy - 8);
    pctx.stroke();
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}


// ============================================================
// INITIALIZATION — Wire all controls on DOMContentLoaded
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

  // ── Tab switching ─────────────────────────────────────────
  const tabBtns = document.querySelectorAll(".proj-filter-tags .filter-btn[data-tab]");
  const tabContents = document.querySelectorAll(".sim-tab-content");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(tc => { tc.classList.remove("active"); tc.style.display = "none"; });
      btn.classList.add("active");
      const el = document.getElementById(btn.dataset.tab);
      if (el) { el.classList.add("active"); el.style.display = "block"; window.dispatchEvent(new Event("resize")); }
    });
  });
  const firstTab = document.getElementById("tab1");
  if (firstTab) { firstTab.classList.add("active"); firstTab.style.display = "block"; }

  // ── MODULE 1: Fuzzy PID DDMR ─────────────────────────────
  const sim1 = new ICCASPIDDDMRSimulation("canvasSim1");

  // Trajectory Control Mode
  const setSim1MotionMode = (mode) => {
    sim1?.setMotionMode(mode);
    document.querySelectorAll(".sim-traj-btn1").forEach(b => {
      b.className = "btn btn-outline btn-sm sim-traj-btn1";
    });
    const activeBtn = document.getElementById(`btnMode${mode.charAt(0).toUpperCase() + mode.slice(1)}1`);
    if (activeBtn) activeBtn.className = "btn btn-primary btn-sm sim-traj-btn1";
  };
  document.getElementById("btnModeManual1")?.addEventListener("click", () => setSim1MotionMode("manual"));
  document.getElementById("btnModeLemniscate1")?.addEventListener("click", () => setSim1MotionMode("lemniscate"));
  document.getElementById("btnModeCircular1")?.addEventListener("click", () => setSim1MotionMode("circular"));

  // Formation Switcher
  document.querySelectorAll(".sim-form-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".sim-form-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      sim1?.setFormation(btn.dataset.form);
    });
  });

  // Action Buttons
  document.getElementById("btnResetSim1")?.addEventListener("click", () => sim1?.reset());
  document.getElementById("btnToggleObstacle1")?.addEventListener("click", () => sim1?.addObstacle());
  document.getElementById("btnClearObstacles1")?.addEventListener("click", () => sim1?.clearObstacles());

  // ── MODULE 2: Math Model + PID ────────────────────────────
  const sim2 = new MathModelSimulation("canvasSim2");

  if (typeof katex !== "undefined") {
    const f1 = document.getElementById("katexFormula1"), f2 = document.getElementById("katexFormula2");
    if (f1) katex.render("v = \\frac{r}{2}(\\omega_r + \\omega_l), \\quad \\omega = \\frac{r}{L}(\\omega_r - \\omega_l)", f1, { throwOnError: false, displayMode: true });
    if (f2) katex.render("\\dot{x} = v\\cos\\theta, \\quad \\dot{y} = v\\sin\\theta, \\quad \\dot{\\theta} = \\omega", f2, { throwOnError: false, displayMode: true });
  }

  const panelOL = document.getElementById("panelOpenLoop2"), panelPID = document.getElementById("panelPID2");
  const btnOL = document.getElementById("btnModeOpenLoop2"), btnPID = document.getElementById("btnModePID2");

  btnOL?.addEventListener("click", () => {
    sim2?.setSimMode("openloop");
    if (panelOL) panelOL.style.display = "flex"; if (panelPID) panelPID.style.display = "none";
    btnOL.className = "btn btn-primary btn-sm"; if (btnPID) btnPID.className = "btn btn-outline btn-sm";
  });
  btnPID?.addEventListener("click", () => {
    sim2?.setSimMode("pid");
    if (panelOL) panelOL.style.display = "none"; if (panelPID) panelPID.style.display = "block";
    if (btnPID) btnPID.className = "btn btn-primary btn-sm"; if (btnOL) btnOL.className = "btn btn-outline btn-sm";
  });

  const slWr = document.getElementById("sliderWr"), slWl = document.getElementById("sliderWl");
  const updateWheels = () => {
    const wr = (parseInt(slWr?.value||60)/10)+0.1, wl = (parseInt(slWl?.value||40)/10)+0.1;
    sim2?.setWheelVelocities(wr, wl);
    const wrL = document.getElementById("wrLabel"), wlL = document.getElementById("wlLabel");
    if (wrL) wrL.textContent = wr.toFixed(1); if (wlL) wlL.textContent = wl.toFixed(1);
  };
  slWr?.addEventListener("input", updateWheels); slWl?.addEventListener("input", updateWheels); updateWheels();

  const slKp = document.getElementById("sliderKp"), slKi = document.getElementById("sliderKi"), slKd = document.getElementById("sliderKd");
  const updatePID = () => {
    const kp = parseInt(slKp?.value||25)/10, ki = parseInt(slKi?.value||1)/100, kd = parseInt(slKd?.value||8)/10;
    sim2?.setPIDGains(kp, ki, kd);
    const kpL = document.getElementById("kpLabel"), kiL = document.getElementById("kiLabel"), kdL = document.getElementById("kdLabel");
    if (kpL) kpL.textContent = kp.toFixed(1); if (kiL) kiL.textContent = ki.toFixed(2); if (kdL) kdL.textContent = kd.toFixed(1);
  };
  slKp?.addEventListener("input", updatePID); slKi?.addEventListener("input", updatePID); slKd?.addEventListener("input", updatePID);
  document.getElementById("selectTrajType")?.addEventListener("change", e => sim2?.setTrajectoryType(e.target.value));
  document.getElementById("btnResetSim2")?.addEventListener("click", () => sim2?.resetTrajectory());
  document.getElementById("btnResetPID2")?.addEventListener("click", () => sim2?.resetTrajectory());

  // ── MODULE 3: Path vs Trajectory ─────────────────────────
  const sim3 = new TrackingComparisonSimulation("canvasSim3");

  if (typeof katex !== "undefined") {
    const kp3 = document.getElementById("katexPath3"), kt3 = document.getElementById("katexTraj3");
    if (kp3) katex.render("e_{cross}(t) = (y_{ref} - y)\\cos\\theta - (x_{ref} - x)\\sin\\theta", kp3, { throwOnError: false, displayMode: true });
    if (kt3) katex.render("\\mathbf{e}(t) = \\begin{bmatrix}x_{ref}(t)-x(t)\\\\y_{ref}(t)-y(t)\\end{bmatrix}, \\quad t_k \\in [0,T]", kt3, { throwOnError: false, displayMode: true });
  }

  document.getElementById("radioPath3")?.addEventListener("change", () => {
    sim3?.setMode("path");
    document.getElementById("katexPath3").style.display="block";
    document.getElementById("katexTraj3").style.display="none";
  });
  document.getElementById("radioTraj3")?.addEventListener("change", () => {
    sim3?.setMode("trajectory");
    document.getElementById("katexPath3").style.display="none";
    document.getElementById("katexTraj3").style.display="block";
  });

  const sX3 = document.getElementById("startX3"), sY3 = document.getElementById("startY3");
  const updateStart3 = () => {
    const x = parseInt(sX3?.value||50), oY = parseInt(sY3?.value||0);
    sim3?.setStartPosition(x, oY);
    const lX = document.getElementById("startX3Label"), lY = document.getElementById("startY3Label");
    if (lX) lX.textContent = x; if (lY) lY.textContent = oY >= 0 ? `+${oY}` : `${oY}`;
  };
  sX3?.addEventListener("input", updateStart3); sY3?.addEventListener("input", updateStart3);

  const sp3 = document.getElementById("speed3");
  sp3?.addEventListener("input", () => {
    const s = parseInt(sp3.value)/10;
    sim3?.setSimSpeed(s);
    const l = document.getElementById("speed3Label");
    if (l) l.textContent = `${s.toFixed(1)}×`;
  });
  document.getElementById("btnResetSim3")?.addEventListener("click", () => {
    sim3?.setMode(sim3.mode);
    const tEl = document.getElementById("timer3Label"); if (tEl) tEl.textContent = "0.0s";
  });

  // ── MODULE 4: Vision Follower ─────────────────────────────
  const sim4 = new OpenCVVisionSimulation("canvasSim4");

  // ── MODULE 5: Drone Swarm ─────────────────────────────────
  const sim5 = new DroneSwarmSimulation("canvasSim5");

  const slDC = document.getElementById("sliderDroneCount");
  const slCo = document.getElementById("sliderCohesion");
  const slSe = document.getElementById("sliderSeparation");
  const slAl = document.getElementById("sliderAlignment");

  const lbl = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  slDC?.addEventListener("input", () => lbl("droneCountLabel", slDC.value));
  slCo?.addEventListener("input", () => lbl("cohesionLabel",  (parseInt(slCo.value)/100).toFixed(2)));
  slSe?.addEventListener("input", () => lbl("separationLabel", slSe.value));
  slAl?.addEventListener("input", () => lbl("alignmentLabel", (parseInt(slAl.value)/100).toFixed(2)));

  document.getElementById("btnApplyDrone5")?.addEventListener("click", () => {
    sim5?.setDroneCount(parseInt(slDC?.value||12));
    sim5?.setCohesion(parseInt(slCo?.value||30)/100);
    sim5?.setSeparation(parseInt(slSe?.value||40));
    sim5?.setAlignment(parseInt(slAl?.value||20)/100);
  });
  document.getElementById("btnAddObstacle5")?.addEventListener("click", () => {
    sim5?.toggleObstacleMode();
    const btn = document.getElementById("btnAddObstacle5");
    if (btn) btn.innerHTML = sim5?.addObstacleMode
      ? '<i class="fa fa-crosshairs"></i> Klik Canvas = Obstacle'
      : '<i class="fa fa-plus-circle"></i> Tambah Obstacle';
  });
  document.getElementById("btnClearObstacles5")?.addEventListener("click", () => sim5?.clearObstacles());

  // ── MODULE 6: Indoor Exploration (2D LiDAR SLAM & Frontier vs Floodfill) ──
  const sim6 = new IndoorExplorationSimulation("canvasSim6");

  document.getElementById("selectExploreMap6")?.addEventListener("change", (e) => {
    sim6?.setMap(e.target.value);
  });

  document.getElementById("radioFrontier6")?.addEventListener("change", () => sim6?.setMode("frontier"));
  document.getElementById("radioFloodfill6")?.addEventListener("change", () => sim6?.setMode("floodfill"));

  const slSp6 = document.getElementById("sliderExploreSpeed6");
  slSp6?.addEventListener("input", () => {
    const s = parseInt(slSp6.value) / 10;
    sim6?.setSpeed(s);
  });

  document.getElementById("btnStartExplore6")?.addEventListener("click", () => {
    sim6?.startExploration();
  });
  document.getElementById("btnPauseExplore6")?.addEventListener("click", () => {
    sim6?.togglePause();
  });
  document.getElementById("btnResetExplore6")?.addEventListener("click", () => {
    sim6?.initMap(sim6.mapType);
  });

  // ── MODULE 7: LiDAR SLAM ──────────────────────────────────
  const sim7 = new LiDARSLAMSimulation("canvasSim7");

  const setLidarMode = (mode) => {
    sim7?.setMode(mode);
    document.querySelectorAll(".sim-mode-btn").forEach(b => {
      b.className = "btn btn-outline btn-sm sim-mode-btn";
    });
    const activeBtn = document.getElementById(`btnMode${mode.charAt(0).toUpperCase()+mode.slice(1)}7`);
    if (activeBtn) activeBtn.className = "btn btn-primary btn-sm sim-mode-btn";
    const pad = document.getElementById("turtlebotPad");
    const autoInfo = document.getElementById("autoNavInfo");
    if (pad) pad.style.display = mode === "wasd" ? "block" : "none";
    if (autoInfo) autoInfo.style.display = mode === "auto" ? "block" : "none";
  };
  document.getElementById("btnModeMouse7")?.addEventListener("click", () => setLidarMode("mouse"));
  document.getElementById("btnModeWASD7")?.addEventListener("click", () => setLidarMode("wasd"));
  document.getElementById("btnModeAuto7")?.addEventListener("click", () => setLidarMode("auto"));

  // TurtleBot pad — hold-to-repeat buttons
  const addHoldBtn = (id, action) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    let iv = null;
    const go = () => { if (!sim7 || sim7.ctrlMode !== "wasd") return; action(); };
    const stop = () => { clearInterval(iv); iv = null; };
    btn.addEventListener("mousedown", () => { go(); iv = setInterval(go, 50); });
    btn.addEventListener("touchstart", e => { e.preventDefault(); go(); iv = setInterval(go, 50); }, { passive: false });
    btn.addEventListener("mouseup", stop); btn.addEventListener("mouseleave", stop); btn.addEventListener("touchend", stop);
  };
  addHoldBtn("wasdFwd",   () => sim7?.moveForward(1));
  addHoldBtn("wasdBack",  () => sim7?.moveForward(-1));
  addHoldBtn("wasdLeft",  () => { if(sim7) sim7.robot.angle -= 0.07; });
  addHoldBtn("wasdRight", () => { if(sim7) sim7.robot.angle += 0.07; });
  addHoldBtn("wasdRotL",  () => { if(sim7) sim7.robot.angle -= 0.09; });
  addHoldBtn("wasdRotR",  () => { if(sim7) sim7.robot.angle += 0.09; });
  document.getElementById("wasdStop")?.addEventListener("click", () => {
    if (sim7) sim7.keys = { w:false,s:false,a:false,d:false,q:false,e:false };
  });

  // Reset Position Button
  document.getElementById("btnResetLidarPos7")?.addEventListener("click", () => {
    sim7?.resetPosition();
  });

  // Set first mode button active
  const firstModeBtn = document.getElementById("btnModeMouse7");
  if (firstModeBtn) firstModeBtn.className = "btn btn-primary btn-sm sim-mode-btn";

  // ── Global resize ─────────────────────────────────────────
  window.addEventListener("resize", () => {
    [sim1, sim2, sim3, sim4, sim5, sim7].forEach(sim => {
      if (sim && typeof sim.resize === "function") sim.resize();
    });
    if (sim6 && typeof sim6.resize === "function") sim6.resize();
  });

});
