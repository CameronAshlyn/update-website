import React, { Component } from "react";

class Image extends Component {
  state = {
    loaded: false
  };

  load() {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      const src = this.props.image.url;

      img.onload = () => {
        img.onload = null;
        this.setState({ loaded: true }, resolve());
      };

      img.src = src;
    });
  }

  render() {
    const { image, colors } = this.props;
    const { loaded } = this.state;
    return (
      <div
        className="block block--image"
        style={{
          opacity: loaded ? 1 : 0,
          backgroundColor: colors.background,

        }}
      >
        <img

          src={image.url}
          alt={image.alt}
        />
      </div>
    );
  }
}

export default Image;
