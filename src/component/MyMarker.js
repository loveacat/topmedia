import React, { Component } from "react";
import styles from "./StyleSheet.css";
import { Marker } from 'react-amap';
import car from '../car.png'
class MyMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: false
    };
  }

  render() {
    return (
        <Marker position={this.props.position} {...this.props}>
            <img src={car} style={{width:40,height:40}} />
        </Marker>
    );
  }
}

export default MyMarker;
