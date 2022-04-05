const speak = (text: any, rate = 1, pitch = 1) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko";
  utterance.rate = rate;
  utterance.pitch = pitch;
  speechSynthesis.speak(utterance);
};

export default speak;
