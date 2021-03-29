import React from 'react';
import * as hospi from '../data/data.json';
import { Doughnut} from 'react-chartjs-2';
function BarChart(props) {
    // const t = hospi.hospitals.map((l)=>())
    // const t = hospi.hospitals.map(hos=>hos.properties.total_beds).reduce((a,curr)=>Number(a+curr),0);
    var total_sum=0;
    hospi.hospitals.map(hos=>hos.properties.total_beds).forEach(cap=>{
        total_sum+=parseFloat(cap);
    });
    // console.log("total:", total_sum)

    var occupied_sum=0;
    hospi.hospitals.map(hos=>hos.properties.occupied_beds).forEach(cap=>{
        occupied_sum+=parseFloat(cap);
    });
    // console.log("occ: ",occupied_sum)

    var vacant_sum=0;
    hospi.hospitals.map(hos=>hos.properties.vacant_beds).forEach(cap=>{
        vacant_sum+=parseFloat(cap);
    });

    // console.log("vaca: ",vacant_sum)
    const data = {
        labels: [
          'Occupied',
          'Vacant',
          'Total'
        ],
        datasets: [{
          data: [occupied_sum,vacant_sum,total_sum],
          backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ]
        }]
      };
    return (
        <div>
        <h2 className="pie">Visualization of Beds in City</h2>
        <Doughnut data={data} />
        </div>
    );
}

export default BarChart;