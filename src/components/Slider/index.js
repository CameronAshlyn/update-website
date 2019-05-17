import React, { Component } from "react";
import vs from "virtual-scroll";
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

  componentWillUnmount() {
    if (this.vs) {
      this.vs.off(this.onSlide);
      this.vs.destroy();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentIndex } = this.state;

    if (currentIndex !== prevState.currentIndex) {
      this.handleSlideChange();
    }
  }

  show = () => animate.set(this.el, { autoAlpha: 1 });

  init = () => {
    this.vs = new vs({
      limitInertia: true,
      passive: true
    });

    this.vs.on(this.onSlide);
  };

  onSlide = ({ deltaY }) => {
    if (this.animating) return;

    deltaY < 0 && this.increment();
    deltaY > 0 && this.decrement();
  };

  increment = () => {
    if (this.state.currentIndex !== this.props.finalIndex) {
      this.setState(({ currentIndex }) => ({
        currentIndex: currentIndex + 1
      }));
    } else {
      this.props.requestNextProject();
    }
  };

  decrement = () => {
    this.setState(({ currentIndex }) => ({
      currentIndex: currentIndex !== 0 ? currentIndex - 1 : currentIndex
    }));
  };

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
