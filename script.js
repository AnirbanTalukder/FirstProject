// ALPHAvantageAPI key FHHX1AIKRVNFSC7N

// have a form that accepts user inputs  CRYPTO SYMBOL, and PERFERRED CURRENCY and stores those user inputs to variables
// use the class activity that taught us how to make forms that have autofill so when users start typing symbols, it gives them a dropdown list
// take the first part of the link and assigns it to a variable
// var part1 = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol='
// then take user input for crypto symbol and store it in a variable 
// var crypto = USER CRYPTO INPUT (example: 'BTC')
// make a variable that is the next part of the fetch call link
// var part2 = '&market='
// make a variable that is the user input of what type of currency you are exchanging into
// var crypto = USER CURRENCY INPUT (emaple: 'USD' us dollars  'CNY' chinese yuan)
// make a variable for the last part of the fetch link
// var part3 = '&apikey=FHHX1AIKRVNFSC7NY'
// each member can get their own api key, we can write a function to rotate the api key every 8 hours so we have 1500 pulls instead of 500


// write a function that pulls relavant data such as YESTERDAY's closing price, CURRENT PRICE and stores those to relevant variables, this function will run every 5 minutes
// write a if statement that compares current price to yeserdays price
// price up? text color green
// price up more than 10%? show that change in a unique way  
// price down? text color orange
// price down more than 5%? text color red
// append those variable values into the relavant div in the HTML to display information to USERS



// we declared variables but havent initialized them
//  var crypto ;
//  var currency ;
// we will create a for loop;
// for(var i = 0; i<cryptos.length; i++) {
// crypto = cryptos[i]
// THEN we are making the call with the value of crypto 
// }

// https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol={{crypto[i]}}&market={{currency}}&apikey=FHHX1AIKRVNFSC7N




// fetching individual crypto info from alpha vantage
function getData() {
    fetch("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=FHHX1AIKRVNFSC7N", {
            "method": "GET",

        })
        .then(response => {
            console.log(response);
            return response.json()
        })
        .then(data => { console.log(data) })
        .catch(err => {
            console.error(err);
        });

}


var myArray = []

// COIN GECK DOCUMENTATION https://www.coingecko.com/api/documentations/v3#/coins/get_coins__id_
// fetching general USD accepting Tickers for cryptocurrencies using coin gecko
function getTicker() {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=10&page=1&sparkline=false", {
            headers: {
                Accept: "application/json"
            }
        })
        .then(response => {
            console.log(response);
            return response.json()
        })
        .then(data => {

            myArray = data
            buildTable(myArray)
            console.log(myArray)
        })
        .catch(err => {
            console.error(err);
        });
}

// fetching individual CRYPTO info using coingecko
function getCoin() {
    fetch("https://api.coingecko.com/api/v3/coins/bitcoin?tickers=true&market_data=true", {
            headers: {
                Accept: "application/json"
            }
        })
        .then(response => {
            console.log(response);
            return response.json()
        })
        .then(data => { console.log(data) })
        .catch(err => {
            console.error(err);
        });

}



function buildTable(data) {
    var table = document.getElementById('crypto-table')

    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
							<td>${data[i].name}</td>
							<td>${data[i].current_price}</td>
							<td>${data[i].price_change_percentage_24h + "%"}</td>
					  </tr>`
        table.innerHTML += row


    }
}

getTicker();

// getCoin();