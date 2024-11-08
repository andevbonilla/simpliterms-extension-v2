document.addEventListener("DOMContentLoaded", async() => { 

    // set translations text to the HTML
    // ========================================================================================

    const pMsgHi = document.getElementById("msg-hi");
    pMsgHi.textContent = chrome.i18n.getMessage('hi');

    const h2MsgNotLogged = document.getElementById("title-notlogged");
    h2MsgNotLogged.textContent = chrome.i18n.getMessage('NotLoggedTitle');

    const linkSignup = document.getElementById("link-signup");
    linkSignup.textContent = chrome.i18n.getMessage('buttonSingUp');

    const pNotAccount = document.getElementById("msg-notaccount");
    pNotAccount.textContent = chrome.i18n.getMessage('ifAccountText');

    const linkSignIn = document.getElementById("link-signin");
    linkSignIn.textContent = chrome.i18n.getMessage('buttonSingIn');

    const pLoadingTermsOfUSE = document.getElementById("loading-terms-of-use-text");
    pLoadingTermsOfUSE.textContent = chrome.i18n.getMessage('loadingTermsOfUseText');

    const pLoadingPrivacyPolicies = document.getElementById("loading-privacy-policies-text");
    pLoadingPrivacyPolicies.textContent = chrome.i18n.getMessage('loadingPrivacyPoliciesText');

    const selectTermsButton = document.getElementById("terms-buttom");
    selectTermsButton.textContent = chrome.i18n.getMessage('buttonTerms');

    const selectPrivacyButton = document.getElementById("privacy-button");
    selectPrivacyButton.textContent = chrome.i18n.getMessage('buttonPrivacy');

// ========================================================================================

// "use strict";

// console.log("Hello, world from popup!")

// function setBadgeText(enabled) {
//     const text = enabled ? "ON" : "OFF"
//     void chrome.action.setBadgeText({text: text})
// }

// // Handle the ON/OFF switch
// const checkbox = document.getElementById("enabled")
// chrome.storage.sync.get("enabled", (data) => {
//     checkbox.checked = !!data.enabled
//     void setBadgeText(data.enabled)
// })
// checkbox.addEventListener("change", (event) => {
//     if (event.target instanceof HTMLInputElement) {
//         void chrome.storage.sync.set({"enabled": event.target.checked})
//         void setBadgeText(event.target.checked)
//     }
// })

// // Handle the input field
// const input = document.getElementById("item")
// chrome.storage.sync.get("item", (data) => {
//     input.value = data.item || ""
// });
// input.addEventListener("change", (event) => {
//     if (event.target instanceof HTMLInputElement) {
//         void chrome.storage.sync.set({"item": event.target.value})
//     }
// })

});