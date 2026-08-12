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
    this.leader = {
      x: this.width * 0.35, y: this.height * 0.5,
      targetX: this.width * 0.65, targetY: this.height * 0.5,
      angle: 0, speed: 2.2, radius: 14
    };
    this.followers = [
      { x: this.leader.x - 40, y: this.leader.y - 40, angle: 0, radius: 10, color: "#00f2fe" },
      { x: this.leader.x - 40, y: this.leader.y + 40, angle: 0, radius: 10, color: "#4facfe" },
      { x: this.leader.x - 70, y: this.leader.y,       angle: 0, radius: 10, color: "#8b5cf6" }
    ];
    this.obstacles = [
      { x: this.width * 0.5, y: this.height * 0.35, radius: 25 },
      { x: this.width * 0.5, y: this.height * 0.65, radius: 22 }
    ];
    this.kp = 0.12;
    this.bindEvents();
    this.loop();
  }

  resize() { resizeCanvasToWrapper(this.canvas); this.width = this.canvas.width; this.height = this.canvas.height; }

  bindEvents() {
    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.leader.targetX = e.clientX - rect.left;
      this.leader.targetY = e.clientY - rect.top;
    });
  }

  setFormation(type) { this.formation = type; }

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
    this.leader.x = this.width * 0.3; this.leader.y = this.height * 0.5;
    this.leader.targetX = this.width * 0.7; this.leader.targetY = this.height * 0.5;
  }

  getFormationOffsets() {
    const dist = 45;
    if (this.formation === "triangle") return [
      { dx: -dist, dy: -dist * 0.8 }, { dx: -dist, dy: dist * 0.8 }, { dx: -dist * 1.7, dy: 0 }
    ];
    if (this.formation === "circle") return [
      { dx: Math.cos(0) * dist,             dy: Math.sin(0) * dist },
      { dx: Math.cos((2*Math.PI)/3) * dist, dy: Math.sin((2*Math.PI)/3) * dist },
      { dx: Math.cos((4*Math.PI)/3) * dist, dy: Math.sin((4*Math.PI)/3) * dist }
    ];
    return [{ dx: -dist, dy: 0 }, { dx: -dist*2, dy: 0 }, { dx: -dist*3, dy: 0 }];
  }

  update() {
    const dx = this.leader.targetX - this.leader.x;
    const dy = this.leader.targetY - this.leader.y;
    if (Math.hypot(dx, dy) > 3) {
      this.leader.angle = Math.atan2(dy, dx);
      let mx = Math.cos(this.leader.angle) * this.leader.speed;
      let my = Math.sin(this.leader.angle) * this.leader.speed;
      this.obstacles.forEach(obs => {
        const odx = this.leader.x - obs.x, ody = this.leader.y - obs.y;
        const od = Math.hypot(odx, ody), min = obs.radius + this.leader.radius + 35;
        if (od < min && od > 0) { const f = (min-od)/min*3.8; mx += odx/od*f; my += ody/od*f; }
      });
      this.leader.x += mx; this.leader.y += my;
    }
    const offs = this.getFormationOffsets();
    this.followers.forEach((fol, idx) => {
      const off = offs[idx], ca = Math.cos(this.leader.angle), sa = Math.sin(this.leader.angle);
      const tx = this.leader.x + off.dx*ca - off.dy*sa, ty = this.leader.y + off.dx*sa + off.dy*ca;
      const fdx = tx - fol.x, fdy = ty - fol.y;
      let fx = fdx*(this.kp*1.5), fy = fdy*(this.kp*1.5);
      this.obstacles.forEach(obs => {
        const odx = fol.x-obs.x, ody = fol.y-obs.y, od = Math.hypot(odx,ody), min = obs.radius+fol.radius+25;
        if (od < min && od > 0) { const f=(min-od)/min*3.0; fx+=odx/od*f; fy+=ody/od*f; }
      });
      fol.x += fx; fol.y += fy; fol.angle = Math.atan2(fdy, fdx);
    });
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0,0,this.width,this.height);
    ctx.strokeStyle="rgba(255,255,255,0.03)"; ctx.lineWidth=1;
    for(let x=0;x<this.width;x+=30){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,this.height);ctx.stroke();}
    for(let y=0;y<this.height;y+=30){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(this.width,y);ctx.stroke();}
    ctx.strokeStyle="#00f2fe"; ctx.lineWidth=2; ctx.setLineDash([4,4]);
    ctx.beginPath(); ctx.arc(this.leader.targetX,this.leader.targetY,14,0,Math.PI*2); ctx.stroke(); ctx.setLineDash([]);
    this.obstacles.forEach(obs=>{
      ctx.fillStyle="rgba(239,68,68,0.25)"; ctx.strokeStyle="#ef4444"; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(obs.x,obs.y,obs.radius,0,Math.PI*2); ctx.fill(); ctx.stroke();
    });
    this.followers.forEach(fol=>{
      ctx.strokeStyle="rgba(0,242,254,0.35)"; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(this.leader.x,this.leader.y); ctx.lineTo(fol.x,fol.y); ctx.stroke();
    });
    this.followers.forEach(fol=>{
      ctx.save(); ctx.translate(fol.x,fol.y); ctx.rotate(fol.angle);
      ctx.fillStyle="#64748b"; ctx.fillRect(-7,-13,14,4); ctx.fillRect(-7,9,14,4);
      ctx.fillStyle=fol.color; ctx.beginPath(); ctx.arc(0,0,fol.radius,0,Math.PI*2); ctx.fill();
      ctx.restore();
    });
    ctx.save(); ctx.translate(this.leader.x,this.leader.y); ctx.rotate(this.leader.angle);
    ctx.shadowColor="#00f2fe"; ctx.shadowBlur=12;
    ctx.fillStyle="#f59e0b"; ctx.beginPath(); ctx.arc(0,0,this.leader.radius,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur=0; ctx.fillStyle="#fff";
    ctx.beginPath(); ctx.moveTo(this.leader.radius+5,0); ctx.lineTo(-4,-5); ctx.lineTo(-4,5); ctx.fill();
    ctx.restore();
    ctx.fillStyle="rgba(255,255,255,0.45)"; ctx.font="11px monospace";
    ctx.fillText(`Formation: ${this.formation.toUpperCase()} | Obstacles: ${this.obstacles.length}`, 8, 18);
  }

  loop() { this.update(); this.draw(); requestAnimationFrame(()=>this.loop()); }
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

