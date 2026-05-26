/* ══════════════════════════════════════════════════════════
   GRS SOLUÇÕES — Interactions & Animations
   ══════════════════════════════════════════════════════════ */


document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll behavior ──────────────────────────────
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile menu ─────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ── Hero parallax — sutil, premium ──────────────────────
  const heroVisual = document.querySelector('.hero__visual');
  const docBack    = document.querySelector('.hero__doc--back');
  const docFront   = document.querySelector('.hero__doc--front');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroVisual && docBack && docFront && !prefersReducedMotion) {
    const hero = document.querySelector('.hero');
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let rafId;

    const onMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    };

    const animateDocs = () => {
      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;
      docBack.style.transform  = `rotate(-4deg) translate(${targetX * -8}px, ${targetY * -6}px)`;
      docFront.style.transform = `rotate(3deg)  translate(${targetX *  10}px, ${targetY *  8}px)`;
      rafId = requestAnimationFrame(animateDocs);
    };

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', () => { mouseX = 0; mouseY = 0; });
    animateDocs();
  }

  // ── Scroll reveal ────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Counter animation ────────────────────────────────────
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el       = entry.target;
      const target   = parseInt(el.dataset.target, 10);
      const start    = performance.now();
      const duration = 1800;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  // ── Testimonials slider ──────────────────────────────────
  const track  = document.getElementById('testimonialsTrack');
  const cards  = track ? Array.from(track.children) : [];
  const dotsEl = document.getElementById('testimonialsDots');

  if (cards.length && dotsEl) {
    let current      = 0;
    const visible    = window.innerWidth <= 768 ? 1 : 2;
    const totalSlides = Math.ceil(cards.length / visible);

    const dots = Array.from({ length: totalSlides }, (_, i) => {
      const d = document.createElement('button');
      d.className = 'testimonials-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(d);
      return d;
    });

    const goTo = (idx) => {
      current = Math.max(0, Math.min(idx, totalSlides - 1));
      const cardWidth = cards[0].offsetWidth;
      const gap       = 24;
      const offset    = current * visible * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    };

    document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
    document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

    let autoTimer = setInterval(() => goTo((current + 1) % totalSlides), 5000);
    track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
    track.parentElement.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => goTo((current + 1) % totalSlides), 5000);
    });

    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });
  }

  // ── FAQ accordion ────────────────────────────────────────
  document.querySelectorAll('.faq-item__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Active nav link on scroll ────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeLinkObserver.observe(s));

  // ── Smooth scroll ────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - navbar.offsetHeight - 8,
          behavior: 'smooth',
        });
      }
    });
  });

});
