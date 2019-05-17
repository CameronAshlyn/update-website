import React, { Component } from "react";

class Page extends Component {
  componentDidMount() {
    this.el.focus();
  }

  render() {
    const { id, children } = this.props;
    return (
      <div
        ref={e => (this.el = e)}
        role="region"
        aria-label={id}
        tabIndex="-1"
        className="absolute absolute--fill w-100 h-100 overflow-hidden"
        /*style={{ opacity: 0 }}*/
        {...this.props}
      >
        {children}
      </div>
    );
  }
}

export default Page;
