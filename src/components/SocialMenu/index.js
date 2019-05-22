import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faGithub,
    faDribbble,
    faBehance
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function SocialMenu() {
    return (
        <div className="social-container">


            <a href="https://www.linkedin.com/in/cameron-taylor-ab373a55/"
                className="linkedin social"
            >
                <FontAwesomeIcon icon={faLinkedin} size="1x" />
            </a>
            <a
                href="https://github.com/CameronAshlyn"
                className="github social"
            >
                <FontAwesomeIcon icon={faGithub} size="1x" />
            </a>
            <a href="https://dribbble.com/cameronashlyn"
                className="dribble social"
            >
                <FontAwesomeIcon icon={faDribbble} size="1x" />
            </a>
            <a
                href="https://www.behance.net/ctaylo42e71a"
                className="behance social"
            >
                <FontAwesomeIcon icon={faBehance} size="1x" />
            </a>


            <a
                htarget="_self"
                href="mailto:cameronashlyn@gmail.com"
                className="email social far fa-envelope"
            >
                <FontAwesomeIcon icon={faEnvelope} size="1x" />
            </a>
        </div>
    );
}
