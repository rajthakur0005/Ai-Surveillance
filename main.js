// Sticky Header
let lastScroll = 0;
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) header.classList.add("hide");
  else header.classList.remove("hide");
  lastScroll = currentScroll;
});







// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('active');
});

// Sub-menu toggle for mobile
document.querySelectorAll('.menu > li').forEach(item => {
  item.addEventListener('click', (e) => {
    if(window.innerWidth <= 768){
      const subMenu = item.querySelector('.sub-menu');
      if(subMenu){
        e.preventDefault(); // prevent link click
        item.classList.toggle('active');
      }
    }
  });
});


// Swiper Testimonials
new Swiper(".testimonialSwiper", {
  slidesPerView: 1,
  loop: true,
  autoplay: { delay: 4000 },
  spaceBetween: 20,
});

// Initialize AOS
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 100 });
});

const videoText = document.querySelector('.video-text');
const videoRight = document.querySelector('.video-right');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  videoText.style.transform = `translateY(${scrollPos * 0.08}px)`;  // slower for smooth effect
  videoRight.style.transform = `translateY(${scrollPos * 0.04}px)`;
});



// Swiper for Trusted Clients
new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 40,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: { slidesPerView: 1 },
    480: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 }
  }
});





// Function to animate counters
const counters = document.querySelectorAll('.metric-value');

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;
    const increment = target / 150; // speed: higher = slower

    if(current < target){
      counter.innerText = Math.ceil(current + increment);
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target;
    }
  };

  // Trigger only when visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(counter);
});


// --- Carousel ---
const track = document.querySelector('.testimonial-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
const cards = document.querySelectorAll('.testimonial-card');
const total = cards.length;

function updateCarousel() {
  const offset = -index * (cards[0].offsetWidth + 30);
  track.style.transform = `translateX(${offset}px)`;
}

// Auto-play carousel
let autoPlay = setInterval(() => {
  index = (index + 1) % total;
  updateCarousel();
}, 4000);

// Button events
prevBtn.addEventListener('click', () => {
  clearInterval(autoPlay);
  index = (index - 1 + total) % total;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  clearInterval(autoPlay);
  index = (index + 1) % total;
  updateCarousel();
});

// --- Particle Background ---
const canvas = document.getElementById('testimonial-particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 70;

for(let i=0; i<particleCount; i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*3 + 1,
    dx: (Math.random()-0.5)/2,
    dy: (Math.random()-0.5)/2
  });
}

let lastEvent;
window.addEventListener('mousemove', (e)=> { lastEvent = e; });

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    if(lastEvent){
      const dx = lastEvent.clientX - p.x;
      const dy = lastEvent.clientY - p.y;
      p.x += dx*0.0005 + p.dx;
      p.y += dy*0.0005 + p.dy;
    } else {
      p.x += p.dx;
      p.y += p.dy;
    }

    if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if(p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(255,107,107,0.5)';
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  updateCarousel();
});










const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(card => {
  const btn = card.querySelector('.faq-question');
  btn.addEventListener('click', () => {
    // Close other open FAQ
    faqCards.forEach(c => {
      if(c !== card) c.classList.remove('active');
    });
    // Toggle current FAQ
    card.classList.toggle('active');
  });
});





const tabs = document.querySelectorAll(".why-tabs span");
const slides = document.querySelectorAll(".why-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    
    const index = tab.dataset.slide;
    slides.forEach(s => s.classList.remove("active"));
    slides[index].classList.add("active");
  });
});
