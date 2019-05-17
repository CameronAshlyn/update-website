import Home from "../sections/Home";

import Process from "../sections/Process";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Single from "../sections/Single";

export default [
  {
    Component: Home,
    path: {
      path: "/",
      exact: true
    }
  },

  {
    Component: Process,
    path: {
      path: `/process`
    }
  },
  {
    Component: About,
    path: {
      path: `/about`
    }
  },
  {
    Component: Contact,
    path: {
      path: `/contact`
    }
  },
  {
    Component: Single,
    path: {
      path: `/work/:slug`
    }
  }
];
