import React, { Component } from "react";
import { TweenMax } from "gsap/all";
import vs from "virtual-scroll";
import lerp from "../../util/lerp";

class SmoothScroll extends Component {
  state = {
    target: 0,
    current: 0,
    bounds: {}
  };

  componentDidMount() {
    document.addEventListener("touchmove", ev => ev.preventDefault());
    TweenMax.ticker.addEventListener("tick", this.update);

    this.vs = new vs({
      passive: true,
      mouseMultiplier: 0.25,
      firefoxMultiplier: 30
    });

    this.vs.on(this.scroll);

    this.resize();
  }

  componentWillUnmount() {
    this.vs.off(this.scroll);
    this.vs.destroy();
    TweenMax.ticker.removeEventListener("tick", this.update);
  }

  componentDidUpdate(oldProps, oldState) {
    if (
      oldProps.windowWidth !== this.props.windowWidth ||
      oldProps.windowHeight !== this.props.windowHeight
    ) {
      this.resize();
    }
  }

  scroll = ({ deltaY }) => {
    let { target, bounds } = { ...this.state };
    let { windowHeight } = this.props;

    target += deltaY;
    target = Math.max((bounds.height - windowHeight * 0.5) * -1, target);
    target = Math.min(0, target);

    this.setState({ target });
  };

  update = () => {
    const { current, target } = this.state;
    this.setState({
      current: lerp(current, target, 0.1)
    });
  };

  resize() {
    this.setState({ bounds: this.el.getBoundingClientRect() });
  }

  scrollUp = () => {
    this.setState({ target: 0 });
  };

  render() {
    return (
      <div ref={e => (this.el = e)}>{this.props.children(this.state)}</div>
    );
  }
}

export default SmoothScroll;
