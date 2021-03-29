import MapWindow from './component/mapwindow';
import Navbar from './component/navbar';

import 'mdbreact/dist/css/mdb.css';
import BarChart from './component/BarChart';
import { BrowserRouter, Route } from 'react-router-dom';
import Admin from './component/admin';


import HospitalWindow from './component/HospitalWindow';

function App() {
  return (
    <BrowserRouter>
      <div>
      <header>
      <Navbar></Navbar>
      </header>
      <main>
        <Route path="/pie" component={BarChart} ></Route>
        <Route path="/admin" component={Admin} ></Route>
        <Route path="/" component={MapWindow} exact></Route>  
        <Route path="/hospital/:id" component={HospitalWindow}></Route>
      </main>
        
       
      </div>
    </BrowserRouter>
  );
}

export default App;
