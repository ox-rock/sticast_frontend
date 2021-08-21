import { Fragment } from 'react';

import Navbar from './Navbar';

const Layout = (props) => {
  return (
    <Fragment>
      <Navbar />
      <div className="container">{props.children}</div>
    </Fragment>
  );
};

export default Layout;
