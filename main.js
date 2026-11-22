/**
 * Sunny Sips / On The Bright Side - Main Interactive Script
 * ========================================================
 * Features:
 * 1. Fruit Blast Click Particle Engine (juicy splash on every click!)
 * 2. 3-Size Drink Switcher & Dynamic Pricing (250ml, 350ml, 500ml)
 * 3. Drink Inspector Modal with Realistic Liquid & Slices
 * 4. Playable 30-Second "☀️ SLICE. SCORE. SIP!" Fruit Ninja Mini-Game
 * 5. Navigation, Mobile Hamburger Menu & Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Fruit Blast Click Particle Engine
  setupFruitBlastEffect();

  // 2. Sync Config Values across pages
  syncConfigValues();

  // 3. Navigation & Sticky Header
  setupMobileNav();
  highlightCurrentPage();
  setupStickyHeader();

  // 4. Menu: 3-Size Switcher & Drink Inspector Modal
  setupMenuSizeSwitcher();
  setupDrinkModalInspector();

  // 5. Interactive Fruit Ninja Game ("Slice. Score. Sip!")
  setupFruitNinjaGame();

  // 6. Contact & Newsletter Forms
  setupContactForm();
  setupNewsletterForm();
});

/* ==========================================================================
   1. FRUIT BLAST PARTICLE EFFECT (CLICK EXPLOSION)
   ========================================================================== */
function setupFruitBlastEffect() {
  const fruitEmojis = ['🍉', '🍊', '🍋', '🍓', '🥝', '🥭', '🍍', '🍒'];
  const splashColors = ['#FFC629', '#FF941F', '#FF7770', '#347B43', '#FFA726'];

  document.addEventListener('click', (e) => {
    // Don't spawn while playing Fruit Ninja canvas game to avoid double distraction
    if (e.target.closest('#fruitNinjaCanvas')) return;

    const x = e.clientX;
    const y = e.clientY;

    // Spawn 6 fruit slice emojis
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.className = 'fruit-blast-particle';
      particle.textContent = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];

      const angle = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.5;
      const distance = 50 + Math.random() * 80;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const rot = (Math.random() - 0.5) * 360;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);
      particle.style.setProperty('--rot', `${rot}deg`);

      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 850);
    }

    // Spawn 8 juice splash droplets
    for (let i = 0; i < 8; i++) {
      const drop = document.createElement('div');
      drop.className = 'juice-splash-dot';
      const size = 6 + Math.random() * 8;
      drop.style.width = `${size}px`;
      drop.style.height = `${size}px`;
      drop.style.backgroundColor = splashColors[Math.floor(Math.random() * splashColors.length)];

      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 70;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;

      drop.style.left = `${x}px`;
      drop.style.top = `${y}px`;
      drop.style.setProperty('--dx', `${dx}px`);
      drop.style.setProperty('--dy', `${dy}px`);

      document.body.appendChild(drop);
      setTimeout(() => drop.remove(), 600);
    }
  });
}

/* ==========================================================================
   2. SYNC CENTRAL CONFIG VALUES
   ========================================================================== */
function syncConfigValues() {
  if (typeof SUNNY_SIPS_CONFIG === 'undefined') return;
  const cfg = SUNNY_SIPS_CONFIG;

  // Outlet Details
  document.querySelectorAll('[data-config="address"]').forEach(el => {
    el.textContent = cfg.outlet.address;
  });
  document.querySelectorAll('[data-config="hours"]').forEach(el => {
    el.textContent = `${cfg.outlet.hours} (${cfg.outlet.workingDays})`;
  });
  document.querySelectorAll('[data-config="phone"]').forEach(el => {
    el.textContent = cfg.outlet.phoneDisplay;
  });
  document.querySelectorAll('[data-config="email"]').forEach(el => {
    el.textContent = cfg.outlet.email;
  });
  document.querySelectorAll('[data-config="order-link"]').forEach(el => {
    el.href = cfg.ordering.orderNowUrl;
  });
  document.querySelectorAll('[data-config="maps-link"]').forEach(el => {
    el.href = cfg.outlet.googleMapsDirectionsUrl;
  });
  document.querySelectorAll('[data-config="hashtag"]').forEach(el => {
    el.textContent = cfg.social.hashtag;
  });
}

