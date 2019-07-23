const request = require('request');
const cheerio = require('cheerio');
const numeral = require('numeral');

const latestRates = require('./data/latest-rates.json');
const countries = require('./data/countries.json');

var exceptions = ['min', 'max'];

const rawResults = [];
var finalResults = [];

const info = {
    "gameid": undefined,
    "gamename": undefined,
    "prefferedcurrency": {
        "preffers": false,
        "code": undefined,
    },
    "prefferedcountry": {
        "preffers": false,
        "code": undefined,
        "refference": {
            "name": undefined, "code": undefined, "currency": undefined, "replace": undefined,
        },
    },
    "filter": undefined
};


const headers = {
    'Accept': '*/*',
    'Referer': 'https://store.steampowered.com/app/644930/They_Are_Billions/',
    'X-Requested-With': 'json',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
}

const colors = {
    "FgBlack": "\x1b[30m",
    "FgRed": "\x1b[31m",
    "FgGreen": "\x1b[32m",
    "FgYellow": "\x1b[33m",
    "FgBlue": "\x1b[34m",
    "FgMagenta": "\x1b[35m",
    "FgCyan": "\x1b[36m",
    "FgWhite": "\x1b[37m",
    "BgBlack": "\x1b[40m",
    "BgRed": "\x1b[41m",
    "BgGreen": "\x1b[42m",
    "BgYellow": "\x1b[43m",
    "BgBlue": "\x1b[44m",
    "BgMagenta": "\x1b[45m",
    "BgCyan": "\x1b[46m",
    "BgWhite": "\x1b[47m"
}

const steamLogo = `                        
                        /@@@@@@@&                          
                   (@@@@@@@@@@@@@@@@@@                     
                 @@@@@@@@@@@@@@@@@@@@@@@&                  
               @@@@@@@@@@@@@@@@@@/ *@@@@@@#                
             %@@@@@@@@@@@@@@@&    *    *@@@@               
            #@@@@@@@@@@@@@@@,  @,    @   @@@@              
            @@@@@@@@@@@@@@@@  @       @  @@@@@             
           @@@@@@@@@@@@@@@@   @@     *@  @@@@@             
            @@@@@@@@@@@@@#      @@@@@   @@@@@@,            
                 @@@@@@@              @@@@@@@@,            
                      (@*        @@@@@@@@@@@@@             
                         ,@   @@@@@@@@@@@@@@@@             
            #@@@@         @ &@@@@@@@@@@@@@@@@              
             #@@@@@ /@  (@  @@@@@@@@@@@@@@@@               
               @@@@@@    *@@@@@@@@@@@@@@@@#                
                 @@@@@@@@@@@@@@@@@@@@@@@&                  
                   (@@@@@@@@@@@@@@@@@@                     
                        /@@@@@@@&
                        
                                                                                          
  _ _|_  _   _. ._ _    ._  ._ o  _  _     _ |_   _   _ |   _  ._ 
  _>  |_ (/_ (_| | | |   |_) |  | (_ (/_   (_ | | (/_ (_ |< (/_ |  
                         |                                     
     `;

function printColored(color, message){
    console.log(colors[color] + '%s\x1b[0m', message);
}

function replaceDecimalSeparator(rawPrice){
    let splitPrice = rawPrice.split(',');
    let priceDec;
    let priceThous;

    if (splitPrice[0] == rawPrice){
        priceThous = rawPrice;
    } else {
        priceThous = splitPrice[0];
    }

    if (splitPrice[1] == undefined){
        priceDec = '00';
    } else {
        priceDec = splitPrice[1];
    }

    priceThous = priceThous.replace('.', ',');
    return (priceThous + '.' + priceDec);
}


function searchCurrency(prefferedCurrency){

    return new Promise((resolve, reject) => {
        let found = (latestRates.filter(
            function(rates){ return rates.base == prefferedCurrency }
        ));

        if(found[0] != undefined ){
            resolve(found[0]);
        }
        else {
            reject(new Error('Currency not supported/not found, showing native prices.'));
        } 

    })
    
    // for (let i = 0; i < latestRates.length; i++) {
    //     if (latestRates[i].base == currency){
    //         return latestRates[i];
    //     };
    // }

}

function convertCurrencies(finalCurrency){

    return new Promise (async (resolve, reject) => {

        try {

            let currencyData = await searchCurrency(finalCurrency);
            
            console.log(`\nConverting values to ${currencyData.base}`);
            
            rawResults.forEach(res => {
                
                let convertedValue = (parseFloat(res.price) / currencyData.rates[res.currency]).toFixed(2);
                finalResults.push({"country":res.country, "price": convertedValue, "currency": finalCurrency});
                
            });
            
        } catch(error) {
            reject(new Error('Could not convert currencies. ' + error));
        }
        
        resolve();

    })

}

