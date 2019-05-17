import React, { Component } from "react";

class Text extends Component {
  render() {
    const { content, colors } = this.props;
    return (
      <div
        className="block block--text"
        style={{
          backgroundColor: colors.background
        }}
      >
        <div
          className="block__text"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  }
}

export default Text;
