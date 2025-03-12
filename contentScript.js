(() => {
  console.log("labas123");

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId, url } = obj;

    if (type === "NEW") {
      console.log("Atidarytas naujas laiskas " + url);
      observeEmailBody();
    }
  });

  // Start observing when the script loads
  observeEmailBody();
})();

function getAllLinksFromEmailBody() {
  const emailContent = document.querySelector(".adn.ads");
  return emailContent ? emailContent.getElementsByTagName("a") : [];
}

function addIndicatorToAlink(link) {
  if (
    link.nextSibling &&
    link.nextSibling.classList?.contains("red-indicator")
  ) {
    return; // Prevent duplicate indicators
  }

  let redCircle = document.createElement("span");
  redCircle.style.display = "inline-block";
  redCircle.style.width = "10px";
  redCircle.style.height = "10px";
  redCircle.style.backgroundColor = "red";
  redCircle.style.borderRadius = "50%";
  redCircle.style.marginLeft = "5px";
  redCircle.classList.add("red-indicator");

  redCircle.addEventListener("click", () => {
    openPopup("info.html");
  });

  link.parentNode.insertBefore(redCircle, link.nextSibling);
}

function addIndicatorToAllLinks() {
  let links = Array.from(getAllLinksFromEmailBody());
  links.forEach(addIndicatorToAlink);
}

// **Observe the email content for changes**
function observeEmailBody() {
  const emailContainer = document.querySelector(".adn.ads");

  if (!emailContainer) {
    setTimeout(observeEmailBody, 1000); // Retry if not yet loaded
    return;
  }

  addIndicatorToAllLinks(); // Run initially

  const observer = new MutationObserver(() => {
    addIndicatorToAllLinks(); // Run whenever the email content changes
  });

  observer.observe(emailContainer, { childList: true, subtree: true });
}

// **Function to Open a Popup**
function openPopup(url) {
  // const width = 500;
  // const height = 400;
  // const left = (screen.width - width) / 2;
  // const top = (screen.height - height) / 2;

  // window.open(
  //   url,
  //   "PhishingCheckPopup",
  //   `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=yes`
  // );

  //window.open(chrome.runtime.getURL("info.html"), "_blank");
  chrome.runtime.sendMessage({ action: "openPopup", file: url });
}