function printPrices(){

    if (info.filter == 'min'){

        let min = {"country":undefined, "price": 1000000, "currency": undefined};
        finalResults.forEach(res => {

            if(parseFloat(res.price) < parseFloat(min.price)){
                min = res;
            }

        });
        console.log('\n Lowest price found: ' + min.country + ': ' + min.price + ' ' + min.currency);
    
    } else if (info.filter == 'max') {

        let max = {"country":undefined, "price": -1000000, "currency": undefined};
        finalResults.forEach(res => {

            if(parseFloat(res.price) > parseFloat(max.price)){
                max = res;
            }

        });
        console.log('\n Highest price found: ' + max.country + ': ' + max.price + ' ' + max.currency)

    } else {

        finalResults.forEach(res => {
            console.log(res.country + ': ' + res.price + ' ' + res.currency);
        });

    }

}

function returnHTML(url){
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {

            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                reject(new Error('Could not open page. ' + error));
            }

        })

    })
}

function searchGameName(gameID){

    return new Promise((resolve, reject) => {

        try{
            let options = {
                url: `https://store.steampowered.com/search/suggest?term=${gameID}&f=games&cc=us&l=english&`,
                headers: headers
            };
    
            const html = returnHTML(options);
            
            html
                .then(html => validateGame(html))
                .then(res => resolve(res))
                .catch(err => reject(err))

        } catch(error){
            reject(error);
        }

        
    })

}

function validateGame(html) {
    
    return new Promise((resolve, reject) => {
        const $ = cheerio.load(html);
        const container = $('.match_name').eq(0).text();
    
        if (container == undefined || container == null || container == ''){
            reject(new Error('Invalid game ID.'));
        } else {
            resolve(container);
        }

    })


}

function getCountryByCC(code) {
    return new Promise((resolve, reject) => {
        let found = (countries.filter(
            function(countries){ return countries.code == code }
        ));

        if(found[0] != undefined){
            resolve(found[0]);
        }
        else {
            reject(new Error('Country code not found'));
        } 

    })
}

function getCountryByCN(name) {
    return countries.filter(
        function(countries){ return countries.name == name }
    );
}


function sendRequests(){

    return new Promise((resolve, reject) => {

        try {
            if (info.prefferedcountry.preffers) {
    
                printColored("FgGreen", 'Searching for pricing in ' + info.prefferedcountry.refference.name + '\n');
                resolve(requestSpecCountry(info.gameid, info.prefferedcountry.refference));
            
            } else {
        
                printColored("FgGreen", 'Searching for pricing Worldwide');
    
                // console.log('Searching for pricing Worldwide');
    
                resolve(requestWorldwide(info.gameid));
        
            } 
        } catch (err) {
            reject(err);
        }


    })
    
    // else if (cnReffer != undefined){
    // For future validation for country name, disabled because of inconsistency on country names
    // Currently supporting country code only (ISO 3166-1 alpha-2)
    //     requestSpecCountry(gameID, cnReffer);
    // } 

}

function formatPrice(rawPrice, replace) {
    
    return new Promise((resolve, reject) => {

        try {

            let finalPrice;
    
            if(rawPrice == 'Free to Play'){
        
                finalPrice = '0.00';
                
            } else if (replace == true){
                
                finalPrice = replaceDecimalSeparator(rawPrice);
        
            } else if (replace == 'peru'){
        
                finalPrice = rawPrice.replace('S/.', '');
        
            } else {
        
                finalPrice = rawPrice;
        
            }
        
            resolve(numeral(finalPrice).value());

        } catch(error) {
            reject(new Error('Could not format price. ' + error));
        }


    })

}

function validatePrice(html){

    return new Promise((resolve, reject) => {

        const $ = cheerio.load(html);
        const container = $('.match_price').eq(0).text();
    
        if (container == undefined || container == null || container == ''){
            reject(new Error('Invalid game price.'));
        } else {
            resolve(container);
        }

    })

}

function savePrice(country, price, currency){

    return new Promise((resolve, reject) => {

        try {

            // console.log(`Adding to rawResults ${country}: ${price} ${currency}` );
            rawResults.push({"country":country, "price": price, "currency": currency});
            resolve();

        } catch(error){
            reject(new Error('Could not save price. ' + error))
        }

    })

}

function getPrice(options){

    return new Promise (async (resolve, reject) => {
    
        try {

            const html = await returnHTML(options);
            const price = await validatePrice(html);
            resolve(price);

        } catch (error){
            reject('Could not get price. ' + error);
        }
    
    })

}

