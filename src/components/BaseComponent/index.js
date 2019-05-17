import { Component } from "react";

class BaseComponent extends Component {
  state = {};

  __isAnimatingIn = false;
  __isAnimatingOut = false;

  isAnimating() {
    return this.__isAnimatingIn || this.__isAnimatingOut;
  }

  isAnimatingOut() {
    return this.__isAnimatingOut;
  }

  isAnimatingIn() {
    return this.__isAnimatingIn;
  }

  componentWillAppear(done) {
    this.__handleAnimateIn(done);
  }

  componentWillEnter(done) {
    this.__handleAnimateIn(done);
  }

  __handleAnimateIn(done) {
    done();
    if (typeof this.animateIn === "function") {
      this.__isAnimatingIn = true;
      const p = this.animateIn();
      if (p && typeof p.then === "function") {
        document.documentElement.style.cursor = "wait";
        document.documentElement.style.pointerEvents = "none";
        p.then(() => {
          document.documentElement.style.cursor = "auto";
          document.documentElement.style.pointerEvents = "auto";
          this.__isAnimatingIn = false;
        });
      } else {
        this.__isAnimatingIn = false;
      }
    }
  }

  componentWillLeave(done) {
    const next = () => {
      this.__isAnimatingOut = false;
      if (done) done();
    };
    if (typeof this.animateOut === "function") {
      this.__isAnimatingOut = true;
      const promise = this.animateOut();
      if (promise && typeof promise.then === "function") {
        promise.then(next);
      } else {
        next();
      }
    } else {
      next();
    }
  }
}

export default BaseComponent;
