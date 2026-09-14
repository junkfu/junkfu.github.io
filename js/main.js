/* ============================================================
   Terminal resume — rendering, boot animation, i18n, CLI
   ============================================================ */
(() => {
  'use strict';

  const R = window.RESUME;
  const S = R.shared;
  const LANGS = ['zh', 'en'];
  const THEMES = ['dark', 'light', 'dracula'];

  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const fmt = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  /* ---------------- state ---------------- */
  const state = {
    lang: initLang(),
    theme: initTheme(),
    history: [],
    histIdx: -1,
    draft: ''
  };

  function initLang() {
    const q = new URLSearchParams(location.search).get('lang');
    if (LANGS.includes(q)) return q;
    const saved = store.get('lang');
    if (LANGS.includes(saved)) return saved;
    return 'zh';
  }

  function initTheme() {
    const saved = store.get('theme');
    return THEMES.includes(saved) ? saved : 'dark';
  }

  const L = () => R[state.lang];
  const fileOf = (section) => Object.keys(S.files).find((f) => S.files[f] === section) || '';
  const stripProto = (u) => u.replace(/^https?:\/\/(www\.)?/, '');

  /* ---------------- building blocks ---------------- */
  function section(id, inner) {
    return `<section class="block" id="sec-${id}" data-section="${id}">
      <h2 class="sec-head">
        <span class="sec-mark" aria-hidden="true">#</span>
        <span class="sec-title">${esc(L().ui.sections[id])}</span>
        <span class="sec-rule" aria-hidden="true"></span>
        <span class="sec-file">${esc(fileOf(id))}</span>
      </h2>
      <div class="out">${inner}</div>
    </section>`;
  }

  // rows: [[label, valueHTML]] — caller escapes values
  function kv(rows) {
    return `<dl class="kv">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v}</dd>`).join('')}</dl>`;
  }

  function group(heading, bullets) {
    return `<div class="group">
      ${heading ? `<div class="group-title">${esc(heading)}</div>` : ''}
      <ul class="bullets">${bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
    </div>`;
  }

  /* ---------------- renderers ---------------- */
  function renderWhoami(d) {
    const w = d.whoami;
    return `<section class="block" id="sec-whoami" data-section="whoami">
      <div class="cmdline"><span class="prompt" aria-hidden="true">❯</span> <span class="cmd">whoami</span></div>
      <div class="out">
        <div class="card">
          <figure class="card-avatar">
            <img src="${esc(S.avatar)}" alt="${esc(w.name)}" width="360" height="360" loading="eager" decoding="async">
          </figure>
          <div class="card-body">
            <h1 class="card-name">${esc(w.name)}</h1>
            <p class="card-title">${esc(w.title)}</p>
            ${kv(w.rows.map(([k, v]) => [k, esc(v)]))}
          </div>
        </div>
      </div>
    </section>`;
  }

  function renderAbout(d) {
    return section('about', `
      <p class="lead">${esc(d.about.summary)}</p>
      ${group(d.about.highlightsHeading, d.about.highlights)}`);
  }

  function renderExperience(d) {
    const items = d.experience.items.map((job, i) => `
      <li class="tl-item">
        <div class="tl-head">
          <span class="tl-node" aria-hidden="true"></span>
          <span class="period">${esc(job.period)}</span>
          ${i === 0 ? `<span class="badge">${esc(d.ui.currentBadge)}</span>` : ''}
        </div>
        <div class="tl-body">
          <h3 class="job-title">${esc(job.title)}<span class="at">@</span><span class="company">${esc(job.company)}</span></h3>
          <div class="meta">${esc(job.meta)}</div>
          ${job.summary ? `<p class="job-summary">${esc(job.summary)}</p>` : ''}
          ${job.groups.map((g) => group(g.heading, g.bullets)).join('')}
        </div>
      </li>`).join('');
    return section('experience', `<ol class="timeline">${items}</ol>`);
  }

  function renderProjects(d) {
    const items = d.projects.items.map((p) => {
      const links = p.links && p.links.length
        ? `<div class="project-links"><span class="dim">${esc(d.ui.linksLabel)}</span>${p.links.map((l) =>
          `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('')}</div>`
        : '';
      return `<article class="project">
        <div class="project-head"><h3 class="project-name">${esc(p.name)}</h3><span class="period">${esc(p.period)}</span></div>
        <div class="meta">${esc(d.ui.roleLabel)}<span class="sep">·</span>${esc(p.role)}</div>
        <p>${esc(p.summary)}</p>
        ${p.sections.map((s) => group(s.heading, s.bullets)).join('')}
        ${links}
      </article>`;
    }).join('');
    return section('projects', items);
  }

  function renderSkills(d) {
    const row = (label, chips) => `<div class="skill-row">
      <span class="skill-k">${esc(label)}</span>
      <span class="chips">${chips.join('')}</span>
    </div>`;
    const rows = d.skills.groups.map(([k, arr]) => row(k, arr.map((v) => `<span class="chip">${esc(v)}</span>`)));
    rows.push(row(d.skills.spokenLabel, d.skills.spoken.map(([l, lv]) =>
      `<span class="chip chip-soft">${esc(l)}<span class="sep">·</span>${esc(lv)}</span>`)));
    return section('skills', `<div class="skills">${rows.join('')}</div>`);
  }

  function renderEducation(d) {
    const e = d.education;
    const certs = e.certs.map((c) => `<li>${esc(c.name)}<span class="by">${esc(c.by)}</span></li>`).join('');
    return section('education', `
      <div class="edu-line"><span class="company">${esc(e.school)}</span><span class="sep">·</span>${esc(e.dept)}<span class="sep">·</span>${esc(e.degree)}</div>
      <div class="meta">${esc(e.period)}</div>
      <div class="group"><div class="group-title">${esc(e.certsHeading)}</div><ul class="bullets">${certs}</ul></div>`);
  }

  function renderWhyMe(d) {
    const colon = state.lang === 'zh' ? '：' : ': ';
    const items = d.whyme.bullets.map((b) =>
      `<li><b>${esc(b.title)}</b>${colon}${esc(b.text)}</li>`).join('');
    return section('whyme', `<ul class="bullets">${items}</ul>`);
  }

  function renderContact(d) {
    const c = d.contact;
    const link = (href, text) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>`;
    const rows = [
      [c.linkLabels.email, `<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`],
      [c.linkLabels.linkedin, link(encodeURI(S.linkedin), stripProto(S.linkedin))],
      ...c.rows.map(([k, v]) => [k, esc(v)])
    ];
    return section('contact', kv(rows));
  }

  function renderAll() {
    const d = L();
    return [
      renderWhoami(d),
      renderAbout(d),
      renderExperience(d),
      renderProjects(d),
      renderSkills(d),
      renderEducation(d),
      renderWhyMe(d),
      renderContact(d)
    ].join('');
  }

  /* ---------------- static UI strings ---------------- */
  function applyUI() {
    const ui = L().ui;
    document.documentElement.lang = ui.htmlLang;
    const btn = $('#lang-toggle');
    btn.textContent = ui.langButton;
    btn.title = ui.langButtonTitle;
    btn.setAttribute('aria-label', ui.langButtonTitle);
    const input = $('#cli-input');
    input.placeholder = ui.placeholder;
    input.setAttribute('aria-label', ui.inputLabel);
    $('#link-github').href = S.github;
    $('#link-linkedin').href = encodeURI(S.linkedin);
    $('#foot-source').textContent = ui.source;
    $('#foot-year').textContent = String(new Date().getFullYear());
  }

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    store.set('theme', theme);
  }

  function setLang(lang, { announce = true } = {}) {
    if (!LANGS.includes(lang)) return;
    const changed = lang !== state.lang;
    state.lang = lang;
    store.set('lang', lang);
    applyUI();
    if (changed) {
      const out = $('#output');
      out.innerHTML = renderAll();
      out.querySelectorAll('.block').forEach((b) => b.classList.add('show'));
      if (announce) logOut(L().ui.langSet, 'ok');
    }
  }

  /* ---------------- boot animation ---------------- */
  function boot() {
    const out = $('#output');
    out.innerHTML = renderAll();
    const blocks = [...out.querySelectorAll('.block')];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !blocks.length) {
      blocks.forEach((b) => b.classList.add('show'));
      return;
    }

    blocks.forEach((b) => b.classList.add('pending'));
    const first = blocks[0];
    const cmdEl = $('.cmd', first);
    const outEl = $('.out', first);
    const text = cmdEl.textContent;
    cmdEl.textContent = '';
    outEl.hidden = true;
    first.classList.remove('pending');
    first.classList.add('show', 'typing');

    let i = 0;
    let done = false;
    const timers = [];

    const finish = () => {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      cmdEl.textContent = text;
      outEl.hidden = false;
      first.classList.remove('typing');
      blocks.forEach((b) => { b.classList.remove('pending'); b.classList.add('show'); });
      window.removeEventListener('keydown', onSkip, true);
      window.removeEventListener('pointerdown', onSkip, true);
    };
    const onSkip = (e) => {
      if (e.type === 'keydown' && (e.metaKey || e.ctrlKey || e.altKey || e.key === 'Tab')) return;
      finish();
    };
    window.addEventListener('keydown', onSkip, true);
    window.addEventListener('pointerdown', onSkip, true);

    const type = () => {
      if (done) return;
      if (i < text.length) {
        cmdEl.textContent += text[i++];
        timers.push(setTimeout(type, 70));
        return;
      }
      timers.push(setTimeout(() => {
        if (done) return;
        outEl.hidden = false;
        first.classList.remove('typing');
        let delay = 160;
        blocks.slice(1).forEach((b) => {
          timers.push(setTimeout(() => {
            if (done) return;
            b.classList.remove('pending');
            b.classList.add('show');
          }, delay));
          delay += 120;
        });
        timers.push(setTimeout(finish, delay + 50));
      }, 220));
    };
    timers.push(setTimeout(type, 380));
  }

  /* ---------------- CLI ---------------- */
  const logEl = () => $('#cli-log');
  const MAX_LOG = 14;

  function trimLog() {
    const el = logEl();
    while (el.children.length > MAX_LOG) el.removeChild(el.firstChild);
  }
  function logCmd(line) {
    logEl().insertAdjacentHTML('beforeend',
      `<div class="log-cmd"><span class="log-prompt">❯</span>${esc(line)}</div>`);
    trimLog();
  }
  function logOut(text, cls) {
    if (!text) return;
    logEl().insertAdjacentHTML('beforeend',
      `<div class="log-out${cls ? ' ' + cls : ''}">${esc(text)}</div>`);
    trimLog();
  }
  function logHTML(html) {
    logEl().insertAdjacentHTML('beforeend', `<div class="log-out">${html}</div>`);
    trimLog();
  }
  function clearLog() { logEl().innerHTML = ''; }

  function goto(sectionId) {
    const el = document.getElementById(`sec-${sectionId}`);
    if (!el) return false;
    el.classList.remove('flash');
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    void el.offsetWidth; // restart the flash animation
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 1500);
    return true;
  }

  function open(sectionId) {
    if (goto(sectionId)) logOut(fmt(L().ui.opening, { file: fileOf(sectionId) || sectionId }), 'ok');
  }

  const COMMANDS = {
    help() {
      const ui = L().ui;
      const rows = ui.help.map(([c, d]) => `<span class="hk">${esc(c)}</span> ${esc(d)}`).join('\n');
      logHTML(`${esc(ui.helpIntro)}\n${rows}\n<span class="dim">${esc(ui.hint)}</span>`);
    },
    about() { open('about'); },
    exp() { open('experience'); },
    experience() { open('experience'); },
    projects() { open('projects'); },
    skills() { open('skills'); },
    edu() { open('education'); },
    education() { open('education'); },
    contact() { open('contact'); },
    whoami() { open('whoami'); },
    neofetch() { open('whoami'); },
    top() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      logOut(L().ui.top, 'ok');
    },
    ls() {
      logHTML(Object.keys(S.files).map((f) =>
        `<a href="#sec-${esc(S.files[f])}" data-section="${esc(S.files[f])}">${esc(f)}</a>`).join('  '));
    },
    cat(args) {
      const ui = L().ui;
      if (!args.length) { logOut(ui.catUsage, 'err'); return; }
      const file = args[0].replace(/^\.\//, '');
      const sectionId = S.files[file];
      if (!sectionId) { logOut(fmt(ui.noFile, { file }), 'err'); return; }
      open(sectionId);
    },
    lang(args) {
      const target = args[0] && LANGS.includes(args[0].toLowerCase())
        ? args[0].toLowerCase()
        : (state.lang === 'zh' ? 'en' : 'zh');
      if (target === state.lang) { logOut(L().ui.langSet, 'ok'); return; }
      setLang(target);
    },
    theme(args) {
      const ui = L().ui;
      const target = (args[0] || '').toLowerCase();
      if (!target) {
        const next = THEMES[(THEMES.indexOf(state.theme) + 1) % THEMES.length];
        applyTheme(next);
        logOut(fmt(ui.themeSet, { theme: next }), 'ok');
        return;
      }
      if (!THEMES.includes(target)) { logOut(fmt(ui.themeUnknown, { theme: target }), 'err'); return; }
      applyTheme(target);
      logOut(fmt(ui.themeSet, { theme: target }), 'ok');
    },
    clear() { clearLog(); },
    cls() { clearLog(); },
    sudo() { logOut(L().ui.sudo, 'err'); },
    echo(args) { logOut(args.join(' ')); },
    pwd() { logOut('/home/fu/resume'); },
    date() { logOut(new Date().toString()); },
    history() {
      const ui = L().ui;
      if (!state.history.length) { logOut(ui.noHistory); return; }
      logOut(state.history.map((h, i) => `${String(i + 1).padStart(3)}  ${h}`).join('\n'));
    },
    exit() { logOut(L().ui.exit); },
    quit() { logOut(L().ui.exit); }
  };
  const COMMAND_NAMES = Object.keys(COMMANDS).sort();

  function run(line) {
    const trimmed = line.trim();
    if (!trimmed) return;
    logCmd(trimmed);
    state.history.push(trimmed);
    if (state.history.length > 100) state.history.shift();
    state.histIdx = state.history.length;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const fn = COMMANDS[cmd];
    if (fn) { fn(args); return; }
    if (S.files[cmd]) { COMMANDS.cat([cmd]); return; }
    logOut(fmt(L().ui.notFound, { cmd }), 'err');
  }

  function complete(input) {
    const val = input.value;
    const parts = val.split(/\s+/);
    if (parts.length <= 1) {
      const m = COMMAND_NAMES.filter((c) => c.startsWith(val.toLowerCase()));
      if (m.length === 1) input.value = m[0] + ' ';
      else if (m.length > 1 && val) logOut(m.join('  '));
      return;
    }
    const cmd = parts[0].toLowerCase();
    const arg = parts[parts.length - 1];
    let pool = [];
    if (cmd === 'cat') pool = Object.keys(S.files);
    else if (cmd === 'theme') pool = THEMES;
    else if (cmd === 'lang') pool = LANGS;
    const m = pool.filter((p) => p.startsWith(arg));
    if (m.length === 1) input.value = parts.slice(0, -1).concat(m[0]).join(' ');
    else if (m.length > 1) logOut(m.join('  '));
  }

  /* ---------------- wire up ---------------- */
  function init() {
    applyTheme(state.theme);
    applyUI();
    boot();

    const form = $('#cli');
    const input = $('#cli-input');
    const screen = $('#screen');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      run(input.value);
      input.value = '';
      state.draft = '';
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        if (!state.history.length) return;
        e.preventDefault();
        if (state.histIdx === state.history.length) state.draft = input.value;
        state.histIdx = Math.max(0, state.histIdx - 1);
        input.value = state.history[state.histIdx];
        requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
      } else if (e.key === 'ArrowDown') {
        if (!state.history.length) return;
        e.preventDefault();
        state.histIdx = Math.min(state.history.length, state.histIdx + 1);
        input.value = state.histIdx === state.history.length ? state.draft : state.history[state.histIdx];
      } else if (e.key === 'Tab') {
        e.preventDefault();
        complete(input);
      } else if (e.key === 'Escape') {
        input.blur();
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        clearLog();
      }
    });

    // "/" focuses the prompt from anywhere
    document.addEventListener('keydown', (e) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const a = document.activeElement;
      if (a === input || (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))) return;
      e.preventDefault();
      input.focus({ preventScroll: true });
    });

    // Click on empty terminal area focuses the prompt (never steals a selection or a link click)
    screen.addEventListener('click', (e) => {
      if (e.target.closest('a, button, input, label, select, textarea')) return;
      const sel = window.getSelection && window.getSelection();
      if (sel && String(sel).length) return;
      input.focus({ preventScroll: true });
    });

    // Links produced by `ls`
    $('#cli-log').addEventListener('click', (e) => {
      const a = e.target.closest('a[data-section]');
      if (!a) return;
      e.preventDefault();
      open(a.dataset.section);
    });

    $('#lang-toggle').addEventListener('click', () => {
      setLang(state.lang === 'zh' ? 'en' : 'zh', { announce: false });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
