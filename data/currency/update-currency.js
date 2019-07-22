const request = require('request');
const cheerio = require('cheerio');

const currencies = ['usd', 'brl', 'eur', 'gbp'];

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

async function init() {
    
    return new Promise ((resolve, reject) => {

        let base = process.argv.slice(2)[0];

        let promiseArray = [];
    
        try {
            currencies.forEach(currency => {
        
                if(base != currency){
        
                    promiseArray.push( new Promise(async (resolve, reject) =>{
                        
                        try {
    
                            const html = await returnHTML(`https://transferwise.com/br/currency-converter/${base}-to-${currency}-rate?amount=1`);
                            const price = await returnCurrency(html);
                            console.log(`1 ${base.toUpperCase()} to ${currency.toUpperCase()}: ` + price);
                            resolve(price);
    
                        } catch(error){
                            reject(error);
                        }
            
                    }))
                } 
                
            })
        } catch(error){
            reject(console.log(error));
        }

        resolve(Promise.all(promiseArray));

    })


}

init();