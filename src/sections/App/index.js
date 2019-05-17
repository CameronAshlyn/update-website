import React, { Component } from 'react'
import { matchPath } from 'react-router-dom'
import Preloader from '../../components/Preloader'
import Navigation from '../../components/Navigation'
import Overlay from '../../components/Overlay'
import TransitionGroup from '../../components/TransitionGroup'

class App extends Component {
  state = {
    ready: false,
    themeColor: '#f9f9f9',
    navColor: '#2b2b2b',
    firstView: true,
    currentProject: null,
    data: {},
  }

  static defaultProps = {
    windowWidth: 970,
    windowHeight: 560,
  }

  componentDidUpdate(prevProps, prevState) {
    const { pathname } = this.props.location
    const { data } = this.state

    if (prevProps.location.pathname !== pathname || prevState.data !== data) {
      this.setThemeColor(pathname)
    }
  }

  matchPath = path => matchPath(this.props.location.pathname, path)

  onReady = data => this.setState({ data, ready: true })

  setThemeColor = pathname => {
    this.setState(state => ({
      themeColor: this.getKey(pathname)
        .map(key => state.data[key])
        .map(obj =>
          obj.hasOwnProperty('theme_color')
            ? obj.theme_color
            : obj.hasOwnProperty('case_study')
            ? obj.case_study.theme_color
            : '#0010CB',
        )[0],
    }))
  }

  onFirstView = () => this.setState({ firstView: false })

  setNavColor = navColor => this.setState({ navColor })

  setCurrentProject = currentProject => this.setState({ currentProject })

  getKey = pathname => {
    return [pathname]
      .map(p => p.split('/'))
      .map(arr => arr[arr.length - 1] || 'home')
  }

  renderPreloader = () => {
    return (
      <Preloader
        key="preloader"
        setReady={this.onReady}
        minDisplayTime={500}
        {...this.props}
      />
    )
  }

  renderRoute = () => {
    const key = this.getKey(this.props.location.pathname)[0]

    return this.props.routes
      .filter(({ path }) => this.matchPath(path))
      .map(({ Component, path }) => (
        <Component
          key={key}
          {...this.props}
          {...this.state.data[key]}
          setNavColor={this.setNavColor}
          navColor={this.state.navColor}
          setCurrentProject={this.setCurrentProject}
          firstView={this.state.firstView}
          onFirstView={this.onFirstView}
          overlay={this.overlay}
        />
      ))
  }

  render() {
    const {
      ready,
      themeColor,
      navColor,
      firstView,
      currentProject,
    } = this.state
    const { windowHeight, windowWidth, pageX, pageY } = this.props
    const renderContent = this[ready ? 'renderRoute' : 'renderPreloader']

    const transitionGroupProps = {
      id: 'content',
      component: 'div',
      'aria-live': 'polite',
      transitionMode: 'simultaneous',
    }

    return (
      <div
        id="app"
        className="border-padding"
        style={{ backgroundColor: themeColor }}
      >
        <Navigation
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          pageX={pageX}
          pageY={pageY}
          navColor={navColor}
          themeColor={themeColor}
        />
        <Overlay
          ref={e => (this.overlay = e)}
          themeColor={themeColor}
          currentProject={currentProject}
          firstView={firstView}
        />
        <TransitionGroup {...transitionGroupProps}>
          {renderContent()}
        </TransitionGroup>
        {ready && (
          <div className="mobile-gate fixed absolute--fill ph4 pv6 bg-white mobile z-3">
            <div
              className="mobile-gate__bio mw7 mb5"
              dangerouslySetInnerHTML={{
                __html: this.state.data.about.content,
              }}
            />
            <div className="mobile-gate__contact mb5">
              <a
                className="mobile-gate__link mr3"
                target="_self"
                href="mailto:cameronashlyn@gmail.com"
              >
                Email
              </a>
              <a
                className="mobile-gate__link mr3"
                target="_blank"
                rel="noopener noreferrer"
                href="https://instagram.com/cameron.ashlyn"
              >
                Instagram
              </a>

              {/* <a
                className="mobile-gate__link"
                target="_blank"
                rel="noopener noreferrer"
                href="#"
              >
                Resume
              </a> */}
            </div>
            <div className="mobile-gate__msg bg-white">
              <span role="img" aria-label="Dark moon emoji">
                🌚
              </span>{' '}
              full mobile site coming soon{' '}
              <span role="img" aria-label="Light moon emoji">
                🌝
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
