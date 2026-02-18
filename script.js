const stocks = ["NVDA","MSFT","META","GOOGL","TSLA","SPY","QQQ"];

async function fetchStock(ticker) {
    const proxy = "https://api.allorigins.win/raw?url=";
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${ticker}`;
    const response = await fetch(proxy + encodeURIComponent(url));
    const data = await response.json();
    return data.quoteResponse.result[0];
}

function scoreStock(stock) {
    let score = 0;

    if (Math.abs(stock.regularMarketChangePercent) > 2)
        score += 2;

    if (stock.regularMarketVolume > stock.averageDailyVolume3Month * 1.5)
        score += 2;

    return score;
}

async function run() {
    const container = document.getElementById("output");
    container.innerHTML = "";

    for (let ticker of stocks) {
        let stock = await fetchStock(ticker);
        let score = scoreStock(stock);

        let level = "low";
        if (score >= 4) level = "high";
        else if (score >= 2) level = "medium";

        container.innerHTML += `
            <div class="card ${level}">
                <h2>${ticker}</h2>
                <p>Price: $${stock.regularMarketPrice}</p>
                <p>Change: ${stock.regularMarketChangePercent.toFixed(2)}%</p>
                <p>Volume: ${stock.regularMarketVolume}</p>
                <p>Volatility Score: ${score}</p>
            </div>
        `;
    }
}

run();
