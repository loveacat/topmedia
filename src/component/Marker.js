import React, { Component } from "react";
import { Map, Marker } from "react-bmap";
import car from "../car.png";

class MyMarker extends Component {
  constructor(props) {
    super(props);
    console.log(props, "props");
    this.state = {
      isClick: false
    };
  }
  onPress = () => {
    this.setState({ isClick: !this.state.isClick });
  };

  render() {
    return (
      <Marker position={{ lng: 116.402544, lat: 39.928216 }} {...this.props}>
        <img
          {...this.props}
          onClick={this.onPress}
          src={car}
          style={{
            width: "10px",
            height: "10px",
            background: "transparent",
            textAlign: "center"
          }}
        />
      </Marker>
    );
  }
}

export default MyMarker;
