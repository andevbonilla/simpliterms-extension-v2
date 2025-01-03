let termsLinksFound = [];
let privacyLinksFound = [];
let hostPage = "";
let pageURLcomplete = {}; // object with all the info of url


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
              
                // is in simpliterms webpage
                chrome.cookies.get({ url: pageURLcomplete.origin, name: "x-token" }, (cookie) => {

                  if (cookie && cookie.value && cookie.value !== "") {

                      chrome.storage.sync.set({
                        'xtoken': cookie.value
                      });

                  };

                });
                
            };

        };

        // get the summary of the webpage in case is auth and there is one in the storage
        chrome.storage.sync.get('xtoken', ({xtoken}) => {
            if (xtoken && xtoken !== "") {
               // AUTH
               // send all the neccesary info to the popup.js
               chrome.storage.sync.get('SummariesSaved', ({SummariesSaved}) => {
                  let data = null;
                  if (SummariesSaved && SummariesSaved[hostPage]) {
                      data = SummariesSaved[hostPage];
                      chrome.runtime.sendMessage({ action: 'FIRST_VALIDATION_AUTH', data }); 
                  }else{
                      chrome.runtime.sendMessage({ action: 'FIRST_VALIDATION_AUTH', data }); 
                  }
               });
            }else{
              chrome.runtime.sendMessage({ action: 'FIRST_VALIDATION_NOT_AUTH' });
            }
        });

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

        // Validate if user has a token
        chrome.storage.sync.get('xtoken', async({xtoken}) => {
            if (xtoken && xtoken !== "") {

                // IS AUTH
                const [resultTERMS, resultPRIVACY] = await Promise.all([sendDataToAPI(payloadTerms, xtoken), sendDataToAPI(payloadPrivacy, xtoken)]);

                console.log(resultTERMS , "resultTERMS")
                console.log(resultPRIVACY , "resultPRIVACY")

                if (resultTERMS) {

                  // step 0: Validate if Server error
                  if (resultTERMS.serverError && resultTERMS.serverError === true) {
                  };

                  // step 1: Validate if Auth error
                  if (resultTERMS.data && resultTERMS.data.msj && resultTERMS.data.msj === "Auth failed" && resultTERMS.data.res === false) {
                  };

                  // step 2: Validate if normal error

                  // step 3: Validate if Success respond


                  chrome.runtime.sendMessage({ action: 'TERMS_RESPOND', result: {...resultTERMS, host: hostPage}});
                };

                if (resultPRIVACY) {




                  chrome.runtime.sendMessage({ action: 'PRIVACY_RESPOND', result: {...resultPRIVACY, host: hostPage}});
                };
               
              
            }else{
              chrome.runtime.sendMessage({ action: 'FIRST_VALIDATION_NOT_AUTH' });
            }
        });

    };


});


async function sendDataToAPI(payload, token) {

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