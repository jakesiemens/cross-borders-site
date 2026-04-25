const pillars = {
  bible: {
    title: "Bible Distribution",
    subtitle: "We go to the hard places so people can hold the Word of God in their own language — many for the very first time.",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80",
    stat1: "12+", stat1Label: "Language groups reached",
    stat2: "4,000+", stat2Label: "Scriptures distributed",
    content: [
      "Many of the people groups we serve have never held a book in their own language, let alone the living Word of God.",
      "We work with local translators and couriers to bring Scriptures deep into restricted territories.",
      "Your support ensures the Word of God reaches every tribe and tongue."
    ]
  },
  orphans: {
    title: "Orphan Care",
    subtitle: "Children without parents shouldn't be without hope.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80",
    stat1: "600+", stat1Label: "Children in care",
    stat2: "3", stat2Label: "Safe houses operating",
    content: [
      "Conflict and poverty leave many children without parents. We help provide real care, and the truth that they are seen by God.",
      "Local house parents create family environments where children can heal and grow.",
      "Help us welcome more children and build secure futures."
    ]
  },
  refugees: {
    title: "Refugee Ministry",
    subtitle: "A future vision to meet displaced families with the hope of Christ.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&q=80",
    stat1: "Pray", stat1Label: "For Open Doors",
    stat2: "Vision", stat2Label: "Future Pillar",
    content: [
      "Currently, our primary focus is on Bible distribution, orphan care, and discipleship. However, it is our deep prayer to eventually meet displaced families at border crossing points.",
      "We envision a day when our teams can provide emergency food, water, and shelter materials while sharing the peace of Christ with those fleeing conflict.",
      "Please pray with us as we seek God's timing and provision to launch this vital pillar of the BORDERS mission."
    ]
  },
  discipleship: {
    title: "Discipleship",
    subtitle: "Building deep roots for lasting fruit in the local church.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80",
    stat1: "30+", stat1Label: "Local leaders trained",
    stat2: "15+", stat2Label: "House churches planted",
    content: [
      "Evangelism without discipleship leaves believers vulnerable. We invest heavily in long-term mentorship and pastoral training.",
      "Our model is multiplication: equipping local leaders to pasture and multiply their own communities.",
      "Invest in the deep roots of the highland church."
    ]
  },
  evangelism: {
    title: "Evangelism",
    subtitle: "A vision for taking the Gospel to unreached villages.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80",
    stat1: "Pray", stat1Label: "For Boldness",
    stat2: "Vision", stat2Label: "Future Teams",
    content: [
      "While we currently reach many through our active pillars, our heart burns to deploy dedicated teams to boldly take the Gospel to groups who have never heard the name of Jesus.",
      "We are laying the groundwork and praying for the resources and personnel to launch dedicated evangelism teams into restricted areas in the future.",
      "Partner with us in prayer that doors would open to reach the unreached."
    ]
  },
  relief: {
    title: "Emergency Relief",
    subtitle: "Our prayerful goal to respond to crises with God's love.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&q=80",
    stat1: "Pray", stat1Label: "For Provision",
    stat2: "Vision", stat2Label: "Future Capability",
    content: [
      "Disasters can devastate rural communities in hours. While emergency relief is not currently an active branch of our ministry, we are trusting God to help us build this capacity.",
      "We envision a future where we can maintain supply caches for rapid response, believing that meeting immediate physical needs opens hearts to the message of peace.",
      "Join us in praying for the resources to make this pillar a reality."
    ]
  },
  schooling: {
    title: "Schooling & Education",
    subtitle: "A future vision to break the cycle through truth and literacy.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80",
    stat1: "Pray", stat1Label: "For Teachers",
    stat2: "Vision", stat2Label: "Future Schools",
    content: [
      "Education is protection against exploitation. As our ministry grows, we pray God will open doors to establish Christian schools and learning centers.",
      "Our vision is to provide literacy and biblical values to marginalized youth, ensuring the next generation can read the Word of God for themselves.",
      "Please pray for the foundations of this future pillar."
    ]
  }
};

