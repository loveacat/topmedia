import React, { Component } from "react";
import car from "./car.png";
import "./App.css";
import styles from './component/StyleSheet.css'
import Navbar from "./Navbar";
import { Map,Marker,InfoWindow,Markers } from 'react-amap';
import MyMarker from './component/MyMarker'
import MyInfoWindow from './component/MyInfoWindow'

const randomPosition = () => ({
  longitude: 116.402544 + Math.random() ,
  latitude: 39.928216  + Math.random()
})
const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: randomPosition()
  }))
);

const renderIcon = () =>{
  return (
    <img src={car} className="Appicon" />
  )
}
class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      isClick: false,
      position:{ lng: 116.402544, lat: 39.928216 },
      markers:randomMarker(100),
    };
    this.markersEvents = {
      click:(e, marker)=>{
        // 通过高德原生提供的 getExtData 方法获取原始数据
        
        const extData = marker.getExtData();
        const index = extData.position;
        this.setState({position:extData.position})
        this.setState({isClick:true})
        console.log('marker pressed',this.state.isClick)
      }
    }
    this.windowEvents = {
      close: () => {this.setState({isClick:false})},   
    }
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
    console.log("markerts",this.state.markers)
    return (
      <div >
        <Navbar color="dark" dark />
        <div className="App"> 
          <Map
            center={this.state.position}
            zoom="13"
            amapkey="74532947bf4c342a9f6e1546fe02325f" 
          >
            <Markers markers={this.state.markers} render={renderIcon} events={this.markersEvents}/>
            <MyInfoWindow position={this.state.position} visible={this.state.isClick} events={this.windowEvents} autoMove/>
          </Map>
        </div>
      </div>
    );
  }
}

export default App;
