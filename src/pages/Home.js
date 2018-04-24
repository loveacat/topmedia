import React, { Component } from "react";
import { get } from "../utils/rpc";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "init"
    };
  }
  componentDidMount = () => {
    let result = get("", { results: 10 });
    if (result) {
      console.log("result", result);
    }
  };

  render() {
    return <div>Home Page{this.state.username}</div>;
  }
}
