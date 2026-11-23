const song = document.getElementById('song');
const musicButton = document.getElementById('music');
const openButton = document.getElementById('open');

function updateMusicButton() {
  musicButton.textContent = song.paused ? '♫ Play music' : '♫ Pause music';
}

async function startMusicFromUserTap() {
  try {
    // This function is called directly from a real button tap so Safari can
    // treat playback as user-initiated.
    await song.play();
    updateMusicButton();
  } catch (error) {
    console.warn('The browser did not start audio:', error);
    musicButton.textContent = '♫ Play music';
  }
}

openButton.addEventListener('click', () => {
  document.getElementById('welcome').hidden = true;
  document.getElementById('site').hidden = false;
  window.scrollTo(0, 0);
  // Start the song on the same tap as “Open your surprise”.
  startMusicFromUserTap();
});

musicButton.addEventListener('click', () => {
  if (song.paused) {
    startMusicFromUserTap();
  } else {
    song.pause();
    updateMusicButton();
  }
});

song.addEventListener('play', updateMusicButton);
song.addEventListener('pause', updateMusicButton);
song.addEventListener('ended', updateMusicButton);
song.addEventListener('error', () => {
  musicButton.textContent = "♫ Music couldn't load";
});
