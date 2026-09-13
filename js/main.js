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
    booted: false,
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

  const PROMPT = `<span class="prompt"><span class="p-user">${esc(S.handle)}</span><span class="p-sep">:</span><span class="p-path">${esc(S.path)}</span><span class="p-sym">$</span></span>`;

  /* ---------------- tiny deterministic hash for fake commit ids ---------------- */
  function fakeHash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h.toString(16).padStart(8, '0').slice(0, 7);
  }

  /* ---------------- renderers ---------------- */
  function block(id, cmd, inner, srTitle) {
    return `<section class="block" id="sec-${id}" data-section="${id}">
      ${srTitle ? `<h2 class="sr-only">${esc(srTitle)}</h2>` : ''}
      <div class="cmdline">${PROMPT} <span class="cmd">${esc(cmd)}</span></div>
      <div class="out">${inner}</div>
    </section>`;
  }

  function tags(list) {
    if (!list || !list.length) return '';
    return `<div class="tags">${list.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>`;
  }

  function renderWhoami(d) {
    return block('whoami', S.cmds.whoami,
      `<h1 class="whoami-line">${esc(d.whoami.line)}<span class="sub">${esc(d.whoami.sub)}</span></h1>`);
  }

  function renderNeofetch(d) {
    const rows = d.neofetch.rows.map(([k, v]) =>
      `<div class="nf-row"><span class="nf-k">${esc(k)}</span><span class="nf-v">${esc(v)}</span></div>`).join('');
    const inner = `<div class="neofetch">
      <figure class="nf-avatar">
        <img src="${esc(S.avatar)}" alt="${esc(d.neofetch.rows[0][1])}" width="360" height="360" loading="eager" decoding="async">
        <figcaption>$ imgcat avatar.jpg</figcaption>
      </figure>
      <div class="nf-info">
        <div class="nf-head">${esc(S.handle.split('@')[0])}<span class="at">@</span>${esc(S.handle.split('@')[1])}</div>
        <div class="nf-rule">${'-'.repeat(S.handle.length)}</div>
        ${rows}
        <div class="nf-tags">${tags(d.neofetch.tags)}</div>
        <div class="palette" aria-hidden="true"><span class="c1"></span><span class="c2"></span><span class="c3"></span><span class="c4"></span><span class="c5"></span><span class="c6"></span><span class="c7"></span><span class="c8"></span></div>
      </div>
    </div>`;
    return block('neofetch', S.cmds.neofetch, inner);
  }

  function renderAbout(d) {
    return block('about', S.cmds.about,
      d.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join(''), 'About');
  }

  function renderExperience(d) {
    const items = d.experience.items.map((job, i) => {
      const hash = fakeHash(job.company + job.period);
      const refs = i === 0
        ? `<span class="refs">(<span class="head">${esc(d.experience.current)}</span>)</span>` : '';
      const groups = job.groups.map((g) => `
        <div class="job-group">
          ${g.heading ? `<div class="group-title">${esc(g.heading)}</div>` : ''}
          <ul class="bullets">${g.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
        </div>`).join('');
      return `<article class="commit">
        <div class="commit-head"><span class="star">*</span><span class="hash">${hash}</span>${refs}<span class="period">${esc(job.period)}</span></div>
        <div class="commit-body">
          <h3 class="job-title">${esc(job.title)}<span class="at">@</span><span class="company">${esc(job.company)}</span></h3>
          <div class="job-meta">${esc(job.meta)}</div>
          ${job.summary ? `<p class="job-summary">${esc(job.summary)}</p>` : ''}
          ${groups}
          ${tags(job.tags)}
        </div>
      </article>`;
    }).join('');
    return block('experience', S.cmds.experience, `<div class="gitlog">${items}</div>`, 'Experience');
  }

  function renderProjects(d) {
    const items = d.projects.items.map((p) => {
      const sections = p.sections.map((s) => `
        <div class="job-group">
          <div class="group-title">${esc(s.heading)}</div>
          <ul class="bullets">${s.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
        </div>`).join('');
      const links = p.links && p.links.length
        ? `<div class="project-links"><span class="comment">// ${esc(d.projects.linksLabel)}:</span> ${p.links.map((l) =>
          `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('')}</div>`
        : '';
      return `<article class="project">
        <div class="project-head"><h3 class="project-name">${esc(p.name)}</h3><span class="period">${esc(p.period)}</span></div>
        <div class="project-role">role: <b>${esc(p.role)}</b></div>
        <p>${esc(p.summary)}</p>
        ${sections}
        ${tags(p.tags)}
        ${links}
      </article>`;
    }).join('');
    return block('projects', S.cmds.projects, items, 'Projects');
  }

  function renderSkills(d) {
    const rows = d.skills.groups.map(([k, arr]) =>
      `<span class="row"><span class="k">${esc(k)}</span> <span class="br">[</span>${arr.map((v) =>
        `<span class="v">${esc(v)}</span>`).join('<span class="sep">, </span>')}<span class="br">]</span></span>`).join('');
    const spoken = `<span class="row"><span class="k">${esc(d.skills.spokenKey)}</span></span>` +
      d.skills.spoken.map(([k, v]) =>
        `<span class="row"><span class="sub-k">${esc(k)}</span> <span class="sub-v">${esc(v)}</span></span>`).join('');
    return block('skills', S.cmds.skills, `<div class="yaml">${rows}${spoken}</div>`, 'Skills');
  }

  function renderEducation(d) {
    const e = d.education;
    const certs = e.certs.map((c) =>
      `<li>${esc(c.name)} <span class="by">— ${esc(c.by)}</span></li>`).join('');
    return block('education', S.cmds.education, `
      <div class="edu-line"><span class="school">${esc(e.school)}</span> · ${esc(e.dept)} · ${esc(e.degree)}</div>
      <div class="edu-meta">${esc(e.period)}</div>
      <div class="edu-certs">
        <div class="group-title">${esc(e.certsHeading)}</div>
        <ul class="bullets">${certs}</ul>
      </div>`, 'Education');
  }

  function renderWhyMe(d) {
    const colon = state.lang === 'zh' ? '：' : ': ';
    const items = d.whyme.bullets.map((b) =>
      `<li><b>${esc(b.title)}</b>${colon}${esc(b.text)}</li>`).join('');
    return block('whyme', S.cmds.whyme, `
      <div class="whyme">
        <ul class="bullets">${items}</ul>
        <p class="value"><b>${esc(d.whyme.value.title)}</b>${colon}${esc(d.whyme.value.text)}</p>
      </div>`, 'Why me');
  }

  function renderContact(d) {
    const c = d.contact;
    const k = c.keys;
    const linkedinDisplay = S.linkedin.replace(/^https?:\/\//, '');
    const line = (key, valHtml, last) =>
      `  <span class="k">"${esc(key)}"</span><span class="p">: </span>${valHtml}${last ? '' : '<span class="p">,</span>'}\n`;
    const str = (v) => `<span class="s">"${esc(v)}"</span>`;
    const link = (href, text) => `<a class="s" href="${esc(href)}" target="_blank" rel="noopener">"${esc(text)}"</a>`;
    const body =
      line(k.name, str(c.name)) +
      line(k.email, `<a class="s" href="mailto:${esc(S.email)}">"${esc(S.email)}"</a>`) +
      line(k.github, link(S.github, S.github.replace(/^https?:\/\//, ''))) +
      line(k.linkedin, link(encodeURI(S.linkedin), linkedinDisplay)) +
      line(k.openTo, str(c.openTo)) +
      line(k.location, str(c.location), true);
    return block('contact', S.cmds.contact,
      `<pre class="json"><span class="p">{</span>\n${body}<span class="p">}</span></pre>`, 'Contact');
  }

  function renderAll() {
    const d = L();
    return [
      renderWhoami(d),
      renderNeofetch(d),
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
    $('#foot-text').textContent = ui.footer;
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
      state.booted = true;
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
      state.booted = true;
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
    const el = logEl();
    el.insertAdjacentHTML('beforeend',
      `<div class="log-cmd"><span class="log-prompt">$</span>${esc(line)}</div>`);
    trimLog();
  }
  function logOut(text, cls) {
    if (!text) return;
    const el = logEl();
    el.insertAdjacentHTML('beforeend',
      `<div class="log-out${cls ? ' ' + cls : ''}">${esc(text)}</div>`);
    trimLog();
  }
  function logHTML(html) {
    const el = logEl();
    el.insertAdjacentHTML('beforeend', `<div class="log-out">${html}</div>`);
    trimLog();
  }
  function clearLog() { logEl().innerHTML = ''; }

  function goto(sectionId) {
    const el = document.getElementById(`sec-${sectionId}`);
    if (!el) return false;
    el.classList.remove('flash');
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // restart the flash animation
    void el.offsetWidth;
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 1500);
    return true;
  }

  const fileOf = (section) => Object.keys(S.files).find((f) => S.files[f] === section) || section;

  function open(section) {
    const ui = L().ui;
    if (goto(section)) logOut(fmt(ui.opening, { file: fileOf(section) }), 'ok');
  }

  const COMMANDS = {
    help() {
      const ui = L().ui;
      const rows = ui.help.map(([c, d]) =>
        `<span class="hk">${esc(c)}</span> ${esc(d)}`).join('\n');
      logHTML(`${esc(ui.helpIntro)}\n${rows}\n<span class="comment">${esc(ui.hint)}</span>`);
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
    neofetch() { open('neofetch'); },
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
      const section = S.files[file];
      if (!section) { logOut(fmt(ui.noFile, { file }), 'err'); return; }
      open(section);
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
    pwd() { logOut('/home/allen/resume'); },
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

    // "about.md" style shortcut: treat a bare filename as cat
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

    // Click on empty terminal area focuses the prompt (but never steals a text selection or a link click)
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
