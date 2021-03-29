import MapWindow from './component/mapwindow';
import Navbar from './component/navbar';

// import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarChart from './component/BarChart';
import { BrowserRouter, Route } from 'react-router-dom';


import HospitalWindow from './component/HospitalWindow';
import Signin from './component/signin';
import AdminView from './component/adminview/AdminView';

function App() {
  return (
    <BrowserRouter>
      <div>
      <header>
      <Navbar></Navbar>
      </header>
      <main>
        <Route path="/pie" component={BarChart} ></Route>
        <Route path="/admin" component={Signin} ></Route>
        <Route path="/" component={MapWindow} exact></Route>  
        <Route path="/adminview" component={AdminView}></Route>
        <Route path="/hospital/:id" component={HospitalWindow}></Route>
      </main>
        
       
      </div>
    </BrowserRouter>
  );
}

export default App;
