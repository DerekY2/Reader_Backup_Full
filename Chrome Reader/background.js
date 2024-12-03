chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true,
    },  
    function (e) {
      console.log("Request sent...")
      chrome.tabs.sendMessage(
        e[0].id,
        { message: "start" },
        function (response) {}
      );
      
    }
  );
});


chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.query(
    {
      currentWindow: true,
    },
    function gotTabs(tabs) {
      for (let i = 0; i < tabs.length; i++) {
        chrome.scripting.executeScript({
          target: {
            tabId: tabs[i].id,
          },
          files: ["content.js"],
        });
        chrome.scripting.insertCSS({
          target: {
            tabId: tabs[i].id,
          },
          files: ["styles.css"],
        });
      }
    }
  );
});


chrome.gcm.onMessage.addListener(function () {
  sendNotification();
});
const sendNotification = () => {
  chrome.notifications.create(
    {
      type: "basic",
      iconUrl: chrome.runtime.getURL("icon32.png"),
      title: "Hey,😃!",
      message: "Thanks for installing ReaderMode !",
      silent: false,
    },
    () => {}
  );
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'openOptionsPage') {
    chrome.runtime.openOptionsPage();
  }
});
