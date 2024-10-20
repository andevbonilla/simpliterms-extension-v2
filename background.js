chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'STORE_TOKEN') {
    chrome.storage.local.set({ authToken: request.token }, () => {
      sendResponse({ status: 'success' });
    });
    return true; // send a response asynchronously
  }
});