// ── MODULE 6: Indoor Exploration — Floodfill vs Frontier (ICCAS 2024) ────────
class IndoorExplorationSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width=this.canvas.width; this.height=this.canvas.height;
    this.cols=20; this.rows=12;
    this.cellW=this.width/this.cols; this.cellH=this.height/this.rows;
    this.grid=[]; this.mode="frontier"; this.isExploring=false;
    this.startR=0; this.startC=0; this.goalR=11; this.goalC=19;
    this.initGrid();
  }

  resize() {
    resizeCanvasToWrapper(this.canvas); this.width=this.canvas.width; this.height=this.canvas.height;
    this.cellW=this.width/this.cols; this.cellH=this.height/this.rows; this.draw();
  }

  setMode(mode) { this.mode=mode; this.initGrid(); }
  setStart(r,c)  { this.startR=Math.min(this.rows-1,Math.max(0,r)); this.startC=Math.min(this.cols-1,Math.max(0,c)); this.initGrid(); }
  setGoal(r,c)   { this.goalR=Math.min(this.rows-1,Math.max(0,r)); this.goalC=Math.min(this.cols-1,Math.max(0,c)); this.initGrid(); }

  initGrid() {
    this.isExploring=false; this.grid=[];
    for(let r=0;r<this.rows;r++){
      const row=[];
      for(let c=0;c<this.cols;c++){
        const isWall=(r>0&&r<this.rows-1&&c>0&&c<this.cols-1)&&Math.random()<0.22;
        row.push({row:r,col:c,isWall,visited:false,isFrontier:false});
      }
      this.grid.push(row);
    }
    this.grid[this.startR][this.startC].isWall=false;
    this.grid[this.startR][this.startC].visited=true;
    this.grid[this.goalR][this.goalC].isWall=false;
    this.draw();
  }

  startExploration() {
    if(this.isExploring) return;
    this.initGrid();
    this.isExploring=true;
    let queue=[{r:this.startR,c:this.startC}];
    const step=()=>{
      if(queue.length===0){this.isExploring=false;return;}
      if(this.mode==="frontier"){
        queue.sort((a,b)=>Math.hypot(a.r-this.goalR,a.c-this.goalC)-Math.hypot(b.r-this.goalR,b.c-this.goalC));
      }
      const cur=queue.shift();
      const cell=this.grid[cur.r][cur.c];
      if(!cell.visited) cell.visited=true;
      if(cur.r===this.goalR&&cur.c===this.goalC){this.isExploring=false;this.draw();return;}
      [{r:cur.r-1,c:cur.c},{r:cur.r+1,c:cur.c},{r:cur.r,c:cur.c-1},{r:cur.r,c:cur.c+1}].forEach(n=>{
        if(n.r>=0&&n.r<this.rows&&n.c>=0&&n.c<this.cols){
          const nCell=this.grid[n.r][n.c];
          if(!nCell.isWall&&!nCell.visited&&!queue.some(q=>q.r===n.r&&q.c===n.c)){nCell.isFrontier=true;queue.push(n);}
        }
      });
      this.draw(); setTimeout(step, 55);
    };
    step();
  }

  draw() {
    const ctx=this.ctx;
    ctx.clearRect(0,0,this.width,this.height);
    ctx.textAlign="center"; ctx.textBaseline="middle";
    for(let r=0;r<this.rows;r++){
      for(let c=0;c<this.cols;c++){
        const cell=this.grid[r][c];
        const x=c*this.cellW, y=r*this.cellH;
        const isSt=r===this.startR&&c===this.startC, isGo=r===this.goalR&&c===this.goalC;
        if(isSt) ctx.fillStyle="#10b981";
        else if(isGo) ctx.fillStyle="#ef4444";
        else if(cell.isWall) ctx.fillStyle="#334155";
        else if(cell.visited) ctx.fillStyle="rgba(0,242,254,0.25)";
        else if(cell.isFrontier) ctx.fillStyle="rgba(245,158,11,0.5)";
        else ctx.fillStyle="rgba(15,23,42,0.6)";
        ctx.fillRect(x,y,this.cellW-1,this.cellH-1);
        if(isSt||isGo){
          ctx.fillStyle="#fff"; ctx.font=`bold ${Math.min(this.cellW,this.cellH)*0.5}px sans-serif`;
          ctx.fillText(isSt?"S":"G",x+this.cellW/2,y+this.cellH/2);
        }
      }
    }
    ctx.textAlign="left"; ctx.textBaseline="alphabetic";
    const lh=this.height-4, lp=4;
    ctx.fillStyle="rgba(0,0,0,0.55)"; ctx.fillRect(lp,lh-16,290,16);
    [{c:"#10b981",l:"Start"},{c:"#ef4444",l:"Goal"},{c:"rgba(0,242,254,0.5)",l:"Visited"},{c:"rgba(245,158,11,0.5)",l:"Frontier"},{c:"#334155",l:"Wall"}]
      .forEach((item,i)=>{
        const ox=lp+4+i*58;
        ctx.fillStyle=item.c; ctx.fillRect(ox,lh-13,10,10);
        ctx.fillStyle="#fff"; ctx.font="9px sans-serif"; ctx.fillText(item.l,ox+12,lh-4);
      });
    ctx.fillStyle="rgba(255,255,255,0.4)"; ctx.font="11px monospace";
    ctx.fillText(`Algo: ${this.mode.toUpperCase()} | S=(${this.startC},${this.startR}) G=(${this.goalC},${this.goalR})`, 8, 18);
  }
}