function requestSpecCountry(gameid, countryReffer){

    return new Promise (async (resolve, reject) => {
            
        let options = {
            url: `https://store.steampowered.com/search/suggest?term=${gameid}&f=games&cc=${countryReffer.code}&l=english&`,
            headers: headers
        };

        try {

            const price = await getPrice(options);
            const formatedPrice = await formatPrice(price, countryReffer.replace);
            await savePrice(countryReffer.name, formatedPrice, countryReffer.currency);
            resolve()

        } catch (error){
            reject('Could not request. ' + error);
        }
    
    })

}

async function requestWorldwide(gameid){

    return new Promise (async (resolve, reject) => {

        try {
            let promiseArray = [];
    
            for (let i = 0; i < countries.length; i++) {
    
                promiseArray.push(new Promise ((resolve, reject) => {
    
                    try {
                        resolve(requestSpecCountry(gameid, countries[i]));
                    } catch(error){
                        reject(error);
                    }
                    
                }))
    
            }
        
            resolve(await Promise.all(promiseArray));
        } catch(error){
            reject(error);
        }


    })

    // promiseArray.push(new Promise((resolve, reject) => 
    //     request("https://api.nasa.gov/planetary/apod?date=" + subtractDate(enddate, i) + "&api_key=DEMO_KEY", function(error, response, body) {
    //     if (err) reject(err);
    //     resolve(body)
    // })))

    // console.log('Searching for pricing Worldwide');

    // for (let i = 0; i < countries.length; i++) {

    //     let finalIteration = i == countries.length-1;

    //     let options = {
    //         url: `https://store.steampowered.com/search/suggest?term=${gameid}&f=games&cc=${countries[i].code}&l=english&`,
    //         headers: headers
    //     };

    //     request(options, savePrice.bind({country: countries[i].name, currency: countries[i].currency, replace: countries[i].replace, "finish": finalIteration}));
        
    // }

}

function validateArgs(){

    return new Promise( async (resolve, reject) => {

        arguments = process.argv.slice(2);

        let gameid = arguments[0];
        let prefferedcurrency = undefined;
        let prefferscurrency = false;
        let prefferedcountry = {"name": undefined, "code": undefined, "currency": undefined, "replace": undefined};
        let prefferscountry = false;
        let filter = undefined;

        await new Promise ((resolve, reject) => {
            
            arguments.forEach(arg => {
    
                if(arg != gameid){
                    if(exceptions.indexOf(arg) == -1){
                        if(arg.length == 2){
    
                            getCountryByCC(arg)
    
                                .then(reff => {
                                    prefferedcountry = reff;
                                    prefferscountry = true;
                                })
                                .catch(err => console.log(err));
    
                        } else if(arg.length == 3){
                            
                            searchCurrency(arg)
                            
                                .then(reff => {
                                    prefferedcurrency = reff.base;
                                    prefferscurrency = true;
                                })
                                .catch(err => console.log(err));
    
                        } else {
                            reject(new Error(arg + ' is not a valid argument.'));
                        }
                        
                    } else {
                        filter = arg;
                    }
                }
                
            })

            resolve();

        }).catch(err => reject(err))

        let newInfo = {
            "gameid": gameid, 
            "prefferedcurrency": {
                "preffers": prefferscurrency,
                "code": prefferedcurrency,
            },
            "prefferedcountry": {
                "preffers": prefferscountry,
                "refference": {
                    "name": prefferedcountry.name, "code": prefferedcountry.code, "currency": prefferedcountry.currency, "replace": prefferedcountry.replace,
                },
            },
            "filter": filter
        };

        resolve(newInfo);

    })
    
}

function populateInfo(newInfo){

    return new Promise((resolve, reject) => {

        try {
            for (var key in newInfo){
    
                let newInfoKey = key;
            
                for (var key in info){
                    if (key == newInfoKey){
                        info[key] = newInfo[newInfoKey];
                    }
                }
            }

            resolve();

        } catch(err) {
            reject(new Error('Unable to populate info. ' + err));
        }

    })
    
}

async function init(){

    try {
        
        printColored('FgGreen', steamLogo)

        const argumentsInfo = await validateArgs();
        await populateInfo(argumentsInfo);
        info.gamename = await searchGameName(info.gameid);
        
        printColored("FgWhite", `\nGame: ${info.gamename}`);
        printColored("FgCyan", `Link: https://store.steampowered.com/app/${info.gameid} \n`);

        await sendRequests();

        if(info.prefferedcurrency.preffers){
            await convertCurrencies(info.prefferedcurrency.code);
        } else {
            finalResults = [...rawResults]
        }

        printPrices();
             
    } catch(error) { 
        console.log(error)
    }

}

init();