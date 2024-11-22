chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'makeRequestToBackend') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'makeRequestToBackend' });
            }
        });
  }
});