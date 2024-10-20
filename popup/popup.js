document.getElementById('summarize-button').addEventListener('click', () => {
  chrome.storage.local.get('authToken', (data) => {
    if (data.authToken) {
      // Send a message to background.js to perform summarization
      chrome.runtime.sendMessage({ type: 'SUMMARIZE', token: data.authToken }, (response) => {
        // Handle the summary
        displaySummary(response.summary);
      });
    } else {
      // Prompt the user to log in
      alert('Please log in to use this feature.');
    }
  });
});
