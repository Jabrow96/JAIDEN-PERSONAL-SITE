// Modern portfolio JavaScript with enhanced interactions

document.addEventListener('DOMContentLoaded', function () {
  // Particle animation for header
  const canvas = document.getElementById('header-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 50;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  function updateParticles() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.fill();
    });
  }

  function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  createParticles();
  animate();

  // Typewriter effect for header
  const typewriterText = "Jaiden Brown";
  const h1 = document.querySelector('header h1');
  h1.textContent = '';
  let i = 0;
  function typeWriter() {
    if (i < typewriterText.length) {
      h1.textContent += typewriterText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  setTimeout(typeWriter, 500);

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all sections for animation
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Enhanced skills interaction
  const slides = {
    html: [
      { src: 'img/html-structure.png', caption: 'HTML Structure' },
      { src: 'img/semantic.png', caption: 'Semantic Elements' }
    ],
    css: [
      { src: 'img/css_box_model.png', caption: 'Box Model & Layouts' },
      { src: 'img/power-of-colour-in-typography.png', caption: 'Colors & Typography' }
    ],
    js: [
      { src: 'img/dom.png', caption: 'DOM Manipulation' },
      { src: 'img/Event.jpg', caption: 'Events & Interactivity' }
    ]
  };

  const skillsGrid = document.querySelector('.skills-grid');
  document.querySelectorAll('.skill-card').forEach(card => {
    const key = card.dataset.skill;
    const list = slides[key] || [];
    const preview = card.querySelector('.skill-preview');
    const img = preview.querySelector('.skill-img');
    const caption = card.querySelector('.skill-caption');
    const btn = card.querySelector('.skill-btn');
    let idx = 0;
    let timer = null;

    function show(i) {
      const item = list[i];
      if (!item) return;
      img.src = item.src;
      caption.textContent = item.caption;
    }

    function layoutCaption() {
      // size the caption bubble to match the tile width and 1/3 of its height,
      // then position it directly below the tile and update grid bottom padding
      const gap = 12;
      const w = card.offsetWidth;
      const h = card.offsetHeight;
      const captionH = Math.round(h / 3);
      caption.style.width = w + 'px';
      caption.style.height = captionH + 'px';
      caption.style.top = (h) + 'px';
      caption.style.left = '0px';

      // ensure the grid reserves enough space below tiles for the caption
      if (skillsGrid) {
        const extra = 12; // extra spacing
        skillsGrid.style.paddingBottom = (captionH + gap + extra) + 'px';
      }
    }

    function start() {
      if (!list.length) return;
      layoutCaption();
      card.classList.add('active');
      if (btn) btn.style.opacity = '0';
      preview.style.opacity = '1';
      show(0);
      timer = setInterval(() => {
        idx = (idx + 1) % list.length;
        show(idx);
      }, 1600);
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      if (list.length) show(0);
      card.classList.remove('active');
      if (btn) btn.style.opacity = '1';
      preview.style.opacity = '0';
      // caption will hide via CSS transition
    }

    card.addEventListener('mouseenter', start);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('focusin', start);
    card.addEventListener('focusout', stop);

    // keep caption sized if window resizes while active
    window.addEventListener('resize', () => {
      if (card.classList.contains('active')) layoutCaption();
    });
  });

  // Add loading animation to images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    });
    if (img.complete) {
      img.classList.add('loaded');
    }
  });

  // Add parallax effect to header (subtle)
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const header = document.querySelector('header');
    if (header) {
      const translateY = currentScrollY * 0.5;
      header.style.transform = `translateY(${translateY}px)`;
    }
    lastScrollY = currentScrollY;
  });

  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }

  // Add click ripple effect to buttons
  document.querySelectorAll('.contact-btn, .skill-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});
