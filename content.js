function check() {
  console.log(location.href);
  if (location.href.indexOf("shipFromCountry") === -1) {
    chrome.runtime.sendMessage({command: "redirect", url: location.href});
  }
}

check();
