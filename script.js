const stocks = ["NVDA","MSFT","META","GOOGL","TSLA","SPY","QQQ"];

async function fetchStock(ticker) {
    const url = `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=oOH2c3lAouivjKlMeVM8HR9hnaf5QMmD`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0];
}

function scoreStock(stock) {
    let score = 0;

    if (Math.abs(stock.changesPercentage) > 2)
        score += 2;

    if (stock.volume > stock.avgVolume * 1.5)
        score += 2;

    return score;
}

async function run() {
    const container = document.getElementById("output");
    container.innerHTML = "";

    for (let ticker of stocks) {
        try {
            let stock = await fetchStock(ticker);
            let score = scoreStock(stock);

            container.innerHTML += `
                <div class="card">
                    <h2>${ticker}</h2>
                    <p>Price: $${stock.price}</p>
                    <p>Change: ${stock.changesPercentage.toFixed(2)}%</p>
                    <p>Volume: ${stock.volume}</p>
                    <p>Volatility Score: ${score}</p>
                </div>
            `;
        } catch (error) {
            console.error(error);
        }
    }
}

run();
