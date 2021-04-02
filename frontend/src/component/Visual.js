// import { Button } from 'bootstrap';
import React, { useState } from 'react';
import { BarChart } from 'react-bootstrap-icons';
import ParetoChart from './ParetoChart';

import { Button } from 'react-bootstrap';

function Visual(props) {
    const [viewPareto,setviewPareto]= useState(false);
 

    return (

        <div style={{maxHeight:"300vh"}}>
            <Button variant="secondary" onClick={()=>setviewPareto(false)}>View PieChart</Button>
            <Button variant="secondary" onClick={()=>setviewPareto(true)}>View ParetoChart</Button>
            {viewPareto? <ParetoChart/>:<BarChart/>}
        </div>
    );
}

export default Visual;