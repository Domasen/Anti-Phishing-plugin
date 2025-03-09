export function isIPAddress(urlString) {
  try {
    // Extract the hostname using the URL API
    const hostname = new URL(urlString).hostname;

    // 1) Check IPv4 with regex: 4 groups of 1–3 digits, separated by dots
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipv4Regex.test(hostname)) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
}
