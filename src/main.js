import './styles.css';
import factionOptions from '../data/faction-options.json';
import teamInfo from '../data/team-info.json';

const profileModules = import.meta.glob('../profiles/*.json', { eager: true });

const fallbackProfiles = [
  {
    github: 'octocat',
    displayName: '小火龍',
    tagline: '想把點子做成可以互動的網頁',
    interests: ['AI', '前端', '開放資料'],
    faction: {
      os: 'linux',
      browser: 'firefox',
      editor: 'vscode',
    },
  },
  {
    github: 'hubot',
    displayName: '機器人同學',
    tagline: '喜歡把任務拆小，再一步一步完成',
    interests: ['自動化', '資安', '測試'],
    faction: {
      os: 'windows',
      browser: 'chrome',
      editor: 'vscode',
    },
  },
  {
    github: 'github',
    displayName: '開源夥伴',
    tagline: '相信 We Hack, We Share',
    interests: ['開源社群', '設計', '資料視覺化'],
    faction: {
      os: 'macos',
      browser: 'safari',
      editor: 'zed',
    },
  },
];

const profiles = Object.values(profileModules)
  .map((module) => module.default)
  .filter(Boolean);

const teamProfiles = profiles.length > 0 ? profiles : fallbackProfiles;
const state = {
  activeIndex: 0,
  timerId: null,
  isPaused: false,
};

const $app = document.querySelector('#app');
document.title = `SITCON Camp 2026 ${teamInfo.name} Showcase`;

function optionLabel(category, key) {
  return factionOptions?.[category]?.[key] ?? key ?? '未知';
}

function createElement(tag, options = {}) {
  const element = document.createElement(tag);
  if (options.className) element.className = options.className;
  if (options.text !== undefined) element.textContent = options.text;
  if (options.ariaLabel) element.setAttribute('aria-label', options.ariaLabel);
  if (options.href) element.setAttribute('href', options.href);
  if (options.target) element.setAttribute('target', options.target);
  if (options.rel) element.setAttribute('rel', options.rel);
  return element;
}

function profileAvatarUrl(profile) {
  return `https://github.com/${encodeURIComponent(profile.github)}.png`;
}

function profileUrl(profile) {
  return `https://github.com/${encodeURIComponent(profile.github)}`;
}

function renderInterestTags(profile) {
  const fragment = document.createDocumentFragment();
  for (const interest of profile.interests ?? []) {
    fragment.append(createElement('span', { className: 'tag', text: interest }));
  }
  return fragment;
}

function renderFactionBadges(profile) {
  const faction = profile.faction ?? {};
  const items = [
    ['os', 'OS', optionLabel('os', faction.os)],
    ['browser', 'Browser', optionLabel('browser', faction.browser)],
    ['editor', 'Editor', optionLabel('editor', faction.editor)],
  ];

  const container = createElement('div', { className: 'faction-badges' });
  for (const [kind, label, value] of items) {
    const badge = createElement('div', { className: `faction-badge faction-${kind}` });
    badge.append(createElement('span', { className: 'faction-label', text: label }));
    badge.append(createElement('strong', { text: value }));
    container.append(badge);
  }
  return container;
}

function activateProfileCard(profile, event) {
  if (event?.type === 'keydown') {
    const key = event.key;
    if (key !== 'Enter' && key !== ' ' && key !== 'Spacebar') return;
    if (event.target instanceof HTMLElement && event.target.closest('a')) return;
    event.preventDefault();
    event.stopPropagation();
    openProfileDialog(profile);
  }
}

