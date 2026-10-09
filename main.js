(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const tracks = [
    { n: '01', t: 'Kesariya ( From” Brahmastra”)', l: 'Hindi', c: '#a29bfe' },
    { n: '02', t: 'Tu khub mane game che', l: 'Devotional', c: '#fd79a8' },
    { n: '03', t: 'Khalasi', l: 'Gujarati', c: '#c6e94c' },
    { n: '04', t: 'Booma Boom', l: 'Gujarati', c: '#b7d93e' },
    { n: '05', t: 'Chaleya ( From “Jawan “)', l: 'Hindi', c: '#7b6fd6' }
  ];
  const list = $('#songs');
  const audio = new Audio();
  const played = new Set(); let tab = 'All', query = '';
  let cur = 0, playing = false, shuffle = false, repeat = false;

  list.innerHTML = tracks.map((k, i) => `
    <li class="row${i === 0 ? ' is-active' : ''}" data-i="${i}" tabindex="0">
      <span class="num">${k.n}</span>
      <span class="art" style="--c:${k.c}" aria-hidden="true"><b></b><i></i><em>T0</em></span>
      <div class="info"><strong>${k.t}</strong><span>Manya’s Playlist</span></div>
      <span class="lang">${k.l}</span><span class="dur">—</span>
      <button class="icon-btn like" aria-pressed="false" aria-label="Like song"><svg class="ic" width="18" height="18"><use href="#i-heart"/></svg></button>
      <button class="row-play" aria-label="Play Track ${k.n}"><svg class="ic" width="14" height="14"><use href="#i-play"/></svg></button>
    </li>`).join('');
  const rows = $$('.row', list);

  const fmt = s => isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '0:00';
  function render() {
    rows.forEach((r, i) => {
      r.classList.toggle('is-active', i === cur);
      $('.row-play use', r).setAttribute('href', i === cur && playing ? '#i-pause' : '#i-play');
    });
    const k = tracks[cur];
    $('#pTitle').textContent = k.t;
    $('#pArt').style.setProperty('--c', k.c);
    $('#pLike').setAttribute('aria-pressed', $('.like', rows[cur]).getAttribute('aria-pressed'));
    $('#bPlay use').setAttribute('href', playing ? '#i-pause' : '#i-play');
    $('#bPlay').setAttribute('aria-label', playing ? 'Pause' : 'Play');
  }
  function select(i, play) {
    cur = (i + tracks.length) % tracks.length;
    if (play !== undefined) playing = play;
    if (playing) played.add(cur);
    render(); applyFilter();
  }
  const next = () => select(shuffle ? Math.floor(Math.random() * tracks.length) : cur + 1);
  rows.forEach((r, i) => {
    const toggle = () => select(i, i === cur ? !playing : true);
    r.addEventListener('click', e => {
      const like = e.target.closest('.like');
      if (like) { like.setAttribute('aria-pressed', like.getAttribute('aria-pressed') !== 'true'); if (i === cur) render(); applyFilter(); return; }
      toggle();
    });
    r.addEventListener('keydown', e => { if (e.target === r && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(); } });
  });
  $('#bPlay').onclick = () => { playing = !playing; if (playing) played.add(cur); render(); applyFilter(); };
  $('#bNext').onclick = next;
  $('#bPrev').onclick = () => select(cur - 1);
  $('#pLike').onclick = () => $('.like', rows[cur]).click();
  const flip = (b, f) => b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); f(on); });
  flip($('#bShuffle'), v => shuffle = v);
  flip($('#bRepeat'), v => repeat = v);
  flip($('#offline'), () => {});
  flip($('#mute'), m => { $('#mute use').setAttribute('href', m ? '#i-mute' : '#i-volume'); audio.muted = m; });
  $('#shuffleAll').onclick = () => select(Math.floor(Math.random() * tracks.length), true);
  $('#vol').oninput = e => { audio.volume = e.target.value / 100; };
  $('#seek').oninput = e => { if (audio.duration) audio.currentTime = audio.duration * e.target.value / 100; };
  audio.ontimeupdate = () => {
    $('#tCur').textContent = fmt(audio.currentTime);
    $('#tRem').textContent = '-' + fmt(audio.duration - audio.currentTime);
    $('#seek').value = audio.duration ? audio.currentTime / audio.duration * 100 : 0;
  };
  audio.onended = () => repeat ? (audio.currentTime = 0, audio.play()) : next();
  $('#full').onclick = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.();
  function applyFilter() {
    let n = 0;
    rows.forEach((r, i) => {
      const k = tracks[i], liked = $('.like', r).getAttribute('aria-pressed') === 'true';
      const byTab = tab === 'All' || tab === k.l || (tab === 'Liked Songs' && liked) || (tab === 'Recently Played' && played.has(i));
      const byText = !query || (k.t + ' ' + k.l).toLowerCase().includes(query);
      r.hidden = !(byTab && byText); n += !r.hidden;
    });
    $('#albumCount').textContent = n + (n === 1 ? ' track' : ' tracks') + ' in this album';
    $('#empty').hidden = n > 0;
  }
  $$('.tab').forEach(t => t.addEventListener('click', () => {
    tab = t.textContent.trim(); $('h1').textContent = tab;
    $$('.tab').forEach(x => x.setAttribute('aria-selected', x === t)); applyFilter();
  }));
  $$('.nav .nav-btn').forEach(b => b.addEventListener('click', () => $$('.nav .nav-btn').forEach(x => { x.classList.toggle('is-active', x === b); x.toggleAttribute('aria-current', x === b); })));
  $('#search').addEventListener('input', e => { query = e.target.value.trim().toLowerCase(); applyFilter(); });
  const side = $('#sidebar'), mb = $('#menuBtn'), bd = $('#backdrop');
  const menu = open => {
    side.classList.toggle('is-open', open); bd.hidden = !open;
    mb.setAttribute('aria-expanded', open);
    mb.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('no-scroll', open);
    (open ? $('.nav-btn', side) : mb).focus();
  };
  mb.onclick = () => menu(!side.classList.contains('is-open'));
  bd.onclick = () => menu(false);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && side.classList.contains('is-open')) menu(false); });
  $$('.nav-btn', side).forEach(b => b.addEventListener('click', () => { if (side.classList.contains('is-open')) menu(false); }));
  matchMedia('(min-width:1001px)').addEventListener('change', e => { if (e.matches && side.classList.contains('is-open')) menu(false); });
  render();
})();
