# Steam Price Checker

Steam has different price systems around the world, because of different taxes and tributes, or even local currency devaluation. 

Steam price checker is an application that is capable of getting prices for any game on all the available countries.

*Note: This application should be used for educational purposes only. We are not responsible for eventual punishing to your Steam account for using forbidden methods to buy games on other countries.*

## Installation

Clone/Download this repository and inside the folder on terminal/bash use the node package manager [npm](https://www.npmjs.com/) to install all the dependencies:

```bash
npm install
```

## Usage

#### Check for game price
```bash
node price-checker <game_id> [country] [currency] [filter]
```
#### Update currency rate
```bash
node update-rate <currency>
```

* **game_id** - ID of any game available on Steam. Can be located on the game page url after '**app/**'. (e.g https://store.steampowered.com/app/**620**/Portal_2/)

* **country** - [ISO 3166 Alpha-2](https://www.iban.com/country-codes) 2 letters long country code format, to search for pricing on a specific country.

* **currency** - [ISO 4217](https://www.iban.com/currency-codes) 3 letters long currency code to convert the final values to a specific currency. Note: Limited to [Steam Supported Currencies](https://partner.steamgames.com/doc/store/pricing/currencies).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
