import React, { Component } from "react";
//import vs from "virtual-scroll";
import timeout from "../../util/timeout";
import animate from "@jam3/gsap-promise";

class Slider extends Component {
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
    const { slides } = this.props.case_study;
    const { currentIndex } = this.state;

    this.props.setNavColor(
      slides[currentIndex].colors.navigation.toUpperCase()
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
      <section className="slider" ref={e => (this.el = e)}>
        {this.props.children(this.state)}
      </section>
    );
  }
}

export default Slider;
