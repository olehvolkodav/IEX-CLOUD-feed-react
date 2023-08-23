import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from "prop-types"; 

let symbol;

let chartData1 = [];
let chartData2 = [];

// CHARTS INFO

let stockSymbols = [],
  stockPrices = [],
  stockChanges = [],
  stockSymbol = [],
  changesColors = [];

var options = {
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {enabled: false},
    hover: {mode: null},
    layout: {
      padding: {
        bottom: 15,
      },
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: true,
        },
      ],
      yAxes: [
        {
          display: true,
        },
      ],
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        borderCapStyle: "round",
        borderJoinStyle: "round",
        tension: 1,
      },
    },
  };

  function labelGen(length) {
    let result = 0;
    for (let i = 1; i < length; i++) {
      result = result + "," + i;
    }
    return result.split(",");
  }



  export function numberWithCommas(x) {
    if (typeof x !== "undefined") {
      return x.toLocaleString();
    } else {
      return "";
    }
  }

export default class Charts extends Component {

    

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._isMounted = true;

        // this.data1 = canvas => {
        //     const ctx = canvas.getContext("2d");
        //     const gradient = ctx.createLinearGradient(0, 0, 600, 10);
        //     gradient.addColorStop(0, "#7c83ff");
        //     gradient.addColorStop(1, "#7cf4ff");
        //     let gradientFill = ctx.createLinearGradient(0, 0, 0, 100);
        //     gradientFill.addColorStop(0.1, "rgba(124, 131, 255,.3)");
           
        //     ctx.shadowColor = "rgba(124, 131, 255,.3)";
        //     ctx.shadowBlur = 5;
        //     ctx.shadowOffsetX = 0;
        //     ctx.shadowOffsetY = 4;
        //     return {
        //       labels: labelGen(chartData1.length),
        //       datasets: [
        //         {
        //           lineTension: 0.3,
        //           label: "",
        //           pointBorderWidth: 0,
        //           pointHoverRadius: 0,
        //           borderColor: gradient,
        //           backgroundColor: gradientFill,
        //           pointBackgroundColor: gradient,
        //           fill: true,
        //           borderWidth: 2,
        //           data: chartData1,
        //         },
        //       ],
        //     };
        //   };
        //   this.data2 = canvas => {
        //     const ctx = canvas.getContext("2d");
        //     const gradient = ctx.createLinearGradient(0, 0, 600, 10);
        //     gradient.addColorStop(0, "#7c83ff");
        //     gradient.addColorStop(1, "#7cf4ff");
        //     let gradientFill = ctx.createLinearGradient(0, 0, 0, 100);
        //     gradientFill.addColorStop(0.1, "rgba(124, 131, 255,.3)");
           
