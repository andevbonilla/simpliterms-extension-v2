let termsLinksFound = [];
let privacyLinksFound = [];
let currentPage = "";
let token = "";

let privacyAndTermsForPage = {
  id: "",
  terms: null,
  privacy: null
};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {

    // TODO: obtain the token and valide if user is authenticated

    if (message.action === 'makeRequestToBackend') {

        const payloadTerms = {
          urlList: termsLinksFound, 
          politicsType: "terms"   
        };
        const payloadPrivacy = {
          urlList: privacyLinksFound, 
          politicsType: "privacy"   
        };

        const [resultTERMS, resultPRIVACY] = await Promise.all([sendDataToAPI(payloadTerms), sendDataToAPI(payloadPrivacy)]);

        chrome.runtime.sendMessage({ action: 'termsRespond', result: {...resultTERMS, host: currentPage}});
        chrome.runtime.sendMessage({ action: 'privacyRespond', result: {...resultPRIVACY, host: currentPage}});
        
    };

    if (message.action === 'thereIsInfo') {
      sendResponse({privacyAndTermsForPage});
    };

    if (message.termsLinks) {
      if (message.termsLinks.length > 1 && message.termsLinks.length <=10) {
            termsLinksFound = message.termsLinks;
      }
    };

    if (message.privacyLinks) {
      if (message.privacyLinks.length > 1 && message.privacyLinks.length <= 10) {
            privacyLinksFound = message.privacyLinks;
      }
    };

    if (message.hostInfo) {
      currentPage = validateHost(message.hostInfo) ? message.hostInfo : "";
      chrome.storage.local.get([currentPage], function(result) {
        if (result[currentPage]) {
          privacyAndTermsForPage = result[currentPage];
        };
      });
    };

});


async function sendDataToAPI(payload) {

  try {

    const response = await fetch('http://localhost:4200/api/summary/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return {
        data
    };

  } catch (error) {
    return {
        serverError: true,
        message: "Oops sorry there was a server error please try again later."
      };
  }
}

function validateHost(host) {
  const urlRegex = /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|localhost|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[-a-zA-Z\d%@_.~+&:]*)*(\?[;&a-zA-Z\d%@_.,~+&:=-]*)?(#[-a-zA-Z\d_]*)?$/;
  return urlRegex.test(host);
}