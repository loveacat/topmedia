import React, { Component } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import FleetMap from "./pages/FleetMap";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import FleetArea from "./pages/FleetArea";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark />
        <Route path="/" component={Home} />
        <Route path="/fleetmap" component={FleetMap} />
        <Route path="/fleetarea" component={FleetArea} />
      </div>
    );
  }
}

export default App;
