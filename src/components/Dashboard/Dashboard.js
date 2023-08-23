import React, { Component } from "react";
// import News from '../../SymbolPage/News';
import Charts from "../Charts/Charts";
import MostActiveCard from "../Elements/MostActiveCard";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <div>
          <h3>Gainers</h3>
          <Charts />
          <div>
            <h3>Most Active</h3>

            <MostActiveCard />
            {/* <News /> */}
          </div>
        </div>
      </div>
    );
  }
}