/* ==========================================================================
   3. MENU: 3-SIZE SWITCHER & DYNAMIC PRICING
   ========================================================================== */
const DRINK_PRICES = {
  // Fruit Coolers
  "Mango Magic": { "250ml": "₹99", "350ml": "₹129", "500ml": "₹159", color: "#FF941F", desc: "Sweet tropical mango pulp shaken with chilled sparkling water and a hint of lime." },
  "Orange Bliss": { "250ml": "₹99", "350ml": "₹129", "500ml": "₹159", color: "#FF941F", desc: "Sun-ripened orange juice infused with crushed mint and cooling citrus botanicals." },
  "Berry Buzz": { "250ml": "₹109", "350ml": "₹139", "500ml": "₹169", color: "#FF7770", desc: "A lively blend of wild strawberries and cranberries with a sparkling fizzy finish." },
  "Minty Cool": { "250ml": "₹89", "350ml": "₹119", "500ml": "₹149", color: "#347B43", desc: "Crisp green apples muddled with fresh garden mint leaves and chilled spring water." },
  "Grape Groove": { "250ml": "₹99", "350ml": "₹129", "500ml": "₹159", color: "#8E24AA", desc: "Rich Bangalore blue grape infusion served ice-cold with sweet floral notes." },
  "Tropical Twist": { "250ml": "₹109", "350ml": "₹139", "500ml": "₹169", color: "#FF941F", desc: "Pineapple, passion fruit, and citrus layers that bring vacation vibes to your break." },

  // Lemonades – Lemon Days
  "Classic Sunshine Lemonade": { "250ml": "₹79", "350ml": "₹99", "500ml": "₹129", color: "#FFC629", desc: "Traditional cold-pressed lemons sweetened with cane sugar and a pinch of rock salt." },
  "Mint Splash Lemonade": { "250ml": "₹89", "350ml": "₹109", "500ml": "₹139", color: "#FFCA28", desc: "Freshly crushed spearmint infused with zesty citrus and crushed ice crystals." },
  "Ginger Zing Lemonade": { "250ml": "₹89", "350ml": "₹109", "500ml": "₹139", color: "#FFA726", desc: "A fiery punch of fresh ginger juice paired with crisp yellow lemon." },
  "Pink Berry Lemonade": { "250ml": "₹99", "350ml": "₹119", "500ml": "₹149", color: "#FF7770", desc: "Juicy raspberry puree swirled into sparkling lemonade for a vibrant pink aesthetic." },

  // Iced Teas – Tea Time
  "Peach Breeze Iced Tea": { "250ml": "₹89", "350ml": "₹109", "500ml": "₹139", color: "#FF7770", desc: "Delicate black tea infused with sweet white peach nectar and aromatic lemon peel." },
  "Lemon Herbal Iced Tea": { "250ml": "₹79", "350ml": "₹99", "500ml": "₹129", color: "#E65100", desc: "Classic amber tea balanced with tangy citrus slices and a soothing herbal finish." },
  "Berry Hibiscus Iced Tea": { "250ml": "₹99", "350ml": "₹119", "500ml": "₹149", color: "#C2185B", desc: "Ruby hibiscus herbal brew loaded with mixed red berries and subtle floral undertones." },
  "Mango Mint Green Tea": { "250ml": "₹99", "350ml": "₹119", "500ml": "₹149", color: "#7CB342", desc: "Antioxidant-rich chilled green tea infused with ripe mango essence and crisp mint." },

  // Blended Fruit Drinks – Happy Blends
  "Tropical Sunshine Blend": { "250ml": "₹119", "350ml": "₹149", "500ml": "₹179", color: "#FFB300", desc: "Mango, pineapple, and sweet banana blended with coconut water for creamy refreshment." },
  "Berry Burst Smoothie": { "250ml": "₹129", "350ml": "₹159", "500ml": "₹189", color: "#E91E63", desc: "Real strawberries, blueberries, and bananas whip together for a thick antioxidant boost." },
  "Kiwi Green Chill": { "250ml": "₹119", "350ml": "₹149", "500ml": "₹179", color: "#4CAF50", desc: "Tart kiwi, green apples, and cucumber blended ice-cold with sweet lime and chia seeds." },
  "Watermelon Cooler Blend": { "250ml": "₹109", "350ml": "₹139", "500ml": "₹169", color: "#FF5252", desc: "Crisp fresh watermelon blended with basil seeds and pink Himalayan rock salt." }
};

