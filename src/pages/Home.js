import React, { Component } from "react";
import { get } from "../utils/rpc";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "init"
    };
  }
  componentDidMount = async () => {
    let result = await get("", {});
    if (result) {
      console.log("result", result);
    }
    this.setState({ username: result[0].phone });
  };

  render() {
    return <div>Home Page{this.state.username}</div>;
  }
}
