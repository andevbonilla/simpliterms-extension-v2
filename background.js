let termsLinksFound = [];
let privacyLinksFound = [];
let token = "";

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {

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

        chrome.runtime.sendMessage({ action: 'termsRespond', result: resultTERMS});
        chrome.runtime.sendMessage({ action: 'privacyRespond', result: resultPRIVACY});
        
    };

    if (message.termsLinks) {
      if (message.termsLinks.length <= 10) {
        termsLinksFound = message.termsLinks;
      };
    };

    if (message.privacyLinks) {
      if (message.privacyLinks.length <= 10) {
        privacyLinksFound = message.privacyLinks;
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
        error: false,
        data
    };

  } catch (error) {
    return {
        error: true,
        message: "Ups! Something went wrong, please try again."
      };
  }
}