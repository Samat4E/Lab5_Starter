// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const voiceSelect = document.getElementById('voice-select');
  const speakButton = document.querySelector('button');
  const textInput = document.getElementById('text-to-speak');

  let voices = [];

  function populateVoices() {
    voices = synth.getVoices();

    if (voices.length === 0) {
      // Voices not loaded yet
      setTimeout(populateVoices, 100);
      return;
    }

    voiceSelect.innerHTML = '<option value="" disabled selected>Select Voice:</option>';
    voices.forEach((voice, index) => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;
      option.value = index;
      voiceSelect.appendChild(option);
    });
  }

  // Force voice load on some browsers
  populateVoices();
  if (typeof synth.onvoiceschanged !== 'undefined') {
    synth.onvoiceschanged = populateVoices;
  }

  speakButton.addEventListener('click', () => {
    const text = textInput.value.trim();
    const selectedIndex = voiceSelect.value;

    if (selectedIndex === '' || !text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[parseInt(selectedIndex)];
    synth.speak(utterance);
  });
}
