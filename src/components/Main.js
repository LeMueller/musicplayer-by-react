require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Root from './root.js';
//require('header.js');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
      	<div id="player"></div>
        <Root />

      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
