function particle(creation_tick,start,end,duration,lifespan){
  this.creation_tick = creation_tick,
  this.start = start,
  this.age = 0;
  this.end = end,
  this.duration = duration,
  this.lifespan = lifespan,
  this.appearance_function = {
    scale: [1,1],
    scale: [1,1]
  }
}

const particle_container = document.getElementById("particle_container");
var particles = [];
var tick = 0;


function doParticles(TS){
  if(tick % 1 === 0){
    particle_container.innerHTML = "";
    
    particles.forEach(function(p, i){
      if(p.age <= 100){
        //console.log(p.start);
        //console.log(p.end);
        //console.log((p.age / 100));
        
        p.age++;
      }
      drawParticle(lerp(p.start, p.end, (p.age / 100)));
      
      /*if(tick > p.creation_tick + p.lifespan){
        particles.splice(i,1);
      }*/
      
    });
  }
  
  tick++;
  window.requestAnimationFrame(doParticles);
}
window.requestAnimationFrame(doParticles);


function createEmitter(e){
  var max_radius = 30;
  var max_particles = 1;
  
  for(let i = 0; i < max_particles; i++){
    var creation_tick = tick;
    //var start = [e.clientX, e.clientY];
    var start = [e.layerX, e.layerY];
    console.log(start);
    var end = polarToCartesian((Math.random() * 360), (Math.random() * max_radius), start);
    console.log(end);
    var duration = 100;
    var lifespan = 100;
    
    var part = new particle(creation_tick,start,end,duration,lifespan);
    particles.push(part);
    
  }
  
}


function drawParticle(pos){
  //var fragment_node = document.createDocumentFragment();
  var node = document.createElement("div");
  node.style.left = pos[0] + "px";
  node.style.top = pos[1] + "px";
  particle_container.appendChild(node);
}


function polarToCartesian(angle, length, offset){
  var output = offset;
  var rad = degToRad(angle);
  output[0] += length * Math.cos(rad);
  output[1] += length * Math.sin(rad);
  return output;
}
function degToRad(deg){
  return deg * (Math.PI / 180);
}
function lerp(P, Q, t){
  var output = [0,0];
  if(t < 0){t = 0;}
  if(t > 1){t = 1;}
  output[0] = P[0] + (t * Q[0]);
  output[1] = P[1] + (t * Q[1]);
  return output;
}