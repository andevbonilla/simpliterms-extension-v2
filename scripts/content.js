const extractLinksAlgorithm = () => {

    const privacyKeyWords = [
      "datenschutz",      // Alemán
      "privacy",          // Inglés
      "privacidad",       // Español
      "confidentialité",  // Francés
      "गोपनीयता",         // Hindi
      "プライバシー",       // Japonés
      "конфиденциальность",// Ruso
      "隐私"               // Chino
    ];

    const termsKeyWords = [
      // Inglés
      "terms", "conditions", "use", "policy",
      // Alemán
      "nutzungsbedingungen", "bedingungen", "nutzung", "richtlinie",
      // Español
      "términos", "condiciones", "uso", "política",
      // Francés
      "conditions", "utilisation", "politique",
      // Hindi
      "शर्तें", "उपयोग", "नीति",
      // Japonés
      "利用規約", "利用", "条件", "ポリシー",
      // Ruso
      "условия", "использование", "политика",
      // Chino (Simplificado)
      "条款", "条件", "使用", "政策"
    ];


    let termsLinks = [];
    let privacyLinks = [];

    const anchorTags = document.querySelectorAll('a');

    anchorTags.forEach(tag => {
        
        const tagCleanedText = tag.textContent.toLowerCase().replaceAll(" ", "");
        
        // for terms
        if (termsKeyWords.some(keyWord => tagCleanedText.includes(keyWord.toLowerCase()))) {
            termsLinks.push(tag.href);
        };

        // for privacy
        if (privacyKeyWords.some(keyWord => tagCleanedText.includes(keyWord.toLowerCase()))) {
            privacyLinks.push(tag.href);
        };

    });

    return {
      termsLinks,
      privacyLinks
    };

}

// send all the neccesary info to do the summary 
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'SEND_INFO') {
    const info = extractLinksAlgorithm();
    chrome.runtime.sendMessage({ action: "IMPORTANT_INFO_FROM_PAGE", info});
  }
});