let currentGlobalSize = "350ml"; // Default to popular medium

function setupMenuSizeSwitcher() {
  const sizePills = document.querySelectorAll('.size-pill-btn');
  if (!sizePills.length) return;

  function updatePricesForSize(size) {
    currentGlobalSize = size;
    sizePills.forEach(pill => {
      pill.classList.toggle('is-active', pill.dataset.size === size);
    });

    document.querySelectorAll('.drink-item-card').forEach(card => {
      const drinkName = card.querySelector('.drink-item-name')?.textContent.trim();
      const priceTag = card.querySelector('.drink-item-price-tag');
      const sizeTag = card.querySelector('.card-active-size');

      if (drinkName && DRINK_PRICES[drinkName]) {
        const price = DRINK_PRICES[drinkName][size];
        if (priceTag) priceTag.textContent = price;
        if (sizeTag) {
          const volLabel = size === "250ml" ? "250 ml (Regular)" : size === "350ml" ? "350 ml (Medium)" : "500 ml (Large)";
          sizeTag.textContent = volLabel;
        }
      }
    });
  }

  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      updatePricesForSize(pill.dataset.size);
    });
  });

  // Initial populate
  updatePricesForSize(currentGlobalSize);
}

/* ==========================================================================
   4. REALISTIC DRINK INSPECTOR MODAL
   ========================================================================== */
function setupDrinkModalInspector() {
  const modal = document.getElementById('drinkModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.inspector-close-btn');
  const titleEl = document.getElementById('modalDrinkName');
  const descEl = document.getElementById('modalDrinkDesc');
  const priceEl = document.getElementById('modalDrinkPrice');
  const cupWrapper = modal.querySelector('.realistic-cup-wrapper');
  const liquidPath = document.getElementById('modalCupLiquid');
  const sizeBtns = modal.querySelectorAll('.modal-size-btn');
  const orderBtn = document.getElementById('modalOrderBtn');

  let activeDrink = "Mango Magic";
  let activeModalSize = "350ml";

  function openDrink(drinkName) {
    const data = DRINK_PRICES[drinkName];
    if (!data) return;

    activeDrink = drinkName;
    activeModalSize = currentGlobalSize;

    if (titleEl) titleEl.textContent = drinkName;
    if (descEl) descEl.textContent = data.desc;
    if (liquidPath) liquidPath.setAttribute('fill', data.color);

    updateModalSize(activeModalSize);

    modal.classList.add('is-active');
    document.body.classList.add('menu-open-scroll-lock');
  }

  function updateModalSize(size) {
    activeModalSize = size;
    const data = DRINK_PRICES[activeDrink];
    if (!data) return;

    const price = data[size];
    if (priceEl) priceEl.textContent = `${price} (${size})`;

    if (cupWrapper) {
      cupWrapper.setAttribute('data-size', size);
    }

    sizeBtns.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.size === size);
    });

    if (orderBtn) {
      const message = encodeURIComponent(`Hi Sunny Sips! I'd like to order 1x ${activeDrink} (${size} - ${price}) to HSR Layout!`);
      orderBtn.href = `https://wa.me/910000000000?text=${message}`;
    }
  }

  // Bind clicks on all drink cards
  document.querySelectorAll('.drink-item-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.drink-item-name')?.textContent.trim();
      if (name) openDrink(name);
    });
  });

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateModalSize(btn.dataset.size);
    });
  });

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.classList.remove('menu-open-scroll-lock');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) closeModal();
  });
}

