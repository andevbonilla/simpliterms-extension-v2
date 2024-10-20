const token = 'user-authentication-token'; // Get this from your website's JavaScript
chrome.runtime.sendMessage({ type: 'STORE_TOKEN', token: token }, (response) => {
  console.log(response.status);
});
