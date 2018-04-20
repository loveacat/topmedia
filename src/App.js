import React, { Component } from "react";
import car from "./car.png";
import "./App.css";
import styles from './component/StyleSheet.css'
import Navbar from "./component/Navbar";
import { Map,Marker,InfoWindow,Markers } from 'react-amap';
import MyMarker from './component/MyMarker'
import MyInfoWindow from './component/MyInfoWindow'
import FleetMap from './pages/FleetMap'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import FleetArea from './pages/FleetArea'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <div >
        <Navbar color="dark" dark />
        <Route path="/fleetmap" component={FleetMap} />
        <Route path="/fleetarea" component={FleetArea} />
      </div>
    );
  }
}

export default App;
