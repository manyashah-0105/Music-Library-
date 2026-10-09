/* =========================================================
   Music library — mobile-first responsive stylesheet
   Breakpoints: 480 | 701 (tablet) | 1001 (laptop) | 1281 (desktop = Figma 1920 design)
   ========================================================= */
:root{--bg:#000;--fg:#f3f4ed;--dim:#d8ddd3;--muted:#8c9087;--card:#151814;--border:#22271f;--line:#252823;--subtle:#1b1e1a;--cyan:#00c0e8;--glow:rgba(198,233,76,.28);--font:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif;--sw:0px;--pad:16px}
*,*::before,*::after{box-sizing:border-box;margin:0}
html,body{background:var(--bg);color:var(--fg);font-family:var(--font);min-height:100%}
body{position:relative;overflow-x:hidden}
body.no-scroll{overflow:hidden}
body::before{content:"";position:absolute;inset:0 0 auto 0;height:812px;z-index:0;pointer-events:none;background:radial-gradient(720px 487px at 75% 730.8px,#1c2516,rgba(28,37,22,0)),radial-gradient(815px 551px at 20% 162.4px,#151a13,rgba(21,26,19,0)),radial-gradient(789px 534px at 50% 609px,rgba(162,155,254,.106),rgba(162,155,254,0))}
img{max-width:100%}
button{font:inherit;color:inherit;cursor:pointer;background:none;border:0;transition:background .18s,border-color .18s,color .18s,transform .12s,filter .18s}
button:active:not(:disabled){transform:scale(.96)}
button:disabled{opacity:.45;cursor:not-allowed}
:focus-visible{outline:2px solid var(--cyan);outline-offset:2px}
.ic{display:block;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;flex:none}
symbol#i-play path{fill:currentColor}

/* ---------- Sidebar (drawer on small screens) ---------- */
.sidebar{position:fixed;inset:0 auto 0 0;width:250px;max-width:85vw;z-index:20;display:flex;flex-direction:column;padding:24px 18px 20px;background:rgba(0,0,0,.96);border-right:1px solid var(--line);backdrop-filter:blur(10px);overflow:auto;transform:translateX(-100%);visibility:hidden;transition:transform .25s ease,visibility .25s}
.sidebar.is-open{transform:none;visibility:visible;box-shadow:12px 0 40px rgba(0,0,0,.6)}
.backdrop{position:fixed;inset:0;z-index:15;background:rgba(0,0,0,.6)}
.backdrop[hidden]{display:none}
.brand{padding-bottom:24px}
.logo{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#d4f85e,var(--cyan));box-shadow:0 4px 8px var(--glow);color:#0c0d0c;font-size:13px;font-weight:800;letter-spacing:-.52px;text-transform:uppercase}
.eyebrow-nav{padding:8px 10px 10px;font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#5c6258}
.nav{flex:1;display:flex;flex-direction:column;gap:5px;padding:0 2px 16px 0;justify-content:center}
.nav-btn{display:flex;align-items:center;gap:12px;width:100%;padding:10px 14px;border:1px solid transparent;border-radius:14px;font-size:13px;font-weight:600;color:#92988d;text-align:left}
.nav-btn span:not(.count){white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nav-btn:hover{background:#141812;color:var(--fg)}
.nav-btn.is-active{background:#1a2016;border-color:rgba(198,233,76,.15);color:var(--cyan)}
.count{margin-left:auto;padding:2px 6px;border-radius:8px;background:#1b2018;color:var(--muted);font-size:10px;font-weight:600}
.side-bottom{display:flex;flex-direction:column;gap:12px;padding-top:12px;border-top:1px solid var(--subtle)}
.eq-box{display:flex;justify-content:space-between;align-items:center;width:100%;padding:10px 14px;background:#141812;border:1px solid var(--border);border-radius:14px;font-size:12px;font-weight:600;color:var(--muted)}
.eq-box:hover{border-color:#2f362b}
.badge{padding:2px 7px;border-radius:10px;background:var(--cyan);color:#000;font-size:10px;font-weight:800}
.storage{padding:12px;background:#11140f;border:1px solid var(--border);border-radius:14px;display:flex;flex-direction:column;gap:8px}
.storage p{font-size:10px;letter-spacing:.8px;color:#5c6258}
.bar{height:4px;border-radius:2px;background:#242922;overflow:hidden}
.bar i{display:block;width:100%;height:100%;background:var(--cyan);border-radius:2px}
.storage small{font-size:11px;font-weight:500;color:#8c9288}

/* ---------- Top bar ---------- */
.main{position:relative;z-index:1;margin-left:var(--sw);min-height:100vh;padding-bottom:150px}
.topbar{position:sticky;top:0;z-index:4;display:flex;align-items:center;gap:10px;padding:12px var(--pad);background:rgba(0,0,0,.95);border-bottom:1px solid var(--line);backdrop-filter:blur(10px)}
.menu-btn{display:flex;align-items:center;justify-content:center;width:40px;height:40px;flex:none;border:1px solid var(--border);border-radius:20px;background:var(--card);color:#92988d}
.menu-btn:hover{border-color:#3a4333;color:var(--fg)}
.search{display:flex;align-items:center;gap:12px;flex:1;min-width:0;max-width:340px;height:40px;padding:0 16px;background:#141713;border:1px solid var(--border);border-radius:9999px;color:#71766d}
.search:focus-within{border-color:var(--cyan)}
.search input{flex:1;min-width:0;background:none;border:0;outline:0;color:var(--fg);font:500 13px var(--font)}
.search input::placeholder{color:#60665d}
.top-actions{display:flex;align-items:center;gap:10px;margin-left:auto}
.pill{display:none;align-items:center;gap:6px;height:36px;padding:6px 14px;background:#171b15;border:1px solid var(--border);border-radius:9999px;font-size:11px;font-weight:700;color:var(--muted)}
.pill:hover{border-color:#39412f;color:var(--fg)}
.avatar{width:38px;height:38px;border-radius:19px;background:var(--cyan);color:#10120e;font-size:12px;font-weight:800;filter:drop-shadow(0 2px 5px var(--glow))}
.avatar:hover{filter:drop-shadow(0 2px 9px var(--glow)) brightness(1.08)}

/* ---------- Content ---------- */
.content{width:100%;max-width:1000px;margin:20px auto 0;padding:0 var(--pad);display:flex;flex-direction:column;gap:14px}
.heading{display:flex;justify-content:space-between;align-items:flex-start;gap:24px}
.heading>div{display:flex;flex-direction:column;gap:8px}
.eyebrow{font-size:10px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;color:#676c63}
h1{padding:1px 0 .8px;font-size:40px;font-weight:700;letter-spacing:-1.5px;line-height:44px}
.sub{font-size:13px;color:var(--muted)}
.round-btn{display:flex;align-items:center;justify-content:center;width:40px;height:40px;background:var(--card);border:1px solid var(--border);border-radius:20px;color:#92988d;flex:none}
.round-btn:hover{border-color:#3a4333;color:var(--fg)}
.tabs{display:flex;gap:8px;padding:14px 0 10px;overflow-x:auto;scrollbar-width:none}
.tabs::-webkit-scrollbar{display:none}
.tab{flex:none;padding:8px 18px;background:#141713;border:1px solid var(--border);border-radius:9999px;font-size:12px;font-weight:700;color:#82877e}
.tab:hover{border-color:#3a4333;color:var(--fg)}
.tab[aria-selected=true]{background:var(--cyan);border-color:var(--cyan);color:#10120d;filter:drop-shadow(0 4px 7px var(--glow))}
.actionbar{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px 16px;padding-bottom:10px;border-bottom:1px solid var(--subtle)}
.actions{display:flex;flex-wrap:wrap;gap:8px;width:100%}
.btn{display:flex;align-items:center;justify-content:center;gap:8px;padding:9.5px 15px;background:var(--card);border:1px solid var(--border);border-radius:14px;font-size:12px;font-weight:700;color:var(--dim)}
.btn:hover{border-color:#3a4333;background:#1a1e17}
.btn[aria-pressed=true]{border-color:var(--cyan);color:var(--cyan)}
.btn-primary{padding:10px 18px;background:var(--cyan);border-color:var(--cyan);color:#10120c;font-weight:800;filter:drop-shadow(0 4px 8px var(--glow))}
.btn-primary:hover{background:var(--cyan);filter:drop-shadow(0 4px 12px var(--glow)) brightness(1.08)}
.total{margin-left:auto;font-size:12px;color:#6e746b;white-space:nowrap}

/* ---------- Song list ---------- */
.songs{list-style:none;padding:0}
.row{display:flex;align-items:center;gap:10px;min-height:68px;padding:10px 8px;border-bottom:1px solid var(--subtle);border-radius:14px;transition:background .18s;cursor:pointer}
.row:hover{background:#12150f}
.row.is-active{background:#171c14;border-bottom-color:rgba(198,233,76,.2)}
.row[hidden]{display:none}
.num,.lang,.dur,.row .like{display:none}
.num{width:32px;flex:none;text-align:center;font-size:12px;font-weight:600;color:#666c63}
.info{flex:1 1 200px;max-width:331.33px;min-width:0;padding-left:2px;display:flex;flex-direction:column;gap:4px}
.info strong{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.row.is-active .info strong{color:var(--cyan)}
.info span{font-size:12px;color:var(--muted)}
.lang{width:164.67px;flex:none;font-size:12px;color:#6a7165}
.dur{width:50px;flex:none;text-align:right;font-size:12px;color:#6a7165}
.icon-btn{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:18px;color:#6a7165;flex:none}
.icon-btn:hover{background:rgba(255,255,255,.06);color:var(--fg)}
.icon-btn.like[aria-pressed=true]{color:var(--cyan)}
.icon-btn.like[aria-pressed=true] .ic{fill:currentColor}
.row-play{display:flex;align-items:center;justify-content:center;width:36px;height:34px;margin-left:auto;padding-left:2px;background:#1d221a;border:1px solid #283023;border-radius:17px;color:var(--fg);flex:none}
.row-play:hover{border-color:#3b4635;background:#232a1f}
.row.is-active .row-play{width:37.36px;height:36.72px;padding:.08px .08px .08px .72px;background:var(--cyan);border-color:var(--cyan);color:#000;filter:drop-shadow(0 4px 6px var(--glow))}
.row-play .ic{width:14px;height:14px}
.row.is-active .row-play .ic{width:15.12px;height:15.12px}

/* ---------- Artwork ---------- */
.art{position:relative;display:block;overflow:hidden;width:42px;height:42px;flex:none;border-radius:12px;background:linear-gradient(140deg,var(--c,#a29bfe) 0%,#11140f 75%);box-shadow:0 4px 12px rgba(0,0,0,.4),inset 0 0 0 1px rgba(255,255,255,.12)}
.art b{position:absolute;left:14%;top:14%;width:72%;aspect-ratio:1;border:1px solid rgba(255,255,255,.25);border-radius:36%}
.art i{position:absolute;left:38%;top:38%;width:24%;aspect-ratio:1;background:rgba(18,20,16,.7);border:1px solid rgba(255,255,255,.3);border-radius:12%}
.art em{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:800;letter-spacing:.6px;color:rgba(255,255,255,.8);text-shadow:0 1px 3px rgba(0,0,0,.8)}
.art-52{width:52px;height:52px}

/* ---------- Player (mobile: two rows) ---------- */
.player{position:fixed;left:var(--sw);right:0;bottom:0;z-index:10;display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"left ctrl" "seek seek";align-items:center;gap:6px 12px;padding:10px var(--pad) 12px;background:rgba(0,0,0,.96);border-top:1px solid var(--line);box-shadow:0 -10px 40px rgba(0,0,0,.7);backdrop-filter:blur(12px)}
.p-center{display:contents}
.p-left{grid-area:left;display:flex;align-items:center;gap:10px;min-width:0}
.p-meta{display:flex;flex-direction:column;gap:3px;min-width:0;flex:1 1 auto}
.p-meta strong,.p-meta span{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.p-meta strong{font-size:13px;font-weight:700}
.p-meta span{font-size:11px;color:var(--muted)}
.controls{grid-area:ctrl;display:flex;align-items:center;gap:6px}
.icon-btn.sm,.icon-btn.txt{width:34px;height:34px;border-radius:17px;color:#8a9185}
.icon-btn.sm[aria-pressed=true]{color:var(--cyan)}
.icon-btn.txt{width:30px;font:400 20px/20px Inter,var(--font)}
.play-main{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:20px;background:var(--cyan);color:#000;filter:drop-shadow(0 4px 8px var(--glow))}
.play-main:hover{filter:drop-shadow(0 4px 12px var(--glow)) brightness(1.08)}
.seek{grid-area:seek;display:flex;align-items:center;gap:10px;width:100%}
.time{min-width:32px;padding:0 4px;text-align:center;font-size:11px;font-weight:600;color:#747a70}
.track{position:relative;flex:1;height:6px;min-width:0}
.track img{position:absolute;inset:0;width:100%;height:6px;border-radius:4px}
input[type=range]{-webkit-appearance:none;appearance:none;background:none;margin:0}
.track input{position:absolute;left:0;right:0;top:-5px;width:100%;height:16px}
.track input::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:8px;background:var(--cyan);box-shadow:0 0 10px var(--glow);border:0}
.track input::-moz-range-thumb{width:16px;height:16px;border-radius:8px;background:var(--cyan);box-shadow:0 0 10px var(--glow);border:0}
.p-right,.p-left .like,#bShuffle,#bRepeat{display:none}
.p-right{grid-area:right;align-items:center;justify-content:flex-end;gap:10px;min-width:0}
.vol{display:flex;align-items:center;gap:8px}
.vbtn{width:32px;height:32px;border-radius:16px;color:#8a9185}
.vol input{width:70px;height:16px;background:#3b3b3b;cursor:pointer}
.vol input::-webkit-slider-thumb{-webkit-appearance:none;width:0;height:0}
.vol input::-moz-range-thumb{width:0;height:0;border:0}

/* ---------- >= 480px: show numbers + like buttons ---------- */
@media(min-width:480px){
  .num,.row .like{display:flex}
  .row{gap:12px}
  .actions .btn:nth-child(3){flex:0 0 auto}
}

/* ---------- >= 701px: tablet ---------- */
@media(min-width:701px){
  :root{--pad:24px}
  .topbar{padding:14px var(--pad);gap:12px}
  .pill{display:flex}
  .content{margin-top:32px}
  h1{font-size:48px;line-height:52.8px;letter-spacing:-1.92px}
  .actions{width:auto}
  .total{margin-left:0}
  .row{gap:14px;min-height:72px;padding:12.5px 16px 12.5px 12px}
  .art{width:46px;height:46px}
  .player{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);grid-template-areas:"left ctrl right" "seek seek seek";gap:6px 16px;padding:10px 20px 12px}
  .p-left .like,#bShuffle,#bRepeat{display:flex}
  .p-right{display:flex}
  .p-right .sm:not(#full){display:none}
  .controls{gap:14px}
  .icon-btn.txt{width:34px}
  .p-meta{max-width:160px}
}

/* ---------- >= 1001px: laptop (fixed sidebar) ---------- */
@media(min-width:1001px){
  :root{--sw:250px;--pad:32px}
  .menu-btn,.backdrop{display:none}
  .sidebar{transform:none;visibility:visible;max-width:none;width:var(--sw)}
  .search{height:42px;flex:0 0 340px}
  .main{padding-bottom:120px}
  .lang,.dur{display:block}
  .player{display:flex;align-items:center;justify-content:space-between;gap:24px;height:88px;padding:0 28px;bottom:1.2px}
  .p-left{width:320px;min-width:180px;gap:14px}
  .p-center{display:flex;flex-direction:column;align-items:center;gap:6px;flex:1;max-width:620px;padding:0 16px}
  .controls{gap:18px}
  .p-right{width:auto;min-width:0;flex:1}
  .p-left{flex:1}
  .vol input{width:90px}
  .art-52 b{top:7.28px;border-radius:18.72px}.art-52 i{top:19.77px;border-radius:6.24px}
}

/* ---------- >= 1281px: desktop = Figma 1920 design ---------- */
@media(min-width:1281px){
  :root{--pad:96px}
  .p-meta{width:90px}
  .p-right .sm:not(#full){display:flex}
}
@media(prefers-reduced-motion:reduce){*{transition:none!important}}
.empty{padding:32px 0;text-align:center;font-size:13px;color:var(--muted)}
.empty[hidden]{display:none}
