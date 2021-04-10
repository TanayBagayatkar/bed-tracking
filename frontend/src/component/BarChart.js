import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ParetoChart from "./ParetoChart";
import { Button } from "react-bootstrap";

function BarChart(props) {
  const [viewPareto, setviewPareto] = useState(true);
  const data = {
    labels: ["Occupied", "Vacant", "Others"],
    datasets: [
      {
        
        data: [ 954,1252, 298],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <div className="visual">
      <Button
        style={{ position: "absolute", right: "10px" }}
        variant="dark"
        size="lg"
        onClick={() => setviewPareto(true)}
      >
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
