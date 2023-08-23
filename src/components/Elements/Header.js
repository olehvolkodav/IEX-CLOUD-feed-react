import React, { Component } from 'react'

let symbol;
let allSymbols = [];
let symbolsOnly = [];


export default class Header extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        // this.componentDidMount = React.createRef();
        this.results = React.createRef();
        this.searchBar = React.createRef();
        this.searchBarEl = React.createRef();
        this.searchStocks = this.searchStocks.bind(this);
    this.state={

    }
    }

    searchStocks(e) {
        let results = this.results.current;
        results.innerHTML = "";
        let b = 0;
        let filter = this.searchBarEl.current.value.toUpperCase();
        if (e.key === "Enter") {
          window.location = `/stocks/${filter}`;
        }
        if (filter.length === 0) {
          results.innerHTML = "";
          results.style.display = "none";
        } else {
          for (let i = 0; i < allSymbols.length; i++) {
            let splitSymbol = allSymbols[parseInt(i)].symbol.split("");
            let splitFilter = filter.split("");
            for (let a = 0; a < splitFilter.length; a++) {
              if (
                allSymbols[parseInt(i)].symbol.indexOf(filter) > -1 &&
                splitSymbol[parseInt(a)] === splitFilter[parseInt(a)]
              ) {
                if (a === 0) {
                  results.style.display = "flex";
                  let el = document.createElement("li");
                  el.innerHTML = `<li><a href="/stocks/${
                    allSymbols[parseInt(i)].symbol
                  }"><h4>${allSymbols[parseInt(i)].symbol}</h4><h6>${
                    allSymbols[parseInt(i)].name
                  }</h6></a></li>`;
                  results.appendChild(el);
                  b++;
                }
              }
            }
            if (b === 10) {
              break;
            }
          }
        }
      }

      componentWillUnmount() {
        this._isMounted = false;
      }

      componentDidMount() {
        this._isMounted = true;
        
        fetch(
          `https://cloud.iexapis.com/stable/ref-data/symbols?token=${process.env.REACT_APP_API_KEY_2}`,
        )
          .then(res => res.json())
          .then(result => {
            allSymbols = result.map(val => {
              return val;
            });
            console.log(result)
          });
    }

   
    render() {
        return (
            <div className='searchBar'>
                <input className='searchBar'
                  type="text"
                  id="searchBar"
                  ref={this.searchBarEl}
                  onKeyUp={this.searchStocks}
                  placeholder="Search by symbol"
                />
                 <ul className="searchBar__results" id="results" ref={this.results} />
            </div>
        )
    }
}
