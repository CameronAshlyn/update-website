import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TweenMax } from "gsap/all";
import lerp from "../../util/lerp";

class ProjectCard extends Component {
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
    const src = this.props.project.card.thumbnail.url;
    const alt = this.props.project.card.thumbnail.alt;

    img.onload = () => {
      img.onload = null;
      this.setState({ loaded: true });
    };

    img.src = src;
    img.alt = alt;
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
      <article
        ref={e => (this.el = e)}
        className={`project-card${active ? " active" : ""}`}
        style={{
          transform
        }}
        onClick={this.setActive}
      >

        <Link className="project-card__content" to={`/work/${project.slug}`}>
          <div className="project-card__box flex flex-column flex-row-ns">
            <div className="project-card__media pr3-ns mb4 mb0-ns w-100 w-40-ns"

            >
              <img
                className="project-card__img db"
                src={project.card.thumbnail.url}
                alt={project.card.thumbnail.alt}


              />
            </div>
            <div className="project-card__excerpt w-100 w-60-ns pl3-ns">
              <h1
                className="project-card__headline f3 fw1  mt0 lh-title"
                dangerouslySetInnerHTML={{ __html: project.card.headline }}

              >

              </h1>
              <p
                className="project-card__summary f6 f5-l lh-copy "
                dangerouslySetInnerHTML={{ __html: project.card.summary }}></p>
            </div>
            <div
              className="project-card__color"
              style={{
                opacity: loaded ? 0 : 1,
                backgroundColor: project.card.color
              }}
            />
          </div>
          <h2 className="project-card__title">{project.title}</h2>
        </Link>



      </article>
    );
  }
}

export default ProjectCard;

/*
<div className="project-card__media pr3-ns mb4 mb0-ns w-100 w-40-ns"


            >
              <img
                className="project-card__img db"
                src={project.card.thumbnail.url}
                alt={project.card.thumbnail.alt}


              />
            </div>
*/