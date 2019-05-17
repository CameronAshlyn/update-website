import React from 'react'
import BaseComponent from '../../components/BaseComponent'
import Page from '../../components/Page'
import animate from '@jam3/gsap-promise'
import { Expo } from 'gsap'

class Contact extends BaseComponent {
  animateIn() {
    this.props.setNavColor('#2B2B2B')
    return animate.fromTo(
      this.page.el,
      1,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        ease: Expo.easeOut,
        delay: 0.5,
      },
    )
  }

  animateOut() {
    return animate.to(this.page.el, 1, {
      autoAlpha: 0,
      ease: Expo.easeOut,
    })
  }

  render() {
    const { links } = this.props
    return (
      <Page id="Contact" ref={e => (this.page = e)}>
        <div className="contact">
          {links.map(({ contact_link }, i) => (
            <a
              key={i}
              className="contact__link"
              target={contact_link.target}
              rel={
                contact_link.target === '_blank' ? 'noopener noreferrer' : null
              }
              href={contact_link.url}
              data-label={contact_link.title}
            >
              <span>{contact_link.title}</span>
            </a>
          ))}
        </div>
      </Page>
    )
  }
}

export default Contact
