document.addEventListener("DOMContentLoaded", async() => { 

    let sumamriesOfCurrentPage = {
        terms: null,
        privacy: null
    }

    let termsExtratedFrom = "";
    let privacyExtratedFrom = "";
    let currentHost = "";

    // principal pages
    // ========================================================================================
    const questionPage = document.getElementById("question-page");
    const authPage = document.getElementById("auth-page");
    const loadingContainer = document.getElementById("loading-container");
    const dashboardPage = document.getElementById("dashboard-page");


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

    const labelTermsPage = document.getElementById("terms-page-label");
    labelTermsPage.textContent = chrome.i18n.getMessage('labelTermsPage');

    const questionPageHeader = document.getElementById("question-page-header");
    questionPageHeader.textContent = chrome.i18n.getMessage('questionPageHeader');

    const startButton = document.getElementById("start-button");
    startButton.textContent = chrome.i18n.getMessage('buttonStartQuestionPage');

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
    const navbarContainer = document.getElementById("navbar");
    const mainContainer = document.getElementById("main-content");
    const termsUL = document.getElementById("simpli-summary-terms");
    const privacyUL = document.getElementById("simpli-summary-privacy");
    const infoButton = document.getElementById("info-button");
    const closeInfoButton = document.getElementById("close-info-button");
    const reloadButton = document.getElementById("reload-button");
    const dashboard = document.getElementById("dashboard");
    const odometer = document.getElementById("odometer");
    const errorBox = document.getElementById("error-box");
    const errorBoxBody = document.getElementById("error-box-body");
    const infoOfThePage = document.getElementById("info-tab");
    const gradeText = document.getElementById("grade-text");
    const gradeLevel = document.getElementById("grade-level");
    const redBall = document.getElementById("red-ball");
    const yellowBall = document.getElementById("yellow-ball");
    const greenBall = document.getElementById("green-ball");
    const usernameText = document.getElementById("username-element");

    const h4CurrentPage = document.getElementById("current-page-h4");
    const h4TermsPage = document.getElementById("terms-page-h4");
    const hostPage = document.getElementById("host-page");

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

    const showQuestionPage = () => {
        hostPage.textContent = currentHost;
        reloadButton.style.display = "none";
        infoButton.style.display = "none";
        authPage.style.display = "none";
        questionPage.style.display = "flex";
        dashboardPage.style.display = "none";
    }

    const showError = () => {
        setIsLoading(false);
        questionPage.style.display = "none";
        infoOfThePage.style.display = "none";
        termsUL.style.display = "none";
        privacyUL.style.display = "none";
        odometer.style.display = "none";
        warningInfo.style.display = "none";
        warningClosePopup.style.display = "none";
        dashboardPage.style.display = "block";
        dashboard.style.display = "block";
        errorBox.style.display = "block";
    };

    // aux functions for showSummariesResult
    const adjustTitleAndLightGrade = (grade) => {
        switch (grade) {
            case "1": {
                redBall.classList.remove("red-light-ball");
                redBall.classList.add("red-light-ball-active");

                yellowBall.classList.add("yellow-light-ball");
                yellowBall.classList.remove("yellow-light-ball-active");

                greenBall.classList.add("green-light-ball");
                greenBall.classList.remove("green-light-ball-active");
                gradeLevel.style.color = "red";
                return "Critical"
            }
            case "2": {
                redBall.classList.add("red-light-ball");
                redBall.classList.remove("red-light-ball-active");

                yellowBall.classList.remove("yellow-light-ball");
                yellowBall.classList.add("yellow-light-ball-active");

                greenBall.classList.add("green-light-ball");
                greenBall.classList.remove("green-light-ball-active");
                gradeLevel.style.color = "#F09500";
                return "Moderate"
            }         
            default:
                redBall.classList.remove("red-light-ball");
                redBall.classList.add("red-light-ball-active");

                yellowBall.classList.add("yellow-light-ball");
                yellowBall.classList.remove("yellow-light-ball-active");

                greenBall.classList.remove("green-light-ball");
                greenBall.classList.add("green-light-ball-active");
                gradeLevel.style.color = "#00D879";
                return "Minor"
        }
    }

    const showKeyPointsOfSUMMARIES = (summary, policiesUL) => {

        for (const keyPoint of summary) {

            const li = document.createElement("li");

            const title = document.createElement("h3");
            title.textContent = keyPoint.subtitle;

            const text = document.createElement("p");
            text.textContent = keyPoint.text;

            li.appendChild(title);
            li.appendChild(text);

            policiesUL.appendChild(li);

        };
    };

    const showSummariesResult = (summary, type) => {

        setIsLoading(false);

        // show mandatory pages for response
        dashboardPage.style.display = "block";
        dashboard.style.display = "block";
        warningInfo.style.display = "block";
        odometer.style.display = "flex";

        // hide other pages
        infoOfThePage.style.display = "none";
        questionPage.style.display = "none";
        warningClosePopup.style.display = "none";
        errorBox.style.display = "none";
            

        if (type === "terms") {
            changeTypeOfSummary(1);
            // summary list
            showKeyPointsOfSUMMARIES(summary, termsUL);      
        }
        if (type === "privacy") {
            changeTypeOfSummary(0);
            // summary list
            showKeyPointsOfSUMMARIES(summary, privacyUL);  
        };

    };

    // UX functions
    // ========================================================================================

    // make the resques to backend
    startButton.addEventListener("click", ()=>{
        setIsLoading(true);
        chrome.runtime.sendMessage({ action: 'RESQUEST_SUMMARIES' });
    });

    // terms and privacy menu bar
    const changeTypeOfSummary = (type) => {
        // 0 -> privacy
        // 1 -> terms
        if (type === 1) {
            if (sumamriesOfCurrentPage.terms) {
                // odometer
                gradeLevel.textContent = adjustTitleAndLightGrade(sumamriesOfCurrentPage.terms.grade);
                gradeText.textContent = sumamriesOfCurrentPage.terms.gradeJustification;
                // info page  
                h4TermsPage.textContent = termsExtratedFrom;
            };

            termsUL.style.display = "flex";
            privacyUL.style.display = "none";
            selectPrivacyButton.classList.remove("privacy-selected");
            selectTermsButton.classList.add("terms-selected");
        }else if(type === 0){
            if (sumamriesOfCurrentPage.privacy) {
                // odometer
                gradeLevel.textContent = adjustTitleAndLightGrade(sumamriesOfCurrentPage.privacy.grade);
                gradeText.textContent = sumamriesOfCurrentPage.privacy.gradeJustification;  
                // info page  
                h4TermsPage.textContent = privacyExtratedFrom; 
            };

            termsUL.style.display = "none";
            privacyUL.style.display = "flex";
            selectTermsButton.classList.remove("terms-selected");
            selectPrivacyButton.classList.add("privacy-selected");
        }
    };

    selectTermsButton.addEventListener("click", ()=>{
        changeTypeOfSummary(1);
    });

    selectPrivacyButton.addEventListener("click", ()=>{
        changeTypeOfSummary(0);
    });

    // delete summary
    reloadButton.addEventListener("click", ()=>{
        setIsLoading(true);
        chrome.runtime.sendMessage({ action: 'RELOAD_SUMMARY' }, (res) => {
            if (res.result === true) {
                setIsLoading(false);
                showQuestionPage();
            }
        });
    });

    // open info page
    infoButton.addEventListener("click", ()=>{

        infoButton.style.display = "none";
        closeInfoButton.style.display = "block";

        infoOfThePage.style.display = "flex";
        dashboard.style.display = "none";

    });
    closeInfoButton.addEventListener("click", ()=>{

        infoButton.style.display = "block";
        closeInfoButton.style.display = "none";

        infoOfThePage.style.display = "none";
        dashboard.style.display = "block";

    });


    // ==============================================================================================
    // First proccess: validate authentication and after if the user have already a summary in cache 
    setIsLoading(true);

    // Send authorization to send info from the content.js towards the background.js
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        chrome.tabs.sendMessage(tabId, { action: 'SEND_INFO' });
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        
        if (message.action === 'TERMS_RESPOND') {

            setIsLoading(false);
            // 1. validate as server error
            if (message.result.type === "SERVER_ERROR") {
                showError();
                errorBoxBody.textContent = chrome.i18n.getMessage('serverErrorMessage');
                return;
            };
            // 2. if error of no policies
            if (message.result.type === "NO_POLICIES_FOUND") {
                showError();
                errorBoxBody.textContent = chrome.i18n.getMessage('errorNoPoliciesFound');
                return;
            };
            // 3. if success request
            reloadButton.style.display = "block";
            infoButton.style.display = "block";
            termsExtratedFrom = message.result.formatedResponse.extractedFrom;
            h4CurrentPage.textContent = message.result.host;
            currentHost = message.result.host;  
            sumamriesOfCurrentPage.id = message.result.host.toString().trim();
            sumamriesOfCurrentPage.terms = message.result.formatedResponse;
            showSummariesResult(message.result.formatedResponse.summary, "terms");
            
            
        } else if (message.action === 'PRIVACY_RESPOND') {

            setIsLoading(false);
            // 1. validate as server error
            if (message.result.type === "SERVER_ERROR") {
                showError();
                errorBoxBody.textContent = chrome.i18n.getMessage('serverErrorMessage');
                return;
            };
            // 2. if error of no policies
            if (message.result.type === "NO_POLICIES_FOUND") {
                showError();
                errorBoxBody.textContent = chrome.i18n.getMessage('errorNoPoliciesFound');
                return;
            };
            // 3. if success request
            reloadButton.style.display = "block";
            infoButton.style.display = "block"; 
            privacyExtratedFrom = message.result.formatedResponse.extractedFrom;
            h4CurrentPage.textContent = message.result.host;
            currentHost = message.result.host; 
            sumamriesOfCurrentPage.id = message.result.host.toString().trim();
            sumamriesOfCurrentPage.privacy = message.result.formatedResponse;
            showSummariesResult(message.result.formatedResponse.summary, "privacy");
            
        }else if(message.action === 'FIRST_VALIDATION_AUTH') {

            setIsLoading(false);
            usernameText.textContent = message.username;
            currentHost = message.hostPage; 
            h4CurrentPage.textContent = message.hostPage;
            // Is Authenticated
            if (message.summaryInfo && message.summaryInfo.privacy && message.summaryInfo.terms) {
                const {terms, privacy} = message.summaryInfo;
                // There is a summary saved
                termsExtratedFrom = terms.extractedFrom;
                privacyExtratedFrom = privacy.extractedFrom;
                reloadButton.style.display = "block";
                infoButton.style.display = "block"; 
                authPage.style.display = "none";
                questionPage.style.display = "none";
                dashboardPage.style.display = "block";
                sumamriesOfCurrentPage.privacy = privacy;
                sumamriesOfCurrentPage.terms = terms;
                showSummariesResult(privacy.summary, "privacy");
                showSummariesResult(terms.summary, "terms");          
            }else{
                showQuestionPage();
            };
            
        }else if(message.action === 'NOT_AUTH') {

            // Isn't authenticated
            setIsLoading(false);
            reloadButton.style.display = "none";
            infoButton.style.display = "none";
            authPage.style.display = "flex";
            questionPage.style.display = "none";
            dashboardPage.style.display = "none";

        };

    });

});