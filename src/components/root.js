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

		this.render().PlayerUI=this.render().PlayerUI.bind(this);
		this.render().ListUI=this.render().ListUI.bind(this);

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

	

	render(){

		const PlayerUI = () => (
	        <Player
		    	cuerrentMusicItem={this.state.cuerrentMusicItem}
		    />
		);

		const ListUI = () => (
		    <MusicList
			    cuerrentMusicItem={this.state.cuerrentMusicItem}
			    musicList={this.state.musicList}
		    />
		);

		const MainUI = () => (
			<Switch>
				<Route exact path='/' component={PlayerUI}/>
				<Route path='/list' component={ListUI}/>
			</Switch>
		)

		const AppUI = () => (
			<div>
				<Header />
				<MainUI />
			</div>
		)

		return(
			<HashRouter>
				<AppUI />
			</HashRouter>
		)
	}
}
