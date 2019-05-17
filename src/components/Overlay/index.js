import React, { Component } from "react";
import animate from "@jam3/gsap-promise";
import { TweenMax } from "gsap/all";

class Overlay extends Component {
  progress = { value: 0 };

  animateIn = (opt = {}) => {
    this.resetProgress();
    return Promise.all([
      animate.fromTo(
        this.outer,
        1,
        {
          y: "-100%"
        },
        {
          y: "0%",
          ease: TweenMax.Quint.easeInOut
        }
      ),
      animate.fromTo(
        this.inner,
        1,
        {
          y: "100%"
        },
        {
          y: "0%",
          ease: TweenMax.Quint.easeInOut
        }
      )
    ]);
  };

  animateOut = (opt = {}) => {
    return Promise.all([
      animate.to(this.outer, 1, {
        y: "100%",
        ease: TweenMax.Quint.easeInOut
      }),
      animate.to(this.inner, 1, {
        y: "-100%",
        ease: TweenMax.Quint.easeInOut
      })
    ]);
  };

  animateProgressTo = progress => {
    return animate.to(this.progress, 0.5, {
      value: progress,
      ease: TweenMax.Quint.easeInOut,
      onUpdate: () => this.forceUpdate()
    });
  };

  resetProgress = () => {
    this.progress.value = 0;
    this.forceUpdate();
  };

  render() {
    const { themeColor, currentProject, firstView } = this.props;
    return (
      <div className="absolute absolute--fill pen z-1 border-padding">
        <div
          ref={e => (this.outer = e)}
          className="relative w-100 h-100 overflow-hidden"
          style={{
            transform: "translateY(-100%)",
            backgroundColor: themeColor
          }}
        >
          <div
            ref={e => (this.inner = e)}
            className="absolute absolute--fill flex justify-center items-center tc"
            style={{
              transform: "translateY(100%)",
              backgroundColor: themeColor
            }}
          >
            <div className="pa4">
              <h1
                className="nhaas white"
                style={{
                  fontSize: 196,
                  lineHeight: 0
                }}
              >
                {this.progress.value.toFixed()}%
              </h1>
              {[
                currentProject && (
                  <p className="overlay-msg white mb3 ttl" key="loading">
                    loading {currentProject}...
                  </p>
                ),
                firstView && (
                  <p className="overlay-msg white mb3 ttl" key="instruction">
                    use your arrow keys to navigate{" "}
                    <span role="img" aria-label="Up Arrow">
                      ⬆️
                    </span>
                    <span role="img" aria-label="Down Arrow">
                      ️️⬇️
                    </span>
                  </p>
                )
              ]}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overlay;
