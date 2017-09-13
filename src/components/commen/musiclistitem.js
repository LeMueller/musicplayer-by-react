import React, {Component} from 'react';
import '../../styles/musiclistitem.less';

export default class Musiclistitem extends Component {

	constructor(props){
		super(props);
	}

    render() {
        let musicItem=this.props.musicItem;
        //alert(musicItem);
        return (
            <li className={`component-musiclistitem row ${this.props.focus ? 'focus' : ''}`}>
            	<p><strong>{musicItem.title}-{musicItem.artist}</strong></p>
            	<p className="-col-auto delete"></p>
            </li>
        );
    }
}