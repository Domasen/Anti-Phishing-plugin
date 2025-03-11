(() => {
  console.log("labas123");

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId, url } = obj;

    if (type === "NEW") {
      console.log("Atidarytas naujas laiskas " + url);
      addIndicatorToAllLinks();
    }
  });
})();

function getAllLinksFromEmailBody() {
  const emailContent = document.getElementsByClassName("adn ads")[0];

  return emailContent.getElementsByTagName("a");
}

function addIndicatorToAlink(link) {
  let redCircle = document.createElement("span");

  // Apply styles to make it a red circle
  redCircle.style.display = "inline-block";
  redCircle.style.width = "10px";
  redCircle.style.height = "10px";
  redCircle.style.backgroundColor = "red";
  redCircle.style.borderRadius = "50%";
  redCircle.style.marginLeft = "5px";

  // Attach click event to open a popup
  redCircle.addEventListener("click", () => {
    openPopup("www.facebook.com");
  });

  // Insert the red circle after the link
  link.parentNode.insertBefore(redCircle, link.nextSibling);
}

function addIndicatorToAllLinks() {
  let links = Array.from(getAllLinksFromEmailBody());

  links.forEach((link) => {
    addIndicatorToAlink(link);
  });
}

// **Function to Open a Popup**
function openPopup(url) {
  const width = 500;
  const height = 400;
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;

  window.open(
    url,
    "PhishingCheckPopup",
    `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=yes`
  );
}
