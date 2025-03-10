import { getActiveTabURL } from "./utils.js";
document.addEventListener("DOMContentLoaded", async () => {
  let pageURL = window.location.href;
  const queryParameter = pageURL.split("url=")[1];

  const title = document.getElementsByClassName("title")[0];

  if (queryParameter === undefined) {
    const activeTab = await getActiveTabURL();
    title.textContent = activeTab.url;
  } else {
    const features = document.getElementById("features");
    const feat = document.createElement("div");
    feat.textContent = "IP adresas vietoje domeno vardo";
    features.appendChild(feat);
    title.textContent = queryParameter;
  }
});
