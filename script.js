// Fade-in 
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(el => observer.observe(el));

const container = document.querySelector('.stars');
const stars = [];
const starCount = 300;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.className = 'star';

  const size = Math.random() * 2 + 1;
  const opacity = Math.random() * 0.4 + 0.2;
  const blur = Math.random() * 1.5;
  const delay = Math.random() * 3;
  const speed = Math.random() * 0.3 + 0.1;

  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.opacity = opacity;
  star.style.filter = `blur(${blur}px)`;
  star.style.animation = `twinkle 3s ease-in-out ${delay}s infinite`;

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  container.appendChild(star);
  stars.push({ el: star, x, y, speed });
}

function animateStars() {
  for (const star of stars) {
    star.x -= star.speed;
    star.y += star.speed * 0.8;

    if (star.x < -10 || star.y > window.innerHeight + 10) {
      const edgeChoice = Math.random();

      if (edgeChoice < 0.5) {
        star.x = window.innerWidth + Math.random() * 100;
        star.y = Math.random() * window.innerHeight;
      } else {
        star.x = Math.random() * window.innerWidth;
        star.y = -Math.random() * 100;
      }
    }

    star.el.style.transform = `translate(${star.x}px, ${star.y}px)`;
  }

  requestAnimationFrame(animateStars);
}
animateStars();

// shooting star

function createShootingStar() {
  const star = document.createElement('div');
  star.className = 'shooting-star';

  const startTop = Math.random() * window.innerHeight * 0.5;
  const startLeft = Math.random() * window.innerWidth * 0.5;

  star.style.top = `${startTop}px`;
  star.style.left = `${startLeft}px`;

  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 1000);
}

setInterval(() => {
  if (Math.random() > 0) createShootingStar();
}, 3000);

function scrollToDestinations(e) {

  e.preventDefault();
  document.body.classList.remove('lock-scroll');

  const ship = document.getElementById('ship-flyby');
  const cards = document.querySelectorAll('.destination-card');
  const section = document.getElementById('destinations');
  const rocketSound = document.getElementById('rocket-sound');

  rocketSound.currentTime = 0;
  rocketSound.play();

  ship.classList.remove('opacity-0');

  function emitParticleTrail() {
    const container = document.getElementById('ship-flyby');
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.className = 'rocket-particle';

      particle.style.left = `${Math.random() * 20 + 10}px`;
      particle.style.top = `${Math.random() * 60 + 90}px`;

      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);
    }
  }

  const particleInterval = setInterval(emitParticleTrail, 100);

  setTimeout(() => clearInterval(particleInterval), 3500);


  ship.style.transition = 'transform 3.5s ease-in-out, opacity 0.3s ease-in';
  ship.style.transform = 'translate(110vw, -50vh) rotate(-20deg)';

  // Smooth scroll to section
  const y = section.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: 'smooth' });

  // cards sync spaceship 
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.remove('opacity-0', 'translate-y-6');
    }, 1000 + index * 600); 
  });

  // Hide and reset ship after animation
  setTimeout(() => {
    ship.style.transition = 'none';
    ship.style.transform = 'translateX(0) rotate(0deg)';
    ship.classList.add('opacity-0');
  }, 4200);

// enable destinations in nav
  const navDestLink = document.getElementById('nav-destinations');
  navDestLink.classList.remove('pointer-events-none', 'opacity-40', 'cursor-not-allowed');
  navDestLink.classList.add('hover:text-cyan-400');

}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};







