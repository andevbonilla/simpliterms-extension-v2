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

    const selectTermsButton = document.getElementById("terms-buttom");
    selectTermsButton.textContent = chrome.i18n.getMessage('buttonTerms');

    const selectPrivacyButton = document.getElementById("privacy-button");
    selectPrivacyButton.textContent = chrome.i18n.getMessage('buttonPrivacy');

    const warningClosePopup = document.getElementById("warning-close-popup");
    warningClosePopup.textContent = chrome.i18n.getMessage('warningClosePopup');
    
    const warningInfo = document.getElementById("warning-info");
    warningInfo.textContent = chrome.i18n.getMessage('warningInfo');

    const labelCurrentPage = document.getElementById("current-page-label");
    labelCurrentPage.textContent = chrome.i18n.getMessage('labelCurrentPage');

    const labelPrivacyPage = document.getElementById("privacy-page-label");
    labelPrivacyPage.textContent = chrome.i18n.getMessage('labelPrivacyPage');

    const labelTermsPage = document.getElementById("terms-page-label");
    labelTermsPage.textContent = chrome.i18n.getMessage('labelTermsPage');

    const labelAboutSimpli = document.getElementById("about-simpli-label");
    labelAboutSimpli.textContent = chrome.i18n.getMessage('labelAboutSimpli');


    // randomly display curious data 
    let idiom = chrome.i18n.getMessage('@@ui_locale').split("_")[0]
    let curiosidades = [
        "Did you know that 90% of people accept terms without reading them?",
        "Did you know that some terms of use prohibit using the service for 'immoral' purposes?",
        "Did you know that a U.S. site once included a clause about 'giving up your soul'?",
        "Did you know that most terms allow data to be shared with third parties?",
        "Did you know that some contracts let companies change terms without notifying users?",
        "Did you know it would take an average of 76 days to read all the policies we accept in a year?",
        "Did you know that sometimes companies keep your data even after you close your account?",
        "Did you know that the European GDPR gives you the right to request data deletion?",
        "Did you know that privacy in social media apps is often less secure than we think?",
        "Did you know that some services can record your voice or analyze your photos without you knowing?"
    ];
    switch (idiom) {
        case "es":
            curiosidades = [
                "¿Sabías que el 90% de las personas acepta los términos sin leerlos?",
                "¿Sabías que algunos términos de uso prohíben usar el servicio para cosas 'inmorales'?",
                "¿Sabías que un sitio de EE.UU. una vez incluyó una cláusula de 'entregar tu alma'?",
                "¿Sabías que la mayoría de términos permiten que los datos se compartan con terceros?",
                "¿Sabías que algunos contratos permiten a las empresas modificar los términos sin avisar?",
                "¿Sabías que en promedio, se necesitarían 76 días para leer todas las políticas que aceptamos en un año?",
                "¿Sabías que a veces las empresas guardan los datos incluso después de cerrar la cuenta?",
                "¿Sabías que la GDPR europea da el derecho de pedir que borren tus datos?",
                "¿Sabías que la privacidad en las apps de redes sociales suele ser menos segura de lo que pensamos?",
                "¿Sabías que algunos servicios pueden grabar tu voz o analizar tus fotos sin que lo sepas?"
            ];
            break;
        case "fr":
            curiosidades = [
                "Saviez-vous que 90 % des gens acceptent les conditions sans les lire ?",
                "Saviez-vous que certains termes interdisent l'utilisation du service pour des choses 'immorales' ?",
                "Saviez-vous qu'un site américain avait une fois inclus une clause pour 'céder votre âme' ?",
                "Saviez-vous que la plupart des conditions permettent de partager les données avec des tiers ?",
                "Saviez-vous que certains contrats permettent aux entreprises de modifier les conditions sans préavis ?",
                "Saviez-vous qu'il faudrait en moyenne 76 jours pour lire toutes les politiques que nous acceptons chaque année ?",
                "Saviez-vous que parfois les entreprises conservent les données même après la fermeture d'un compte ?",
                "Saviez-vous que la GDPR européenne vous donne le droit de demander la suppression de vos données ?",
                "Saviez-vous que la confidentialité des applications de réseaux sociaux est souvent moins sécurisée qu'on ne le pense ?",
                "Saviez-vous que certains services peuvent enregistrer votre voix ou analyser vos photos sans que vous le sachiez ?"
            ];
            break;
        case "hi":
            curiosidades = [
                "क्या आप जानते हैं कि 90% लोग बिना पढ़े शर्तों को स्वीकार करते हैं?",
                "क्या आप जानते हैं कि कुछ शर्तें सेवा का 'अनैतिक' उद्देश्यों के लिए उपयोग करने पर रोक लगाती हैं?",
                "क्या आप जानते हैं कि एक अमेरिकी साइट ने एक बार 'अपनी आत्मा देने' का प्रावधान शामिल किया था?",
                "क्या आप जानते हैं कि अधिकांश शर्तें डेटा को तृतीय पक्षों के साथ साझा करने की अनुमति देती हैं?",
                "क्या आप जानते हैं कि कुछ अनुबंध कंपनियों को बिना सूचना के शर्तों को संशोधित करने की अनुमति देते हैं?",
                "क्या आप जानते हैं कि हर साल स्वीकार की जाने वाली सभी नीतियों को पढ़ने में औसतन 76 दिन लगेंगे?",
                "क्या आप जानते हैं कि कुछ कंपनियाँ खाते बंद होने के बाद भी डेटा रखती हैं?",
                "क्या आप जानते हैं कि यूरोपीय GDPR आपको अपने डेटा को हटाने का अधिकार देता है?",
                "क्या आप जानते हैं कि सोशल मीडिया ऐप्स में गोपनीयता उतनी सुरक्षित नहीं होती जितना हम सोचते हैं?",
                "क्या आप जानते हैं कि कुछ सेवाएं आपकी आवाज़ रिकॉर्ड कर सकती हैं या आपकी तस्वीरों का विश्लेषण कर सकती हैं बिना आपकी जानकारी के?"
            ];
            break;
        case "ja":
            curiosidades = [
                "利用規約を読まずに同意する人が90％いるって知ってましたか？",
                "一部の利用規約では「不道徳な」目的でのサービス利用を禁止しています。",
                "アメリカのあるサイトでは「魂を差し出す」という条項が含まれていました。",
                "ほとんどの利用規約ではデータが第三者と共有される可能性があるとされています。",
                "一部の契約では、通知なしで企業が条件を変更できることを許可しています。",
                "年間で受け入れるすべてのポリシーを読むのに平均76日かかると言われています。",
                "企業がアカウントを閉じた後もデータを保持することがあるのをご存じですか？",
                "欧州のGDPRではデータの削除を要求する権利が認められています。",
                "ソーシャルメディアアプリのプライバシーは、私たちが思っているほど安全ではありません。",
                "一部のサービスは、あなたの知らない間に音声を記録したり、写真を分析したりすることがあります。"
            ];
            break;
        case "re":
            curiosidades = [
                "是否知道有90%的人在未阅读条款的情况下接受了它们？",
                "某些使用条款禁止将服务用于“不道德”的目的。",
                "有一个美国网站曾经加入了“交出灵魂”的条款。",
                "大多数条款允许将数据共享给第三方。",
                "一些合同允许公司在不通知的情况下更改条款。",
                "平均而言，要阅读我们每年接受的所有政策需要76天。",
                "有时，公司即使关闭账户后仍保留数据。",
                "欧盟GDPR赋予您要求删除数据的权利。",
                "社交媒体应用中的隐私通常没有我们想象的那么安全。",
                "某些服务可以在您不知情的情况下录音或分析您的照片。"
            ];
            break;
        case "zh_CH":
            curiosidades = [
                "你知道90%的人在未阅读条款的情况下接受了它们吗？",
                "一些使用条款禁止将服务用于“不道德”的用途。",
                "有一个美国网站曾经包含了一项“交出你的灵魂”的条款。",
                "大多数条款允许将数据共享给第三方。",
                "某些合同允许公司在不通知的情况下更改条款。",
                "平均来说，阅读我们每年接受的所有政策需要76天。",
                "有时公司在账户关闭后仍会保留数据。",
                "欧洲的GDPR赋予了要求删除数据的权利。",
                "社交媒体应用中的隐私往往没有我们想象的那么安全。",
                "有些服务可以在不告知的情况下记录你的声音或分析你的照片。"
            ];
            break;
        case "de":
            curiosidades = [
                "Wussten Sie, dass 90% der Menschen die Bedingungen akzeptieren, ohne sie zu lesen?",
                "Wussten Sie, dass einige Nutzungsbedingungen die Nutzung für 'unmoralische' Zwecke untersagen?",
                "Wussten Sie, dass eine US-Website einmal eine Klausel zur 'Abtretung der Seele' enthielt?",
                "Wussten Sie, dass die meisten Bedingungen die Weitergabe von Daten an Dritte erlauben?",
                "Wussten Sie, dass einige Verträge Unternehmen erlauben, die Bedingungen ohne Ankündigung zu ändern?",
                "Wussten Sie, dass man durchschnittlich 76 Tage benötigt, um alle Richtlinien zu lesen, denen man in einem Jahr zustimmt?",
                "Wussten Sie, dass Unternehmen manchmal Daten auch nach der Kontoauflösung speichern?",
                "Wussten Sie, dass die europäische DSGVO das Recht gewährt, die Löschung der Daten zu verlangen?",
                "Wussten Sie, dass die Privatsphäre in sozialen Netzwerken oft weniger sicher ist, als man denkt?",
                "Wussten Sie, dass einige Dienste Ihre Stimme aufzeichnen oder Fotos analysieren können, ohne dass Sie es wissen?"
            ];
            break;
        default:
            curiosidades = [
                "Did you know that 90% of people accept terms without reading them?",
                "Did you know that some terms of use prohibit using the service for 'immoral' purposes?",
                "Did you know that a U.S. site once included a clause about 'giving up your soul'?",
                "Did you know that most terms allow data to be shared with third parties?",
                "Did you know that some contracts let companies change terms without notifying users?",
                "Did you know it would take an average of 76 days to read all the policies we accept in a year?",
                "Did you know that sometimes companies keep your data even after you close your account?",
                "Did you know that the European GDPR gives you the right to request data deletion?",
                "Did you know that privacy in social media apps is often less secure than we think?",
                "Did you know that some services can record your voice or analyze your photos without you knowing?"
            ]
    };

    const loadingText = document.getElementById("loading-text");
    loadingText.textContent = curiosidades[Math.floor(Math.random() * curiosidades.length)];

    // call othe DOM elements
    // ========================================================================================
    const loadingContainer = document.getElementById("loading-container");
    const navbarContainer = document.getElementById("navbar");
    const mainContainer = document.getElementById("main-content");

    const termsUL = document.getElementById("simpli-summary-terms");
    const privacyUL = document.getElementById("simpli-summary-privacy");

    const infoButton = document.getElementById("info-button");
    const closeInfoButton = document.getElementById("close-info-button");

    const notErrorContainer = document.getElementById("not-error");
    const infoTabContainer = document.getElementById("info-tab");

    const startButton = document.getElementById("start-button")

    // UX functions
    // ========================================================================================

    // terms and privacy menu bar
    const changeTypeOfSummary = (type) => {
        // 0 -> terms
        // 1 -> privacy
        if (type === 1) {
            termsUL.style.display = "flex";
            privacyUL.style.display = "none";
            selectPrivacyButton.classList.add("privacy-selected");
            selectTermsButton.classList.remove("terms-selected");
        }else{
            termsUL.style.display = "none";
            privacyUL.style.display = "flex";
            selectTermsButton.classList.add("terms-selected");
            selectPrivacyButton.classList.remove("privacy-selected");
        }
    };

    selectTermsButton.addEventListener("click", ()=>{
        changeTypeOfSummary(0);
    });

    selectPrivacyButton.addEventListener("click", ()=>{
        changeTypeOfSummary(1);
    });

    // open info page
    infoButton.addEventListener("click", ()=>{

        infoButton.style.display = "none";
        closeInfoButton.style.display = "block";

        infoTabContainer.style.display = "block";
        notErrorContainer.style.display = "none";

    });
    closeInfoButton.addEventListener("click", ()=>{

        infoButton.style.display = "block";
        closeInfoButton.style.display = "none";

        infoTabContainer.style.display = "none";
        notErrorContainer.style.display = "block";

    });

    // set programming UI functions
    // ========================================================================================

    const setIsLoading = (loading) => {
        if (!!loading) {
            // is loading
            loadingContainer.style.display = "flex";
            navbarContainer.style.display = "none";
            mainContainer.style.display = "none";
        }else{
            // isn't loading
            loadingContainer.style.display = "none";
            navbarContainer.style.display = "flex";
            mainContainer.style.display = "flex";
        }
    };

    setIsLoading(false);

    startButton.addEventListener("click", ()=>{
        console.log("enviado")
        chrome.runtime.sendMessage({ action: 'makeRequestToBackend' });
    })


    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'termsRespond') {
            console.log('Resultado de TERMS recibido:', message.result);
        } else if (message.action === 'privacyRespond') {
            console.log('Resultado de PRIVACY recibido:', message.result);
        }
    });


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