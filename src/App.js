import React, { Component } from "react";
import car from "./car.png";
import "./App.css";
import { Map, Marker, NavigationControl, InfoWindow } from "react-bmap";
import Navbar from "./Navbar";
class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      isClick: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onPress = () => {
    console.log("pressed");
    this.setState({ isClick: !this.state.isClick });
  };
  render() {
    return (
      <div className="App">
        <Navbar color="dark" dark />
        <Map
          style={{ height: 1000 }}
          center={{ lng: 116.402544, lat: 39.928216 }}
          zoom="13"
        >
          <Marker position={{ lng: 116.402544, lat: 39.928216 }}>
            <img
              onClick={this.onPress}
              src={car}
              style={{
                width: "40px",
                height: "40px",
                background: "transparent",
                textAlign: "center"
              }}
            />
          </Marker>
          <Marker position={{ lng: 116.502544, lat: 39.938216 }}>
            <img
              onClick={this.onPress}
              src={car}
              style={{
                width: "40px",
                height: "40px",
                background: "transparent",
                textAlign: "center"
              }}
            />
          </Marker>
          <Marker position={{ lng: 116.702544, lat: 39.928216 }}>
            <img
              onClick={this.onPress}
              src={car}
              style={{
                width: "40px",
                height: "40px",
                background: "transparent",
                textAlign: "center"
              }}
            />
          </Marker>
        </Map>
      </div>
    );
  }
}

export default App;
