const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const obj = require('./latest-rates.json');

const currencies = ['AED', 'ARS', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'EUR', 'GBP', 'HKD', 'ILS', 'IDR', 'INR', 'JPY', 'KRW', 'KWD', 'KZT', 'MXN', 'MYR', 'NOK', 'NZD', 'PEN', 'PHP', 'PLN', 'QAR', 'RUB', 'SAR', 'SGD', 'THB', 'TRY', 'TWD', 'UAH', 'USD', 'UYU', 'VND', 'ZAR'];

const newJson = {
    "base": undefined,
    "date": undefined,
    "rates": {
        
    }
};

function returnHTML(url){
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {

            if (!error && response.statusCode == 200) { 
                try{
                    resolve(body);
                } catch(error) {
                    reject(new Error(error));
                }

            } else {
                reject(new Error(error));
            }

        })

    })
}

function returnCurrency(html) {
    return new Promise(async (resolve, reject) => {
        
        const $ = await cheerio.load(html);
        const container = $('#cc-amount-to').attr('value');
    
        if (container == undefined || container == null || container == ''){
            reject(new Error('Invalid currency.'));
        } else {
            resolve(container);
        }

    })

}

function searchRates(base){

    return new Promise((resolve, reject) => {
        
        let promiseArray = [];
        
        currencies.forEach(currency => {
            
            if(base != currency){
    
    
                promiseArray.push( new Promise(async (resolve, reject) =>{
                    
                    try {
    
                        const html = await returnHTML(`https://transferwise.com/br/currency-converter/${base}-to-${currency}-rate?amount=1`);
                        const price = await returnCurrency(html);
    
                        newJson.rates[currency] = parseFloat(price.replace(',','.'));
                        console.log(`1 ${base} to ${currency} = ` + price);
                        
                        resolve();
    
                    } catch(error){
                        reject(error);
                    }
        
                }))
                

            } else {

                newJson.rates[currency] = 1.00;

            }
        }) 
        try{
            resolve(Promise.all(promiseArray));
        } catch(err){
            reject(new Error(err));
        }
    
    })


}

function saveJSON(newJson) {

    return new Promise(async (resolve, reject) => {
        
        try {
            await obj.filter(
                function(rate){ 
                    if (rate.base == newJson.base){     
                        rate = newJson;
                        return resolve();
                    } else {
                        obj.push(newJson);
                        return resolve();
                    }
                }
            )

            resolve(fs.writeFile('./latest-rates.json', JSON.stringify(obj, null, 4), 'utf8', () => console.log('New rates data saved as latest-rates.json')));

        } catch(err){
            reject(err);
        }
    })
}

function init() {
    
    return new Promise (async (resolve, reject) => {

        let base = process.argv.slice(2)[0];

        if( base != null && base != undefined && base != ''){
            
            datetime = new Date();

            newJson.date = datetime.toISOString().slice(0,10);
            newJson.base = base;
    
            try {
                
                await searchRates(base);
                await saveJSON(newJson);
                console.log(obj);
                
    
            } catch(error){
    
                reject(console.log(error));
            
            }

        }


    })


}

try{
    init();
} catch(err){
    console.log(err);
}