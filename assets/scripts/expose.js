// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelect = document.getElementById('horn-select');
  const hornImage = document.querySelector('img');
  const audio = document.querySelector('audio');
  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls img');
  const playButton = document.querySelector('button');

  //  JS Confetti
  const jsConfetti = new JSConfetti();

  // Change horn image and audio when selection changes
  hornSelect.addEventListener('change', () => {
    const selected = hornSelect.value;
    hornImage.src = `assets/images/${selected}.svg`;
    audio.src = `assets/audio/${selected}.mp3`;
  });

  // Change volume icon and audio volume
  volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value;
    audio.volume = volume / 100;

    let iconLevel;
    if (volume == 0) iconLevel = 0;
    else if (volume < 33) iconLevel = 1;
    else if (volume < 67) iconLevel = 2;
    else iconLevel = 3;

    volumeIcon.src = `assets/icons/volume-level-${iconLevel}.svg`;
  });

  // Play sound and show confetti if "party-horn"
  playButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default behavior (important if button is in form)

    if (audio.src) {
      audio.play();
    }

    //  Trigger confetti if "party-horn" is selected
    if (hornSelect.value === 'party-horn') {
      jsConfetti.addConfetti();
    }
  });
}
