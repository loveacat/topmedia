import { Map, MouseTool } from 'react-amap';
import styles from '../component/StyleSheet.css'
import React, { Component } from "react";
import './PageStyle.css'
class FleetArea extends Component {
    constructor(props) {
      super(props);
      const self =this;
      this.state = {
        position:{ lng: 116.402544, lat: 39.928216 },
        what:"点击add按钮开始绘制",
        numbers: 0,
      };
      this.mapEvents ={
        created: (mapinst) => {
            console.log(mapinst)
            self.mapinst = mapinst;
          },
      }
      this.toolEvents = {
        created: (tool) => {
          console.log(tool)
          self.tool = tool;
        },
        draw({obj}) {
            if (self.tool){
              self.tool.close();
            }
            self.setState({
              what: '关闭了绘图工具'
            });
            console.log("new obj",self.mapinst.getAllOverlays())
            self.setState({numbers:self.mapinst.getAllOverlays().length})
            // self.mapinst.plugin(["AMap.PolyEditor"],function(){
            //     let polylineEditor = new self.mapinst.PolyEditor(self.mapinst,obj); 
            //     polylineEditor.open(); 
            // });    
        }
      }
    }
    drawPolygon() {
        if (this.tool) {
          this.tool.polygon();
          this.setState({
            what: '准备绘制，双击鼠标结束'
          });
        }
      }
      close(){
        if (this.tool){
          this.tool.close();
        }
        this.setState({
          what: '关闭了鼠标工具'
        });
      }
    clear =()=>{
      if(this.mapinst){
        this.mapinst.clearMap();
      }
      this.setState({numbers:0})
    }
    render() {
      return (
          <div className="App"> 
            <Map
              center={this.state.position}
              zoom="13"
              amapkey="74532947bf4c342a9f6e1546fe02325f"
              events ={this.mapEvents}
            >
               <MouseTool events={this.toolEvents}/>
               <div className="layerStyle">{this.state.what}</div>
               <button className="button1Style" onClick={()=>{this.drawPolygon()}}><p className="buttontext">Add Area</p></button>
               <button className="button2Style"><p className="buttontext">Areas : {this.state.numbers}</p></button>
               <button className="button3Style" onClick={this.clear}><p className="buttontext">remove all Areas</p></button>
            </Map>

          </div>
      );
    }
  }
  
  export default FleetArea;
  