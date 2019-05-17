import { Component } from "react";

class MouseProvider extends Component {
  state = {
    pageX: 0,
    pageY: 0
  };

  componentDidMount() {
    document.addEventListener("mousemove", this.onMove);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.onMove);
  }

  onMove = ({ pageX, pageY }) => {
    this.setState({ pageX, pageY });
  };

  render() {
    return this.props.render(this.state);
  }
}

export default MouseProvider;
