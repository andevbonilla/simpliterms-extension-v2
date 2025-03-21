let termsLinksFound = [];
let privacyLinksFound = [];
let hostPage = "";
let summaryToSave = {
  terms: null,
  privacy: null
}; // privacy and terms to save

chrome.webNavigation.onCompleted.addListener((details) => {
  const url = new URL(details.url);
  hostPage = url.hostname.toString().trim();
  if (url.hostname.endsWith('simpliterms.com')) {

    // extract token
    getCookieValue(details.url, 'x-token', (token) => {
      if (token) {
        chrome.storage.sync.set({
          'xtoken': token
        });
      }else{
        chrome.storage.sync.set({
          'xtoken': ""
        });
      }
    });

    // extract username
    getCookieValue(details.url, 'username', (username) => {
      if (username) {
        chrome.storage.sync.set({
          'username': username
        });
      }else{
        chrome.storage.sync.set({
          'username': ""
        });
      }
    });
  }
});


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {

    // Obtain all the important info from the page
    // =================================================================================
    if (message.action === 'IMPORTANT_INFO_FROM_PAGE') {

      if (message.info) {

        const {host, termsLinks, privacyLinks, summaryOfThisPage} = message.info;
        hostPage = host.toString().trim();

        if (termsLinks && termsLinks.length > 0) {
            termsLinksFound = termsLinks;
        };

        if (privacyLinks && privacyLinks.length > 0) {
            privacyLinksFound = privacyLinks;
        };

        // get the summary of the webpage in case is auth and there is one in the storage
        chrome.storage.sync.get('xtoken', ({xtoken}) => {

            if (xtoken && xtoken.length > 0) {

              chrome.storage.sync.get('username', ({username}) => {
                // AUTH
                // send all the neccesary info to the popup.js
                const usernameTemp = username || "";

                chrome.runtime.sendMessage({
                    action: 'FIRST_VALIDATION_AUTH', 
                    summaryInfo: summaryOfThisPage, 
                    username: usernameTemp, 
                    hostPage
                });

              });
               
            }else{
              chrome.storage.sync.set({
                'xtoken': ""
              });
              chrome.runtime.sendMessage({ action: 'NOT_AUTH' });
            }

        });

      };

    };

    // request two summaries and other info to backend
    // =================================================================================
    if (message.action === 'RESQUEST_SUMMARIES') {

        console.log("pppppp")
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

            if (xtoken && xtoken.length > 0) {
                // Validate if there is terms in the page
                if (payloadTerms.urlList.length > 0 && payloadPrivacy.urlList.length > 0) {

                    // IS AUTH
                    const [resultTERMS, resultPRIVACY] = await Promise.all([sendDataToAPI(payloadTerms, xtoken), sendDataToAPI(payloadPrivacy, xtoken)]);

                    console.log("oooooo")
                    if (resultTERMS) {

                      console.log(resultTERMS, "resultTERMS")

                      if (!!resultTERMS.serverError) {
                          // step 0: Validate if Server error
                          chrome.runtime.sendMessage({ action: 'TERMS_RESPOND', result: {type: "SERVER_ERROR", ...resultTERMS, host: hostPage}});

                      }else if(resultTERMS.data && resultTERMS.data.res === false && resultTERMS.data.message === "there was a server error, please wait or try later") {
                          // step 0.5: Validate if is also a Server error 
                          chrome.runtime.sendMessage({ action: 'TERMS_RESPOND', result: {type: "SERVER_ERROR", ...resultTERMS, host: hostPage}});
                      
                      }else if (resultTERMS.data && resultTERMS.data.msj && resultTERMS.data.msj === "Auth failed" && resultTERMS.data.res === false) {
                          // step 1: Validate if Auth error
                          chrome.storage.sync.set({
                              'xtoken': ""
                          });
                          chrome.runtime.sendMessage({ action: 'NOT_AUTH'});

                      }else if (resultTERMS.data && resultTERMS.data.res === false && !!resultTERMS.data.noAccess) {
                          // step 2: Validate if normal error  
                          chrome.runtime.sendMessage({ action: 'TERMS_RESPOND', result: {type: "NO_ACCESS", ...resultTERMS.data, host: hostPage}});

                      }else if (resultTERMS.data && resultTERMS.data.res === false && !resultTERMS.data.noAccess) {
                          // step 2: Validate if normal error
                          chrome.runtime.sendMessage({ action: 'TERMS_RESPOND', result: {type: "NORMAL_ERROR", ...resultTERMS.data, host: hostPage}});

                      }else if (resultTERMS.data && resultTERMS.data.status && resultTERMS.data.status === "success" && resultTERMS.data.formatedResponse) {
                          // step 3: Validate if Success respond 
                          summaryToSave = {...summaryToSave, terms: resultTERMS.data.formatedResponse};
                          chrome.runtime.sendMessage({ action: 'TERMS_RESPOND', result: {type: "SUCCESS", ...resultTERMS.data, host: hostPage}});
                      };
                      
                    };

                    if (resultPRIVACY) {

                      if (!!resultPRIVACY.serverError) {
                          // step 0: Validate if Server error  
                          chrome.runtime.sendMessage({ action: 'PRIVACY_RESPOND', result: {type: "SERVER_ERROR", ...resultPRIVACY, host: hostPage}});

                      }else if(resultPRIVACY.data && resultPRIVACY.data.res === false && resultPRIVACY.data.message === "there was a server error, please wait or try later") {
                          // step 0.5: Validate if is also a Server error 
                          chrome.runtime.sendMessage({ action: 'PRIVACY_RESPOND', result: {type: "SERVER_ERROR", ...resultPRIVACY, host: hostPage}});
                      
                      }else if (resultPRIVACY.data && resultPRIVACY.data.msj && resultPRIVACY.data.msj === "Auth failed" && resultPRIVACY.data.res === false) {
                          // step 1: Validate if Auth error  
                          chrome.storage.sync.set({
                              'xtoken': ""
                          });
                          chrome.runtime.sendMessage({ action: 'NOT_AUTH'});

                      }else if (resultPRIVACY.data && resultPRIVACY.data.res === false && !!resultPRIVACY.data.noAccess) {
                          // step 2: Validate if normal error  
                          chrome.runtime.sendMessage({ action: 'PRIVACY_RESPOND', result: {type: "NO_ACCESS", ...resultPRIVACY.data, host: hostPage}});

                      }else if (resultPRIVACY.data && resultPRIVACY.data.res === false && !resultPRIVACY.data.noAccess) {
                          // step 2: Validate if normal error  
                          chrome.runtime.sendMessage({ action: 'PRIVACY_RESPOND', result: {type: "NORMAL_ERROR", ...resultPRIVACY.data, host: hostPage}});

                      }else if (resultPRIVACY.data && resultPRIVACY.data.status && resultPRIVACY.data.status === "success" && resultPRIVACY.data.formatedResponse) {
                          // step 3: Validate if Success respond  
                          summaryToSave = {...summaryToSave, privacy: resultPRIVACY.data.formatedResponse};
                          chrome.runtime.sendMessage({ action: 'PRIVACY_RESPOND', result: {type: "SUCCESS", ...resultPRIVACY.data, host: hostPage}});
                      };
          
                    };

                    if (summaryToSave.privacy !== null && summaryToSave.terms !== null) {
                        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                          if (tabs[0]?.id) {
                            chrome.tabs.sendMessage(tabs[0].id, { action: 'SAVE_SUMMARY', summaryToSave});
                          }
                        });                   
                    }


                }else{
                  chrome.runtime.sendMessage({ action: 'TERMS_RESPOND', result: {type: "NO_POLICIES_ERROR", host: hostPage}});
                  chrome.runtime.sendMessage({ action: 'PRIVACY_RESPOND', result: {type: "NO_POLICIES_ERROR", host: hostPage}});
                }
               
            }else{
              // Isn't authenticated
              chrome.storage.sync.set({
                'xtoken': ""
              });
              chrome.runtime.sendMessage({ action: 'NOT_AUTH'});
            };
        });

    };

});

// UTILS functions
async function sendDataToAPI(payload, token) {

  const serverErrorMessage = chrome.i18n.getMessage("serverErrorMessage");

  try {

    const response = await fetch('https://simpliterms-backend-production.up.railway.app/api/summary/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    

    const data = await response.json();
    if (!data) {
      return {
        serverError: true,
        message: serverErrorMessage 
      };
    }

    return {
        data
    };

  } catch (error) {
    return {
        serverError: true,
        message: serverErrorMessage 
      };
  }
}

function getCookieValue(domain, name, callback) {
  chrome.cookies.get({ url: domain, name: name }, (cookie) => {
    if (cookie) {
      callback(cookie.value);
    } else {
      callback(null);
    }
  });
}