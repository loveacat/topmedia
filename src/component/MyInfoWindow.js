import React, { Component } from "react";
import styles from "./StyleSheet.css";
import { InfoWindow } from 'react-amap';

class MyInfoWindow extends Component {
  constructor(props) {
    super(props);
    this.offset = [0, -20]
    this.state = {
      isClick: false
    };
  }

  render() {
    return (
        <InfoWindow position={this.state.position} visible={this.props.visible} offset={this.offset} {...this.props}>
        <h3>TC00203</h3>
        <div className="info">
        <div className="left"><p className="infotext">screens<br/>on</p></div>
        <div className="right"><p className="infotext">1946<br/>show</p></div>
        </div>
        <div className="info">
          <div className="inforow"><p className="infotext">1946<br/>show</p></div>
          <div className="inforow"><p className="infotext">58<br/>miles</p></div>
        </div>
        <div className="info">
          <div className="inforow"><p className="infotext">2 of 2hrs<br/>showing</p></div>
          <div className="inforow"><p className="infotext">99%<br/>showing</p></div>
        </div>
        <div className="info">
          <div className="inforow"><p className="infotext">1946<br/>show</p></div>
          <div className="inforow"><p className="infotext">1946<br/>show</p></div>
        </div>  
      </InfoWindow>
    );
  }
}

export default MyInfoWindow;