/* ==========================================================================
   5. PLAYABLE 30-SECOND FRUIT NINJA MINI-GAME
   "☀️ SLICE. SCORE. SIP!"
   ========================================================================== */
function setupFruitNinjaGame() {
  const gameModal = document.getElementById('fruitGameModal');
  const startButtons = document.querySelectorAll('.open-game-btn');
  if (!gameModal) return;

  const canvas = document.getElementById('fruitNinjaCanvas');
  const closeBtn = gameModal.querySelector('.game-close-btn');
  const startOverlay = document.getElementById('gameStartScreen');
  const endOverlay = document.getElementById('gameEndScreen');
  const playNowBtn = document.getElementById('gamePlayNowBtn');
  const playAgainBtn = document.getElementById('gamePlayAgainBtn');

  const timerEl = document.getElementById('gameTimerVal');
  const scoreEl = document.getElementById('gameScoreVal');

  const scorecardIdEl = document.getElementById('scorecardPlayerId');
  const scorecardScoreEl = document.getElementById('scorecardScore');
  const scorecardRewardEl = document.getElementById('scorecardReward');

  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let animationFrameId;
  let gameIntervalId;
  let timeLeft = 30;
  let score = 0;
  let isPlaying = false;

  const fruits = [];
  const slices = [];
  const trail = [];

  const FRUIT_TYPES = [
    { name: 'Watermelon', emoji: '🍉', color: '#E91E63', points: 10, radius: 36 },
    { name: 'Orange', emoji: '🍊', color: '#FF941F', points: 10, radius: 32 },
    { name: 'Lemon', emoji: '🍋', color: '#FFC629', points: 10, radius: 30 },
    { name: 'Strawberry', emoji: '🍓', color: '#FF7770', points: 15, radius: 28 },
    { name: 'Kiwi', emoji: '🥝', color: '#347B43', points: 15, radius: 30 },
    { name: 'Pineapple', emoji: '🍍', color: '#FFD54F', points: 20, radius: 38 }
  ];

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resizeCanvas);

  function openGame() {
    gameModal.classList.add('is-active');
    document.body.classList.add('menu-open-scroll-lock');
    resizeCanvas();
    startOverlay.style.display = 'flex';
    endOverlay.style.display = 'none';
    isPlaying = false;
  }

  function closeGame() {
    gameModal.classList.remove('is-active');
    document.body.classList.remove('menu-open-scroll-lock');
    stopGame();
  }

  startButtons.forEach(btn => btn.addEventListener('click', openGame));
  if (closeBtn) closeBtn.addEventListener('click', closeGame);

  function startGame() {
    startOverlay.style.display = 'none';
    endOverlay.style.display = 'none';
    timeLeft = 30;
    score = 0;
    fruits.length = 0;
    slices.length = 0;
    trail.length = 0;
    isPlaying = true;

    if (timerEl) timerEl.textContent = `0:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
    if (scoreEl) scoreEl.textContent = score;

    resizeCanvas();

    clearInterval(gameIntervalId);
    gameIntervalId = setInterval(() => {
      timeLeft--;
      if (timerEl) timerEl.textContent = `0:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);

    lastSpawnTime = Date.now();
    cancelAnimationFrame(animationFrameId);
    gameLoop();
  }

  function stopGame() {
    isPlaying = false;
    clearInterval(gameIntervalId);
    cancelAnimationFrame(animationFrameId);
  }

  function endGame() {
    stopGame();
    // Generate Digital Scorecard
    const randomId = `#BRIGHT-${Math.floor(1000 + Math.random() * 9000)}`;
    if (scorecardIdEl) scorecardIdEl.textContent = randomId;
    if (scorecardScoreEl) scorecardScoreEl.textContent = score;

    let reward = "5% OFF Your Next Fresh Sip!";
    if (score >= 150) {
      reward = "🏆 15% OFF + Entry for Weekly Free Drink!";
    } else if (score >= 100) {
      reward = "⭐ 10% OFF + Top 10 Weekly Leaderboard!";
    } else if (score >= 50) {
      reward = "🎉 5% OFF on Any 350ml Drink!";
    } else {
      reward = "☀️ Participant Scorecard — Keep Slicing!";
    }

    if (scorecardRewardEl) scorecardRewardEl.textContent = reward;

    endOverlay.style.display = 'flex';
  }

  let lastSpawnTime = 0;

  function spawnFruit() {
    const type = FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)];
    const x = 50 + Math.random() * (canvas.width - 100);
    const y = canvas.height + 40;
    const vx = (canvas.width / 2 - x) * 0.012 + (Math.random() - 0.5) * 3;
    const vy = -(11 + Math.random() * 4);

    fruits.push({
      ...type,
      x,
      y,
      vx,
      vy,
      gravity: 0.28,
      rotation: 0,
      vRot: (Math.random() - 0.5) * 0.1,
      sliced: false
    });
  }

  // Pointer slice tracking
  let isPointerDown = false;
  let lastPos = null;

  function recordPointer(x, y) {
    trail.push({ x, y, time: Date.now() });
    if (trail.length > 12) trail.shift();

    if (lastPos && isPlaying) {
      checkSlice(lastPos.x, lastPos.y, x, y);
    }
    lastPos = { x, y };
  }

  canvas.addEventListener('mousedown', (e) => {
    isPointerDown = true;
    const r = canvas.getBoundingClientRect();
    lastPos = { x: e.clientX - r.left, y: e.clientY - r.top };
  });

  window.addEventListener('mouseup', () => {
    isPointerDown = false;
    lastPos = null;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isPointerDown) return;
    const r = canvas.getBoundingClientRect();
    recordPointer(e.clientX - r.left, e.clientY - r.top);
  });

  // Touch Support for mobile
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isPointerDown = true;
    const touch = e.touches[0];
    const r = canvas.getBoundingClientRect();
    lastPos = { x: touch.clientX - r.left, y: touch.clientY - r.top };
  }, { passive: false });

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!isPointerDown) return;
    const touch = e.touches[0];
    const r = canvas.getBoundingClientRect();
    recordPointer(touch.clientX - r.left, touch.clientY - r.top);
  }, { passive: false });

  canvas.addEventListener('touchend', () => {
    isPointerDown = false;
    lastPos = null;
  });

  function checkSlice(x1, y1, x2, y2) {
    fruits.forEach((fruit, idx) => {
      if (fruit.sliced) return;

      const d = distToSegment({ x: fruit.x, y: fruit.y }, { x: x1, y: y1 }, { x: x2, y: y2 });
      if (d < fruit.radius) {
        fruit.sliced = true;
        score += fruit.points;
        if (scoreEl) scoreEl.textContent = score;

        // Create sliced halves
        slices.push({
          x: fruit.x - 10,
          y: fruit.y,
          vx: fruit.vx - 3,
          vy: fruit.vy - 1,
          gravity: 0.35,
          color: fruit.color,
          emoji: fruit.emoji,
          rotation: fruit.rotation,
          vRot: -0.15,
          alpha: 1
        });

        slices.push({
          x: fruit.x + 10,
          y: fruit.y,
          vx: fruit.vx + 3,
          vy: fruit.vy - 1,
          gravity: 0.35,
          color: fruit.color,
          emoji: fruit.emoji,
          rotation: fruit.rotation,
          vRot: 0.15,
          alpha: 1
        });

        fruits.splice(idx, 1);
      }
    });
  }

  function distToSegment(p, v, w) {
    const l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
    if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
  }

  function gameLoop() {
    if (!isPlaying) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawning
    if (Date.now() - lastSpawnTime > 750) {
      spawnFruit();
      if (Math.random() > 0.4) spawnFruit(); // Combo launch
      lastSpawnTime = Date.now();
    }

    // Update & draw fruits
    for (let i = fruits.length - 1; i >= 0; i--) {
      const f = fruits[i];
      f.x += f.vx;
      f.y += f.vy;
      f.vy += f.gravity;
      f.rotation += f.vRot;

      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rotation);
      ctx.font = `${f.radius * 1.5}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(f.emoji, 0, 0);
      ctx.restore();

      if (f.y > canvas.height + 60 && f.vy > 0) {
        fruits.splice(i, 1);
      }
    }

    // Update & draw sliced pieces
    for (let i = slices.length - 1; i >= 0; i--) {
      const s = slices[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += s.gravity;
      s.rotation += s.vRot;
      s.alpha -= 0.015;

      ctx.save();
      ctx.globalAlpha = Math.max(0, s.alpha);
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.font = '28px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.emoji, 0, 0);
      ctx.restore();

      if (s.alpha <= 0 || s.y > canvas.height + 60) {
        slices.splice(i, 1);
      }
    }

    // Draw Blade Trail
    const now = Date.now();
    for (let i = trail.length - 1; i >= 0; i--) {
      if (now - trail[i].time > 180) {
        trail.splice(i, 1);
      }
    }

    if (trail.length > 1) {
      ctx.save();
      ctx.strokeStyle = '#FFE043';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.shadowColor = '#FF941F';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y);
      }
      ctx.stroke();
      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(gameLoop);
  }

  if (playNowBtn) playNowBtn.addEventListener('click', startGame);
  if (playAgainBtn) playAgainBtn.addEventListener('click', startGame);
}

/* ==========================================================================
   6. HEADER, NAV & FORM UTILITIES
   ========================================================================== */
function setupMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.main-nav');
  if (!toggleBtn || !navMenu) return;

  function toggleMenu(forceClose = false) {
    const isExpanded = forceClose ? true : toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('nav-open');
      document.body.classList.remove('menu-open-scroll-lock');
    } else {
      toggleBtn.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('nav-open');
      document.body.classList.add('menu-open-scroll-lock');
    }
  }

  toggleBtn.addEventListener('click', () => toggleMenu());
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 840) toggleMenu(true);
    });
  });
}

function highlightCurrentPage() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(link => {
    const linkPath = link.getAttribute('href').split('#')[0];
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function setupStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }, { passive: true });
}

function setupContactForm() {
  const form = document.getElementById('enquiryForm');
  const alertContainer = document.getElementById('formAlert');
  if (!form || !alertContainer) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = document.getElementById('name').value.trim();
    const topic = document.getElementById('topic').selectedOptions[0].text;

    alertContainer.innerHTML = `
      <div class="alert-success" role="alert" tabindex="-1">
        <div style="font-size: 1.8rem;" aria-hidden="true">☀️</div>
        <div>
          <h3 style="margin-bottom: 0.3rem;">Thank you, ${escapeHTML(name)}! Your message is in.</h3>
          <p style="font-size: 0.95rem; color: var(--color-text-muted);">
            Our HSR Layout takeaway team received your query regarding <strong>${escapeHTML(topic)}</strong>. We will get back to you with sunny cheer!
          </p>
        </div>
      </div>
    `;
    form.reset();
  });
}

function setupNewsletterForm() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const feedback = form.querySelector('.newsletter-feedback') || form.nextElementSibling;
      if (!input || !input.checkValidity()) {
        if (input) input.reportValidity();
        return;
      }
      if (feedback) {
        feedback.innerHTML = `<span class="badge-success">☀️ You're in the Sunshine Club! (${escapeHTML(input.value.trim())})</span>`;
        feedback.style.display = 'block';
      }
      form.reset();
    });
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag));
}
