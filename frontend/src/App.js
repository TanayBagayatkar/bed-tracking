import MapWindow from './component/mapwindow';
import Navbar from './component/navbar';

// import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarChart from './component/BarChart';
import { BrowserRouter, Route } from 'react-router-dom';
import Admin from './component/adminview/Admin';

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
      </main>
        
       
      </div>
    </BrowserRouter>
  );
}

export default App;
