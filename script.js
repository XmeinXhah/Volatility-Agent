const stocks = ["NVDA","MSFT","META","GOOGL","TSLA","SPY","QQQ"];

// Mock fetch function to simulate stock API data
async function fetchStock(ticker) {
    // Generate realistic random data
    return {
        price: (Math.random() * 500 + 50).toFixed(2),                // price between $50-$550
        changesPercentage: ((Math.random() - 0.5) * 10).toFixed(2), // change -5% to +5%
        volume: Math.floor(Math.random() * 2000000),                 // random volume
        avgVolume: 1000000                                           // average volume
    };
}

// Calculate volatility score
function scoreStock(stock) {
    if (!stock) return 0;

    let score = 0;
    if (Math.abs(stock.changesPercentage) > 2) score += 2;
    if (stock.volume > stock.avgVolume * 1.5) score += 2;

    return score;
}

// Main function to render stock cards
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
                    <p>Change: ${stock.changesPercentage}%</p>
                    <p>Volume: ${stock.volume.toLocaleString()}</p>
                    <p>Volatility Score: ${score}</p>
                </div>
            `;
        } catch (error) {
            console.error(`Error loading ${ticker}:`, error);
        }
    }
}

// Run the script
run();
