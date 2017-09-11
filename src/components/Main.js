require('normalize.css/normalize.css');
require('styles/App.css');

import React, {Component} from 'react';
import Header from './header.js';
//require('header.js');


let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Header />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
