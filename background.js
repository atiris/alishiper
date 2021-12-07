chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.sync.get(["list"], function (result) {
    if (result && !result.list) {
      chrome.storage.sync.set({
        "list": "BE,CZ,ES,FR,IT,PL"
      });
    }
    console.log('Installed');
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.command) {
    case "update":
      let countryList = request.list;
      chrome.storage.sync.set({
        "list": countryList
      }, function () {
        if (sendResponse) {
          sendResponse({
            message: "success"
          });
        }
      });
      break;
    case "redirect":
      chrome.tabs.query({
        active: true
      }, function (tabs) {
        chrome.storage.sync.get(["list"], function (result) {
          if (result && result.list && result.list.length > 0) {
            chrome.tabs.update(sender.tab.id, {
              url: request.url + "&shipFromCountry=" + result.list
            });
          }
        });
      });
      break;
  }
  return true;
});