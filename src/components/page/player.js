import React, {Component} from 'react';
import '../../styles/player.less';
import Progress from '../commen/progress.js';

let duration = null;

export default class Player extends Component {

	constructor(props){
		super(props);
		this.state={
			progress:'-'
		}
	}

	componentDidMount(){

		$('#player').bind($.jPlayer.event.timeupdate,(e)=>{
			duration = e.jPlayer.status.duration;//total duration of the song
			this.setState({progress:e.jPlayer.status.currentPercentAbsolute});//how lange already played
		});
		//alert("palyer");
	}

    componentWillUnMount(){
		$('#player').unbind($.jPlayer.event.timeupdate);
	}

	//从子组件中获得值
	//change progress
	progressChangeHandler(progress){
		//console.log("from root widget::: " + progress);
		$('#player').jPlayer('play', duration * progress); //play调用了timeupdate，导致state更改，ui更改
	}
	//change volume
	volumeChangeHandler(progress){
		
	}

	render(){
		return(
			<div className="player-page">
				<h1 className="caption">My Favorite Music</h1>
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
										progress="20%" 
										onProgressChange={this.changeVolumeHandler}
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
								<i className="icon ml20 play"></i>
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