import React, {Component} from 'react';
import '../../styles/header.less';
//import logo from '../images/logo.png';
let logo = require('../../images/logo.png');


export default class Header extends Component {

    render() {
        return (
            <div className="component-header row">
                <img src={logo}  width={40} className="-col-auto"/>
                <h1 className="caption">Music Player by React</h1>
            </div>
        );
    }
}