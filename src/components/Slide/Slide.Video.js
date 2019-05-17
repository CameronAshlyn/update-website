import React, { Component } from "react";

class Video extends Component {
  state = {
    loaded: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.paused !== this.props.paused) {
      "requestIdleCallback" in window
        ? requestIdleCallback(this.toggleVideo)
        : this.toggleVideo();
    }
  }

  load = () => {
    return Promise.all([this.loadPoster(), this.loadVideo()]).then(() =>
      this.setState({ loaded: true })
    );
  };

  loadPoster() {
    return new Promise((resolve, reject) => {
      if (this.props.video_poster) {
        const img = document.createElement("img");
        const src = this.props.video_poster.url;

        img.onload = () => {
          img.onload = null;
          resolve();
        };

        img.src = src;
      } else {
        resolve();
      }
    });
  }

  loadVideo() {
    return new Promise((resolve, reject) => {
      const src = this.props.file.url;

      fetch(src, { mode: "no-cors" })
        .then(res => res.blob())
        .then(blob => {
          if (window.URL && window.URL.createObjectURL) {
            window.URL.createObjectURL(blob); // IE10+
            resolve();
          } else {
            throw new Error(
              "This browser does not support URL.createObjectURL()"
            );
          }
        });
    });
  }

  getVideoElement() {
    return this.video;
  }

  pause = () => this.video.pause();
  play = () => this.video.play();

  toggleVideo = () => {
    this.props.paused ? this.pause() : this.play();
  };

  render() {
    const { colors, file, video_poster } = this.props;
    const { loaded } = this.state;
    return (
      <div
        className="block block--video"
        style={{
          backgroundColor: colors.background
        }}
      >
        <video
          className="block--video__video"
          preload="none"
          ref={e => (this.video = e)}
          src={loaded ? file.url : null}
          loop
        />
        {video_poster ? (
          <div
            className="block--video__poster"
            style={{
              backgroundImage: `url(${video_poster.url}})`
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default Video;
