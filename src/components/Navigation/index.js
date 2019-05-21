import React, { Fragment } from "react";
//import React from 'react'
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/blacklogo.svg";

const Navigation = ({ navColor, themeColor }) => {
  const textStyle = { color: navColor };
  return (
    <Fragment>
      <nav className="nav-area dt w-100 absolute pa3  z-4 ">
        <NavLink className="nav-link dtc v-mid w-25" to="/" exact>
          <img className="dib w2 h2 br-100" width={64} height={40} src={logo} alt="fail" />
        </NavLink>
        <div className=" nav-nav dtc v-mid w-75 tr">
          <NavLink
            className="nav-link link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
            activeClassName="nav-link--active"
            to="/about"
          >
            <span data-label="ABOUT">
              <span style={textStyle}>ABOUT</span>
            </span>
          </NavLink>


          <a
            className="nav-link link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
            activeClassName="nav-link--active"
            target="_blank"
            rel="noopener noreferrer"
            href="https://api-cameronashlyn.com/wp-content/uploads/2019/04/taylor-resume-april2019.pdf"
          >
            <span data-label="RESUME">
              <span style={textStyle}>RESUME</span>
            </span>
          </a>


        </div>
      </nav>





















    </Fragment>
  );
};

export default Navigation;
