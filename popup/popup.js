// set translations text to the HTML
// ========================================================================================
const pMsgHi = document.getElementById("msg-h");
pMsgHi.textContent = chrome.i18n.getMessage('hi');

const h2MsgNotLogged = document.getElementById("title-notlogged");
h2MsgNotLogged.textContent = chrome.i18n.getMessage('NotLoggedTitle');

const linkSignup = document.getElementById("link-signup");
linkSignup.textContent = chrome.i18n.getMessage('buttonSingUp');

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
