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


//Building table out of fetched api data
function buildTable(data) {
    var table = document.getElementById('crypto-table')
    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
                            
							<td> <input class="chkbox" type="checkbox" id="${data[i].id}" data-currency="${data[i].id}" onclick="getCoin(event)"/> </td>
                            <td>${data[i].name}</td>
                            <td class="price">${data[i].current_price}</td>
                            <td class="percentage">${data[i].price_change_percentage_24h + "%"}</td>
					  </tr>`
        table.innerHTML += row

    }
    console.log(table);
}


// fetching individual CRYPTO info using coingecko
function getCoin(event) {
    var currency = event.target.dataset.currency;
    setupBox(currency);


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
// var box = [];

function setupBox(currency) {
    var boxes = document.querySelectorAll("input[type='checkbox']");
    var box = [localStorage.getItem("storedData")] === [{}] ? [] : [localStorage.getItem("storedData")];
    for (var i = 0; i < boxes.length; i++) {
        console.log(boxes[i], boxes[i].getAttribute("data-currency"))
        if (boxes[i].getAttribute("data-currency") === currency) {
            box.push(boxes[i])
        }
    }
    localStorage.setItem("storedData", JSON.stringify(box));
}


//This will update the data every 15 sec
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
    }, 18000000) //Price refreshing every 6 hours


//Searching coin from the table
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


//Getting coin specific new and updates
function getNews(coinid) {
    fetch(`https://bing-news-search1.p.rapidapi.com/news/search?q=${coinid}&safeSearch=Off&textFormat=Raw&freshness=Day`, {
            "method": "GET",
            "headers": {
                "x-bingapis-sdk": "true",
                // "accept-language": "english",
                "x-rapidapi-key": "864c2ad9fdmsh93c4562180d0ce6p11fdd9jsn80d28acb64e3",
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