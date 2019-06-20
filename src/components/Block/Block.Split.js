import React, { Component } from "react";
import Text from "./Block.Text";
import Image from "./Block.Image";

class Split extends Component {
  load = () => {
    return new Promise((resolve, reject) => {
      this.image.load().then(resolve);
    });
  };

  render() {
    const { first_column, ...block } = this.props;
    return (
      <div className="block block--split">
        <div className="block--split__column">
          {first_column === "image" ? (
            <Image {...block} ref={e => (this.image = e)} />
          ) : (
              <Text {...block} />
            )}
        </div>
        <div className="block--split__column">
          {first_column === "image" ? (
            <Text {...block} />
          ) : (
              <Image {...block} ref={e => (this.image = e)} />
            )}
        </div>
      </div>
    );
  }
}

export default Split;
