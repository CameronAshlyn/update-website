import React from 'react'
import BaseComponent from '../../components/BaseComponent'
import animate from '@jam3/gsap-promise'
//import { Expo } from 'gsap'
import { TweenMax } from 'gsap/all'
import timeout from '../../util/timeout'
import fetchContent from '../../util/fetchContent'

class Preloader extends BaseComponent {
  lines = []

  static defaultProps = {
    minDisplayTime: 0,
  }

  animateIn() {
    return Promise.all([
      animate.fromTo(
        this.preloader,
        1,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          ease: TweenMax.Expo.easeOut,
        },
      ),
      animate.staggerFromTo(
        this.lines,
        1,
        {
          autoAlpha: 0,
          y: 40,
        },
        {
          autoAlpha: 1,
          y: 0,
          delay: 0.6,
          ease: TweenMax.Quint.easeOut,
        },
        0.12,
      ),
    ])
      .then(() =>
        Promise.all([fetchContent(), timeout(this.props.minDisplayTime)]),
      )
      .then(res => this.props.setReady(res[0]))
  }

  animateOut() {
    return Promise.all([
      animate.to(this.preloader, 1, {
        autoAlpha: 0,
        ease: TweenMax.Expo.easeOut,
      }),
    ])
  }

  handleMouseMove = ({ clientX, clientY }) => {
    this.setState({ clientX, clientY })
  }

  render() {
    // const { clientX, clientY } = this.state
    return (
      <div
        id="preloader"
        className="fixed absolute--fill w-100 h-100 overflow-hidden z-5"
        ref={e => (this.preloader = e)}
        style={{
          backgroundColor: '#9BCDFD',
        }}
      >
        <div className="relative w-100 h-100 tagline f5  ma0 white">
          <h1 className="tagline__cta ttu">Causing good trouble.</h1>
          <p ref={e => (this.lines[0] = e)}>Cameron Taylor</p>
          <p ref={e => (this.lines[1] = e)}>Designer & Creator</p>
        </div>
      </div>
    )
  }
}

export default Preloader
