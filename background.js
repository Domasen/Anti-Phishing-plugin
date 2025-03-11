import { isIPAddress } from "./phishingFeatures/IPAdressFeat.js";
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("https://mail.google.com/mail/u/0/#inbox/")
  ) {
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      url: tab.url,
    });
  }
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (!expludeURLFromChecking(details.url)) {
    console.log(details.url);
    if (isIPAddress(details.url)) {
      openPanelWindow(details.url);
    }
  }
});

function openPanelWindow(url) {
  //creates a panel html
  chrome.windows.create(
    {
      url: "popup.html?url=" + url,
      type: "panel",
      left: 300,
      top: 10,
      width: 1000,
      height: 800,
    },
    (window) => {
      panelWindowId = window.id;
    }
  );
}

function expludeURLFromChecking(url) {
  const domain = new URL(url).hostname;
  if (domain.includes("google") || url.includes("about:blank")) {
    return true;
  }

  return false;
}
