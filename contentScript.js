(() => {
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId, url } = obj;

    if (type === "NEW") {
      console.log("Atidarytas naujas langas " + url);
    }
  });
})();
