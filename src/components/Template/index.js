import React, { Component } from "react";
//import vs from "virtual-scroll";
import timeout from "../../util/timeout";
import animate from "@jam3/gsap-promise";

class Template extends Component {
  state = {
    currentIndex: 0
  };

  animating = false;
  nextProjectRequested = false;

  componentDidMount() {
    this.setCurrentSlideNavColor();
  }



  componentDidUpdate(prevProps, prevState) {
    const { currentIndex } = this.state;

    if (currentIndex !== prevState.currentIndex) {
      this.handleSlideChange();
    }
  }

  show = () => animate.set(this.el, { autoAlpha: 1 });



  setCurrentSlideNavColor() {
    const { blocks } = this.props.case_study;
    const { currentIndex } = this.state;

    this.props.setNavColor(
      blocks[currentIndex].colors.navigation.toUpperCase()
    );
  }

  handleSlideChange() {
    this.setCurrentSlideNavColor();

    this.animating = true;

    timeout(400).then(() => {
      this.animating = false;
    });
  }

  render() {
    return (
      <div className="template" ref={e => (this.el = e)}>
        {this.props.children(this.state)}
      </div>
    );
  }
}

export default Template;
