import React from "react";
import { render } from "react-dom";
import ViewportProvider from "../components/ViewportProvider";
import MouseProvider from "../components/MouseProvider";
import { BrowserRouter, Route } from "react-router-dom";
import App from "../sections/App";
import routes from "../routes";

export default function() {
  const rootEl = document.getElementById("root");

  render(
    <ViewportProvider
      debounce={100}
      render={({ width, height }) => (
        <MouseProvider
          render={({ pageX, pageY }) => (
            <BrowserRouter>
              <Route>
                {props => (
                  <App
                    {...props}
                    routes={routes}
                    windowWidth={width}
                    windowHeight={height}
                    pageX={pageX}
                    pageY={pageY}
                  />
                )}
              </Route>
            </BrowserRouter>
          )}
        />
      )}
    />,
    rootEl
  );
}
