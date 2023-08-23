import React, { Component } from 'react'
let mostActive = [];




// SYMBOLS LIST

let stockList = [],
  stockListPrices = [],
  stockListTickers = [],
  stockListChange = [],
  stockSymbols = [],
  stockListChangeColors = [];

// TEMP SYMBOLS FOR DUPLICATES IN LISTS

let tempStocksSymbols = [],
  tempStockName = [],
  tempStockPrice = [];

export default class MostActiveCard extends Component {

    componentDidMount() {
        this._isMounted = true;
        
        
        // fetch(
        //     `https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=${process.env.REACT_APP_API_KEY_1}`
        // )
        //   .then(res => res.json())
        //   .then(result => {
        //     mostActive = result.map(val => {
        //       return val;
        //     });
        //     console.log(result)
        //   });
          this.getStocksList();
    }

    getStocksList() {
        const stocks = `https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=${process.env.REACT_APP_API_KEY_1}`;
        fetch(stocks)
          .then(res => res.json())
          .then(result => {
            const gainers = `https://cloud.iexapis.com/stable/stock/market/list/gainers?token=${process.env.REACT_APP_API_KEY_1}`;
            let counter = 0;
            fetch(gainers)
              .then(res => res.json())
              .then(result => {
                for (let i = 0; i < result.length; i++) {
                  if (result[parseInt(i)].latestPrice !== null) {
                    tempStocksSymbols.push(result[parseInt(i)].symbol);
                    tempStockName.push(result[parseInt(i)].companyName);
                    tempStockPrice.push(
                      `$${result[parseInt(i)].latestPrice.toFixed(2)}`,
                    );
                    console.log("simbol  ", result[parseInt(i)].symbol);
                    console.log("ime kompanije  ", result[parseInt(i)].companyName);
                    console.log("poslednja cijena ", result[parseInt(i)].latestPrice.toFixed(2));
                  }
                 
                }
              })
              .then(() => {
                for (let i = 0; i < 9; i++) {
                  if (typeof result[parseInt(i)] !== "undefined") {
                    if (
                        Array.isArray(
                        stockSymbols,
                        result[parseInt(i)].symbol.toString(),
                      )
                    ) {
                      stockList[parseInt(i)] = tempStockName[parseInt(counter)];
                      stockListPrices[parseInt(i)] =
                        tempStockPrice[parseInt(counter)];
                      stockListTickers[parseInt(i)] =
                        tempStocksSymbols[parseInt(counter)];
                      counter++;
                    } else {
                      stockList[parseInt(i)] = result[parseInt(i)].companyName;
                      stockListPrices[parseInt(i)] = `$${result[
                        parseInt(i)
                      ].latestPrice.toFixed(2)}`;
                      stockListTickers[parseInt(i)] = result[parseInt(i)].symbol;
                    }
                  }
                  console.log("kompanija" , stockList[parseInt(i)]);
                  console.log("cijena ",stockListPrices[parseInt(i)]);
                  console.log("simbol ", stockListTickers[parseInt(i)]);
                }
                
              })
              .then(() => {
                setTimeout(() => {
                  for (let i = 0; i < 9; i++) {
                    const percentageChange = `https://cloud.iexapis.com/stable/stock/${
                      stockListTickers[parseInt(i)]
                    }/quote?displayPercent=true&token=${
                      process.env.REACT_APP_API_KEY_1
                    }`;
                    if (typeof stockListTickers[parseInt(i)] !== "undefined") {
                      fetch(percentageChange)
                        .then(res => res.json())
                        .then(result => {
                          if (result.changePercent !== null) {
                            stockListChange[parseInt(i)] = parseFloat(
                              result.changePercent,
                            ).toFixed(2);
                            
                            console.log("stok list ticker " , stockListTickers)
                            console.log("stock list change " ,stockListChange);
                          } else {
                            stockListChange[parseInt(i)] = "---";
                          }
                          if (Math.sign(stockListChange[parseInt(i)]) === -1) {
                            stockListChangeColors[parseInt(i)] = "rgb(244,84,133";
                          } else if (
                            Math.sign(stockListChange[parseInt(i)]) === 1
                          ) {
                            stockListChangeColors[parseInt(i)] = "rgb(102,249,218";
                            stockListChange[parseInt(i)] =
                              "+" + stockListChange[parseInt(i)];
                            if (
                              stockListChange[parseInt(i)].charAt(0) === "+" &&
                              stockListChange[parseInt(i)].charAt(1) === "+"
                            ) {
                              stockListChange[parseInt(i)] = stockListChange[
                                parseInt(i)
                              ].substr(1);
                            }
                          } else {
                            stockListChangeColors[parseInt(i)] = "rgb(153,158,175";
                          }
                          if (stockListChange[parseInt(i)] !== "---") {
                            stockListChange[parseInt(i)] =
                              stockListChange[parseInt(i)] + "%";
                          }
                          
                        })
                        
                    }
                  }
                  
                }, 1000);
                
              });
              
          });
         
      }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
