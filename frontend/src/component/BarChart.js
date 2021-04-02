import React, { useState } from "react";
import * as hospi from "../data/data.json";
import { Doughnut } from "react-chartjs-2";
import ParetoChart from "./ParetoChart";
import { Button } from "react-bootstrap";

function BarChart(props) {
  // const t = hospi.hospitals.map((l)=>())
  // const t = hospi.hospitals.map(hos=>hos.properties.total_beds).reduce((a,curr)=>Number(a+curr),0);
  var total_sum = 0;
  hospi.hospitals
    .map((hos) => hos.properties.total_beds)
    .forEach((cap) => {
      total_sum += parseFloat(cap);
    });
  // console.log("total:", total_sum)

  var occupied_sum = 0;
  hospi.hospitals
    .map((hos) => hos.properties.occupied_beds)
    .forEach((cap) => {
      occupied_sum += parseFloat(cap);
    });
  // console.log("occ: ",occupied_sum)

  var vacant_sum = 0;
  hospi.hospitals
    .map((hos) => hos.properties.vacant_beds)
    .forEach((cap) => {
      vacant_sum += parseFloat(cap);
    });

  // console.log("vaca: ",vacant_sum)

  const [viewPareto, setviewPareto] = useState(true);
  const data = {
    labels: ["Occupied", "Vacant", "Others"],
    datasets: [
      {
        // data: [occupied_sum,vacant_sum,occupied_sum+50],
        data: [250, 452, 43],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <div className="visual">
      <Button style={{position:"absolute", right:"10px",}} variant="dark" size="lg" onClick={() => setviewPareto(true)}>
        Pie Chart
      </Button>{" "}
      <Button
        variant="secondary"
        size="lg"
        onClick={() => setviewPareto(false)}
      >
        Pareto Chart
      </Button>
      {viewPareto ? (
        <div className="pie-parent">
          <Doughnut height={100} data={data} />
        </div>
      ) : (
        <div className="pareto-parent">
          <ParetoChart />
        </div>
      )}
    </div>
  );
}

export default BarChart;
