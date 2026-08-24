const basePath = window.location.pathname.includes('/pillars/') || window.location.pathname.includes('\\pillars\\') ? '../' : './';
let slideIndices = {};
let lightboxGallery = [];
let lightboxIndex = 0;

function initSlideshow(id) {
  slideIndices[id] = 1;
  showSlides(slideIndices[id], id);
}

function plusSlides(n, id) {
  showSlides(slideIndices[id] += n, id);
}

function currentSlide(n, id) {
  showSlides(slideIndices[id] = n, id);
}

function showSlides(n, id) {
  let i;
  let slides = document.querySelectorAll('#slideshow-' + id + ' .slide');
  let dots = document.querySelectorAll('#slideshow-' + id + ' .slide-dot');
  if (!slides || slides.length === 0) return;
  if (n > slides.length) {slideIndices[id] = 1}    
  if (n < 1) {slideIndices[id] = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
    slides[i].classList.remove('active');
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  if (slides[slideIndices[id]-1]) {
    slides[slideIndices[id]-1].style.display = "block";  
    slides[slideIndices[id]-1].classList.add("active");
  }
  if (dots[slideIndices[id]-1]) {
    dots[slideIndices[id]-1].className += " active";
  }
}

function renderSlideshowHTML(images, id) {
  if (!images || images.length === 0) return '';
  // Stringify the images array for the onclick handler
  const imagesJson = JSON.stringify(images).replace(/"/g, '&quot;');
  
  let slides = images.map((img, idx) => `
    <div class="slide">
      <img src="${img.replace('./', basePath)}" alt="Gallery Image ${idx + 1}" onclick="openLightboxFromGallery(${imagesJson}, ${idx})" style="cursor: zoom-in;" />
    </div>
  `).join('');
  let dots = images.map((_, idx) => `
    <span class="slide-dot" onclick="currentSlide(${idx+1}, '${id}')"></span>
  `).join('');

  return `
    <div class="slideshow-wrapper" id="slideshow-${id}">
      <div class="slideshow-container">
        ${slides}
        <a class="prev" onclick="plusSlides(-1, '${id}')">&#10094;</a>
        <a class="next" onclick="plusSlides(1, '${id}')">&#10095;</a>
      </div>
      <div class="dot-container">
        ${dots}
      </div>
    </div>
  `;
}

function renderPillarHTML(slug) {
  const d = pillars[slug];
  if (!d) return;
  
  let ctaText = d.stat1 === 'Pray' ? `Partner with Us in Prayer for ${d.title}` : `Partner with Us in ${d.title}`;
  let btnText = d.stat1 === 'Pray' ? `Give to the General Fund` : `Give to ${d.title}`;
  
  const slugToCat = {
    'bible': 'Bible',
    'orphans': 'Orphans',
    'refugees': 'Refugees',
    'discipleship': 'Discipleship',
    'evangelism': 'Evangelism',
    'relief': 'Relief',
    'schooling': 'Schooling'
  };
  const currentCat = slugToCat[slug];
  const relatedPosts = posts.filter(p => p.category === currentCat);
  let relatedHtml = '';
  if (relatedPosts.length > 0) {
    relatedHtml = `
      <div class="related-updates">
        <h3 style="margin-bottom: 24px; color: var(--primary);">Stories from this Pillar</h3>
        <div class="updates-grid">
          ${relatedPosts.map(p => `
            <div class="post-card" onclick="window.location.href=basePath + 'field-updates.html?post=${p.id}'">
              <div class="thumb"><img src="${p.image.replace('./', basePath)}" alt="${p.title}" /><span class="cat-tag">${p.category}</span></div>
              <div class="body">
                <div class="meta">${p.date} &nbsp;•&nbsp; ${p.author}</div>
                <h4 style="margin: 8px 0; font-size: 1.1rem; color: var(--text);">${p.title}</h4>
                <div class="read-link">Read Update →</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  const html = `
    <div class="pillar-hero">
      <img src="${d.image.replace('./', basePath)}" alt="${d.title}" />
      <div class="overlay"></div>
      <div class="title">
        <h1>${d.title}</h1>
        <p>${d.subtitle}</p>
      </div>
    </div>
    <section class="pillar-content">
      <div class="container-sm">
        <a href="#" class="back-link" onclick="window.location.href=basePath + 'borders.html'">← Back to All Pillars</a>
        <div class="stats-grid">
          <div class="stat-box primary-tint"><div class="num">${d.stat1}</div><div class="lbl">${d.stat1Label}</div></div>
          <div class="stat-box green-tint"><div class="num">${d.stat2}</div><div class="lbl">${d.stat2Label}</div></div>
        </div>
        <div class="rich-content">${d.content.map(p => `<p>${p}</p>`).join('')}</div>
        ${d.images ? renderSlideshowHTML(d.images, slug) : ''}
        ${relatedHtml}
        <div class="pillar-cta">
          <div class="cta-box">
            <h3>${ctaText}</h3>
            <p>Every dollar goes directly to the field to support the BORDERS mission.</p>
            <div class="cta-btns">
              <a href="#" onclick="window.location.href=basePath + 'donate.html'" class="btn btn-primary btn-lg">${btnText}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  const container = document.getElementById('pillar-content-container');
  if (container) {
     container.innerHTML = html;
  }
  
  if (d.images && d.images.length > 0) initSlideshow(slug);
  window.scrollTo(0, 0);
}

function renderPostHTML(id) {
  const p = posts.find(x => x.id === id);
  if (!p) return;
  const html = `
    <div class="post-hero">
      <img src="${p.image.replace('./', basePath)}" alt="${p.title}" />
      <div class="overlay"></div>
      <div class="meta-block">
        <span class="cat-label">${p.category}</span>
        <h1>${p.title}</h1>
        <div class="author-line">${p.author} &nbsp;•&nbsp; ${p.date}</div>
      </div>
    </div>
    <section class="post-detail">
      <div class="container-sm">
        <a href="#" class="back-link" onclick="window.location.href=basePath + 'field-updates.html'">← Back to Updates</a>
        <div class="post-body">${p.content}</div>
        ${p.images ? renderSlideshowHTML(p.images, id) : ''}
      </div>
    </section>
  `;
  const grid = document.getElementById('fu-grid');
  if (grid) {
     grid.parentElement.innerHTML = html;
  }
  
  if (p.images && p.images.length > 0) initSlideshow(id);
  window.scrollTo(0, 0);
}

function renderFuGrid(cat) {
  const filtered = cat === 'All' ? posts : posts.filter(p => p.category === cat);
  const grid = document.getElementById('fu-grid');
  if (!grid) return;
  grid.innerHTML = filtered.map(p => `
    <div class="post-card" onclick="window.location.href=basePath + 'field-updates.html?post=${p.id}'">
      <div class="thumb"><img src="${p.image.replace('./', basePath)}" alt="${p.title}" /><span class="cat-tag">${p.category}</span></div>
      <div class="body">
        <div class="meta">${p.date} &nbsp;•&nbsp; ${p.author}</div>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <div class="read-link">Read Story →</div>
      </div>
    </div>
  `).join('');
}

function filterCat(btn, cat) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderFuGrid(cat);
}

function toggleMobile() { document.getElementById('mobile-nav').classList.toggle('open'); }
function closeMobile() { document.getElementById('mobile-nav').classList.remove('open'); }
// ==========================================
// Form Submission Backend (Google Sheets Web App)
// ==========================================
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwnAj_SwaWyOMUruDvEfO6fFbK9eRXzEiRwEeif0Egz5ab6VeZVlBpmVEmgnSIT_Gjk5A/exec';

async function submitFormData(payload, form, successMsg, submitBtn) {
  const originalBtnText = submitBtn ? submitBtn.innerText : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Submitting...';
  }

  try {
    if (!FORM_ENDPOINT || FORM_ENDPOINT.includes('GOOGLE_SHEET_WEB_APP_URL')) {
      console.warn("Google Sheet Web App URL is not yet set in FORM_ENDPOINT.");
    }

    await fetch(FORM_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    form.reset();
    alert(successMsg);
  } catch (error) {
    console.error("Submission error:", error);
    alert('There was a problem submitting your request. Please try again.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = originalBtnText;
    }
  }
}

async function handleSubscribe(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const inputs = form.querySelectorAll('input');
  
  const payload = {
    FormType: 'Prayer Team Subscription',
    Timestamp: new Date().toISOString()
  };
  
  inputs.forEach(i => {
    const key = i.placeholder || i.name || 'field';
    if (i.value) payload[key] = i.value;
  });
  
  await submitFormData(payload, form, 'Thank you for joining our prayer team!', submitBtn);
}

async function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const inputs = form.querySelectorAll('input, textarea');
  
  const payload = {
    FormType: 'Contact Form Message',
    Timestamp: new Date().toISOString()
  };
  
  inputs.forEach(i => {
    const key = i.name || i.placeholder || 'field';
    if (i.value) payload[key] = i.value;
  });
  
  await submitFormData(payload, form, 'Thank you! Your message has been sent successfully.', submitBtn);
}

function openLightbox(src) {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  modal.style.display = "block";
  modalImg.src = src;
  lightboxGallery = [src];
  lightboxIndex = 0;
  updateLightboxNav();
}

function openLightboxFromGallery(images, index) {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  modal.style.display = "block";
  lightboxGallery = images.map(img => img.replace('./', basePath));
  lightboxIndex = index;
  modalImg.src = lightboxGallery[lightboxIndex];
  updateLightboxNav();
}

function changeLightbox(n, e) {
  if (e) e.stopPropagation();
  lightboxIndex += n;
  if (lightboxIndex >= lightboxGallery.length) lightboxIndex = 0;
  if (lightboxIndex < 0) lightboxIndex = lightboxGallery.length - 1;
  document.getElementById('lightbox-img').src = lightboxGallery[lightboxIndex];
}

function updateLightboxNav() {
  const prev = document.querySelector('.lightbox-prev');
  const next = document.querySelector('.lightbox-next');
  if (lightboxGallery.length <= 1) {
    if (prev) prev.style.display = 'none';
    if (next) next.style.display = 'none';
  } else {
    if (prev) prev.style.display = 'block';
    if (next) next.style.display = 'block';
  }
}

function closeLightbox(e) {
  if (e) {
    if (e.target.id === 'lightbox-img' || e.target.classList.contains('lightbox-prev') || e.target.classList.contains('lightbox-next')) return;
  }
  document.getElementById('lightbox-modal').style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const post_id = urlParams.get('post');
  if (post_id) {
    const hero = document.querySelector('.fu-hero');
    if (hero) hero.style.display = 'none';
    renderPostHTML(post_id);
  } else if (document.getElementById('fu-grid')) {
    renderFuGrid('All');
  }
  
  // Keyboard support for lightbox
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (modal && modal.style.display === 'block') {
      if (e.key === 'ArrowLeft') changeLightbox(-1);
      if (e.key === 'ArrowRight') changeLightbox(1);
      if (e.key === 'Escape') closeLightbox();
    }
  });
});
