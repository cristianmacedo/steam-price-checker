var request = require('request');
var cheerio = require('cheerio');

function printPrice(error, response, body) {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(body);
        var price = $('.match_price');
        console.log(`${this.country}: ${price.text()}`);
    }
}

function printGame(error, response, body) {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(body);
        var game = $('.match_name');
        console.log(`Game: ${game.text()}`);
    }
}

function getCountryByCode(code) {
    return countries.filter(
        function(countries){ return countries.code == code }
    );
}

function getCountryByName(name) {
    return countries.filter(
        function(countries){ return countries.name == name }
    );
}

const countries = [ 
    {"name": "Afghanistan", "code": "AF", "currency": "USD"}, 
    {"name": "land Islands", "code": "AX", "currency": "USD"}, 
    {"name": "Albania", "code": "AL", "currency": "EUR"}, 
    {"name": "Algeria", "code": "DZ", "currency": "USD"}, 
    {"name": "American Samoa", "code": "AS", "currency": "USD"}, 
    {"name": "AndorrA", "code": "AD", "currency": "USD"}, 
    {"name": "Angola", "code": "AO", "currency": "USD"}, 
    {"name": "Anguilla", "code": "AI", "currency": "USD"}, 
    {"name": "Antarctica", "code": "AQ", "currency": "USD"}, 
    {"name": "Antigua and Barbuda", "code": "AG", "currency": "USD"}, 
    {"name": "Argentina", "code": "AR", "currency": "ARS"}, 
    {"name": "Armenia", "code": "AM", "currency": "USD"}, 
    {"name": "Aruba", "code": "AW", "currency": "USD"}, 
    {"name": "Australia", "code": "AU", "currency": "AUD"}, 
    {"name": "Austria", "code": "AT", "currency": "EUR"}, 
    {"name": "Azerbaijan", "code": "AZ", "currency": "USD"}, 
    {"name": "Bahamas", "code": "BS", "currency": "USD"}, 
    {"name": "Bahrain", "code": "BH", "currency": "USD"}, 
    {"name": "Bangladesh", "code": "BD", "currency": "USD"}, 
    {"name": "Barbados", "code": "BB", "currency": "USD"}, 
    {"name": "Belarus", "code": "BY", "currency": "USD"}, 
    {"name": "Belgium", "code": "BE", "currency": "EUR"}, 
    {"name": "Belize", "code": "BZ", "currency": "USD"}, 
    {"name": "Benin", "code": "BJ", "currency": "USD"}, 
    {"name": "Bermuda", "code": "BM", "currency": "USD"}, 
    {"name": "Bhutan", "code": "BT", "currency": "USD"}, 
    {"name": "Bolivia", "code": "BO", "currency": "USD"}, 
    {"name": "Bosnia and Herzegovina", "code": "BA", "currency": "USD"}, 
    {"name": "Botswana", "code": "BW", "currency": "USD"}, 
    {"name": "Bouvet Island", "code": "BV", "currency": "USD"}, 
    {"name": "Brazil", "code": "BR", "currency": "BRL"}, 
    {"name": "British Indian Ocean Territory", "code": "IO", "currency": "USD"}, 
    {"name": "Brunei Darussalam", "code": "BN", "currency": "USD"}, 
    {"name": "Bulgaria", "code": "BG", "currency": "EUR"}, 
    {"name": "Burkina Faso", "code": "BF", "currency": "USD"}, 
    {"name": "Burundi", "code": "BI", "currency": "USD"}, 
    {"name": "Cambodia", "code": "KH", "currency": "USD"}, 
    {"name": "Cameroon", "code": "CM", "currency": "USD"}, 
    {"name": "Canada", "code": "CA", "currency": "CAD"}, 
    {"name": "Cape Verde", "code": "CV", "currency": "USD"}, 
    {"name": "Cayman Islands", "code": "KY", "currency": "USD"}, 
    {"name": "Central African Republic", "code": "CF", "currency": "USD"}, 
    {"name": "Chad", "code": "TD", "currency": "USD"}, 
    {"name": "Chile", "code": "CL", "currency": "CLP"}, 
    {"name": "China", "code": "CN", "currency": "CNY"}, 
    {"name": "Christmas Island", "code": "CX", "currency": "USD"}, 
    {"name": "Cocos (Keeling) Islands", "code": "CC", "currency": "USD"}, 
    {"name": "Colombia", "code": "CO", "currency": "COP"}, 
    {"name": "Comoros", "code": "KM", "currency": "USD"}, 
    {"name": "Congo", "code": "CG", "currency": "USD"}, 
    {"name": "Congo, The Democratic Republic of the", "code": "CD", "currency": "USD"}, 
    {"name": "Cook Islands", "code": "CK", "currency": "USD"}, 
    {"name": "Costa Rica", "code": "CR", "currency": "CRC"}, 
    {"name": "Cote D'Ivoire", "code": "CI", "currency": "USD"}, 
    {"name": "Croatia", "code": "HR", "currency": "EUR"}, 
    {"name": "Cuba", "code": "CU", "currency": "USD"}, 
    {"name": "Cyprus", "code": "CY", "currency": "EUR"}, 
    {"name": "Czech Republic", "code": "CZ", "currency": "EUR"}, 
    {"name": "Denmark", "code": "DK", "currency": "EUR"}, 
    {"name": "Djibouti", "code": "DJ", "currency": "USD"}, 
    {"name": "Dominica", "code": "DM", "currency": "USD"}, 
    {"name": "Dominican Republic", "code": "DO", "currency": "USD"}, 
    {"name": "Ecuador", "code": "EC", "currency": "USD"}, 
    {"name": "Egypt", "code": "EG", "currency": "USD"}, 
    {"name": "El Salvador", "code": "SV", "currency": "USD"}, 
    {"name": "Equatorial Guinea", "code": "GQ", "currency": "USD"}, 
    {"name": "Eritrea", "code": "ER", "currency": "USD"}, 
    {"name": "Estonia", "code": "EE", "currency": "EUR"}, 
    {"name": "Ethiopia", "code": "ET", "currency": "USD"}, 
    {"name": "Falkland Islands (Malvinas)", "code": "FK", "currency": "USD"}, 
    {"name": "Faroe Islands", "code": "FO", "currency": "EUR"}, 
    {"name": "Fiji", "code": "FJ", "currency": "USD"}, 
    {"name": "Finland", "code": "FI", "currency": "EUR"}, 
    {"name": "France", "code": "FR", "currency": "EUR"}, 
    {"name": "French Guiana", "code": "GF", "currency": "EUR"}, 
    {"name": "French Polynesia", "code": "PF", "currency": "EUR"}, 
    {"name": "French Southern Territories", "code": "TF", "currency": "USD"}, 
    {"name": "Gabon", "code": "GA", "currency": "USD"}, 
    {"name": "Gambia", "code": "GM", "currency": "USD"}, 
    {"name": "Georgia", "code": "GE", "currency": "USD"}, 
    {"name": "Germany", "code": "DE", "currency": "EUR"}, 
    {"name": "Ghana", "code": "GH", "currency": "USD"}, 
    {"name": "Gibraltar", "code": "GI", "currency": "EUR"}, 
    {"name": "Greece", "code": "GR", "currency": "EUR"}, 
    {"name": "Greenland", "code": "GL", "currency": "USD"}, 
    {"name": "Grenada", "code": "GD", "currency": "USD"}, 
    {"name": "Guadeloupe", "code": "GP", "currency": "EUR"}, 
    {"name": "Guam", "code": "GU", "currency": "USD"}, 
    {"name": "Guatemala", "code": "GT", "currency": "USD"}, 
    {"name": "Guernsey", "code": "GG", "currency": "GBP"}, 
    {"name": "Guinea", "code": "GN", "currency": "USD"}, 
    {"name": "Guinea-Bissau", "code": "GW", "currency": "USD"}, 
    {"name": "Guyana", "code": "GY", "currency": "USD"}, 
    {"name": "Haiti", "code": "HT", "currency": "USD"}, 
    {"name": "Heard Island and Mcdonald Islands", "code": "HM", "currency": "USD"}, 
    {"name": "Holy See (Vatican City State)", "code": "VA", "currency": "EUR"}, 
    {"name": "Honduras", "code": "HN", "currency": "USD"}, 
    {"name": "Hong Kong", "code": "HK", "currency": "HKD"}, 
    {"name": "Hungary", "code": "HU", "currency": "EUR"}, 
    {"name": "Iceland", "code": "IS", "currency": "USD"}, 
    {"name": "India", "code": "IN", "currency": "INR"}, 
    {"name": "Indonesia", "code": "ID", "currency": "IDR"}, 
    {"name": "Iran, Islamic Republic Of", "code": "IR", "currency": "USD"}, 
    {"name": "Iraq", "code": "IQ", "currency": "USD"}, 
    {"name": "Ireland", "code": "IE", "currency": "EUR"}, 
    {"name": "Isle of Man", "code": "IM", "currency": "GBP"}, 
    {"name": "Israel", "code": "IL", "currency": "ILS"}, 
    {"name": "Italy", "code": "IT", "currency": "EUR"}, 
    {"name": "Jamaica", "code": "JM", "currency": "USD"}, 
    {"name": "Japan", "code": "JP", "currency": "JPY"}, 
    {"name": "Jersey", "code": "JE", "currency": "GBP"}, 
    {"name": "Jordan", "code": "JO", "currency": "USD"}, 
    {"name": "Kazakhstan", "code": "KZ", "currency": "KZT"}, 
    {"name": "Kenya", "code": "KE", "currency": "USD"}, 
    {"name": "Kiribati", "code": "KI", "currency": "USD"}, 
    {"name": "Korea, Democratic People Republic of", "code": "KP", "currency": "USD"}, 
    {"name": "Korea, Republic of", "code": "KR", "currency": "KRW"}, 
    {"name": "Kuwait", "code": "KW", "currency": "KWD"}, 
    {"name": "Kyrgyzstan", "code": "KG", "currency": "USD"}, 
    {"name": "Lao People Democratic Republic", "code": "LA", "currency": "USD"}, 
    {"name": "Latvia", "code": "LV", "currency": "EUR"}, 
    {"name": "Lebanon", "code": "LB", "currency": "USD"}, 
    {"name": "Lesotho", "code": "LS", "currency": "USD"}, 
    {"name": "Liberia", "code": "LR", "currency": "USD"}, 
    {"name": "Libyan Arab Jamahiriya", "code": "LY", "currency": "USD"}, 
    {"name": "Liechtenstein", "code": "LI", "currency": "CHF"}, 
    {"name": "Lithuania", "code": "LT", "currency": "EUR"}, 
    {"name": "Luxembourg", "code": "LU", "currency": "EUR"}, 
    {"name": "Macao", "code": "MO", "currency": "USD"}, 
    {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK", "currency": "EUR"}, 
    {"name": "Madagascar", "code": "MG", "currency": "USD"}, 
    {"name": "Malawi", "code": "MW", "currency": "USD"}, 
    {"name": "Malaysia", "code": "MY", "currency": "MYR"}, 
    {"name": "Maldives", "code": "MV", "currency": "USD"}, 
    {"name": "Mali", "code": "ML", "currency": "USD"}, 
    {"name": "Malta", "code": "MT", "currency": "EUR"}, 
    {"name": "Marshall Islands", "code": "MH", "currency": "USD"}, 
    {"name": "Martinique", "code": "MQ", "currency": "EUR"}, 
    {"name": "Mauritania", "code": "MR", "currency": "USD"}, 
    {"name": "Mauritius", "code": "MU", "currency": "USD"}, 
    {"name": "Mayotte", "code": "YT", "currency": "USD"}, 
    {"name": "Mexico", "code": "MX", "currency": "MXN"}, 
    {"name": "Micronesia, Federated States of", "code": "FM", "currency": "USD"}, 
    {"name": "Moldova, Republic of", "code": "MD", "currency": "USD"}, 
    {"name": "Monaco", "code": "MC", "currency": "EUR"}, 
    {"name": "Mongolia", "code": "MN", "currency": "USD"}, 
    {"name": "Montenegro", "code": "ME", "currency": "EUR"},
    {"name": "Montserrat", "code": "MS", "currency": "USD"},
    {"name": "Morocco", "code": "MA", "currency": "USD"}, 
    {"name": "Mozambique", "code": "MZ", "currency": "USD"}, 
    {"name": "Myanmar", "code": "MM", "currency": "USD"}, 
    {"name": "Namibia", "code": "NA", "currency": "USD"}, 
    {"name": "Nauru", "code": "NR", "currency": "USD"}, 
    {"name": "Nepal", "code": "NP", "currency": "USD"}, 
    {"name": "Netherlands", "code": "NL", "currency": "EUR"}, 
    {"name": "Netherlands Antilles", "code": "AN", "currency": "USD"}, 
    {"name": "New Caledonia", "code": "NC", "currency": "USD"}, 
    {"name": "New Zealand", "code": "NZ", "currency": "NZD"}, 
    {"name": "Nicaragua", "code": "NI", "currency": "USD"}, 
    {"name": "Niger", "code": "NE", "currency": "USD"}, 
    {"name": "Nigeria", "code": "NG", "currency": "USD"}, 
    {"name": "Niue", "code": "NU", "currency": "USD"}, 
    {"name": "Norfolk Island", "code": "NF", "currency": "USD"}, 
    {"name": "Northern Mariana Islands", "code": "MP", "currency": "USD"}, 
    {"name": "Norway", "code": "NO", "currency": "NOK"}, 
    {"name": "Oman", "code": "OM", "currency": "USD"}, 
    {"name": "Pakistan", "code": "PK", "currency": "USD"}, 
    {"name": "Palau", "code": "PW", "currency": "USD"}, 
    {"name": "Palestinian Territory, Occupied", "code": "PS", "currency": "USD"}, 
    {"name": "Panama", "code": "PA", "currency": "USD"}, 
    {"name": "Papua New Guinea", "code": "PG", "currency": "USD"}, 
    {"name": "Paraguay", "code": "PY", "currency": "USD"}, 
    {"name": "Peru", "code": "PE", "currency": "PEN"}, 
    {"name": "Philippines", "code": "PH", "currency": "PHP"}, 
    {"name": "Pitcairn", "code": "PN", "currency": "USD"}, 
    {"name": "Poland", "code": "PL", "currency": "PLN"}, 
    {"name": "Portugal", "code": "PT", "currency": "EUR"}, 
    {"name": "Puerto Rico", "code": "PR", "currency": "USD"}, 
    {"name": "Qatar", "code": "QA", "currency": "QAR"}, 
    {"name": "Reunion", "code": "RE", "currency": "EUR"}, 
    {"name": "Romania", "code": "RO", "currency": "EUR"}, 
    {"name": "Russian Federation", "code": "RU", "currency": "RUB"}, 
    {"name": "RWANDA", "code": "RW", "currency": "USD"}, 
    {"name": "Saint Helena", "code": "SH", "currency": "USD"}, 
    {"name": "Saint Kitts and Nevis", "code": "KN", "currency": "USD"}, 
    {"name": "Saint Lucia", "code": "LC", "currency": "USD"}, 
    {"name": "Saint Pierre and Miquelon", "code": "PM", "currency": "USD"}, 
    {"name": "Saint Vincent and the Grenadines", "code": "VC", "currency": "USD"}, 
    {"name": "Samoa", "code": "WS", "currency": "USD"}, 
    {"name": "San Marino", "code": "SM", "currency": "EUR"}, 
    {"name": "Sao Tome and Principe", "code": "ST", "currency": "USD"}, 
    {"name": "Saudi Arabia", "code": "SA", "currency": "SAR"}, 
    {"name": "Senegal", "code": "SN", "currency": "USD"}, 
    {"name": "Serbia", "code": "RS", "currency": "EUR"}, 
    {"name": "Seychelles", "code": "SC", "currency": "USD"}, 
    {"name": "Sierra Leone", "code": "SL", "currency": "USD"}, 
    {"name": "Singapore", "code": "SG", "currency": "SGD"}, 
    {"name": "Slovakia", "code": "SK", "currency": "EUR"}, 
    {"name": "Slovenia", "code": "SI", "currency": "EUR"}, 
    {"name": "Solomon Islands", "code": "SB", "currency": "USD"}, 
    {"name": "Somalia", "code": "SO", "currency": "USD"}, 
    {"name": "South Africa", "code": "ZA", "currency": "ZAR"}, 
    {"name": "South Georgia and the South Sandwich Islands", "code": "GS", "currency": "EUR"}, 
    {"name": "Spain", "code": "ES", "currency": "EUR"}, 
    {"name": "Sri Lanka", "code": "LK", "currency": "USD"}, 
    {"name": "Sudan", "code": "SD", "currency": "USD"}, 
    {"name": "Suriname", "code": "SR", "currency": "USD"}, 
    {"name": "Svalbard and Jan Mayen", "code": "SJ", "currency": "EUR"}, 
    {"name": "Swaziland", "code": "SZ", "currency": "USD"}, 
    {"name": "Sweden", "code": "SE", "currency": "EUR"}, 
    {"name": "Switzerland", "code": "CH", "currency": "CHF"}, 
    {"name": "Syrian Arab Republic", "code": "SY", "currency": "USD"}, 
    {"name": "Taiwan, Province of China", "code": "TW", "currency": "TWD"}, 
    {"name": "Tajikistan", "code": "TJ", "currency": "USD"}, 
    {"name": "Tanzania, United Republic of", "code": "TZ", "currency": "USD"}, 
    {"name": "Thailand", "code": "TH", "currency": "THB"}, 
    {"name": "Timor-Leste", "code": "TL", "currency": "USD"}, 
    {"name": "Togo", "code": "TG", "currency": "USD"}, 
    {"name": "Tokelau", "code": "TK", "currency": "USD"}, 
    {"name": "Tonga", "code": "TO", "currency": "USD"}, 
    {"name": "Trinidad and Tobago", "code": "TT", "currency": "USD"}, 
    {"name": "Tunisia", "code": "TN", "currency": "USD"}, 
    {"name": "Turkey", "code": "TR", "currency": "TRY"}, 
    {"name": "Turkmenistan", "code": "TM", "currency": "USD"}, 
    {"name": "Turks and Caicos Islands", "code": "TC", "currency": "USD"}, 
    {"name": "Tuvalu", "code": "TV", "currency": "USD"}, 
    {"name": "Uganda", "code": "UG", "currency": "USD"}, 
    {"name": "Ukraine", "code": "UA", "currency": "UAH"}, 
    {"name": "United Arab Emirates", "code": "AE", "currency": "AED"}, 
    {"name": "United Kingdom", "code": "GB", "currency": "GBP"}, 
    {"name": "United States", "code": "US", "currency": "USD"}, 
    {"name": "United States Minor Outlying Islands", "code": "UM", "currency": "USD"}, 
    {"name": "Uruguay", "code": "UY", "currency": "UYU"}, 
    {"name": "Uzbekistan", "code": "UZ", "currency": "USD"}, 
    {"name": "Vanuatu", "code": "VU", "currency": "USD"}, 
    {"name": "Venezuela", "code": "VE", "currency": "USD"}, 
    {"name": "Viet Nam", "code": "VN", "currency": "VND"}, 
    {"name": "Virgin Islands, British", "code": "VG", "currency": "USD"}, 
    {"name": "Virgin Islands, U.S.", "code": "VI", "currency": "USD"}, 
    {"name": "Wallis and Futuna", "code": "WF", "currency": "USD"}, 
    {"name": "Western Sahara", "code": "EH", "currency": "USD"}, 
    {"name": "Yemen", "code": "YE", "currency": "USD"}, 
    {"name": "Zambia", "code": "ZM", "currency": "USD"}, 
    {"name": "Zimbabwe", "code": "ZW", "currency": "USD"} 
]

async function init(){

    // const gameID = readID();

    console.log(process.argv.slice(2));

    const gameID = process.argv.slice(2)[0];
    const prefferedCountry = process.argv.slice(2)[1];

    const nameReffer = getCountryByName(prefferedCountry)[0];
    const codeReffer = getCountryByCode(prefferedCountry)[0];


    let headers = {
        'Accept': '*/*',
        'Referer': 'https://store.steampowered.com/app/644930/They_Are_Billions/',
        'X-Requested-With': 'json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
    };
    
    let options = {
        url: `https://store.steampowered.com/search/suggest?term=${gameID}&f=games&cc=us&l=english&`,
        headers: headers
    };

    await request(options, printGame);

    if (prefferedCountry == undefined) {
        for (let i = 0; i < countries.length; i++) {

            let options = {
                url: `https://store.steampowered.com/search/suggest?term=${gameID}&f=games&cc=${countries[i].code}&l=english&`,
                headers: headers
            };
    
            request(options, printPrice.bind({country: countries[i].name}));
    
        }
    } else if (codeReffer != undefined){

        console.log('Searching for pricing in ' + codeReffer.name);
        let options = {
            url: `https://store.steampowered.com/search/suggest?term=${gameID}&f=games&cc=${prefferedCountry}&l=english&`,
            headers: headers
        };
        request(options, printPrice.bind({country: prefferedCountry}));

    } else if (nameReffer != undefined){

        console.log('Searching for pricing in ' + nameReffer.name);
        let options = {
            url: `https://store.steampowered.com/search/suggest?term=${gameID}&f=games&cc=${nameReffer.code}&l=english&`,
            headers: headers
        };

        request(options, printPrice.bind({country: prefferedCountry}));
    } else {
        console.log('Invalid country name/code');
    }

}

init();


