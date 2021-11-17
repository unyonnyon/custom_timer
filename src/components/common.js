import store from "../store/index";

export const chainVoices = (voices) => {
  const sounds = store.getters.rawSounds;
  const concatVoice = voices.reverse().reduce((prev, curr) => {
    const voice = new Audio(sounds(curr));
    voice.load();
    if (prev === undefined) {
      return voice;
    }
    voice.onended = () => {
      prev.play();
    };
    return voice;
  }, undefined);

  return concatVoice;
};

export const zeroPadding = (NUM, LEN) => {
  return (Array(LEN).join("0") + NUM).slice(-LEN);
};
