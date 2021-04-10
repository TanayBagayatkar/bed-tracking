import React from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

const dataSource = {
  chart: {
    caption: "Types of Beds",
    pyaxisname: "No. of Beds",
    theme: "fusion",
    showsecondarylimits: "0",
    showdivlinesecondaryvalue: "0",
    plottooltext:
      "For $label, count is : <b>$dataValue</b> of the total <b>$sum</b> beds",
    drawcrossline: "1"
  },
  data: [
    {
      label: "Dialysis",
      value: "64"
    },
    {
      label: "ICU",
      value: "452"
    },
    {
      label: "Covid-19",
      value: "504"
    },
    {
      label: "Ventilators",
      value: "346"
    },
    {
      label: "Non-Covid",
      value: "788"
    },
    {
      label: "Others",
      value: "344"
    }
  ]
};

class ParetoChart extends React.Component {
  render() {
    return (
      <ReactFusioncharts
        type="pareto2d"
        width="100%"
        height="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }
}

export default ParetoChart;