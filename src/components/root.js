import React, {Component} from 'react';
import Header from './commen/header.js';
import Player from './page/player.js';
import {MUSIC_LIST} from '../config/musiclist';
import MusicListUI from './page/musiclistui.js';
import {HashRouter, Switch, Route, Link} from 'react-router-dom';


export default class Root extends Component{
	constructor(props){
		super(props);
		this.state={
			musiclist: MUSIC_LIST,
			currentMusicItem: MUSIC_LIST[0]
		}

		alert(this.PlayerUI);

		this.PlayerUI=this.PlayerUI.bind(this);
		this.ListUI=this.ListUI.bind(this);

		//console.log("musiclist::: "+this.state.musiclist);
		//console.log("cuerrentMusicItem:::+ " +this.state.cuerrentMusicItem);
	}

	componentDidMount(){
		

		$('#player').jPlayer({
			ready:function(){
				$(this).jPlayer('setMedia',{
					mp3:'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
				}).jPlayer('play');
			},
			supplied:'mp3',
			wmode: 'window'
		});


	}

	componentWillUnMount(){
		
	}

	PlayerUI = () => (
        <Player
	    	cuerrentMusicItem={this.state.cuerrentMusicItem}
	    />
	);

	ListUI = () => (
	    <MusicList
		    cuerrentMusicItem={this.state.cuerrentMusicItem}
		    musicList={this.state.musicList}
	    />
	);

	MainUI = () => (
		<Switch>
			<Route exact path='/' component={PlayerUI}/>
			<Route path='/list' component={ListUI}/>
		</Switch>
	)

	AppUI = () => (
		<div>
			<Header />
			<MainUI />
		</div>
	)


	render(){

		

		return(
			<HashRouter>
				<AppUI />
			</HashRouter>
		)
	}
}
