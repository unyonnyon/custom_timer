let timerId = 0;
addEventListener("message", (e) => {
  if (timerId !== 0) {
    clearInterval(timerId);
    timerId = 0;
  }
  if (e.data > 0) {
    timerId = setInterval(() => {
      postMessage(Date.now());
    }, 1000);
  }
});

export default {};