function renderProfileCard(profile, index, variant = 'grid') {
  const card = createElement('article', { className: `profile-card ${variant}` });
  card.style.setProperty('--card-index', index);
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `查看 ${profile.displayName} 的詳情`);
  card.tabIndex = variant === 'dialog-card' ? -1 : 0;

  const avatar = createElement('img', { className: 'avatar' });
  avatar.src = profileAvatarUrl(profile);
  avatar.alt = `${profile.displayName} 的 GitHub 頭貼`;
  avatar.loading = 'lazy';

  const meta = createElement('div', { className: 'profile-meta' });
  const name = createElement('h3', { text: profile.displayName });
  const github = createElement('a', {
    className: 'github-link',
    text: `@${profile.github}`,
    href: profileUrl(profile),
    target: '_blank',
    rel: 'noreferrer',
  });
  const tagline = createElement('p', { className: 'tagline', text: profile.tagline });
  const tags = createElement('div', { className: 'tags' });
  tags.append(renderInterestTags(profile));
  const detailHint = createElement('span', { className: 'detail-hint', text: variant === 'dialog-card' ? '詳細資料' : '點擊展開' });

  meta.append(name, github, tagline, tags, renderFactionBadges(profile), detailHint);
  card.append(avatar, meta);

  if (variant !== 'dialog-card') {
    card.addEventListener('click', (event) => {
      if (event.target.closest('a')) return;
      // Clicks should open the dialog immediately for mouse/tap interactions.
      openProfileDialog(profile);
    });
    card.addEventListener('keydown', (event) => activateProfileCard(profile, event));

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.setProperty('--tilt-x', `${y}deg`);
      card.style.setProperty('--tilt-y', `${x}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  }

  return card;
}

function countBy(category) {
  const counts = new Map();
  for (const profile of teamProfiles) {
    const key = profile.faction?.[category] ?? 'other';
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function renderStatGroup(category, title) {
  const group = createElement('section', { className: 'stat-group' });
  group.append(createElement('h3', { text: title }));

  const rows = createElement('div', { className: 'stat-rows' });
  const counts = countBy(category);
  const max = Math.max(...counts.map(([, count]) => count), 1);

  for (const [key, count] of counts) {
    const row = createElement('div', { className: 'stat-row' });
    const label = createElement('span', { text: optionLabel(category, key) });
    const value = createElement('strong', { text: String(count) });
    const bar = createElement('div', { className: 'stat-bar' });
    bar.style.setProperty('--size', `${Math.max(12, (count / max) * 100)}%`);
    row.append(label, bar, value);
    rows.append(row);
  }

  group.append(rows);
  return group;
}

function renderHero() {
  const hero = createElement('section', { className: 'hero' });
  const copy = createElement('div', { className: 'hero-copy' });
  const eyebrow = createElement('p', { className: 'eyebrow', text: 'SITCON Camp 2026' });
  const teamMark = createElement('p', { className: 'team-mark', text: teamInfo.name });
  const title = createElement('h1', { text: 'Team Faction Showcase' });
  const description = createElement('p', {
    className: 'hero-description',
    text: `${teamInfo.name}的 GitHub 頭貼、技術陣營與 Coding Agent 產生的小隊展示頁。滑鼠移動、點擊卡片，看看每位成員的技術派系。`,
  });
  copy.append(eyebrow, teamMark, title, description);

  const stage = createElement('div', { className: 'carousel-stage' });
  stage.addEventListener('mouseenter', pauseCarousel);
  stage.addEventListener('mouseleave', resumeCarousel);

  const viewport = createElement('div', { className: 'carousel-viewport' });
  viewport.setAttribute('aria-live', 'polite');
  stage.append(viewport);

  const controls = createElement('div', { className: 'carousel-controls' });
  const prevButton = createElement('button', { text: '←', ariaLabel: '上一位成員' });
  const nextButton = createElement('button', { text: '→', ariaLabel: '下一位成員' });
  prevButton.addEventListener('click', () => moveCarousel(-1));
  nextButton.addEventListener('click', () => moveCarousel(1));
  controls.append(prevButton, nextButton);
  stage.append(controls);

  hero.append(copy, stage);
  return hero;
}

function renderCarousel() {
  const viewport = document.querySelector('.carousel-viewport');
  if (!viewport) return;
  viewport.replaceChildren();

  const total = teamProfiles.length;
  const order = [-1, 0, 1].map((offset) => (state.activeIndex + offset + total) % total);

  for (const [slot, profileIndex] of order.entries()) {
    const profile = teamProfiles[profileIndex];
    const card = renderProfileCard(profile, profileIndex, 'carousel');
    card.dataset.slot = String(slot - 1);
    if (slot === 1) {
      card.classList.add('active');
    }
    viewport.append(card);
  }
}

function moveCarousel(direction) {
  state.activeIndex = (state.activeIndex + direction + teamProfiles.length) % teamProfiles.length;
  renderCarousel();
}

function startCarousel() {
  stopCarousel();
  state.timerId = window.setInterval(() => {
    if (!state.isPaused) moveCarousel(1);
  }, 5200);
}

function stopCarousel() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function pauseCarousel() {
  state.isPaused = true;
}

function resumeCarousel() {
  state.isPaused = false;
}

function openProfileDialog(profile) {
  const existing = document.querySelector('.dialog-backdrop');
  if (existing) existing.remove();

  pauseCarousel();

  const backdrop = createElement('div', { className: 'dialog-backdrop' });
  const dialog = createElement('div', { className: 'profile-dialog' });
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', `${profile.displayName} 的 profile`);

  const close = createElement('button', { className: 'dialog-close', text: '×', ariaLabel: '關閉' });

  // Close handler; removes backdrop listener before removing the element
  function closeDialog() {
    backdrop.removeEventListener('click', closeOnBackdropClick);
    backdrop.remove();
    resumeCarousel();
  }
  close.addEventListener('click', closeDialog);

  const card = renderProfileCard(profile, 0, 'dialog-card');
  const content = createElement('div', { className: 'dialog-content' });
  const header = createElement('div', { className: 'dialog-header' });
  header.append(
    createElement('p', { className: 'eyebrow', text: 'Profile' }),
    createElement('h3', { text: profile.displayName }),
    createElement('p', { className: 'dialog-tagline', text: profile.tagline }),
  );

  const tags = createElement('div', { className: 'tags' });
  tags.append(renderInterestTags(profile));

  const factions = createElement('div', { className: 'dialog-factions' });
  factions.append(renderFactionBadges(profile));

  const note = createElement('p', {
    className: 'dialog-note',
    text: '這張卡片是由 profile JSON 產生。請記得先看 diff，再 commit。',
  });

  content.append(header, tags, factions, note);
  dialog.append(close, card, content);
  backdrop.append(dialog);

  // Avoid ghost-clicks on mobile: attach backdrop click handler after a short delay
  // so the same tap that opened the dialog won't immediately close it.
  const closeOnBackdropClick = (event) => {
    if (event.target === backdrop) closeDialog();
  };
  // Delay in ms before enabling backdrop clicks. 200ms is short but avoids most ghost clicks.
  setTimeout(() => backdrop.addEventListener('click', closeOnBackdropClick), 200);

  document.body.append(backdrop);
  close.focus();
}

function renderStats() {
  const stats = createElement('section', { className: 'stats-section' });
  const header = createElement('div', { className: 'section-header' });
  header.append(
    createElement('p', { className: 'eyebrow', text: 'Faction War' }),
    createElement('h2', { text: '技術陣營戰況' }),
    createElement('p', {
      text: '這些統計來自 profiles/*.json。固定代號讓資料可以被穩定彙整，不會被大小寫或空格打敗。',
    }),
  );
  stats.append(header);

  const grid = createElement('div', { className: 'stats-grid' });
  grid.append(
    renderStatGroup('os', '作業系統'),
    renderStatGroup('browser', '瀏覽器'),
    renderStatGroup('editor', '編輯器 / IDE'),
  );
  stats.append(grid);
  return stats;
}

function renderGrid() {
  const section = createElement('section', { className: 'member-section' });
  const header = createElement('div', { className: 'section-header' });
  header.append(
    createElement('p', { className: 'eyebrow', text: 'Members' }),
    createElement('h2', { text: '小隊成員卡片牆' }),
    createElement('p', { text: '點擊卡片可以展開細節。滑鼠移到卡片上，卡片會跟著你的游標微微轉動。' }),
  );

  const grid = createElement('div', { className: 'member-grid' });
  teamProfiles.forEach((profile, index) => grid.append(renderProfileCard(profile, index, 'grid')));
  section.append(header, grid);
  return section;
}

function renderMarquee() {
  const marquee = createElement('section', { className: 'marquee' });
  const track = createElement('div', { className: 'marquee-track' });
  const labels = teamProfiles.flatMap((profile) => [
    `@${profile.github}`,
    optionLabel('os', profile.faction?.os),
    optionLabel('browser', profile.faction?.browser),
    optionLabel('editor', profile.faction?.editor),
  ]);

  for (let repeat = 0; repeat < 2; repeat += 1) {
    for (const label of labels) {
      track.append(createElement('span', { text: label }));
    }
  }

  marquee.append(track);
  return marquee;
}

function renderApp() {
  const page = createElement('main', { className: 'page-shell' });
  page.append(renderHero(), renderMarquee(), renderStats(), renderGrid());
  $app.replaceChildren(page);
  renderCarousel();
  startCarousel();
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') moveCarousel(-1);
  if (event.key === 'ArrowRight') moveCarousel(1);
  if (event.key === 'Escape') document.querySelector('.dialog-backdrop')?.remove();
});

window.addEventListener('mousemove', (event) => {
  document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
  document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
});

renderApp();
