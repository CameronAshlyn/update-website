import { Component } from "react";

class ViewportProvider extends Component {
  state = {
    width: 970,
    height: 560
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  render() {
    return this.props.render(this.state);
  }
}

export default ViewportProvider;
