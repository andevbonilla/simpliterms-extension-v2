let termsLinksFound = [];
let privacyLinksFound = [];

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
      const resultTERMS = await sendDataToAPI(payloadTerms);
      const resultPRIVACY = await sendDataToAPI(payloadPrivacy);
      console.log(resultTERMS, resultPRIVACY);
  };

  if (message.termsLinks) {
    if (message.termsLinks.length <= 10) {
      termsLinksFound = message.termsLinks;
    }
    console.log('terms:', message.termsLinks);
  };

  if (message.privacyLinks) {
    if (message.privacyLinks.length <= 10) {
      privacyLinksFound = message.privacyLinks;
    }
    console.log('privacy:', message.privacyLinks);
  };

});


async function sendDataToAPI(payload) {

  try {

    const response = await fetch('http://localhost:3000/api/summary/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return {
        error: true,
        message: "Ups, there were a server error."
      };
    }

    const data = await response.json();
    return {
        error: false,
        data
    };

  } catch (error) {
    return {
        error: true,
        message: error.toString()
      };
  }
}