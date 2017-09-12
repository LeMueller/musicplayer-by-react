import React, {Component} from 'react';
import Header from './commen/header.js';
import Progress from './commen/progress.js';

let duration = null;

export default class Root extends Component{
	constructor(props){
		super(props);
		this.state={
			progress:'-'
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
	progressChangeHandler(progress){
		//console.log("from root widget::: " + progress);
		$('#player').jPlayer('play', duration * progress); //play调用了timeupdate，导致state更改，ui更改
	}

	render(){
		return(
			<div>
				<Header />
        		<Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler}></Progress>

        	</div>
		)
	}
}