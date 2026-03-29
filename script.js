const API_BASE = "https://webroxstudio-backend.onrender.com";

 const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    document.getElementById('back-top').classList.toggle('show', window.scrollY > 400);
  });

  // Mobile menu
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  const mobileClose = document.getElementById('mobileClose');

  function openMobile() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  function closeMobile() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  hamburger.onclick = openMobile;
  hamburger.onkeydown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openMobile();
    }
  };
  mobileClose.onclick = closeMobile;
  mobileMenu.addEventListener('click', (event) => {
    if (event.target === mobileMenu) closeMobile();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobile();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && mobileMenu.classList.contains('open')) {
      closeMobile();
    }
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(r => observer.observe(r));

  // Animate metric bars
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.metric-bar').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.why-visual').forEach(el => barObserver.observe(el));

  // Counter animation
  function animateCount(el, target, duration) {
    let start = 0; const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start);
      if (start >= target) clearInterval(timer);
    }, 16);
  }
  const ctrObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(document.getElementById('c1'), 5, 1500);
        animateCount(document.getElementById('c2'), 2, 1200);
        animateCount(document.getElementById('c3'), 8, 900);
        animateCount(document.getElementById('c4'), 98, 1400);
        ctrObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  ctrObserver.observe(document.getElementById('counters'));

  // Portfolio filter
  // function filterPortfolio(cat, btn) {
  //   document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  //   btn.classList.add('active');
  //   document.querySelectorAll('.portfolio-card').forEach(card => {
  //     const match = cat === 'all' || card.dataset.cat === cat;
  //     card.style.display = match ? '' : 'none';
  //   });
  // }
function filterPortfolio(cat, btn) {

  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.portfolio-card');

  cards.forEach(card => {

    if (cat === 'all') {
      card.style.display = 'block';
    }

    else if (cat === 'website') {
      card.style.display = card.dataset.cat === 'website' ? 'block' : 'none';
    }

    else if (cat === 'app' || cat === 'ecom') {
      card.style.display = 'none';
    }

  });

  // Coming Soon message handle
  const existingMsg = document.getElementById('comingSoonMsg');

  if (cat === 'app' || cat === 'ecom') {

    if (!existingMsg) {
      const msg = document.createElement('div');
      msg.id = 'comingSoonMsg';
      msg.style.textAlign = 'center';
      msg.style.padding = '80px 20px';
      msg.innerHTML = `
        <h2 style="font-size:32px;color:#1a9be8;">🚀 Coming Soon</h2>
        <p style="color:#888;margin-top:10px;">Exciting projects are on the way. Stay tuned!</p>
      `;
      document.getElementById('portfolioGrid').appendChild(msg);
    }

  } else {
    if (existingMsg) existingMsg.remove();
  }

}
  // Contact form
  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }
  // CONTACT FORM SUBMIT
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      businessType: form.businessType.value,
      service: form.service.value,
      message: form.message.value
    };

    const button = form.querySelector("button");
    button.innerText = "Sending...";
    button.disabled = true;

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      button.innerText = "Message Sent ✅";
      form.reset();

    } catch (error) {
      console.error("Error:", error);
      button.innerText = "Try Again ❌";
    }

    setTimeout(() => {
      button.innerText = "🚀 Send My Request — It's Free!";
      button.disabled = false;
    }, 2000);
  });

});
