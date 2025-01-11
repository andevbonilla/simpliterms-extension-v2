let termsLinksFound = [];
let privacyLinksFound = [];
let hostPage = "";
let allSumamriesSaved = {};

chrome.webNavigation.onCompleted.addListener((details) => {
  const url = new URL(details.url);
  hostPage = url.hostname.toString().trim();
  if (url.hostname.endsWith('simpliterms.com')) {

    // extract token
    getCookieValue(details.url, 'x-token', (token) => {
      if (token) {
        console.log('Token:', token);
        chrome.storage.sync.set({
          'xtoken': token
        });
      }
    });

    // extract username
    getCookieValue(details.url, 'username', (username) => {
      if (username) {
        console.log('Username:', username);
        chrome.storage.sync.set({
          'username': username
        });
      }
    });
  }
}, { url: [{ hostSuffix: 'simpliterms.com' }] });


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {

    // Obtain all the important info from the page
    // =================================================================================
    if (message.action === 'IMPORTANT_INFO_FROM_PAGE') {

      if (message.info) {

        const {termsLinks, privacyLinks} = message.info;

        if (termsLinks && termsLinks.length > 0 && termsLinks.length <= 10) {
            termsLinksFound = termsLinks;
        };

        if (privacyLinks && privacyLinks.length > 0 && privacyLinks.length <= 10) {
            privacyLinksFound = privacyLinks;
        };

        // get the summary of the webpage in case is auth and there is one in the storage
        chrome.storage.sync.get('xtoken', ({xtoken}) => {
            if (xtoken && xtoken !== "") {

              chrome.storage.sync.get('username', ({username}) => {
                // AUTH
                // send all the neccesary info to the popup.js
                const usernameTemp = username || "";
                chrome.storage.sync.get('SummariesSaved', ({ SummariesSaved }) => {

                  allSumamriesSaved = SummariesSaved || {};  

                  let summaryInfo = null;
                  if (allSumamriesSaved[hostPage]) {
                      summaryInfo = allSumamriesSaved[hostPage];
                  }

                  chrome.runtime.sendMessage({
                    action: 'FIRST_VALIDATION_AUTH', 
                    summaryInfo, 
                    username: usernameTemp, 
                    hostPage
                  });
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
                // Validate if there is terms in the page
                if (payloadTerms.urlList.length > 0 && payloadPrivacy.urlList.length > 0) {
                    // IS AUTH
                    const [resultTERMS, resultPRIVACY] = await Promise.all([sendDataToAPI(payloadTerms, xtoken), sendDataToAPI(payloadPrivacy, xtoken)]);

                    if (resultTERMS) {

                      if (!!resultTERMS.serverError) {
                          // step 0: Validate if Server error
                          chrome.runtime.sendMessage({ action: 'TERMS_RESPOND', result: {type: "SERVER_ERROR", ...resultTERMS, host: hostPage}});

                      }else if (resultTERMS.data && resultTERMS.data.msj && resultTERMS.data.msj === "Auth failed" && resultTERMS.data.res === false) {
                          // step 1: Validate if Auth error
                          chrome.storage.sync.set({
                              'xtoken': ""
                          });
                          chrome.runtime.sendMessage({ action: 'NOT_AUTH'});

                      }else if (resultTERMS.data && resultTERMS.data.res === false) {
                          // step 2: Validate if normal error
                          chrome.runtime.sendMessage({ action: 'TERMS_RESPOND', result: {type: "NORMAL_ERROR", ...resultTERMS.data, host: hostPage}});

                      }else if (resultTERMS.data && resultTERMS.data.status && resultTERMS.data.status === "success" && resultTERMS.data.formatedResponse) {
                          // step 3: Validate if Success respond 
                          allSumamriesSaved = {...allSumamriesSaved, [hostPage]: {...(allSumamriesSaved[hostPage] || {}), terms: resultTERMS.data.formatedResponse}};
                          chrome.storage.sync.set({
                            'SummariesSaved': allSumamriesSaved
                          });
                          chrome.runtime.sendMessage({ action: 'TERMS_RESPOND', result: {type: "SUCCESS", ...resultTERMS.data, host: hostPage}});

                      };
                      
                    };

                    if (resultPRIVACY) {

                      if (!!resultPRIVACY.serverError) {
                          // step 0: Validate if Server error  
                          chrome.runtime.sendMessage({ action: 'PRIVACY_RESPOND', result: {type: "SERVER_ERROR", ...resultPRIVACY, host: hostPage}});

                      }else if (resultPRIVACY.data && resultPRIVACY.data.msj && resultPRIVACY.data.msj === "Auth failed" && resultPRIVACY.data.res === false) {
                          // step 1: Validate if Auth error  
                          chrome.storage.sync.set({
                              'xtoken': ""
                          });
                          chrome.runtime.sendMessage({ action: 'NOT_AUTH'});

                      }else if (resultPRIVACY.data && resultPRIVACY.data.res === false) {
                          // step 2: Validate if normal error  
                          chrome.runtime.sendMessage({ action: 'PRIVACY_RESPOND', result: {type: "NORMAL_ERROR", ...resultPRIVACY.data, host: hostPage}});

                      }else if (resultPRIVACY.data && resultPRIVACY.data.status && resultPRIVACY.data.status === "success" && resultPRIVACY.data.formatedResponse) {
                          // step 3: Validate if Success respond  
                          allSumamriesSaved = {...allSumamriesSaved, [hostPage]: {...(allSumamriesSaved[hostPage] || {}), privacy: resultPRIVACY.data.formatedResponse}};
                          chrome.storage.sync.set({
                            'SummariesSaved': allSumamriesSaved
                          });
                          chrome.runtime.sendMessage({ action: 'PRIVACY_RESPOND', result: {type: "SUCCESS", ...resultPRIVACY.data, host: hostPage}});

                      };
          
                    };

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

    if (message.action === 'RELOAD_SUMMARY') {
        allSumamriesSaved = allSumamriesSaved || {};
        delete allSumamriesSaved[hostPage];
        chrome.storage.sync.set({
          'SummariesSaved': allSumamriesSaved
        });
        sendResponse({result: true});
    };



});

// UTILS functions

async function sendDataToAPI(payload, token) {

  const serverErrorMessage = chrome.i18n.getMessage("serverErrorMessage");

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