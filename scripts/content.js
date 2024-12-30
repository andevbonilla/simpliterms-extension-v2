const privacyKeyWords = [
    'datenschutz',
    'datenschutzrichtlinie',
    'datenschutzerklärung',
    'datenschutzbestimmungen',
    'datenschutzhinweis',
    'datenschutzcenter',
    'datenschutzeinstellungen',
    'datenschutzpolitik',
    'datenschutzinformationen',
    'datenschutzvereinbarung',
    'privacy',
    'privacypolicy',
    'privacynotice',
    'privacystatement',
    'datapolicy',
    'dataprivacy',
    'privacycenter',
    'privacysettings',
    'privacyagreement',
    'privacypreferences',
    'privacidad',
    'políticadeprivacidad',
    'avisodeprivacidad',
    'declaracióndeprivacidad',
    'políticadedatos',
    'privacidadedatos',
    'centrodeprivacidad',
    'ajustesdeprivacidad',
    'acuerdodeprivacidad',
    'informacióndeprivacidad',
    'confidentialité',
    'politiquedeconfidentialité',
    'déclarationdeconfidentialité',
    'avisdeconfidentialité',
    'politiquededonnées',
    'confidentialitédesdonnées',
    'centredeconfidentialité',
    'paramètresdeconfidentialité',
    'accorddeconfidentialité',
    'informationsdeconfidentialité',
    'गोपनीयता',
    'गोपनीयतानिति',
    'गोपनीयतावक्तव्य',
    'गोपनीयताकेन्द्र',
    'गोपनीयतासेटिंग्स',
    'गोपनीयताबयान',
    'गोपनीयतासूचना',
    'डेटानीति',
    'डेटागोपनीयता',
    'गोपनीयतासमझौता',
    'プライバシーポリシー',
    'プライバシー',
    '個人情報保護方針',
    '個人情報保護ポリシー',
    '個人情報保護に関するお知らせ',
    'プライバシーセンター',
    'プライバシー設定',
    'データポリシー',
    'プライバシーに関するお知らせ',
    'プライバシー情報',
    'конфиденциальность',
    'политикаконфиденциальности',
    'заявлениеоконфиденциальности',
    'уведомлениеоконфиденциальности',
    'политикаданных',
    'центрконфиденциальности',
    'настройкиконфиденциальности',
    'соглашениеоконфиденциальности',
    'информацияоконфиденциальности',
    'конфиденциальностьданных',
    '隐私',
    '隐私政策',
    '隐私声明',
    '隐私通知',
    '数据政策',
    '隐私中心',
    '隐私设置',
    '隐私权政策',
    '隐私协议',
    '隐私信息'
];

const termsKeyWords = [
    // Alemán
    'nutzungsbedingungen',
    'agb', // allgemeine geschäftsbedingungen
    'bedingungen',
    'benutzervereinbarung',
    'dienstleistungsbedingungen',
    'nutzungsrichtlinien',
    'servicebedingungen',
    'rechtlichehinweise',
    'nutzungsvereinbarung',
    'geschäftsbedingungen',
    'benutzungsbedingungen',
    'nutzungsregeln',
    'rechtsbelehrung',
    'impressum',
    'nutzungsbedingungenunddatenschutz',
    'allgemeinebedingungen',
    'geschaeftsbedingungen',
    'nutzungsvertrag',
    'haftungsausschluss',
    // Inglés
    'terms',
    'termsofuse',
    'termsandconditions',
    'useragreement',
    'termsofservice',
    'tos',
    'agreement',
    'serviceagreement',
    'usagepolicy',
    'legalnotice',
    'legalterms',
    'legalagreement',
    'userterms',
    'userconditions',
    'eula', // end user license agreement
    'enduserlicenseagreement',
    'disclaimer',
    'acceptableusepolicy',
    'aup',
    'legaldisclaimer',
    'licenseagreement',
    'licensingterms',
    // Español
    'términos',
    'términosdeuso',
    'términosycondiciones',
    'acuerdodeusuario',
    'términosdelservicio',
    'condicionesdeuso',
    'condicionesdelservicio',
    'acuerdo',
    'acuerdodelservicio',
    'políticadeuso',
    'términosycondicionesdeuso',
    'condicionesgenerales',
    'términoslegales',
    'avisolegal',
    'descargoderesponsabilidad',
    'contratodeuso',
    'condicionesgeneralesdecontratación',
    // Francés
    'conditions',
    'conditionsdutilisation',
    'conditionsgénérales',
    'conditionsgénéralesdutilisation',
    'cgu',
    'accordutilisateur',
    'conditionsduservice',
    'politiqueutilisation',
    'avislégal',
    'accord',
    'termesetconditions',
    'termesdeservice',
    'accorddeservice',
    'avisjuridique',
    'termesdutilisation',
    'déniresponsabilité',
    'contratd\'utilisation',
    'licenced\'utilisateur',
    // Hindi
    'नियम',
    'नियमऔरशर्तें',
    'उपयोगकीशर्तें',
    'उपयोगकर्तासमझौता',
    'सेवाशर्तें',
    'समझौता',
    'सेवासमझौता',
    'उपयोगनीति',
    'कानूनीसूचना',
    'शर्तें',
    'अस्वीकरण',
    'उपयोगकेनियम',
    'कानूनीनियम',
    // Japonés
    '利用規約',
    'ご利用条件',
    'ご利用規則',
    'ユーザー契約',
    'サービス利用規約',
    '利用条件',
    '使用条件',
    '同意書',
    '使用許諾契約',
    '法的通知',
    '条件と規約',
    'サービス約款',
    '条件',
    'サイトポリシー',
    '使用規定',
    '約款',
    '利用約款',
    '免責事項',
    'ライセンス契約',
    // Ruso
    'условияиспользования',
    'условияиограничения',
    'пользовательскоесоглашение',
    'соглашение',
    'условияобслуживания',
    'сервисноесоглашение',
    'правилаиспользования',
    'правоваяинформация',
    'политикаиспользования',
    'юридическоесообщение',
    'условияпредоставленияуслуг',
    'лицензионноесоглашение',
    'правиласервиса',
    'отказотответственности',
    // Chino (Simplificado)
    '使用条款',
    '条款和条件',
    '用户协议',
    '服务条款',
    '协议',
    '服务协议',
    '使用协议',
    '法律声明',
    '使用政策',
    '免责声明',
    '许可协议',
    '使用须知',
    '法律公告'
];

// send host to background
chrome.runtime.sendMessage({ hostInfo: window.location.host });
chrome.runtime.sendMessage({ urlComplete: window.location });

let termsLinks = [];
let privacyLinks = [];

const anchorTags = document.querySelectorAll('a');

for (const anchorTag of anchorTags) {

  const tagCleaned = anchorTag.textContent.toLowerCase().replace(/\s+/g, "");

  if (privacyKeyWords.includes(tagCleaned) && privacyLinks.length <= 10) {
    privacyLinks.push(anchorTag.href)
  }

  if (termsKeyWords.includes(tagCleaned) && termsLinks.length <= 10) {
    termsLinks.push(anchorTag.href)
  }
  
};

// send possible links of policies of the current page
chrome.runtime.sendMessage({ termsLinks });
chrome.runtime.sendMessage({ privacyLinks });

