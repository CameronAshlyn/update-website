import React, { Fragment } from "react";
import BaseComponent from "../../components/BaseComponent";
import Page from "../../components/Page";
import SmoothScroll from "../../components/SmoothScroll";
import ProjectTile from "../../components/ProjectTile";

import animate from "@jam3/gsap-promise";
import { Expo } from "gsap";
import cameron from "../../assets/images/cameron.jpg";
import SocialMenu from "../../components/SocialMenu/";


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
          <section className="profile-area fix top left z10 fl w-third pa2">
            <aside className="profile  " >

              <div className="profile profile--thumbnail">
                <img className="cameron" src={cameron} alt="cameron" />

              </div>
              <div className=" profile profile--headline">
                <h1>Cameron Taylor</h1>
                <p>Exploring design as a tool to enhance our humanity</p>
                <SocialMenu />

              </div>

            </aside>
          </section>

          <section className="project-area fl w-two-thirds pa2">
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

          </section>




        </div>
      </Page>
    );
  }
}

export default Home;
