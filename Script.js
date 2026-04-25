/* ================================================================
   script.js — Portozall Portfolio
   ================================================================
   Berisi:
   1. Navbar solid saat scroll
   2. Active nav link (Intersection Observer)
   3. Hamburger menu (mobile)
   4. Animasi on-scroll (AOS manual)
   5. Tombol kirim email (mailto)
   6. Toast notifikasi
   ================================================================ */


/* ── REFERENSI DOM ──────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
const sections  = document.querySelectorAll('.section');
const btnKirim  = document.getElementById('btnKirim');

/* ── KONFIGURASI ────────────────────────────────────────── */
// EDIT: Ganti dengan email tujuan Anda
const emailTujuan  = 'Abrizalrakafxtkj2@gmail.com';
const emailSubject = 'Halo, saya ingin berkolaborasi!';


/* ── 1. NAVBAR SOLID SAAT SCROLL ─────────────────────────── */
function handleNavScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}
window.addEventListener('scroll', handleNavScroll);
handleNavScroll();


/* ── 2. ACTIVE NAV LINK ──────────────────────────────────── */
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObs.observe(s));


/* ── 3. HAMBURGER MENU ───────────────────────────────────── */
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Tutup saat link diklik
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
  });
});


/* ── 4. ANIMASI ON-SCROLL (AOS manual) ───────────────────── */
const aosObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('aos-animate');
      aosObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-aos]').forEach(el => aosObs.observe(el));


/* ── 5. TOMBOL KIRIM EMAIL ───────────────────────────────── */
if (btnKirim) {
  btnKirim.addEventListener('click', () => {
    const nama  = document.getElementById('inputNama').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const pesan = document.getElementById('inputPesan').value.trim();

    if (!nama || !email || !pesan) {
      showToast('Mohon isi semua field terlebih dahulu!', 'error');
      return;
    }

    const body = `Halo, nama saya ${nama} (${email}).\n\n${pesan}`;
    window.location.href =
      `mailto:${emailTujuan}` +
      `?subject=${encodeURIComponent(emailSubject)}` +
      `&body=${encodeURIComponent(body)}`;

    showToast('Email client dibuka! Silakan kirim email Anda.', 'success');
  });
}


/* ── 6. TOAST NOTIFICATION ───────────────────────────────── */
function showToast(msg, type = 'info') {
  const old = document.getElementById('toast-notif');
  if (old) old.remove();

  const t = document.createElement('div');
  t.id = 'toast-notif';
  Object.assign(t.style, {
    position:'fixed', bottom:'28px', right:'28px',
    padding:'13px 22px', borderRadius:'12px',
    fontFamily:'Nunito,sans-serif', fontWeight:'600', fontSize:'.9rem',
    color:'#fff', zIndex:'9999',
    background: type==='success' ? '#2ecc71' : type==='error' ? '#e74c3c' : '#2980b9',
    boxShadow:'0 8px 30px rgba(0,0,0,.2)',
    opacity:'0', transform:'translateY(15px)',
    transition:'opacity .35s ease, transform .35s ease',
    pointerEvents:'none', maxWidth:'320px',
  });
  t.textContent = msg;
  document.body.appendChild(t);

  requestAnimationFrame(() => {
    t.style.opacity = '1'; t.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity = '0'; t.style.transform = 'translateY(15px)';
    setTimeout(() => t.remove(), 400);
  }, 3000);
}


/* ── 7. SMOOTH SCROLL FALLBACK ───────────────────────────── */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 68,
          behavior: 'smooth'
        });
      }
    }
  });
});


/* ── Console greeting ─────────────────────────────────────── */
console.log(
  '%c👋 Halo Developer! Kode ini dikomentari dengan lengkap — silakan edit sesuai kebutuhan.',
  'color:#f5a623; font-size:13px; font-family:Nunito,sans-serif;'
);