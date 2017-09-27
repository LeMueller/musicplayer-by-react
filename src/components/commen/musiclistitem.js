import React, {Component} from 'react';
import '../../styles/musiclistitem.less';
import Pubsub from 'pubsub-js';

export default class Musiclistitem extends Component {

	constructor(props){
		super(props);
	}

    playMusic(musicItem){
        Pubsub.publish('PLAY_MUSIC', musicItem);
    }

    deleteMusic(musicItem, e){
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC', musicItem);
    }

    render() {
        let musicItem=this.props.musicItem;
        //alert(musicItem);
        return (
            <li onClick={this.playMusic.bind(this, musicItem)} className={`component-musiclistitem row ${this.props.focus ? 'focus' : ''}`}>
            	<p><strong>{musicItem.title}-{musicItem.artist}</strong></p>
            	<p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
            </li>
        );
    }
}