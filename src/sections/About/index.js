import React from "react";
import BaseComponent from "../../components/BaseComponent";
import Page from "../../components/Page";
import animate from "@jam3/gsap-promise";
import { TweenMax, Expo } from "gsap/all";
import lerp from "../../util/lerp";

class About extends BaseComponent {
  state = {
    currentX: 0,
    currentY: 0
  };

  componentDidMount() {
    TweenMax.ticker.addEventListener("tick", this.update);
  }

  componentWillUnmount() {
    TweenMax.ticker.removeEventListener("tick", this.update);
  }

  animateIn() {
    this.props.setNavColor("#2B2B2B");
    return animate.fromTo(
      this.page.el,
      1,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1,
        ease: Expo.easeOut,
        delay: 0.5
      }
    );
  }

  animateOut() {
    return animate.to(this.page.el, 1, {
      autoAlpha: 0,
      ease: Expo.easeOut
    });
  }

  update = () => {
    const { currentX, currentY } = { ...this.state };
    const { pageX, pageY, windowWidth, windowHeight } = this.props;

    const targetX = ((pageX - windowWidth / 2) / windowWidth) * 12;
    const targetY = ((pageY - windowHeight / 2) / windowHeight) * 12;

    this.setState({
      currentX: lerp(currentX, targetX, 0.15),
      currentY: lerp(currentY, targetY, 0.15)
    });
  };

  render() {
    const { content } = this.props;
    const { currentX, currentY } = this.state;
    return (
      <Page id="About" ref={e => (this.page = e)}>
        <section className="bio">
          <div
            className="bio__inner"
            style={{
              transform: `rotateX(${-currentY}deg) rotateY(${currentX}deg)`
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      </Page>
    );
  }
}

export default About;
