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
    render();
  }
  const next = () => select(shuffle ? Math.floor(Math.random() * tracks.length) : cur + 1);
  rows.forEach((r, i) => {
    const toggle = () => select(i, i === cur ? !playing : true);
    r.addEventListener('click', e => {
      const like = e.target.closest('.like');
      if (like) { like.setAttribute('aria-pressed', like.getAttribute('aria-pressed') !== 'true'); if (i === cur) render(); return; }
      toggle();
    });
    r.addEventListener('keydown', e => { if (e.target === r && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(); } });
  });
  $('#bPlay').onclick = () => { playing = !playing; render(); };
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
  $$('.tab').forEach(t => t.addEventListener('click', () => $$('.tab').forEach(x => x.setAttribute('aria-selected', x === t))));
  $$('.nav .nav-btn').forEach(b => b.addEventListener('click', () => $$('.nav .nav-btn').forEach(x => { x.classList.toggle('is-active', x === b); x.toggleAttribute('aria-current', x === b); })));
  $('#search').addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase(); let n = 0;
    rows.forEach((r, i) => { const hit = !q || (tracks[i].t + ' ' + tracks[i].l).toLowerCase().includes(q); r.hidden = !hit; n += hit; });
    $('#albumCount').textContent = n + (n === 1 ? ' track' : ' tracks') + ' in this album';
  });
  render();
})();
