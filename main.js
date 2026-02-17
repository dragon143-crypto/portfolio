document.addEventListener("DOMContentLoaded", () => {

/* ================= LOAD TOP FIX ================= */
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

/* ================= LOADER ================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.display = "none";
    }, 1500);
  }
});

/* ================= TYPING EFFECT ================= */
const typingEl = document.querySelector(".typing");
if (typingEl) {
  const text = "Frontend Developer | UI Animator | Tech Enthusiast";
  let index = 0;
  function type() {
    if (index < text.length) {
      typingEl.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, 40);
    }
  }
  type();
}

/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");
if (reveals.length) {
  window.addEventListener("scroll", () => {
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  });
}

/* ================= THREE BACKGROUND ================= */
const canvas = document.getElementById("bg-canvas");
if (canvas && window.THREE) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050505, 0.002);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 100;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.BufferGeometry();
  const count = window.innerWidth < 768 ? 800 : 2000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 400;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 1.5,
    color: 0x8a5cff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;

    const pos = geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = pos[i3];
      pos[i3 + 1] = Math.sin(time + x * 0.05) * 5;
    }
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ================= MOBILE NAV ================= */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const overlay = document.getElementById("nav-overlay");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
    hamburger.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
  });
}

if (overlay) {
  overlay.addEventListener("click", () => {
    navMenu?.classList.remove("active");
    document.body.classList.remove("menu-open");
    hamburger?.classList.remove("active");
    overlay.classList.remove("active");
  });
}

/* ================= MAGNETIC BUTTON ================= */
document.querySelectorAll(".btn").forEach(el => {
  el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "translate(0,0)";
  });
});

/* ================= SMOOTH SCROLL ================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    const targetPosition = target.offsetTop - 80;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  });
});

/* ================= NAVBAR SHRINK ================= */
const navbar = document.querySelector(".navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* ================= HERO FLOAT ================= */
const hero = document.querySelector(".hero");
if (hero) {
  document.addEventListener("mousemove", e => {
    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;
    hero.style.transform = `translate(${x}px, ${y}px)`;
  });
}

/* ================= COUNTER ================= */
const counters = document.querySelectorAll(".counter");
if (counters.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = +counter.dataset.target;
      const suffix = counter.dataset.suffix || "";

      let current = 0;
      const duration = 800;
      const increment = target / (duration / 16);

      const update = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.floor(current) + suffix;
          requestAnimationFrame(update);
        } else {
          counter.innerText = target + suffix;
        }
      };

      update();
      observer.unobserve(counter);
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));
}

/* ================= SKILL PARALLAX ================= */
const parallaxItems = document.querySelectorAll(".parallax");
if (parallaxItems.length) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    parallaxItems.forEach(item => {
      const speed = parseFloat(item.dataset.speed);
      const offset = scrollY * speed;
      item.style.transform = `translateY(${offset}px)`;
    });
  });
}

});

const projectCards = document.querySelectorAll(".project-card, .featured-project");

const projectObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

projectCards.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "all 0.8s ease";
  projectObserver.observe(el);
});
