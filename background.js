let termsLinksFound = [];
let privacyLinksFound = [];
let hostPage = "";
let pageURLcomplete = {}; // object with all the info of url
let token = "";


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {

    // Obtain all the important info from the page
    // =================================================================================
    if (message.action === 'IMPORTANT_INFO_FROM_PAGE') {

      if (message.info) {

        const {urlComplete, termsLinks, privacyLinks} = message.info;

        if (termsLinks && termsLinks.length > 0 && termsLinks.length <= 10) {
            termsLinksFound = termsLinks;
        };

        if (privacyLinks && privacyLinks.length > 0 && privacyLinks.length <= 10) {
            privacyLinksFound = privacyLinks;
        };

        if (urlComplete) {

            pageURLcomplete = urlComplete;
            hostPage = validateHost(urlComplete.host) ? urlComplete.host.toString().trim() : "";

            const simplitermsValidOrigins = ["www.simpliterms.com", "simpliterms.com", "localhost:3000"];

            if (simplitermsValidOrigins.includes(hostPage)) {
              chrome.cookies.get({ url: pageURLcomplete.origin, name: "x-token" }, (cookie) => {
                if (cookie && cookie.value && cookie.value !== "") {
                    token = cookie.value;
                }
              });
            };

        };

        // get the summary of the webpage in case is auth and there is one in the storage
        if (token !== "") {
            // AUTH
            // send all the neccesary info to the popup.js
            chrome.storage.session.get("SummariesSaved", (result) => {
              const data = result[hostPage];
              chrome.runtime.sendMessage({ action: 'FIRST_VALIDATION_AUTH', data });
            });
        }else{
            // NOT AUTH
            // send all the neccesary info to the popup.js
            chrome.runtime.sendMessage({ action: 'FIRST_VALIDATION_NOT_AUTH'});
        };

      };

    };

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

        chrome.runtime.sendMessage({ action: 'TERMS_RESPOND', result: {...resultTERMS, host: hostPage}});
        chrome.runtime.sendMessage({ action: 'PRIVACY_RESPOND', result: {...resultPRIVACY, host: hostPage}});
        
    };

    // request two summaries and other info to backend
    // =================================================================================
    if (message.action === 'DELETE_TOKEN') {
        token = "";   
    };

    // save or update the info of a summary for one webpage in order to cache it and avoid 
    // unnecessary future request
    // =================================================================================
    if (message.action === 'SAVE_OR_UPDATE_SUMMARY_INFO') {
        console.log(message, "oooooo[psss")
        console.log(message.action, "oooooo[psss")
        console.log(message.sumamriesOfhostPage, "oooooo[psss")
        sessionSummariesSaved[message.sumamriesOfhostPage.id] = {...sessionSummariesSaved[message.sumamriesOfhostPage.id], ...message.sumamriesOfhostPage};
        console.log(sessionSummariesSaved, "sessionSummariesSaved333")
        sendResponse({ sessionSummariesSaved }); 
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