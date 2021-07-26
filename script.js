<<<<<<< HEAD

=======
// fetching individual crypto info from alpha vantage
>>>>>>> main
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

function buildTable(data) {
    var table = document.getElementById('crypto-table')
        for (var i = 0; i < data.length; i++) {
            // <td> <input class="chkbox" type="checkbox" id="${data[i].name}" onclick="getCoin(${data[i].id})"/> </td>
            var row = `<tr id="${data[i].id}">
                            
<<<<<<< HEAD
							    <td> <input class="chkbox" type="checkbox"  data-currency="${data[i].id}" onclick="getCoin(event)"/> </td>
                                <td>${data[i].name}</td>
							    <td class="price">${data[i].current_price}</td>
							    <td class="percentage">${data[i].price_change_percentage_24h + "%"}</td>
					    </tr>`
            table.innerHTML += row
    }
}
=======
							<td> <input class="chkbox" type="checkbox" id="${data[i].id}" data-currency="${data[i].id}" onclick="getCoin(event)"/> </td>
                            <td>${data[i].name}</td>
							<td>${data[i].current_price}</td>
							<td>${data[i].price_change_percentage_24h + "%"}</td>
					  </tr>`
        table.innerHTML += row
>>>>>>> main

function updateTable(data) {
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
        console.log(myArray)
    })
    .catch(err => {
        console.error(err);
    });

    
    for (var i = 0; i<myArray.length; i++){

        $(`tr[id=${myArray[i].id}] td.price`).text(myArray[i].current_price);
        $(`tr[id=${myArray[i].id}] td.percentage`).text(myArray[i].price_change_percentage_24h);
    }    
}

setInterval(function() {
    updateTable();
}, 15000 )



//  make the table remain untouched. but you have to compare the old info to the new info, if the price changed then update that 

// fetching individual CRYPTO info using coingecko
function getCoin(event) {
    var currency = event.target.dataset.currency;
<<<<<<< HEAD
    var currencyArray = [] + event.target.dataset.currency;
=======

>>>>>>> main
    console.log(currency);
    fetch(`https://api.coingecko.com/api/v3/coins/${currency}?tickers=true&market_data=true`, {
            headers: {
                Accept: "application/json"
            }
        })
        .then(response => {

            return response.json()
        })
        .then(data => {
            getNews(currency)


            if ($(`.container#${currency}-card`).length > 0) {
                if (!$(`input#${currency}-card`).checked) {
                    $(`.container#${currency}-card`).remove();
                }
                return;
            }

            var c = $("<div>").addClass('container').attr("id", `${currency}-card`);
            var image = $("<img>)").attr("src", data.image.small);
            var link = $("<a>").attr("href", data.links.homepage[0]).text(currency);
            c.append(image, link);
            $(".currency-card").append(c);



            console.log(data);
        })
        .catch(err => {
            console.error(err);
        });


}

function updateTable(data) {
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
            console.log(myArray)
        })
        .catch(err => {
            console.error(err);
        });

    for (var i = 0; i < myArray.length; i++) {
        $(`tr[id=${myArray[i].id}] td.price`).text(myArray[i].current_price);
        $(`tr[id=${myArray[i].id}] td.percentage`).text(myArray[i].price_change_percentage_24h);
    }
}

setInterval(function() {
    updateTable();
}, 15000)

// setInterval(function() {
//     var oldTable = document.getElementById('crypto-table');
//     while (oldTable.childNodes.length > 1) {
//         oldTable.removeChild(oldTable.lastChild);
//     }
//     getTicker()
// }, 30000)




function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("crypto-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        console.log(td)

        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


<<<<<<< HEAD
// setInterval(function() {
//     var oldTable = document.getElementById('crypto-table');
//     while (oldTable.childNodes.length > 1) {
//         oldTable.removeChild(oldTable.lastChild);
//     }
//     getTicker()
// }, 3000)


=======
>>>>>>> main

function getNews(coinid) {
    fetch(`https://bing-news-search1.p.rapidapi.com/news/search?q=${coinid}&safeSearch=Off&textFormat=Raw&freshness=Day`, {
            "method": "GET",
            "headers": {
                "x-bingapis-sdk": "true",
                // "accept-language": "english",
                "x-rapidapi-key": "3ee19568a5mshd30c79da7beed3fp140b8djsn6cdf2cb92913",
                "x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
            }
        })
        .then(response => {
            console.log(response);
            return response.json()
        })
        .then(data => {

            console.log(data.value[0].description);

            if ($(`.container#${coinid}`).length > 0) {
                if (!$(`input#${coinid}`).checked) {
                    $(`.container#${coinid}`).remove();
                }
                return;
            }

            var title = $("<div>").addClass('container').attr("id", coinid).text(data.value[0].description);
            $(".news-card").append(title);

        })
        .catch(err => {
            console.error(err);
        });
}


getTicker();



//  make the table remain untouched. but you have to compare the old info to the new info, if the price changed then update that 