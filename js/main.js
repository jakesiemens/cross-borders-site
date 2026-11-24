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

// ==========================================
// Donate Page: e-Transfer & Tab Helpers
// ==========================================
function switchDonateTab(method) {
  const tabs = document.querySelectorAll('.method-tab');
  const panels = document.querySelectorAll('.donate-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(t => {
    const isActive = t.dataset.method === method;
    t.classList.toggle('active', isActive);
    t.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  panels.forEach(p => {
    const isActive = p.id === `panel-${method}`;
    p.classList.toggle('active', isActive);
  });
}

function copyEtransferEmail(btn) {
  const email = 'info@cbministries.ca';
  const originalHTML = btn.dataset.originalHtml || btn.innerHTML;
  btn.dataset.originalHtml = originalHTML;

  const markCopied = () => {
    btn.classList.add('copied');
    btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
    clearTimeout(btn._copyTimer);
    btn._copyTimer = setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = originalHTML;
    }, 2400);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(markCopied).catch(() => fallbackCopyText(email, markCopied));
  } else {
    fallbackCopyText(email, markCopied);
  }
}

function fallbackCopyText(text, onSuccess) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    if (onSuccess) onSuccess();
  } catch (err) {
    console.error('Copy failed:', err);
  }
  document.body.removeChild(ta);
}

