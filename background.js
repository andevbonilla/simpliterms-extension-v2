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

let sessionSummariesSaved = {};


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

    // request two summaries and other info to backend
    // =================================================================================
    if (message.action === 'DELETE_TOKEN') {
        token = "";   
    };

    // review if there is already a summary info for the current host
    // =================================================================================
    if (message.action === 'CHECK_FOR_INFO') {
      sendResponse({ privacyAndTermsForPage: {...privacyAndTermsForPage, token} }); 
    };

    // save or update the info of a summary for one webpage in order to cache it and avoid 
    // unnecessary future request
    // =================================================================================
    if (message.action === 'SAVE_OR_UPDATE_SUMMARY_INFO') {
        console.log(message, "oooooo[psss")
        console.log(message.action, "oooooo[psss")
        console.log(message.sumamriesOfCurrentPage, "oooooo[psss")
        sessionSummariesSaved[message.sumamriesOfCurrentPage.id] = {...sessionSummariesSaved[message.sumamriesOfCurrentPage.id], ...message.sumamriesOfCurrentPage};
        console.log(sessionSummariesSaved, "sessionSummariesSaved333")
        sendResponse({ sessionSummariesSaved }); 
    };

    // save links for possible terms of use pages
    // =================================================================================
    if (message.termsLinks) {
      if (message.termsLinks.length > 0 && message.termsLinks.length <= 10) {
            termsLinksFound = message.termsLinks;
      }
    };

    // save links for possible privacy policies pages
    // =================================================================================
    if (message.privacyLinks) {
      if (message.privacyLinks.length > 0 && message.privacyLinks.length <= 10) {
            privacyLinksFound = message.privacyLinks;
      }
    };

    // save info of the current host page
    // =================================================================================
    if (message.urlComplete) {

      pageURLcomplete = message.urlComplete;
      currentPage = validateHost(message.urlComplete.host) ? message.urlComplete.host.toString().trim() : "";

      if (sessionSummariesSaved.length > 0 && sessionSummariesSaved[currentPage]) {
        privacyAndTermsForPage = sessionSummariesSaved[currentPage]; 
      };

      const simplitermsValidOrigins = ["www.simpliterms.com", "simpliterms.com", "localhost:3000"];
      if (simplitermsValidOrigins.includes(currentPage)) {
        chrome.cookies.get({ url: pageURLcomplete.origin, name: "x-token" }, (cookie) => {
          if (cookie && cookie.value && cookie.value !== "") {
              token = cookie.value;
          }
        });
      };

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