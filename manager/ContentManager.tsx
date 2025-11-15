import i18n from "@/translation/i18n";

class ContentManager {
  getWeekDays() {
    return [
      {
        id: 'monday',
        name: i18n.t('Monday'),
      },
      {
        id: 'tuesday',
        name: i18n.t('Tuesday'),
      },
      {
        id: 'wednesday',
        name: i18n.t('Wednesday'),
      },
      {
        id: 'thrusday',
        name: i18n.t('Thursday'),
      },
      {
        id: 'friday',
        name: i18n.t('Friday'),
      },
      {
        id: 'saturday',
        name: i18n.t('Saturday'),
      },
      {
        id: 'sunday',
        name: i18n.t('Sunday'),
      },
    ];
  }

  getPrivacyStatusTypes() {
    return [
      {
        id: 'private',
        label: i18n.t('Private'),
      },
      {
        id: 'public',
        label: i18n.t('Public'),
      },
    ];
  }

  getExperienceLevels() {
    return [
      {
        id: null,
        label: i18n.t('Select a level of experience'),
      },
      {
        id: 'less_than_1_year',
        label: i18n.t('Less than 1 year'),
      },
    ];
  }

  getJamTypes() {
    return [
      {
        id: 'call',
        name: i18n.t('Call'),
        icon: 'megaphone',
      },
      {
        id: 'looking',
        name: i18n.t('Looking'),
        icon: 'link',
      },
      {
        id: 'event',
        name: i18n.t('Event'),
        icon: 'users',
      },
      {
        id: 'random',
        name: i18n.t('Random'),
        icon: 'infinite',
      },
    ];
  }

  getLocationTypes() {
    return [
      {
        id: 'online',
        name: i18n.t('Online'),
      },
      {
        id: 'physical',
        name: i18n.t('Physical'),
      },
      {
        id: 'online_physical',
        name: i18n.t('Online/Physical'),
      },
    ];
  }

  getProfileTypes() {
    return [
      {
        id: 'personal',
        label: i18n.t('Personal'),
      },
      {
        id: 'organization',
        label: i18n.t('Organization'),
      },
      {
        id: 'venue',
        label: i18n.t('Venue'),
      },
    ];
  }

  getPhoneServices() {
    return [
      {
        id: 'sms',
        label: i18n.t('SMS'),
        default: true,
      },
      {
        id: 'whatsapp',
        label: i18n.t('Whatsapp'),
      },
    ];
  }

