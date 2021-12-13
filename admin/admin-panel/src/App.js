import React,{useEffect,useState} from 'react';
import Dashboard from './components/dashboard'
import Navbar from './components/navbar'
import Customer from './components/customer'
import Vendor from './components/vendors'
import Rider from './components/rider'
import Shop from './components/shop'
import Complaint from './components/complaints'
import Order from './components/order'
import Rating from './components/rating'
import Charts from './components/charts/charts';
import { Switch, Route } from "react-router-dom";
  
function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route  path='/customers' component={Customer}/>
        <Route  path='/vendors' component={Vendor}/>
        <Route  path='/riders' component={Rider}/>
        <Route  path='/shops' component={Shop}/>
        <Route  path='/orders' component={Order}/>
        <Route  path='/ratings' component={Rating}/>
        <Route  path='/charts' component={Charts}/>
      </Switch>
    </div>
  );
}

export default App;
