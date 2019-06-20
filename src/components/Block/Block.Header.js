import React, { Component } from "react";

class Header extends Component {
    render() {
        const { content, colors } = this.props;
        return (
            <div
                className="block block--header"
                style={{
                    backgroundColor: colors.background
                }}
            >
                <h4
                    className="block__header"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        );
    }
}

export default Header;
