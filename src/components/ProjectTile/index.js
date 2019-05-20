import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TweenMax } from "gsap/all";
import lerp from "../../util/lerp";

class ProjectTile extends Component {
  state = {
    loaded: false,
    active: false,
    current: 0
  };

  componentDidMount() {
    TweenMax.ticker.addEventListener("tick", this.update);
  }

  componentWillUnmount() {
    TweenMax.ticker.removeEventListener("tick", this.update);
  }

  loadImage() {
    const img = document.createElement("img");
    const src = this.props.project.tile.thumbnail.url;

    img.onload = () => {
      img.onload = null;
      this.setState({ loaded: true });
    };

    img.src = src;
  }

  update = () => {
    let { current } = { ...this.state };
    const { target, ease } = this.props;

    this.setState({
      current: lerp(current, target, ease)
    });
  };

  setActive = () => this.setState({ active: true });

  render() {
    const { project } = this.props;
    const { loaded, current, active } = this.state;
    const transform = `translate3d(0, ${-(this.props.current - current)}px, 0)`;
    return (
      <li
        ref={e => (this.el = e)}
        className={`project-tile${active ? " active" : ""}`}
        style={{
          transform
        }}
        onClick={this.setActive}
      >
        <Link className="project-tile__content" to={`/work/${project.slug}`}>
          <div className="project-tile__media">
            <div
              className="project-tile__img"
              style={{
                backgroundImage: `url(${project.tile.thumbnail.url})`
              }}
            />
            <div
              className="project-tile__color"
              style={{
                opacity: loaded ? 0 : 1,
                backgroundColor: project.tile.color
              }}
            />
          </div>
          <h2 className="project-tile__title">{project.title}</h2>
        </Link>
      </li>
    );
  }
}

export default ProjectTile;
