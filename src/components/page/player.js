import React, {Component} from 'react';
//import '../../styles/page.less';
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
	progressChangeHandler(progress){
		//console.log("from root widget::: " + progress);
		$('#player').jPlayer('play', duration * progress); //play调用了timeupdate，导致state更改，ui更改
	}

	render(){
		return(
			<div>
        		<Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler}></Progress>

        	</div>
		)
	}
}