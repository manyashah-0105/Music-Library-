
(() => {
  'use strict';

  // Kesariya audio file — keep it in the same folder as index.html
  const kesariyaAudio = new Audio('Kesariya.mp3');
  kesariyaAudio.preload = 'metadata';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const songRows = $$('#songs .row');
  const playButton = $('#bPlay');
  const nextButton = $('#bNext');
  const previousButton = $('#bPrev');
  const seekBar = $('#seek');
  const currentTimeLabel = $('#tCur');
  const remainingTimeLabel = $('#tRem');

  let currentIndex = -1;
  let isPlaying = false;

  const formatTime = seconds => {
    if (!Number.isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  function updatePlayerInfo(row) {
    if (!row) return;

    const title = row.querySelector('.info strong');
    const subtitle = row.querySelector('.info span');
    const artwork = row.querySelector('.art');

    if ($('#pTitle') && title) {
      $('#pTitle').textContent = title.textContent;
    }

    // Display the song language/category in the bottom player.
    if ($('#pSub')) {
      const language = row.querySelector('.lang');
      $('#pSub').textContent = language?.textContent.trim() || 'Hindi';
    }

    if ($('#pArt') && artwork) {
      const color = getComputedStyle(artwork).getPropertyValue('--c');
      $('#pArt').style.setProperty('--c', color);
    }
  }

  function updatePlayButton() {
    const icon = playButton?.querySelector('use');
    if (icon) icon.setAttribute('href', isPlaying ? '#i-pause' : '#i-play');
    playButton?.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
  }

  function updateActiveRow() {
    songRows.forEach((row, index) => {
      row.classList.toggle('is-active', index === currentIndex);
      const icon = row.querySelector('.row-play use');
      if (icon) {
        icon.setAttribute(
          'href',
          index === currentIndex && isPlaying ? '#i-pause' : '#i-play'
        );
      }
    });
  }

  async function playSong(index) {
    if (!songRows.length) return;

    if (index < 0) index = 0;
    if (index >= songRows.length) index = 0;

    const row = songRows[index];
    const title = row.querySelector('.info strong')?.textContent.trim() || '';

    // This audio file is connected to Kesariya only.
    if (!/kesariya/i.test(title)) {
      kesariyaAudio.pause();
      isPlaying = false;
      currentIndex = index;
      updatePlayerInfo(row);
      updateActiveRow();
      updatePlayButton();
      alert('Audio has not been added for this song yet.');
      return;
    }

    currentIndex = index;
    updatePlayerInfo(row);

    try {
      await kesariyaAudio.play();
      isPlaying = true;
    } catch (error) {
      isPlaying = false;
      console.error('Could not play Kesariya:', error);
      alert('Could not play Kesariya. Check that Kesariya.mp3 is in the same folder as index.html.');
    }

    updateActiveRow();
    updatePlayButton();
  }

  function pauseSong() {
    kesariyaAudio.pause();
    isPlaying = false;
    updateActiveRow();
    updatePlayButton();
  }

  // Clicking a song or its row play button.
  songRows.forEach((row, index) => {
    row.addEventListener('click', event => {
      if (event.target.closest('.like')) return;

      if (index === currentIndex && isPlaying) {
        pauseSong();
      } else {
        playSong(index);
      }
    });
  });

  // Main bottom player controls.
  playButton?.addEventListener('click', () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong(currentIndex < 0 ? 0 : currentIndex);
    }
  });

  nextButton?.addEventListener('click', () => {
    playSong(currentIndex < 0 ? 0 : currentIndex + 1);
  });

  previousButton?.addEventListener('click', () => {
    if (kesariyaAudio.currentTime > 3 && currentIndex === 0) {
      kesariyaAudio.currentTime = 0;
    } else {
      playSong(currentIndex <= 0 ? 0 : currentIndex - 1);
    }
  });

  // Seek/progress bar.
  seekBar?.addEventListener('input', () => {
    if (Number.isFinite(kesariyaAudio.duration)) {
      kesariyaAudio.currentTime =
        (Number(seekBar.value) / 100) * kesariyaAudio.duration;
    }
  });

  // Volume control.
  $('#vol')?.addEventListener('input', event => {
    kesariyaAudio.volume = Number(event.target.value) / 100;
  });

  // Mute button.
  $('#mute')?.addEventListener('click', event => {
    kesariyaAudio.muted = !kesariyaAudio.muted;
    event.currentTarget.setAttribute('aria-pressed', kesariyaAudio.muted);
    const icon = event.currentTarget.querySelector('use');
    if (icon) icon.setAttribute('href', kesariyaAudio.muted ? '#i-mute' : '#i-volume');
  });

  // Update duration and progress.
  kesariyaAudio.addEventListener('loadedmetadata', () => {
    const duration = formatTime(kesariyaAudio.duration);
    const durationCell = songRows[0]?.querySelector('.dur');
    if (durationCell) durationCell.textContent = duration;
    if (remainingTimeLabel) {
      remainingTimeLabel.textContent = '-' + duration;
    }
  });

  kesariyaAudio.addEventListener('timeupdate', () => {
    if (currentTimeLabel) {
      currentTimeLabel.textContent = formatTime(kesariyaAudio.currentTime);
    }

    if (remainingTimeLabel) {
      remainingTimeLabel.textContent = '-' + formatTime(
        kesariyaAudio.duration - kesariyaAudio.currentTime
      );
    }

    if (seekBar && Number.isFinite(kesariyaAudio.duration)) {
      seekBar.value = kesariyaAudio.duration
        ? (kesariyaAudio.currentTime / kesariyaAudio.duration) * 100
        : 0;
    }
  });

  kesariyaAudio.addEventListener('ended', () => {
    isPlaying = false;
    updateActiveRow();
    updatePlayButton();
  });

  updatePlayButton();
})();
