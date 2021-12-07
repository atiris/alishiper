// call function on window ready
window.onload = start;

function info(message) {
  document.getElementById("info").innerHTML = message;
}

function doWork() {
  chrome.storage.sync.get(['list'], function (data) {
    if (data.list && data.list.length > 0) {
      document.getElementById("list").value = data.list;
    }
  });
  info("List of country codes can be comma separated.");
}

function registerEvents() {
  document.getElementById("eu").addEventListener("click", () => {
    document.getElementById("list").value = "BE,BG,CZ,DK,DE,EE,IE,EL,ES,FR,HR,IT,CY,LV,LT,LU,HU,MT,NL,AT,PL,PT,RO,SI,SK,FI,SE";
  });

  document.getElementById("default").addEventListener("click", () => {
    document.getElementById("list").value = "BE,CZ,ES,FR,IT,PL";
  });

  document.getElementById("update").addEventListener("click", () => {
    let list = document.getElementById("list").value;
    console.log("call update");
    chrome.runtime.sendMessage({command: "update", list: list}, (response) => {
      info("Updated");
      setTimeout(() => {
        window.close();
      }, 1000);
    });
  });
}

function registerMessages() {
  document.addEventListener('DOMContentLoaded', updatePopup);
}

function updatePopup() {
  chrome.storage.sync.get(['list', 'status'], function (data) {
    document.getElementById("list").innerText = data.list;
    document.getElementById("status").innerText = data.status;
  });
}

function start() {
  registerEvents();
  registerMessages();
  doWork();
}