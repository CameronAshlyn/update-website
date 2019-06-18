import React, { Fragment } from "react";
import BaseComponent from "../../components/BaseComponent";
import Page from "../../components/Page";
import Template from "../../components/Template";
import Block from "../../components/Block";
import animate from "@jam3/gsap-promise";
import { Expo } from "gsap";
import SmoothScroll from "../../components/SmoothScroll";

class Single extends BaseComponent {
  blocks = [];
  nextProjectRequested = false;

  animateIn() {
    const {
      title,
      overlay,
      setCurrentProject,
      onFirstView,
      firstView
    } = this.props;
    return animate
      .set(this.page.el, { autoAlpha: 1 })
      .then(() => setCurrentProject(title))
      .then(overlay.animateIn)
      .then(this.template.show)
      .then(this.loadAssets)
      .then(overlay.animateOut)
      .then(this.template.init)
      .then(() => firstView && onFirstView())
      .then(() => {
        typeof this.blocks[0].play === "function" && this.blocks[0].play();
      });
  }

  animateOut() {
    if (this.nextProjectRequested) {
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

  renderBlockLayout(block, blockIndex, currentIndex) {
    switch (block.acf_fc_layout) {
      case "header":
        return (
          <Block.Header {...block} ref={e => (this.blocks[blockIndex] = e)} />
        );
      case "text":
        return (
          <Block.Text {...block} ref={e => (this.blocks[blockIndex] = e)} />
        );
      case "image":
        return (
          <Block.Image {...block} ref={e => (this.blocks[blockIndex] = e)} />
        );
      case "video":
        return (
          <Block.Video
            {...block}
            ref={e => (this.blocks[blockIndex] = e)}
            paused={blockIndex === currentIndex ? false : true}
          />
        );
      case "split":
        return (
          <Block.Split {...block} ref={e => (this.blocks[blockIndex] = e)} />
        );
      default:
        return null;
    }
  }

  loadAssets = () => {
    const { overlay } = this.props;
    return new Promise((resolve, reject) => {
      const assets = this.blocks.filter(this.blockHasMedia);
      const total = assets.length;
      const last = total - 1;
      let count = 0;
      assets.forEach(asset => {
        asset.load().then(() => {
          const progress = last <= 1 ? 100 : (count / last) * 100;
          overlay
            .animateProgressTo(progress)
            .then(() => count === total && resolve());
          count += 1;
        });
      });
    });
  };

  blockHasMedia = block => typeof block.load === "function";

  requestNextProject = () => {
    this.nextProjectRequested = true;
    this.props.history.push(`/work/${this.props.nextProject.slug}`);
  };

  render() {
    const { blocks } = this.props.case_study;
    const { windowWidth, windowHeight } = this.props
    return (
      <Page id="Single" ref={e => (this.page = e)}>
        <div className="container" ref={e => (this.container = e)}>

          <SmoothScroll windowWidth={windowWidth} windowHeight={windowHeight}>
            {scroll => (
              <div
                style={{
                  transform: `translate3d(0, ${scroll.current}px, 0)`,
                }}
              >

                <Template
                  ref={e => (this.template = e)}
                  {...this.props}
                  finalIndex={blocks.length - 1}
                  requestNextProject={this.requestNextProject}
                  nextProjectRequested={this.nextProjectRequested}

                >



                  {({ currentIndex }) =>
                    blocks.map((block, i) => (


                      <div
                        className="block"
                        key={i}
                        {...block}



                      >
                        {this.renderBlockLayout(block, i, currentIndex)}
                      </div>

                    ))
                  }
                </Template>
              </div>

            )}

          </SmoothScroll>
        </div>
      </Page>
    );
  }
}

export default Single;


