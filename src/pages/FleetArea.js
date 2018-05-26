import { Map, MouseTool } from "react-amap";
import React, { Component } from "react";
import "./PageStyle.css";


class FleetArea extends Component {
  constructor(props) {
    super(props);
    const self = this;
    this.editor = [];
    this.state = {
      position: { lng: 116.402544, lat: 39.928216 },
      what: "点击add按钮开始绘制",
      numbers: 0,
      isdrawing: false,
      isedit: false
    };
    this.mapEvents = {
      created: mapinst => {
        console.log(mapinst);
        self.mapinst = mapinst;
      }
    };
    this.toolEvents = {
      created: tool => {
        console.log(tool);
        self.tool = tool;
      },
      draw({ obj }) {
        if (self.tool) {
          self.tool.close();
        }
        self.setState({
          what: "关闭了绘图工具",
          isdrawing: false
        });
        //console.log("new obj", self.mapinst.getAllOverlays());
        self.setState({ numbers: self.mapinst.getAllOverlays().length });
        // self.mapinst.plugin(["AMap.PolyEditor"],function(){
        //     let polylineEditor = new self.mapinst.PolyEditor(self.mapinst,obj);
        //     polylineEditor.open();
        // });
      }
    };
  }
  drawPolygon() {
    if (this.state.isedit) {
      alert("正在编辑，请编辑完成后再添加新的区域");
    } else {
      if (this.tool) {
        this.tool.polygon();
        this.setState({
          what: "准备绘制，双击鼠标结束",
          isdrawing: true
        });
      }
    }
  }
  // close() {
  //   if (this.tool) {
  //     this.tool.close();
  //   }
  //   this.setState({
  //     what: "关闭了鼠标工具"
  //   });
  // }
  clear = () => {
    if (this.mapinst) {
      this.mapinst.clearMap();
    }
    this.setState({ numbers: 0 });
  };

  edit = () => {
    if (this.state.isdrawing) {
      alert("正在绘制，请绘制完成后再编辑");
    } else if (this.state.isedit) {
      this.editor.map(poly => poly.close());
      this.editor = [];
      this.mapinst
        .getAllOverlays("polygon")
        .map(poly => console.log("path", poly.getPath()));
      this.setState({ isedit: false });
    } else {
      this.setState({ isedit: true });
      this.mapinst.getAllOverlays("polygon").map(item => {
        this.mapinst.plugin(["AMap.PolyEditor"], () => {
          let polylineEditor = new window.AMap.PolyEditor(
            this.mapinst,
            item //获取第一个多边形
          );
          this.editor.push(polylineEditor);
        });
      });
      this.editor.map(poly => poly.open());
    }
  };

  closeeditor = () => {
    this.editor.map(poly => poly.close());

    this.mapinst
      .getAllOverlays("polygon")
      .map(poly => console.log("path", poly.getPath()));
    this.setState({ isedit: false });
  };
  show = () => {
    let path = this.mapinst
      .getAllOverlays("polygon")
      .map(poly => poly.getPath());
    alert("path", path);
  };
  render() {
    return (
      <div className="App">
        <Map
          center={this.state.position}
          zoom="13"
          amapkey="74532947bf4c342a9f6e1546fe02325f"
          events={this.mapEvents}
        >
          <MouseTool events={this.toolEvents} />
          <div className="layerStyle">{this.state.what}</div>
          <button
            className="button1Style"
            onClick={() => {
              this.drawPolygon();
            }}
          >
            <p className="buttontext">Add Area</p>
          </button>
          <button className="button2Style">
            <p className="buttontext">Areas : {this.state.numbers}</p>
          </button>
          <button className="button3Style" onClick={this.clear}>
            <p className="buttontext">remove all Areas</p>
          </button>
          <button className="button4Style" onClick={this.edit}>
            <p className="buttontext">
              {this.state.isedit ? "close edit" : "edit"}
            </p>
          </button>
        </Map>
      </div>
    );
  }
}

export default FleetArea;
