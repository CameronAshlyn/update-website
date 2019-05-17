//import React, { Fragment } from 'react'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo/blacklogo.svg'

const Navigation = ({ navColor, themeColor }) => {
  const textStyle = { color: navColor }
  return (
    <div>
      <header
        className="fixed left-0 top-0 w-100 flex items-center pv2 ph3 z-4 mobile"
        style={{ backgroundColor: themeColor }}
      >
        <img className="db" width={64} height={40} src={logo} alt="fail" />
      </header>
      {/* <NavLink
        className="nav-link nav-link--home not-mobile"
        activeClassName="nav-link--active"
        to="/"
      >
        <span data-label="HOME">
          <span style={textStyle}>HOME</span>
        </span>
      </NavLink> */}
      <Link className="nav-link nav-link--home not-mobile" to="/" exact>
        <img src={logo} alt="fail" />
      </Link>
      <NavLink
        className="nav-link nav-link--about not-mobile"
        activeClassName="nav-link--active"
        to="/about"
      >
        <span data-label="ABOUT">
          <span style={textStyle}>ABOUT</span>
        </span>
      </NavLink>
      {/* <NavLink
        className="nav-link nav-link--process not-mobile"
        activeClassName="nav-link--active"
        to="/process"
      >
        <span data-label="PROCESS">
          <span style={textStyle}>PROCESS</span>
        </span>
      </NavLink> */}

      <NavLink
        className="nav-link nav-link--contact not-mobile"
        activeClassName="nav-link--active"
        to="/contact"
      >
        <span data-label="CONTACT">
          <span style={textStyle}>CONTACT</span>
        </span>
      </NavLink>
      <a
        className="nav-link nav-link--resume not-mobile"
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
  )
}

export default Navigation
