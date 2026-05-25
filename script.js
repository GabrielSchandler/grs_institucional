/* ══════════════════════════════════════════════════════════
   GRS SOLUÇÕES — Interactions & Animations
   ══════════════════════════════════════════════════════════ */

// ── Cole aqui a URL gerada pelo Google Apps Script após publicar ──
const SHEET_ENDPOINT = 'COLE_AQUI_A_URL_DO_APPS_SCRIPT';

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
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const start  = performance.now();
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
    let current = 0;
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

  // ── Contact form → Google Sheets ────────────────────────
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn          = form.querySelector('button[type="submit"]');
      const originalHtml = btn.innerHTML;
      btn.disabled       = true;
      btn.innerHTML      = '<span>Enviando...</span>';

      const data = {
        nome:      form.nome.value.trim(),
        sobrenome: form.sobrenome.value.trim(),
        email:     form.email.value.trim(),
        telefone:  form.telefone.value.trim(),
        mensagem:  form.mensagem.value.trim(),
      };

      try {
        // Se o endpoint não foi configurado ainda, apenas simula
        if (SHEET_ENDPOINT === 'COLE_AQUI_A_URL_DO_APPS_SCRIPT') {
          await new Promise(r => setTimeout(r, 1000));
        } else {
          await fetch(SHEET_ENDPOINT, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(data),
          });
        }

        form.reset();
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 6000);

      } catch (err) {
        console.error('Erro ao enviar formulário:', err);
        alert('Ocorreu um erro. Por favor, entre em contato pelo WhatsApp.');
      } finally {
        btn.innerHTML = originalHtml;
        btn.disabled  = false;
      }
    });
  }

  // ── Phone mask ───────────────────────────────────────────
  const phoneInput = document.getElementById('telefone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if      (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      else if (v.length >  6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      else if (v.length >  2) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      e.target.value = v;
    });
  }

  // ── Smooth scroll ────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - navbar.offsetHeight - 8,
          behavior: 'smooth'
        });
      }
    });
  });

});