        //     ctx.shadowColor = "rgba(124, 131, 255,.3)";
        //     ctx.shadowBlur = 5;
        //     ctx.shadowOffsetX = 0;
        //     ctx.shadowOffsetY = 4;
        //     return {
        //       labels: labelGen(chartData2.length),
        //       datasets: [
        //         {
        //           lineTension: 0.3,
        //           label: "",
        //           pointBorderWidth: 0,
        //           pointHoverRadius: 0,
        //           borderColor: gradient,
        //           backgroundColor: gradientFill,
        //           pointBackgroundColor: gradient,
        //           fill: true,
        //           borderWidth: 2,
        //           data: chartData2,
        //         },
        //       ],
        //     };
        //   };
            this.getStockInfo();
            this.getGainers();
            this.getChart(symbol);
    }

    getStockInfo(symbol, changeStash, priceStash, num) {
        const percentageChange = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?displayPercent=true&token=${process.env.REACT_APP_API_KEY_1}`;
        if (typeof symbol !== "undefined") {
          fetch(percentageChange)
            .then(res => res.json())
            .then(result => {
              if (result.latestPrice !== null) {
                priceStash[parseInt(num)] = result.latestPrice.toFixed(2);
              } else if (result.iexRealtimePrice !== null) {
                priceStash[parseInt(num)] = result.iexRealtimePrice.toFixed(2);
              }
              if (result.changePercent !== null) {
                changeStash[parseInt(num)] = parseFloat(
                  result.changePercent,
                ).toFixed(2);
              }
              console.log(result.latestPrice.toFixed(2));
              console.log(parseFloat(
                result.changePercent,
              ).toFixed(2));

            });
          this.getChart(symbol);
        }
      }


    getGainers() {
        chartData1 = [];
        chartData2 = [];
    
        const gainers = `https://cloud.iexapis.com/stable/stock/market/list/gainers?token=${process.env.REACT_APP_API_KEY_1}`;
        fetch(gainers)
          .then(res => res.json())
          .then(result => {
            for (let i = 0; i < 4; i++) {
              if (typeof result[parseInt(i)] !== "undefined") {
                stockSymbols.push(result[parseInt(i)].symbol);
              }
              console.log("gainers od 1 symbol " , stockSymbol[0]);
            }
            this.getStockInfo(
              stockSymbols[0],
              chartData1,
              stockChanges,
              stockPrices,
              0,
              () => {
                let firstChart = this.chartFirst.current;
                if (firstChart) {
                  setTimeout(() => {
                    if (
                      typeof stockChanges[0] !== "undefined" &&
                      typeof stockPrices[0] !== "undefined" &&
                      chartData1.length >= 2 &&
                      firstChart &&
                      this._isMounted
                    ) {
                      this.setState({
                        loader1: true,
                      });
                      firstChart.href = "/stocks/" + stockSymbols[0];
                    
                    }
                  }, 800);
                }
              },
            );
            this.getStockInfo(
              stockSymbols[1],
              chartData2,
              stockChanges,
              stockPrices,
              1,
              () => {
                let secondChart = this.chartSecond.current;
                setTimeout(() => {
                  if (secondChart) {
                    if (
                      typeof stockChanges[1] !== "undefined" &&
                      typeof stockPrices[1] !== "undefined" &&
                      chartData2.length >= 2 &&
                      this._isMounted
                    ) {
                      this.setState({
                        loader2: true,
                      });
                      secondChart.href = "/stocks/" + stockSymbols[1];
                    } 
                  }
                }, 800);
              },
            );
          });
      }


      getChart( symbol) {
        
        const stockApi = `https://cloud.iexapis.com/beta/stock/${symbol}/batch?token=${process.env.REACT_APP_API_KEY_2}&types=chart,quote&range=1d`;
        fetch(stockApi)
          .then(res => res.json())
          .then(result => {console.log(result)
          });
        }
           
    
    
    render() {
        return (
           
            <div className="stockChart__chart">
            {/* <Line data={data} options={options} /> */}
     
            <div className="panel__topCharts" style={{display: "flex"}}>
                    <a
                      ref={this.chartFirst}
                      id="chartFirst"
                      href="/"
                      className="chartLink">
                      
                        {/* <Charts 
                        data={this.data1}
                        stockSymbol={stockSymbols[0]}
                        stockPrice={stockPrices[0]}
                        stockChange={stockChanges[0]}
                        changesColor={changesColors[0]}
                       /> */}
                    </a>
                    <a
                      ref={this.chartSecond}
                      id="chartSecond"
                      href="/"
                      className="chartLink">
                      
                       
                        data={this.data2}
                        stockSymbol={stockSymbols[1]}
                        stockPrice={stockPrices[1]}
                        stockChange={stockChanges[1]}
                        changesColor={changesColors[1]}
                      
                    </a>
                    </div>
                    </div>
        )
       
    }
    // static propTypes = {
        
    //     stockSymbol: React.PropTypes.string.isRequired,
    //     stockPrice: React.PropTypes.string.isRequired,
    //     stockChange: React.PropTypes.string.isRequired,
    //     changesColor: React.PropTypes.string.isRequired,
    //     options: React.PropTypes.object.isRequired,
    //     data: React.PropTypes.func.isRequired,
    //   };
}

