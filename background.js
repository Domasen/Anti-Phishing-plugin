import { isIPAddress } from "./phishingFeatures/IPAdressFeat.js";
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url) {
    //const queryParameters = tab.url.split("?")[1];
    //const urlParameters = new URLSearchParams(queryParameters);
    //console.log("Sending message with videoId:", urlParameters.get("v"));

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      url: tab.url,
    });
  }
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  console.log(details.url);
  if (isIPAddress(details.url)) {
    //openPanelWindow(details.url);
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
