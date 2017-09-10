import React, {Component} from 'react';
//import '../styles/header.less';

export default class Header extends Component {

    render() {
        return (
            <div className="component-header">
                <img src={require('../images/logo.png')}  width={40} className="-col-auto"/>
                <h1 className="caption">Music Player by React</h1>
            </div>
        );
    }
}