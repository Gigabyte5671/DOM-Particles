function particle(creation_tick,start,end,duration,lifespan,velocity){
  this.creation_tick = creation_tick,
  this.start = start,
  this.age = 0;
  this.end = end,
  this.duration = duration,
  this.lifespan = lifespan,
  this.velocity = velocity,
  this.appearance_params = {
    scale: [1.5,0],
    opacity: [1,0]
  }
}

const particle_container = document.getElementById("particle_container");
var particles = [];
var tick = 0;


function doParticles(TS){
  if(tick % 1 === 0){
    particle_container.innerHTML = "";
    
    particles.forEach(function(p, i){
      if(p.age < p.lifespan){
        drawParticle(lerp(p.start, p.end, (p.age / p.lifespan)), (p.age / p.lifespan), p.appearance_params);
        p.age += p.velocity;
      }
      
      if(tick > p.creation_tick + p.lifespan){
        particles.splice(i,1);
      }
      
    });
  }
  
  tick++;
  window.requestAnimationFrame(doParticles);
}
window.requestAnimationFrame(doParticles);


function createEmitter(e){
  var max_particles = 100;
  var max_distance = 300;
  var start = [e.clientX, e.clientY];
  //var start = [e.layerX, e.layerY];
  
  for(let i = 0; i < max_particles; i++){
    createParticle(start, max_distance);
  }
}
function createParticle(start, max_distance){
  var creation_tick = tick;
  var ofs = [start[0],start[1]];
  var end = polarToCartesian((Math.random() * 360), (Math.random() * max_distance), ofs);
  var duration = 100;
  var lifespan = 100;
  var velocity = 3;
  
  var part = new particle(creation_tick,start,end,duration,lifespan,velocity);
  particles.push(part);
}

function drawParticle(pos, age, appearance_params){
  //var fragment_node = document.createDocumentFragment();
  var node = document.createElement("div");
  node.style.left = pos[0] + "px";
  node.style.top = pos[1] + "px";
  var transform_properties = ["translate", "translateX", "translateY", "scale", "scaleX", "scaleY", "scaleZ", "rotate", "rotateX", "rotateY", "rotateZ"];
  Object.keys(appearance_params).forEach(function(k){
    if(transform_properties.includes(k)){
      node.style.transform = k + "(" + lerp([appearance_params[k][0]], [appearance_params[k][1]], age) + ")";
    }else{
      node.style[k] = lerp([appearance_params[k][0]], [appearance_params[k][1]], age);
    }
  });
  
  particle_container.appendChild(node);
}

function polarToCartesian(angle, length, offset){
  var output = [offset[0],offset[1]];
  var rad = degToRad(angle);
  output[0] += length * Math.cos(rad);
  output[1] += length * Math.sin(rad);
  return output;
}
function degToRad(deg){
  return deg * (Math.PI / 180);
}

function lerp(P, Q, t){
  var output = [];
  if(t < 0){t = 0;}
  if(t > 1){t = 1;}
  
  var i = 0;
  while(i < P.length){
    output.push(P[i] + (t * (Q[i] - P[i])));
    i++;
  }
  return output;
}

function changeColour(c){
  document.getElementById("particle_container").style.color = "#" + c;
}