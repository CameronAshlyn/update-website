import React, { Component } from "react";
import Text from "./Slide.Text";
import Image from "./Slide.Image";

class Split extends Component {
  load = () => {
    return new Promise((resolve, reject) => {
      this.image.load().then(resolve);
    });
  };

  render() {
    const { first_column, ...slide } = this.props;
    return (
      <div className="block block--split">
        <div className="block--split__column">
          {first_column === "image" ? (
            <Image {...slide} ref={e => (this.image = e)} />
          ) : (
            <Text {...slide} />
          )}
        </div>
        <div className="block--split__column">
          {first_column === "image" ? (
            <Text {...slide} />
          ) : (
            <Image {...slide} ref={e => (this.image = e)} />
          )}
        </div>
      </div>
    );
  }
}

export default Split;
