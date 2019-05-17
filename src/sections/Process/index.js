import React, { Component } from "react";
import Page from "../../components/Page";
import { TweenMax } from "gsap/all";

class Process extends Component {
  componentDidMount() {
    TweenMax.ticker.addEventListener("tick", this.update);
  }

  componentWillUnmount() {
    TweenMax.ticker.removeEventListener("tick", this.update);
  }

  render() {
    return (
      <Page>
        <div id="process" role="region" aria-label="process" tabIndex="-1">
          <div className="process--container">
            <p className="explain">
              There are as many design processes as there are designers out
              there, but when you break them down you see that ultimately the
              priority must always be... people. By putting the human experience
              at the beginning of the design process, Cameron discovered that
              three core insights guide her work...
            </p>
          </div>
          <div className="process--grid">
            <div className="item item--1">Human values are non-negotiable.</div>
            <div className="item item--2">Fail early to succeed sooner.</div>
            <div className="item item--3">Quality is key.</div>
          </div>
        </div>
        <div className="item item--4">
          <p>
            take a look at some of her{" "}
            <span>
              <a className="outline" href="/work">
                work
              </a>
            </span>
            .
          </p>
        </div>
      </Page>
    );
  }
}
export default Process;
