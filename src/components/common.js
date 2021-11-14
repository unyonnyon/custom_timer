const pathToAudio = (src) => {
  return new Audio(require(src));
};

const getActionSoundList = () => {
  return {
    appearance: pathToAudio("../assets/raw_sounds/actions/appearance.wav"),
    appeard: pathToAudio("../assets/raw_sounds/actions/appeared.wav"),
  };
};

const getChannelSoundList = () => {
  return {
    ch1: pathToAudio("../assets/raw_sounds/channels/ch1.wav"),
    ch2: pathToAudio("../assets/raw_sounds/channels/ch2.wav"),
    ch3: pathToAudio("../assets/raw_sounds/channels/ch3.wav"),
  };
};

const getDurationSoundList = () => {
  return {
    "30sec": pathToAudio("../assets/raw_sounds/durations/30sec.wav"),
    "2min": pathToAudio("../assets/raw_sounds/durations/2min.wav"),
    "3min": pathToAudio("../assets/raw_sounds/durations/5min.wav"),
    "10min": pathToAudio("../assets/raw_sounds/durations/10min.wav"),
  };
};

const getFreeSoundList = () => {
  return {
    free1: pathToAudio("../assets/raw_sounds/frees/free1.wav"),
    free2: pathToAudio("../assets/raw_sounds/frees/free2.wav"),
    free3: pathToAudio("../assets/raw_sounds/frees/free3.wav"),
  };
};

const getMinisSoundList = () => {
  return {
    amber_knight_king: "../assets/raw_sounds/minis/amber_knight_king.wav",
    anubis: "../assets/raw_sounds/minis/anubis.wav",
    cat_nine_tale: "../assets/raw_sounds/minis/cat_nine_tale.wav",
    choco: "../assets/raw_sounds/minis/choco.wav",
    dark_priest: "../assets/raw_sounds/minis/dark_priest.wav",
    dragonfly: "../assets/raw_sounds/minis/dragonfly.wav",
    eclipse: "../assets/raw_sounds/minis/eclipse.wav",
    ghost_ring: "../assets/raw_sounds/minis/ghost_ring.wav",
    griffon: "../assets/raw_sounds/minis/griffon.wav",
    hell_nightmare: "../assets/raw_sounds/minis/hell_nightmare.wav",
    kobold_leader: "../assets/raw_sounds/minis/kobold_leader.wav",
    master_ring: "../assets/raw_sounds/minis/master_ring.wav",
    maya_purple: "../assets/raw_sounds/minis/maya_purple.wav",
    obeaune_of_deepsea: "../assets/raw_sounds/minis/obeaune_of_deepsea.wav",
    sasurai: "../assets/raw_sounds/minis/sasurai.wav",
    silver_grizzly: "../assets/raw_sounds/minis/silver_grizzly.wav",
    taiko: "../assets/raw_sounds/minis/taiko.wav",
    tenka: "../assets/raw_sounds/minis/tenka.wav",
    load: "../assets/raw_sounds/minis/load.wav",
    vocal: "../assets/raw_sounds/minis/vocal.wav",
  };
};

const getMvpsSoundList = () => {
  return {};
};

const createSounds = () => {};