async function handleEtransferSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerText : '';

  const firstName = (form.querySelector('[name="First Name"]')?.value || '').trim();
  const lastName = (form.querySelector('[name="Last Name"]')?.value || '').trim();
  const email = (form.querySelector('[name="Email Address"]')?.value || '').trim();
  const street = (form.querySelector('[name="Street Address"]')?.value || '').trim();
  const city = (form.querySelector('[name="City"]')?.value || '').trim();
  const province = (form.querySelector('[name="Province"]')?.value || '').trim();
  const postal = (form.querySelector('[name="Postal Code"]')?.value || '').trim().toUpperCase();
  const amount = (form.querySelector('[name="Gift Amount"]')?.value || '').trim();
  const note = (form.querySelector('[name="Designation Note"]')?.value || '').trim();

  const fullAddress = `${street}, ${city}, ${province} ${postal}`.trim();
  const summaryParts = [
    'e-Transfer Receipt Registration',
    `Address: ${fullAddress}`,
    amount ? `Amount: $${amount}` : null,
    note ? `Note/Designation: ${note}` : 'Note/Designation: Where Most Needed (General Fund)'
  ].filter(Boolean);

  const payload = {
    FormType: 'e-Transfer Receipt Info',
    Timestamp: new Date().toISOString(),
    'First Name': firstName,
    'Last Name': lastName,
    'Email Address': email,
    'Street Address': street,
    'City': city,
    'Province': province,
    'Postal Code': postal,
    'Full Address': fullAddress,
    'Gift Amount': amount || 'Not specified',
    'Designation Note': note || 'Where Most Needed',
    'Message': summaryParts.join(' | ')
  };

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Saving Receipt Info...';
  }

  try {
    await fetch(FORM_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    form.reset();
    try { localStorage.setItem('cbm_etransfer_registered', '1'); } catch (_) {}
    const firstTimeWrap = document.getElementById('et-first-time-wrap');
    const bankWrap = document.getElementById('et-bank-details-wrap');
    const returningBanner = document.getElementById('et-returning-banner');
    const bankStepNum = document.getElementById('et-bank-step-num');
    const successBox = document.getElementById('etransfer-success');
    const nameSpan = document.getElementById('etransfer-success-name');

    if (nameSpan && firstName) nameSpan.textContent = firstName;
    if (firstTimeWrap) firstTimeWrap.style.display = 'none';
    if (returningBanner) returningBanner.style.display = 'none';
    if (bankStepNum) bankStepNum.textContent = '2';
    if (bankWrap) bankWrap.style.display = 'block';
    if (successBox) {
      successBox.classList.add('show');
      bankWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } catch (error) {
    console.error('e-Transfer receipt form error:', error);
    alert('There was a problem saving your receipt details. Please email your name and mailing address directly to info@cbministries.ca.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = originalBtnText;
    }
  }
}

function switchDonorMode(mode) {
  const btns = document.querySelectorAll('.donor-toggle-btn');
  btns.forEach(b => {
    const isActive = b.dataset.donorMode === mode;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  const firstTimeWrap = document.getElementById('et-first-time-wrap');
  const bankWrap = document.getElementById('et-bank-details-wrap');
  const returningBanner = document.getElementById('et-returning-banner');
  const successBox = document.getElementById('etransfer-success');
  const bankStepNum = document.getElementById('et-bank-step-num');

  if (mode === 'returning') {
    if (firstTimeWrap) firstTimeWrap.style.display = 'none';
    if (successBox) successBox.classList.remove('show');
    if (returningBanner) returningBanner.style.display = 'flex';
    if (bankStepNum) bankStepNum.textContent = '1';
    if (bankWrap) bankWrap.style.display = 'block';
  } else {
    if (bankWrap) bankWrap.style.display = 'none';
    if (successBox) successBox.classList.remove('show');
    if (returningBanner) returningBanner.style.display = 'none';
    if (firstTimeWrap) firstTimeWrap.style.display = 'block';
  }
}

function resetEtransferForm() {
  switchDonorMode('first-time');
}

// ==========================================
// Canadian Address Type-Ahead Autofill
// ==========================================
const CA_PROVINCE_MAP = {
  'alberta': 'AB', 'ab': 'AB',
  'british columbia': 'BC', 'colombie-britannique': 'BC', 'bc': 'BC',
  'manitoba': 'MB', 'mb': 'MB',
  'new brunswick': 'NB', 'nouveau-brunswick': 'NB', 'nb': 'NB',
  'newfoundland and labrador': 'NL', 'terre-neuve-et-labrador': 'NL', 'nl': 'NL',
  'nova scotia': 'NS', 'nouvelle-écosse': 'NS', 'ns': 'NS',
  'northwest territories': 'NT', 'territoires du nord-ouest': 'NT', 'nt': 'NT',
  'nunavut': 'NU', 'nu': 'NU',
  'ontario': 'ON', 'on': 'ON',
  'prince edward island': 'PE', 'île-du-prince-édouard': 'PE', 'pe': 'PE', 'pei': 'PE',
  'quebec': 'QC', 'québec': 'QC', 'qc': 'QC',
  'saskatchewan': 'SK', 'sk': 'SK',
  'yukon': 'YT', 'yt': 'YT'
};

function initAddressAutocomplete() {
  const streetInput = document.getElementById('et-street');
  const listEl = document.getElementById('et-address-suggestions');
  const cityInput = document.getElementById('et-city');
  const provSelect = document.getElementById('et-prov');
  const postalInput = document.getElementById('et-postal');
  if (!streetInput || !listEl) return;

  let debounceTimer = null;
  let controller = null;
  let activeIndex = -1;
  let currentItems = [];

  function closeList() {
    listEl.classList.remove('open');
    listEl.innerHTML = '';
    activeIndex = -1;
    currentItems = [];
  }

  function applySuggestion(item) {
    if (!item) return;
    if (item.street) {
      const typed = streetInput.value.trim();
      const numMatch = typed.match(/^(\d+[A-Za-z0-9\-\/]*)\s+/);
      if (numMatch && !/^\d/.test(item.street)) {
        streetInput.value = `${numMatch[1]} ${item.street}`;
      } else {
        streetInput.value = item.street;
      }
    }
    if (item.city && cityInput) cityInput.value = item.city;
    if (item.provinceCode && provSelect) provSelect.value = item.provinceCode;
    if (item.postcode && postalInput) postalInput.value = item.postcode.toUpperCase();
    closeList();
  }

  function highlightItem(idx) {
    const buttons = listEl.querySelectorAll('.address-suggestion-item');
    buttons.forEach((b, i) => b.classList.toggle('active', i === idx));
  }

  streetInput.addEventListener('input', () => {
    const q = streetInput.value.trim();
    clearTimeout(debounceTimer);
    if (q.length < 4) {
      closeList();
      return;
    }

    debounceTimer = setTimeout(async () => {
      if (controller) controller.abort();
      controller = new AbortController();

      try {
        // Canada bounding box to prioritize Canadian addresses
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=6&bbox=-141.0,41.7,-52.6,83.1&lang=en`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) return;
        const json = await res.json();
        const features = (json.features || []).filter(f => {
          const p = f.properties || {};
          return !p.countrycode || p.countrycode.toUpperCase() === 'CA';
        });

        const parsed = [];
        const seen = new Set();
        for (const f of features) {
          const p = f.properties || {};
          const streetLine = [p.housenumber, p.street || p.name].filter(Boolean).join(' ').trim();
          const city = p.city || p.town || p.village || p.municipality || p.locality || '';
          const stateRaw = (p.state || '').toLowerCase().trim();
          const provinceCode = CA_PROVINCE_MAP[stateRaw] || '';
          const postcode = (p.postcode || '').trim().toUpperCase();
          if (!streetLine) continue;

          const subLine = [city, provinceCode, postcode].filter(Boolean).join(', ');
          const dedupeKey = `${streetLine}|${subLine}`.toLowerCase();
          if (seen.has(dedupeKey)) continue;
          seen.add(dedupeKey);

          parsed.push({ street: streetLine, city, provinceCode, postcode, subLine });
          if (parsed.length >= 5) break;
        }

        if (!parsed.length) {
          closeList();
          return;
        }

        currentItems = parsed;
        activeIndex = -1;
        listEl.innerHTML = parsed.map((item, idx) => `
          <button type="button" class="address-suggestion-item" role="option" data-idx="${idx}">
            <span class="address-suggestion-main">${item.street.replace(/</g, '&lt;')}</span>
            ${item.subLine ? `<span class="address-suggestion-sub">${item.subLine.replace(/</g, '&lt;')}</span>` : ''}
          </button>
        `).join('');

        listEl.querySelectorAll('.address-suggestion-item').forEach(btn => {
          btn.addEventListener('mousedown', (ev) => {
            ev.preventDefault();
            applySuggestion(currentItems[Number(btn.dataset.idx)]);
          });
        });

        listEl.classList.add('open');
      } catch (err) {
        if (err.name !== 'AbortError') closeList();
      }
    }, 350);
  });

  streetInput.addEventListener('keydown', (ev) => {
    if (!listEl.classList.contains('open') || !currentItems.length) return;
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      activeIndex = (activeIndex + 1) % currentItems.length;
      highlightItem(activeIndex);
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      activeIndex = (activeIndex - 1 + currentItems.length) % currentItems.length;
      highlightItem(activeIndex);
    } else if (ev.key === 'Enter' && activeIndex >= 0) {
      ev.preventDefault();
      applySuggestion(currentItems[activeIndex]);
    } else if (ev.key === 'Escape') {
      closeList();
    }
  });

  document.addEventListener('click', (ev) => {
    if (!ev.target.closest('.address-autocomplete-wrap')) closeList();
  });
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

  // Support deep linking directly to card or etransfer tab on donate.html
  const methodParam = urlParams.get('method') || window.location.hash.replace('#', '');
  if (methodParam === 'card' || methodParam === 'etransfer') {
    switchDonateTab(methodParam);
  }

  initAddressAutocomplete();

  // Remember returning e-Transfer donors on this device so they see info@cbministries.ca right away
  if (document.getElementById('et-first-time-wrap')) {
    const isReturning = (() => {
      try { return localStorage.getItem('cbm_etransfer_registered') === '1'; } catch (_) { return false; }
    })();
    if (isReturning) switchDonorMode('returning');
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
