
/* ================= LOAD TOP FIX ================= */
window.onbeforeunload = function () {
  window.scrollTo(0,0);
};

/* ================= LOADER ================= */
window.addEventListener("load",()=>{
  setTimeout(()=>{
    document.getElementById("loader").style.display="none";
  },1500);
});

/* ================= TYPING EFFECT ================= */
const text="Frontend Developer | UI Animator | Tech Enthusiast";
let index=0;
function type(){
  if(index<text.length){
    document.querySelector(".typing").innerHTML+=text.charAt(index);
    index++;
    setTimeout(type,40);
  }
}
type();

/* ================= SCROLL REVEAL ================= */
const reveals=document.querySelectorAll(".reveal");
window.addEventListener("scroll",()=>{
  reveals.forEach(el=>{
    const top=el.getBoundingClientRect().top;
    if(top<window.innerHeight-100){
      el.classList.add("active");
    }
  });
});

/* ================= THREE.JS PARTICLE BACKGROUND ================= */
const canvas=document.getElementById("bg-canvas");
const scene=new THREE.Scene();
scene.fog=new THREE.FogExp2(0x050505,0.002);

const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z=100;

const renderer=new THREE.WebGLRenderer({canvas,alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);

const geometry=new THREE.BufferGeometry();
const count = window.innerWidth < 768 ? 800 : 2000;
const positions=new Float32Array(count*3);

for(let i=0;i<count*3;i++){
  positions[i]=(Math.random()-0.5)*400;
}
geometry.setAttribute("position",new THREE.BufferAttribute(positions,3));

const material=new THREE.PointsMaterial({
  size:1.5,
  color:0x8a5cff,
  transparent:true,
  opacity:0.8,
  blending:THREE.AdditiveBlending
});

const particles=new THREE.Points(geometry,material);
scene.add(particles);

const clock=new THREE.Clock();

function animate(){
  requestAnimationFrame(animate);
  const time=clock.getElapsedTime();
  particles.rotation.y+=0.001;
  particles.rotation.x+=0.0005;

  const pos=geometry.attributes.position.array;
  for(let i=0;i<count;i++){
    const i3=i*3;
    const x=pos[i3];
    pos[i3+1]=Math.sin(time+x*0.05)*5;
  }
  geometry.attributes.position.needsUpdate=true;
  renderer.render(scene,camera);
}
animate();

window.addEventListener("resize",()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});
