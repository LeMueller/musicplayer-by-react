import React, {Component} from 'react';
import '../../styles/player.less';
import Progress from '../commen/progress.js';
import {Link} from 'react-router-dom';

let duration = null;

export default class Player extends Component {

	constructor(props){
		super(props);
		
		this.state={
			progress: 0,
			volume: 0,
			isPlay: true,
		},

		this.play=this.play.bind(this);
		this.progressChangeHandler=this.progressChangeHandler.bind(this);
		this.volumeChangeHandler=this.volumeChangeHandler.bind(this);
	}

	componentDidMount(){

		$('#player').bind($.jPlayer.event.timeupdate,(e)=>{
			duration = e.jPlayer.status.duration;//total duration of the song
			this.setState({
				volume: e.jPlayer.options.volume*100,
				progress:e.jPlayer.status.currentPercentAbsolute
			});//how lange already played
		});
	}

    componentWillUnmount(){
		$('#player').unbind($.jPlayer.event.timeupdate);
	}

	//从子组件中获得值
	//change progress
	progressChangeHandler(progress){
		//console.log("from root widget::: " + progress);
		//if(this.state.isPlay){
			$('#player').jPlayer('play', duration * progress); //play调用了timeupdate，导致state更改，ui更改
		//}else{
		//	$('#player').jPlayer('play', duration * progress);
		//	$('#player').jPlayer('pause');
		//}
		
	}
	//change volume
	volumeChangeHandler(progress){
		$('#player').jPlayer('volume', progress);
	}

	//play pause switcher
	play(){
		if(this.state.isPlay){
			$('#player').jPlayer('pause');
		}else{
			$('#player').jPlayer('play');
		}

		this.setState({
			isPlay: !this.state.isPlay,
		})
	}

	render(){
		return(
			<div className="player-page">
				<h1 className="caption">
					<Link to="/list">My Favorite Music</Link>
				</h1>
				<div className="mt20 row">
					<div className = "controll-wrapper">
						<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
						<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
						<div className="row mt20">
							<div className="left-time -col-auto">-2:00</div>
							<div className="volume-container">
								<i className="icon-volume rt"></i>
								<div className="volume-wrapper">
									<Progress 
										progress={this.state.volume} 
										onProgressChange={this.volumeChangeHandler}
										barColor="#aaa"></Progress>
								</div>
							</div>
						</div>
						<div className="progress-container">
							<Progress 
								progress={this.state.progress}
								onProgressChange={this.progressChangeHandler}>
							</Progress>
						</div>
						<div className="mt35 row">
							<div>
								<i className="icon prev"></i>
								<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
								<i className="icon next ml20"></i>
							</div>
							<div className="-col-auto">
								<i className="icon repeat-cycle"></i>
							</div>
						</div>
					</div>
					<div className="-col-auto cover">
						<img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
					</div>
				</div>
			</div>


			/**<div className="player-page">
        		<Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler}></Progress>
        	</div>**/
		)
	}
}