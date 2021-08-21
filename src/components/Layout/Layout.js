import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <div className="container">{props.children}</div>
    </Fragment>
  );
};

export default Layout;