  getCountryPhoneCodes() {
    return [
      {
        "name": i18n.t("Afghanistan"),
        "prefix": "+93",
        "code": "af",
      },
      {
        "name": i18n.t("Aland Islands"),
        "prefix": "+358",
        "code": "ax",
      },
      {
        "name": i18n.t("Albania"),
        "prefix": "+355",
        "code": "al",
      },
      {
        "name": i18n.t("Algeria"),
        "prefix": "+213",
        "code": "dz",
      },
      {
        "name": i18n.t("American Samoa"),
        "prefix": "+1684",
        "code": "as",
      },
      {
        "name": i18n.t("Andorra"),
        "prefix": "+376",
        "code": "ad",
      },
      {
        "name": i18n.t("Angola"),
        "prefix": "+244",
        "code": "ao",
      },
      {
        "name": i18n.t("Anguilla"),
        "prefix": "+1264",
        "code": "ai",
      },
      {
        "name": i18n.t("Antarctica"),
        "prefix": "+672",
        "code": "aq",
      },
      {
        "name": i18n.t("Antigua and Barbuda"),
        "prefix": "+1268",
        "code": "ag",
      },
      {
        "name": i18n.t("Argentina"),
        "prefix": "+54",
        "code": "ar",
      },
      {
        "name": i18n.t("Armenia"),
        "prefix": "+374",
        "code": "am",
      },
      {
        "name": i18n.t("Aruba"),
        "prefix": "+297",
        "code": "aw",
      },
      {
        "name": i18n.t("Australia"),
        "prefix": "+61",
        "code": "au",
      },
      {
        "name": i18n.t("Austria"),
        "prefix": "+43",
        "code": "at",
      },
      {
        "name": i18n.t("Azerbaijan"),
        "prefix": "+994",
        "code": "az",
      },
      {
        "name": i18n.t("Bahamas"),
        "prefix": "+1242",
        "code": "bs",
      },
      {
        "name": i18n.t("Bahrain"),
        "prefix": "+973",
        "code": "bh",
      },
      {
        "name": i18n.t("Bangladesh"),
        "prefix": "+880",
        "code": "bd",
      },
      {
        "name": i18n.t("Barbados"),
        "prefix": "+1246",
        "code": "bb",
      },
      {
        "name": i18n.t("Belarus"),
        "prefix": "+375",
        "code": "by",
      },
      {
        "name": i18n.t("Belgium"),
        "prefix": "+32",
        "code": "be",
      },
      {
        "name": i18n.t("Belize"),
        "prefix": "+501",
        "code": "bz",
      },
      {
        "name": i18n.t("Benin"),
        "prefix": "+229",
        "code": "bj",
      },
      {
        "name": i18n.t("Bermuda"),
        "prefix": "+1441",
        "code": "bm",
      },
      {
        "name": i18n.t("Bhutan"),
        "prefix": "+975",
        "code": "bt",
      },
      {
        "name": i18n.t("Bolivia, Plurinational State of"),
        "prefix": "+591",
        "code": "bo",
      },
      {
        "name": i18n.t("Bosnia and Herzegovina"),
        "prefix": "+387",
        "code": "ba",
      },
      {
        "name": i18n.t("Botswana"),
        "prefix": "+267",
        "code": "bw",
      },
      {
        "name": i18n.t("Brazil"),
        "prefix": "+55",
        "code": "br",
      },
      {
        "name": i18n.t("British Indian Ocean Territory"),
        "prefix": "+246",
        "code": "io",
      },
      {
        "name": i18n.t("Brunei Darussalam"),
        "prefix": "+673",
        "code": "bn",
      },
      {
        "name": i18n.t("Bulgaria"),
        "prefix": "+359",
        "code": "bg",
      },
      {
        "name": i18n.t("Burkina Faso"),
        "prefix": "+226",
        "code": "bf",
      },
      {
        "name": i18n.t("Burundi"),
        "prefix": "+257",
        "code": "bi",
      },
      {
        "name": i18n.t("Cambodia"),
        "prefix": "+855",
        "code": "kh",
      },
      {
        "name": i18n.t("Cameroon"),
        "prefix": "+237",
        "code": "cm",
      },
      {
        "name": i18n.t("Canada"),
        "prefix": "+1",
        "code": "ca",
      },
      {
        "name": i18n.t("Cape Verde"),
        "prefix": "+238",
        "code": "cv",
      },
      {
        "name": i18n.t("Cayman Islands"),
        "prefix": "+ 345",
        "code": "ky",
      },
      {
        "name": i18n.t("Central African Republic"),
        "prefix": "+236",
        "code": "cf",
      },
      {
        "name": i18n.t("Chad"),
        "prefix": "+235",
        "code": "td",
      },
      {
        "name": i18n.t("Chile"),
        "prefix": "+56",
        "code": "cl",
      },
      {
        "name": i18n.t("China"),
        "prefix": "+86",
        "code": "cn",
      },
      {
        "name": i18n.t("Christmas Island"),
        "prefix": "+61",
        "code": "cx",
      },
      {
        "name": i18n.t("Cocos (Keeling) Islands"),
        "prefix": "+61",
        "code": "cc",
      },
      {
        "name": i18n.t("Colombia"),
        "prefix": "+57",
        "code": "co",
      },
      {
        "name": i18n.t("Comoros"),
        "prefix": "+269",
        "code": "km",
      },
      {
        "name": i18n.t("Congo"),
        "prefix": "+242",
        "code": "cg",
      },
      {
        "name": i18n.t("Congo, The Democratic Republic of the Congo"),
        "prefix": "+243",
        "code": "cd",
      },
      {
        "name": i18n.t("Cook Islands"),
        "prefix": "+682",
        "code": "ck",
      },
      {
        "name": i18n.t("Costa Rica"),
        "prefix": "+506",
        "code": "cr",
      },
      {
        "name": i18n.t("Ivory Coast"),
        "prefix": "+225",
        "code": "ci",
      },
      {
        "name": i18n.t("Croatia"),
        "prefix": "+385",
        "code": "hr",
      },
      {
        "name": i18n.t("Cuba"),
        "prefix": "+53",
        "code": "cu",
      },
      {
        "name": i18n.t("Cyprus"),
        "prefix": "+357",
        "code": "cy",
      },
      {
        "name": i18n.t("Czech Republic"),
        "prefix": "+420",
        "code": "cz",
      },
      {
        "name": i18n.t("Denmark"),
        "prefix": "+45",
        "code": "dk",
      },
      {
        "name": i18n.t("Djibouti"),
        "prefix": "+253",
        "code": "dj",
      },
      {
        "name": i18n.t("Dominica"),
        "prefix": "+1767",
        "code": "dm",
      },
      {
        "name": i18n.t("Dominican Republic"),
        "prefix": "+1849",
        "code": "do",
      },
      {
        "name": i18n.t("Ecuador"),
        "prefix": "+593",
        "code": "ec",
      },
      {
        "name": i18n.t("Egypt"),
        "prefix": "+20",
        "code": "eg",
      },
      {
        "name": i18n.t("El Salvador"),
        "prefix": "+503",
        "code": "sv",
      },
      {
        "name": i18n.t("Equatorial Guinea"),
        "prefix": "+240",
        "code": "gq",
      },
      {
        "name": i18n.t("Eritrea"),
        "prefix": "+291",
        "code": "er",
      },
      {
        "name": i18n.t("Estonia"),
        "prefix": "+372",
        "code": "ee",
      },
      {
        "name": i18n.t("Ethiopia"),
        "prefix": "+251",
        "code": "et",
      },
      {
        "name": i18n.t("Falkland Islands (Malvinas)"),
        "prefix": "+500",
        "code": "fk",
      },
      {
        "name": i18n.t("Faroe Islands"),
        "prefix": "+298",
        "code": "fo",
      },
      {
        "name": i18n.t("Fiji"),
        "prefix": "+679",
        "code": "fj",
      },
      {
        "name": i18n.t("Finland"),
        "prefix": "+358",
        "code": "fi",
      },
      {
        "name": i18n.t("France"),
        "prefix": "+33",
        "code": "fr",
      },
      {
        "name": i18n.t("French Guiana"),
        "prefix": "+594",
        "code": "gf",
      },
      {
        "name": i18n.t("French Polynesia"),
        "prefix": "+689",
        "code": "pf",
      },
      {
        "name": i18n.t("Gabon"),
        "prefix": "+241",
        "code": "ga",
      },
      {
        "name": i18n.t("Gambia"),
        "prefix": "+220",
        "code": "gm",
      },
      {
        "name": i18n.t("Georgia"),
        "prefix": "+995",
        "code": "ge",
      },
      {
        "name": i18n.t("Germany"),
        "prefix": "+49",
        "code": "de",
      },
      {
        "name": i18n.t("Ghana"),
        "prefix": "+233",
        "code": "gh",
      },
      {
        "name": i18n.t("Gibraltar"),
        "prefix": "+350",
        "code": "gi",
      },
      {
        "name": i18n.t("Greece"),
        "prefix": "+30",
        "code": "gr",
      },
      {
        "name": i18n.t("Greenland"),
        "prefix": "+299",
        "code": "gl",
      },
      {
        "name": i18n.t("Grenada"),
        "prefix": "+1473",
        "code": "gd",
      },
      {
        "name": i18n.t("Guadeloupe"),
        "prefix": "+590",
        "code": "gp",
      },
      {
        "name": i18n.t("Guam"),
        "prefix": "+1671",
        "code": "gu",
      },
      {
        "name": i18n.t("Guatemala"),
        "prefix": "+502",
        "code": "gt",
      },
      {
        "name": i18n.t("Guernsey"),
        "prefix": "+44",
        "code": "gg",
      },
      {
        "name": i18n.t("Guinea"),
        "prefix": "+224",
        "code": "gn",
      },
      {
        "name": i18n.t("Guinea-Bissau"),
        "prefix": "+245",
        "code": "gw",
      },
      {
        "name": i18n.t("Guyana"),
        "prefix": "+595",
        "code": "gy",
      },
      {
        "name": i18n.t("Haiti"),
        "prefix": "+509",
        "code": "ht",
      },
      {
        "name": i18n.t("Holy See (Vatican City State)"),
        "prefix": "+379",
        "code": "va",
      },
      {
        "name": i18n.t("Honduras"),
        "prefix": "+504",
        "code": "hn",
      },
      {
        "name": i18n.t("Hong Kong"),
        "prefix": "+852",
        "code": "hk",
      },
      {
        "name": i18n.t("Hungary"),
        "prefix": "+36",
        "code": "hu",
      },
      {
        "name": i18n.t("Iceland"),
        "prefix": "+354",
        "code": "is",
      },
      {
        "name": i18n.t("India"),
        "prefix": "+91",
        "code": "in",
      },
      {
        "name": i18n.t("Indonesia"),
        "prefix": "+62",
        "code": "id",
      },
      {
        "name": i18n.t("Iran, Islamic Republic of Persian Gulf"),
        "prefix": "+98",
        "code": "ir",
      },
      {
        "name": i18n.t("Iraq"),
        "prefix": "+964",
        "code": "iq",
      },
      {
        "name": i18n.t("Ireland"),
        "prefix": "+353",
        "code": "ie",
      },
      {
        "name": i18n.t("Isle of Man"),
        "prefix": "+44",
        "code": "im",
      },
      {
        "name": i18n.t("Israel"),
        "prefix": "+972",
        "code": "il",
      },
      {
        "name": i18n.t("Italy"),
        "prefix": "+39",
        "code": "it",
      },
      {
        "name": i18n.t("Jamaica"),
        "prefix": "+1876",
        "code": "jm",
      },
      {
        "name": i18n.t("Japan"),
        "prefix": "+81",
        "code": "jp",
      },
      {
        "name": i18n.t("Jersey"),
        "prefix": "+44",
        "code": "je",
      },
      {
        "name": i18n.t("Jordan"),
        "prefix": "+962",
        "code": "jo",
      },
      {
        "name": i18n.t("Kazakhstan"),
        "prefix": "+77",
        "code": "kz",
      },
      {
        "name": i18n.t("Kenya"),
        "prefix": "+254",
        "code": "ke",
      },
      {
        "name": i18n.t("Kiribati"),
        "prefix": "+686",
        "code": "ki",
      },
      {
        "name": i18n.t("Korea, Democratic People's Republic of Korea"),
        "prefix": "+850",
        "code": "kp",
      },
      {
        "name": i18n.t("Korea, Republic of South Korea"),
        "prefix": "+82",
        "code": "kr",
      },
      {
        "name": i18n.t("Kuwait"),
        "prefix": "+965",
        "code": "kw",
      },
      {
        "name": i18n.t("Kyrgyzstan"),
        "prefix": "+996",
        "code": "kg",
      },
      {
        "name": i18n.t("Laos"),
        "prefix": "+856",
        "code": "la",
      },
      {
        "name": i18n.t("Latvia"),
        "prefix": "+371",
        "code": "lv",
      },
      {
        "name": i18n.t("Lebanon"),
        "prefix": "+961",
        "code": "lb",
      },
      {
        "name": i18n.t("Lesotho"),
        "prefix": "+266",
        "code": "ls",
      },
      {
        "name": i18n.t("Liberia"),
        "prefix": "+231",
        "code": "lr",
      },
      {
        "name": i18n.t("Libyan Arab Jamahiriya"),
        "prefix": "+218",
        "code": "ly",
      },
      {
        "name": i18n.t("Liechtenstein"),
        "prefix": "+423",
        "code": "li",
      },
      {
        "name": i18n.t("Lithuania"),
        "prefix": "+370",
        "code": "lt",
      },
      {
        "name": i18n.t("Luxembourg"),
        "prefix": "+352",
        "code": "lu",
      },
      {
        "name": i18n.t("Macao"),
        "prefix": "+853",
        "code": "mo",
      },
      {
        "name": i18n.t("Macedonia"),
        "prefix": "+389",
        "code": "mk",
      },
      {
        "name": i18n.t("Madagascar"),
        "prefix": "+261",
        "code": "mg",
      },
      {
        "name": i18n.t("Malawi"),
        "prefix": "+265",
        "code": "mw",
      },
      {
        "name": i18n.t("Malaysia"),
        "prefix": "+60",
        "code": "my",
      },
      {
        "name": i18n.t("Maldives"),
        "prefix": "+960",
        "code": "mv",
      },
      {
        "name": i18n.t("Mali"),
        "prefix": "+223",
        "code": "ml",
      },
      {
        "name": i18n.t("Malta"),
        "prefix": "+356",
        "code": "mt",
      },
      {
        "name": i18n.t("Marshall Islands"),
        "prefix": "+692",
        "code": "mh",
      },
      {
        "name": i18n.t("Martinique"),
        "prefix": "+596",
        "code": "mq",
      },
      {
        "name": i18n.t("Mauritania"),
        "prefix": "+222",
        "code": "mr",
      },
      {
        "name": i18n.t("Mauritius"),
        "prefix": "+230",
        "code": "mu",
      },
      {
        "name": i18n.t("Mayotte"),
        "prefix": "+262",
        "code": "yt",
      },
      {
        "name": i18n.t("Mexico"),
        "prefix": "+52",
        "code": "mx",
      },
      {
        "name": i18n.t("Micronesia, Federated States of Micronesia"),
        "prefix": "+691",
        "code": "fm",
      },
      {
        "name": i18n.t("Moldova"),
        "prefix": "+373",
        "code": "md",
      },
      {
        "name": i18n.t("Monaco"),
        "prefix": "+377",
        "code": "mc",
      },
      {
        "name": i18n.t("Mongolia"),
        "prefix": "+976",
        "code": "mn",
      },
      {
        "name": i18n.t("Montenegro"),
        "prefix": "+382",
        "code": "me",
      },
      {
        "name": i18n.t("Montserrat"),
        "prefix": "+1664",
        "code": "ms",
      },
      {
        "name": i18n.t("Morocco"),
        "prefix": "+212",
        "code": "ma",
      },
      {
        "name": i18n.t("Mozambique"),
        "prefix": "+258",
        "code": "mz",
      },
      {
        "name": i18n.t("Myanmar"),
        "prefix": "+95",
        "code": "mm",
      },
      {
        "name": i18n.t("Namibia"),
        "prefix": "+264",
        "code": "na",
      },
      {
        "name": i18n.t("Nauru"),
        "prefix": "+674",
        "code": "nr",
      },
      {
        "name": i18n.t("Nepal"),
        "prefix": "+977",
        "code": "np",
      },
      {
        "name": i18n.t("Netherlands"),
        "prefix": "+31",
        "code": "nl",
      },
      {
        "name": i18n.t("Netherlands Antilles"),
        "prefix": "+599",
        "code": "an",
      },
      {
        "name": i18n.t("New Caledonia"),
        "prefix": "+687",
        "code": "nc",
      },
      {
        "name": i18n.t("New Zealand"),
        "prefix": "+64",
        "code": "nz",
      },
      {
        "name": i18n.t("Nicaragua"),
        "prefix": "+505",
        "code": "ni",
      },
      {
        "name": i18n.t("Niger"),
        "prefix": "+227",
        "code": "ne",
      },
      {
        "name": i18n.t("Nigeria"),
        "prefix": "+234",
        "code": "ng",
      },
      {
        "name": i18n.t("Niue"),
        "prefix": "+683",
        "code": "nu",
      },
      {
        "name": i18n.t("Norfolk Island"),
        "prefix": "+672",
        "code": "nf",
      },
      {
        "name": i18n.t("Northern Mariana Islands"),
        "prefix": "+1670",
        "code": "mp",
      },
      {
        "name": i18n.t("Norway"),
        "prefix": "+47",
        "code": "no",
      },
      {
        "name": i18n.t("Oman"),
        "prefix": "+968",
        "code": "om",
      },
      {
        "name": i18n.t("Pakistan"),
        "prefix": "+92",
        "code": "pk",
      },
      {
        "name": i18n.t("Palau"),
        "prefix": "+680",
        "code": "pw",
      },
      {
        "name": i18n.t("Palestinian Territory, Occupied"),
        "prefix": "+970",
        "code": "ps",
      },
      {
        "name": i18n.t("Panama"),
        "prefix": "+507",
        "code": "pa",
      },
      {
        "name": i18n.t("Papua New Guinea"),
        "prefix": "+675",
        "code": "pg",
      },
      {
        "name": i18n.t("Paraguay"),
        "prefix": "+595",
        "code": "py",
      },
      {
        "name": i18n.t("Peru"),
        "prefix": "+51",
        "code": "pe",
      },
      {
        "name": i18n.t("Philippines"),
        "prefix": "+63",
        "code": "ph",
      },
      {
        "name": i18n.t("Pitcairn"),
        "prefix": "+872",
        "code": "pn",
      },
      {
        "name": i18n.t("Poland"),
        "prefix": "+48",
        "code": "pl",
      },
      {
        "name": i18n.t("Portugal"),
        "prefix": "+351",
        "code": "pt",
      },
      {
        "name": i18n.t("Puerto Rico"),
        "prefix": "+1939",
        "code": "pr",
      },
      {
        "name": i18n.t("Qatar"),
        "prefix": "+974",
        "code": "qa",
      },
      {
        "name": i18n.t("Romania"),
        "prefix": "+40",
        "code": "ro",
      },
      {
        "name": i18n.t("Russia"),
        "prefix": "+7",
        "code": "ru",
      },
      {
        "name": i18n.t("Rwanda"),
        "prefix": "+250",
        "code": "rw",
      },
      {
        "name": i18n.t("Reunion"),
        "prefix": "+262",
        "code": "re",
      },
      {
        "name": i18n.t("Saint Barthelemy"),
        "prefix": "+590",
        "code": "bl",
      },
      {
        "name": i18n.t("Saint Helena, Ascension and Tristan Da Cunha"),
        "prefix": "+290",
        "code": "sh",
      },
      {
        "name": i18n.t("Saint Kitts and Nevis"),
        "prefix": "+1869",
        "code": "kn",
      },
      {
        "name": i18n.t("Saint Lucia"),
        "prefix": "+1758",
        "code": "lc",
      },
      {
        "name": i18n.t("Saint Martin"),
        "prefix": "+590",
        "code": "mf",
      },
      {
        "name": i18n.t("Saint Pierre and Miquelon"),
        "prefix": "+508",
        "code": "pm",
      },
      {
        "name": i18n.t("Saint Vincent and the Grenadines"),
        "prefix": "+1784",
        "code": "vc",
      },
      {
        "name": i18n.t("Samoa"),
        "prefix": "+685",
        "code": "ws",
      },
      {
        "name": i18n.t("San Marino"),
        "prefix": "+378",
        "code": "sm",
      },
      {
        "name": i18n.t("Sao Tome and Principe"),
        "prefix": "+239",
        "code": "st",
      },
      {
        "name": i18n.t("Saudi Arabia"),
        "prefix": "+966",
        "code": "sa",
      },
      {
        "name": i18n.t("Senegal"),
        "prefix": "+221",
        "code": "sn",
      },
      {
        "name": i18n.t("Serbia"),
        "prefix": "+381",
        "code": "rs",
      },
      {
        "name": i18n.t("Seychelles"),
        "prefix": "+248",
        "code": "sc",
      },
      {
        "name": i18n.t("Sierra Leone"),
        "prefix": "+232",
        "code": "sl",
      },
      {
        "name": i18n.t("Singapore"),
        "prefix": "+65",
        "code": "sg",
      },
      {
        "name": i18n.t("Slovakia"),
        "prefix": "+421",
        "code": "sk",
      },
      {
        "name": i18n.t("Slovenia"),
        "prefix": "+386",
        "code": "si",
      },
      {
        "name": i18n.t("Solomon Islands"),
        "prefix": "+677",
        "code": "sb",
      },
      {
        "name": i18n.t("Somalia"),
        "prefix": "+252",
        "code": "so",
      },
      {
        "name": i18n.t("South Africa"),
        "prefix": "+27",
        "code": "za",
      },
      {
        "name": i18n.t("South Sudan"),
        "prefix": "+211",
        "code": "ss",
      },
      {
        "name": i18n.t("South Georgia and the South Sandwich Islands"),
        "prefix": "+500",
        "code": "gs",
      },
      {
        "name": i18n.t("Spain"),
        "prefix": "+34",
        "code": "es",
      },
      {
        "name": i18n.t("Sri Lanka"),
        "prefix": "+94",
        "code": "lk",
      },
      {
        "name": i18n.t("Sudan"),
        "prefix": "+249",
        "code": "sd",
      },
      {
        "name": i18n.t("Suriname"),
        "prefix": "+597",
        "code": "sr",
      },
      {
        "name": i18n.t("Svalbard and Jan Mayen"),
        "prefix": "+47",
        "code": "sj",
      },
      {
        "name": i18n.t("Swaziland"),
        "prefix": "+268",
        "code": "sz",
      },
      {
        "name": i18n.t("Sweden"),
        "prefix": "+46",
        "code": "se",
      },
      {
        "name": i18n.t("Switzerland"),
        "prefix": "+41",
        "code": "ch",
      },
      {
        "name": i18n.t("Syrian Arab Republic"),
        "prefix": "+963",
        "code": "sy",
      },
      {
        "name": i18n.t("Taiwan"),
        "prefix": "+886",
        "code": "tw",
      },
      {
        "name": i18n.t("Tajikistan"),
        "prefix": "+992",
        "code": "tj",
      },
      {
        "name": i18n.t("Tanzania, United Republic of Tanzania"),
        "prefix": "+255",
        "code": "tz",
      },
      {
        "name": i18n.t("Thailand"),
        "prefix": "+66",
        "code": "th",
      },
      {
        "name": i18n.t("Timor-Leste"),
        "prefix": "+670",
        "code": "tl",
      },
      {
        "name": i18n.t("Togo"),
        "prefix": "+228",
        "code": "tg",
      },
      {
        "name": i18n.t("Tokelau"),
        "prefix": "+690",
        "code": "tk",
      },
      {
        "name": i18n.t("Tonga"),
        "prefix": "+676",
        "code": "to",
      },
      {
        "name": i18n.t("Trinidad and Tobago"),
        "prefix": "+1868",
        "code": "tt",
      },
      {
        "name": i18n.t("Tunisia"),
        "prefix": "+216",
        "code": "tn",
      },
      {
        "name": i18n.t("Turkey"),
        "prefix": "+90",
        "code": "tr",
      },
      {
        "name": i18n.t("Turkmenistan"),
        "prefix": "+993",
        "code": "tm",
      },
      {
        "name": i18n.t("Turks and Caicos Islands"),
        "prefix": "+1649",
        "code": "tc",
      },
      {
        "name": i18n.t("Tuvalu"),
        "prefix": "+688",
        "code": "tv",
      },
      {
        "name": i18n.t("Uganda"),
        "prefix": "+256",
        "code": "ug",
      },
      {
        "name": i18n.t("Ukraine"),
        "prefix": "+380",
        "code": "ua",
      },
      {
        "name": i18n.t("United Arab Emirates"),
        "prefix": "+971",
        "code": "ae",
      },
      {
        "name": i18n.t("United Kingdom"),
        "prefix": "+44",
        "code": "gb",
      },
      {
        "name": i18n.t("United States"),
        "prefix": "+1",
        "code": "us",
      },
      {
        "name": i18n.t("Uruguay"),
        "prefix": "+598",
        "code": "uy",
      },
      {
        "name": i18n.t("Uzbekistan"),
        "prefix": "+998",
        "code": "uz",
      },
      {
        "name": i18n.t("Vanuatu"),
        "prefix": "+678",
        "code": "vu",
      },
      {
        "name": i18n.t("Venezuela, Bolivarian Republic of Venezuela"),
        "prefix": "+58",
        "code": "ve",
      },
      {
        "name": i18n.t("Vietnam"),
        "prefix": "+84",
        "code": "vn",
      },
      {
        "name": i18n.t("Virgin Islands, British"),
        "prefix": "+1284",
        "code": "vg",
      },
      {
        "name": i18n.t("Virgin Islands, U.S."),
        "prefix": "+1340",
        "code": "vi",
      },
      {
        "name": i18n.t("Wallis and Futuna"),
        "prefix": "+681",
        "code": "wf",
      },
      {
        "name": i18n.t("Yemen"),
        "prefix": "+967",
        "code": "ye",
      },
      {
        "name": i18n.t("Zambia"),
        "prefix": "+260",
        "code": "zm",
      },
      {
        "name": i18n.t("Zimbabwe"),
        "prefix": "+263",
        "code": "zw",
      },
    ];
  }
};

export default (new ContentManager());