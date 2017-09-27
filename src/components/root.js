import React, {Component} from 'react';
import Header from './commen/header.js';
import Player from './page/player.js';
import {MUSIC_LIST} from '../config/musiclist';
import MusicListUI from './page/musiclistui.js';

import Pubsub from 'pubsub-js';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


export default class Root extends Component{
	constructor(props){
		super(props);
		this.state={
			musiclist: MUSIC_LIST,
			currentMusicItem: MUSIC_LIST[4]
		}

		this.playMusic=this.playMusic.bind(this);
		this.playNext=this.playNext.bind(this);
		this.findMusicIndex=this.findMusicIndex.bind(this);
	}

	playMusic(musicItem){
		$('#player').jPlayer('setMedia',{
			mp3: musicItem.file
		}).jPlayer('play');

		this.setState({
			currentMusicItem: musicItem
		})
	}

	playNext(type="next"){
		let index = this.findMusicIndex(this.state.currentMusicItem);
		let newIndex=null;
		let musiclistLength = this.state.musiclist.length;
		if(type==='next'){
			newIndex = (index+1) % musiclistLength;
		}else{
			newIndex = (index-1 + musiclistLength) % musiclistLength;
		}

		this.playMusic(this.state.musiclist[newIndex]);
	}

	findMusicIndex(musicItem){
		return this.state.musiclist.indexOf(musicItem);
	}

	componentDidMount(){
		$('#player').jPlayer({
			supplied:'mp3',
			wmode: 'window'
		});

		this.playMusic(this.state.currentMusicItem);

		$('#player').bind($.jPlayer.event.ended, (e)=>{
			this.playNext();
		})

		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem)=>{
			this.setState({
				musiclist:this.state.musiclist.filter(item=>{
					return item != musicItem
				})
			})
		});

		Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem)=>{
			this.playMusic(musicItem);
		});

		Pubsub.subscribe('PLAY_PREV', (msg, musicItem)=>{
			this.playNext('prev');
		});

		Pubsub.subscribe('PLAY_NEXT', (msg, musicItem)=>{
			this.playNext('next');
		});



	}

	componentWillUnmount(){
		Pubsub.unsubscribe('DELETE_MUSIC');
		Pubsub.unsubscribe('PLAY_MUSIC');
		$('#player').unbind($.jpalyer.event.ended);
		Pubsub.unsubscribe('PLAY_PREV');
		Pubsub.unsubscribe('PLAY_NEXT');
	}

/**Router V3
	render(){
		return(
			<div>
				{React.cloneElement(this.props.children, this.state)}				
        	</div>
		)
	}
**/

	render(){

		const Home=() => (
			<Player
				currentMusicItem={this.state.currentMusicItem}
			/>
		);

		const List = () => (
			<MusicListUI
				currentMusicItem={this.state.currentMusicItem}
				musiclist={this.state.musiclist}
			/>
		);

		return(
			<Router>
				<div>
					<Header/>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route path="/list" component={List}/>
					</Switch>
				</div>
			</Router>	
		)
	}
}


/**
export default class Root extends Component{

Router V3
	render(){
		return(
			<HashRouter>
				<div>
					<Header/>
					<Route exact path="/" component={MusicApp}>
						<Route exact path="/" component={Player }></Route>
						<Route path="/list" component={MusicListUI}></Route>
					</Route>
				</div>
				
			</HashRouter>
		)
	}
**/
