import React from 'react'
import BaseComponent from '../../components/BaseComponent'
import Page from '../../components/Page'
import Slider from '../../components/Slider'
import Slide from '../../components/Slide'
import animate from '@jam3/gsap-promise'
import { Expo } from 'gsap'

class Single extends BaseComponent {
  slides = []
  nextProjectRequested = false

  animateIn() {
    const {
      title,
      overlay,
      setCurrentProject,
      onFirstView,
      firstView,
    } = this.props
    return animate
      .set(this.page.el, { autoAlpha: 1 })
      .then(() => setCurrentProject(title))
      .then(overlay.animateIn)
      .then(this.slider.show)
      .then(this.loadAssets)
      .then(overlay.animateOut)
      .then(this.slider.init)
      .then(() => firstView && onFirstView())
      .then(() => {
        typeof this.slides[0].play === 'function' && this.slides[0].play()
      })
  }

  animateOut() {
    if (this.nextProjectRequested) {
      return animate.set(this.page.el, {
        autoAlpha: 0,
        delay: 1,
      })
    } else {
      return animate.to(this.page.el, 1, {
        autoAlpha: 0,
        ease: Expo.easeOut,
      })
    }
  }

  renderSlideLayout(slide, slideIndex, currentIndex) {
    switch (slide.acf_fc_layout) {
      case 'text':
        return (
          <Slide.Text {...slide} ref={e => (this.slides[slideIndex] = e)} />
        )
      case 'image':
        return (
          <Slide.Image {...slide} ref={e => (this.slides[slideIndex] = e)} />
        )
      case 'video':
        return (
          <Slide.Video
            {...slide}
            ref={e => (this.slides[slideIndex] = e)}
            paused={slideIndex === currentIndex ? false : true}
          />
        )
      case 'split':
        return (
          <Slide.Split {...slide} ref={e => (this.slides[slideIndex] = e)} />
        )
      default:
        return null
    }
  }

  loadAssets = () => {
    const { overlay } = this.props
    return new Promise((resolve, reject) => {
      const assets = this.slides.filter(this.slideHasMedia)
      const total = assets.length
      const last = total - 1
      let count = 0
      assets.forEach(asset => {
        asset.load().then(() => {
          const progress = last <= 1 ? 100 : (count / last) * 100
          overlay
            .animateProgressTo(progress)
            .then(() => count === total && resolve())
          count += 1
        })
      })
    })
  }

  slideHasMedia = slide => typeof slide.load === 'function'

  requestNextProject = () => {
    this.nextProjectRequested = true
    this.props.history.push(`/work/${this.props.nextProject.slug}`)
  }

  render() {
    const { slides } = this.props.case_study
    return (
      <Page id="Single" ref={e => (this.page = e)}>
        <Slider
          ref={e => (this.slider = e)}
          {...this.props}
          finalIndex={slides.length - 1}
          requestNextProject={this.requestNextProject}
          nextProjectRequested={this.nextProjectRequested}
        >
          {({ currentIndex }) =>
            slides.map((slide, i) => (
              <article
                className="slide"
                key={i}
                style={{
                  transform: `translate3d(0, ${
                    i === currentIndex ? 0 : i < currentIndex ? -100 : 100
                  }%, 0)`,
                }}
              >
                {this.renderSlideLayout(slide, i, currentIndex)}
              </article>
            ))
          }
        </Slider>
      </Page>
    )
  }
}

export default Single
