import React, {Component} from 'react';
import Header from './commen/header.js';
import Player from './page/player.js';
import {MUSIC_LIST} from '../config/musiclist';
import MusicListUI from './page/musiclistui.js';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


export default class Root extends Component{
	constructor(props){
		super(props);
		this.state={
			musiclist: MUSIC_LIST,
			currentMusicItem: MUSIC_LIST[0]
		}
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
