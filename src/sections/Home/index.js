import React, { Fragment } from "react";
import BaseComponent from "../../components/BaseComponent";
import Page from "../../components/Page";
import SmoothScroll from "../../components/SmoothScroll";
import ProjectTile from "../../components/ProjectTile";

import animate from "@jam3/gsap-promise";
import { Expo } from "gsap";

class Home extends BaseComponent {
  tiles = [];

  animateIn() {
    this.props.setNavColor("#2B2B2B");
    return Promise.all([
      animate.set(this.page.el, { autoAlpha: 1 }),
      animate.staggerFromTo(
        this.tiles.map(tile => tile.el),
        1.25,
        {
          autoAlpha: 0,
          skewY: 6,
          y: 120
        },
        {
          autoAlpha: 1,
          skewY: 0,
          y: 0,
          ease: Expo.easeInOut
        },
        0.075
      )
    ]).then(() => {
      this.tiles.forEach(tile => tile.loadImage());
    });
  }

  animateOut() {
    const isSingle = window.location.pathname.slice(1, 5) === "work";
    if (isSingle) {
      return animate.set(this.page.el, {
        autoAlpha: 0,
        delay: 1
      });
    } else {
      return animate.to(this.page.el, 1, {
        autoAlpha: 0,
        ease: Expo.easeOut
      });
    }
  }

  getEase = i => {
    const easeMap = [0.11, 0.1, 0.11, 0.1, 0.11, 0.1, 0.1];
    return easeMap[i % easeMap.length];
  };

  scrollUp = () => this.smooth.scrollUp();

  render() {
    const { projects, windowWidth, windowHeight } = this.props;
    return (
      <Page id="Home" ref={e => (this.page = e)}>
        <div className="container" ref={e => (this.container = e)}>
          <SmoothScroll
            ref={e => (this.smooth = e)}
            windowWidth={windowWidth}
            windowHeight={windowHeight}
          >
            {scroll => (
              <Fragment>
                <div
                  className="scroll-area"
                  style={{
                    transform: `translateY(${scroll.current}px) translateZ(0)`
                  }}
                >
                  <ul className="project-tiles">
                    {projects.map((project, i) => (
                      <ProjectTile
                        ref={e => (this.tiles[i] = e)}
                        key={project.slug}
                        project={project}
                        ease={this.getEase(i)}
                        {...scroll}
                      />
                    ))}
                  </ul>
                </div>
              </Fragment>
            )}
          </SmoothScroll>
        </div>
      </Page>
    );
  }
}

export default Home;