const posts = [
  {
    id: "bibles-village",
    title: "Light in the Darkness: Bibles Reach Remote Village",
    excerpt: "After months of prayer, a team delivered Scripture portions to a remote highland community.",
    content: "<p>'When we arrived, the village elder held the small booklet and wept.' Praise God for this breakthrough.</p>",
    category: "Bible",
    author: "Missionary A",
    date: "March 19, 2026",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&q=80"
  },
  {
    id: "discipleship-training",
    title: "Equipping the Saints: New Pastoral Training Class",
    excerpt: "This week, we welcomed 12 new local leaders into our intensive discipleship program.",
    content: "<p>These faithful men and women traveled for days to reach our training center. Over the next month, they will dive deep into sound doctrine before returning to lead their house churches.</p>",
    category: "Discipleship",
    author: "Missionary B",
    date: "March 16, 2026",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
  },
  {
    id: "orphan-care-growth",
    title: "Safe Haven: Expanding Our Second House",
    excerpt: "We are adding capacity to welcome 15 more children into a loving, family environment this month.",
    content: "<p>The Lord has provided the funds to finish the new wing of our second safe house. This means 15 children who are currently without families will have a warm bed, meals, and the loving care of Christian house parents next week.</p>",
    category: "Orphans",
    author: "Field Team C",
    date: "March 10, 2026",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80"
  }
];

function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('nav.desktop a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');
  window.scrollTo(0, 0);
  if (page === 'field-updates') renderFuGrid('All');
}

function showDetail(slug) {
  const d = pillars[slug];
  if (!d) return;
  
  let ctaText = d.stat1 === 'Pray' ? `Partner with Us in Prayer for ${d.title}` : `Partner with Us in ${d.title}`;
  let btnText = d.stat1 === 'Pray' ? `Give to the General Fund` : `Give to ${d.title}`;
  
  const html = `
    <div class="pillar-hero">
      <img src="${d.image}" alt="${d.title}" />
      <div class="overlay"></div>
      <div class="title">
        <h1>${d.title}</h1>
        <p>${d.subtitle}</p>
      </div>
    </div>
    <section class="pillar-content">
      <div class="container-sm">
        <a href="#" class="back-link" onclick="showPage('borders')">← Back to All Pillars</a>
        <div class="stats-grid">
          <div class="stat-box primary-tint"><div class=\"num\">${d.stat1}</div><div class=\"lbl\">${d.stat1Label}</div></div>
          <div class=\"stat-box green-tint\"><div class=\"num\">${d.stat2}</div><div class=\"lbl\">${d.stat2Label}</div></div>
        </div>
        <div class=\"rich-content\">${d.content.map(p => `<p>${p}</p>`).join('')}</div>
        <div class=\"pillar-cta\">
          <div class=\"cta-box\">
            <h3>${ctaText}</h3>
            <p>Every dollar goes directly to the field to support the BORDERS mission.</p>
            <div class=\"cta-btns\">
              <a href=\"#\" onclick=\"showPage('donate')\" class=\"btn btn-primary btn-lg\">${btnText}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  document.getElementById('page-detail').innerHTML = html;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-detail').classList.add('active');
  window.scrollTo(0, 0);
}

function showPost(id) {
  const p = posts.find(x => x.id === id);
  if (!p) return;
  const html = `
    <div class=\"post-hero\">
      <img src=\"${p.image}\" alt=\"${p.title}\" />
      <div class=\"overlay\"></div>
      <div class=\"meta-block\">
        <span class=\"cat-label\">${p.category}</span>
        <h1>${p.title}</h1>
        <div class=\"author-line\">${p.author} &nbsp;•&nbsp; ${p.date}</div>
      </div>
    </div>
    <section class=\"post-detail\">
      <div class=\"container-sm\">
        <a href=\"#\" class=\"back-link\" onclick=\"showPage('field-updates')\">← Back to Updates</a>
        <div class=\"post-body\">${p.content}</div>
      </div>
    </section>
  `;
  document.getElementById('page-post').innerHTML = html;
  document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
  document.getElementById('page-post').classList.add('active');
  window.scrollTo(0, 0);
}

function renderFuGrid(cat) {
  const filtered = cat === 'All' ? posts : posts.filter(p => p.category === cat);
  const grid = document.getElementById('fu-grid');
  grid.innerHTML = filtered.map(p => `
    <div class=\"post-card\" onclick=\"showPost('${p.id}')\">
      <div class=\"thumb\"><img src=\"${p.image}\" alt=\"${p.title}\" /><span class=\"cat-tag\">${p.category}</span></div>
      <div class=\"body\">
        <div class=\"meta\">${p.date} &nbsp;•&nbsp; ${p.author}</div>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <div class=\"read-link\">Read Story →</div>
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
function handleSubscribe(e) { e.preventDefault(); e.target.reset(); }
renderFuGrid('All');
</script>
</body>
</html>