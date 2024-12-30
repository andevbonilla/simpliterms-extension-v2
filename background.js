let termsLinksFound = [];
let privacyLinksFound = [];
let currentPage = "";
let pageURLcomplete = {}; // object with all the info of url
let token = "";

let privacyAndTermsForPage = {
  id: "",
  terms: null,
  privacy: null
};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {

    // request two summaries and other info to backend
    // =================================================================================
    if (message.action === 'RESQUEST_SUMMARIES') {

        const payloadTerms = {
          urlList: termsLinksFound, 
          politicsType: "terms"   
        };
        const payloadPrivacy = {
          urlList: privacyLinksFound, 
          politicsType: "privacy"   
        };

        const [resultTERMS, resultPRIVACY] = await Promise.all([sendDataToAPI(payloadTerms), sendDataToAPI(payloadPrivacy)]);

        chrome.runtime.sendMessage({ action: 'TERMS_RESPOND', result: {...resultTERMS, host: currentPage}});
        chrome.runtime.sendMessage({ action: 'PRIVACY_RESPOND', result: {...resultPRIVACY, host: currentPage}});
        
    };

    // review if there is already a summary info for the current host
    // =================================================================================
    if (message.action === 'CHECK_FOR_INFO') {
      const simplitermsValidOrigins = ["www.simpliterms.com", "simpliterms.com", "localhost:3000"];
      if (simplitermsValidOrigins.includes(currentPage)) {
       chrome.cookies.get({ url: pageURLcomplete.origin, name: "x-token" }, (cookie) => {
          if (cookie && cookie.value && cookie.value !== "") {
            token = cookie.value;
          }
        }); 
      };
      sendResponse({privacyAndTermsForPage});
    };

    // save links for possible terms of use pages
    // =================================================================================
    if (message.termsLinks) {
      if (message.termsLinks.length >= 1 && message.termsLinks.length <= 10) {
            termsLinksFound = message.termsLinks;
      }
    };

    // save links for possible privacy policies pages
    // =================================================================================
    if (message.privacyLinks) {
      if (message.privacyLinks.length >= 1 && message.privacyLinks.length <= 10) {
            privacyLinksFound = message.privacyLinks;
      }
    };

    // save info of the current host page
    // =================================================================================
    if (message.hostInfo) {
      currentPage = validateHost(message.hostInfo) ? message.hostInfo : "";
      chrome.storage.local.get([currentPage], function(result) {
        if (result[currentPage]) {
          privacyAndTermsForPage = result[currentPage];
        };
      });
    };

    // save info of the current host page
    // =================================================================================
    if (message.urlComplete) {
      pageURLcomplete = message.urlComplete;
    };

});


async function sendDataToAPI(payload) {

  try {

    console.log(token, payload, "asdasdasd")
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