// ── MODULE 7: LiDAR SLAM + TurtleBot / Auto-Navigation Control ───────────────
class LiDARSLAMSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToWrapper(this.canvas);
    this.width=this.canvas.width; this.height=this.canvas.height;
    this.robot={x:this.width*0.3,y:this.height*0.5,angle:0};
    this.obstacles=[
      {x:this.width*0.5,y:this.height*0.3,w:100,h:20},
      {x:this.width*0.5,y:this.height*0.7,w:20,h:100},
      {x:this.width*0.7,y:this.height*0.5,w:60,h:60}
    ];
    this.rays=36; this.scanData=[];
    this.ctrlMode="mouse";
    this.linearSpeed=2.5; this.rotSpeed=0.04;
    this.keys={w:false,s:false,a:false,d:false,q:false,e:false};
    this.bindEvents(); this.loop();
  }

  resize() { resizeCanvasToWrapper(this.canvas); this.width=this.canvas.width; this.height=this.canvas.height; }

  setMode(mode) { this.ctrlMode=mode; this.keys={w:false,s:false,a:false,d:false,q:false,e:false}; }

  bindEvents() {
    this.canvas.addEventListener("mousemove",(e)=>{
      if(this.ctrlMode!=="mouse") return;
      const rect=this.canvas.getBoundingClientRect();
      this.robot.x=e.clientX-rect.left; this.robot.y=e.clientY-rect.top;
    });
    document.addEventListener("keydown",(e)=>{
      if(this.ctrlMode!=="wasd") return;
      const k=e.key.toLowerCase();
      if(["w","a","s","d","q","e"].includes(k)){this.keys[k]=true; e.preventDefault();}
      if(e.key==="ArrowUp"){this.keys.w=true;e.preventDefault();}
      if(e.key==="ArrowDown"){this.keys.s=true;e.preventDefault();}
      if(e.key==="ArrowLeft"){this.keys.a=true;e.preventDefault();}
      if(e.key==="ArrowRight"){this.keys.d=true;e.preventDefault();}
    });
    document.addEventListener("keyup",(e)=>{
      const k=e.key.toLowerCase();
      if(["w","a","s","d","q","e"].includes(k)) this.keys[k]=false;
      if(e.key==="ArrowUp") this.keys.w=false; if(e.key==="ArrowDown") this.keys.s=false;
      if(e.key==="ArrowLeft") this.keys.a=false; if(e.key==="ArrowRight") this.keys.d=false;
    });
  }

  moveForward(dir) {
    const nx=this.robot.x+Math.cos(this.robot.angle)*this.linearSpeed*dir;
    const ny=this.robot.y+Math.sin(this.robot.angle)*this.linearSpeed*dir;
    if(nx>10&&nx<this.width-10) this.robot.x=nx;
    if(ny>10&&ny<this.height-10) this.robot.y=ny;
  }

  update() {
    if(this.ctrlMode==="mouse"){
      this.robot.angle+=0.02;
    } else if(this.ctrlMode==="wasd"){
      if(this.keys.w) this.moveForward(1);
      if(this.keys.s) this.moveForward(-1);
      if(this.keys.a||this.keys.q) this.robot.angle-=this.rotSpeed*1.5;
      if(this.keys.d||this.keys.e) this.robot.angle+=this.rotSpeed*1.5;
      this.robot.angle+=0.012;
    } else if(this.ctrlMode==="auto"){
      // Compute front rays first (from previous scanData)
      const getFrontDist=()=>{
        const front=this.scanData.filter(r=>{let d=r.angle-this.robot.angle;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;return Math.abs(d)<0.45;});
        return front.length>0?Math.min(...front.map(r=>r.dist)):200;
      };
      const frontD=getFrontDist();
      if(frontD<70){
        // Check which side is clearer
        const leftD=this.scanData.filter(r=>{let d=r.angle-(this.robot.angle-Math.PI/2);while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;return Math.abs(d)<0.5;});
        const rightD=this.scanData.filter(r=>{let d=r.angle-(this.robot.angle+Math.PI/2);while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;return Math.abs(d)<0.5;});
        const lDist=leftD.length>0?Math.min(...leftD.map(r=>r.dist)):200;
        const rDist=rightD.length>0?Math.min(...rightD.map(r=>r.dist)):200;
        this.robot.angle+=lDist>rDist?-this.rotSpeed*2.2:this.rotSpeed*2.2;
      } else {
        this.moveForward(1); this.robot.angle+=0.012;
      }
    }

    // LiDAR ray casting
    this.scanData=[];
    for(let i=0;i<this.rays;i++){
      const angle=this.robot.angle+(i*(Math.PI*2/this.rays));
      let rayDist=200;
      for(let d=0;d<200;d+=4){
        const rx=this.robot.x+Math.cos(angle)*d, ry=this.robot.y+Math.sin(angle)*d;
        if(rx<0||rx>this.width||ry<0||ry>this.height){rayDist=d;break;}
        if(this.obstacles.some(o=>rx>=o.x&&rx<=o.x+o.w&&ry>=o.y&&ry<=o.y+o.h)){rayDist=d;break;}
      }
      this.scanData.push({angle,dist:rayDist});
    }

    // HUD update
    const hudX=document.getElementById("lidarX"), hudY=document.getElementById("lidarY");
    const hudH=document.getElementById("lidarHeading"), hudM=document.getElementById("lidarMode");
    if(hudX) hudX.textContent=Math.round(this.robot.x);
    if(hudY) hudY.textContent=Math.round(this.robot.y);
    if(hudH) hudH.textContent=`${(((this.robot.angle*180/Math.PI)%360+360)%360).toFixed(0)}°`;
    if(hudM) hudM.textContent=this.ctrlMode.toUpperCase();
  }

  draw() {
    const ctx=this.ctx;
    ctx.clearRect(0,0,this.width,this.height);
    ctx.fillStyle="#475569"; this.obstacles.forEach(o=>ctx.fillRect(o.x,o.y,o.w,o.h));
    this.scanData.forEach(ray=>{
      const hx=this.robot.x+Math.cos(ray.angle)*ray.dist, hy=this.robot.y+Math.sin(ray.angle)*ray.dist;
      ctx.strokeStyle="rgba(0,242,254,0.15)"; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(this.robot.x,this.robot.y); ctx.lineTo(hx,hy); ctx.stroke();
      ctx.fillStyle="#00f2fe"; ctx.beginPath(); ctx.arc(hx,hy,2.5,0,Math.PI*2); ctx.fill();
    });
    ctx.save(); ctx.translate(this.robot.x,this.robot.y); ctx.rotate(this.robot.angle);
    ctx.fillStyle="#f59e0b"; ctx.beginPath(); ctx.arc(0,0,10,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="#fff"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(16,0); ctx.stroke();
    ctx.restore();
    ctx.fillStyle="rgba(255,255,255,0.35)"; ctx.font="11px monospace";
    ctx.fillText(`LiDAR SLAM | ${this.ctrlMode.toUpperCase()}${this.ctrlMode==="wasd"?" | W/S=Fwd/Back A/D=Turn":this.ctrlMode==="auto"?" | Reactive Auto-Nav Active":""}`, 8, 18);
  }

  loop() { this.update(); this.draw(); requestAnimationFrame(()=>this.loop()); }
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

  document.querySelectorAll(".sim-form-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".sim-form-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      sim1?.setFormation(btn.dataset.form);
    });
  });
  document.getElementById("btnResetSim1")?.addEventListener("click", () => sim1?.reset());
  document.getElementById("btnToggleObstacle1")?.addEventListener("click", () => sim1?.addObstacle());

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

  // ── MODULE 6: Indoor Exploration ──────────────────────────
  const sim6 = new IndoorExplorationSimulation("canvasSim6");

  document.getElementById("radioFrontier6")?.addEventListener("change", () => sim6?.setMode("frontier"));
  document.getElementById("radioFloodfill6")?.addEventListener("change", () => sim6?.setMode("floodfill"));

  document.getElementById("btnStartExplore6")?.addEventListener("click", () => {
    const sr = parseInt(document.getElementById("startRow6")?.value||0);
    const sc = parseInt(document.getElementById("startCol6")?.value||0);
    const gr = parseInt(document.getElementById("goalRow6")?.value||11);
    const gc = parseInt(document.getElementById("goalCol6")?.value||19);
    sim6?.setStart(sr, sc); sim6?.setGoal(gr, gc);
    sim6?.startExploration();
  });
  document.getElementById("btnResetExplore6")?.addEventListener("click", () => sim6?.initGrid());

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
