import React, {Component} from 'react';
import '../../styles/progress.less';

export default class Progress extends Component {



	constructor(props){
        super(props);
        //let this in changeProgress(e) = this class, or this in changeProgress() is null
        this.changeProgress=this.changeProgress.bind(this);

		this.state={

		}
	}

    //设置默认props
    static defaultProps = {
        barColor: '#2f9842'
    }

    changeProgress(e){        
        let progressBar = this.refs.progressBar;
        
        let progress = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        //console.log("progress::: "+progress);

        this.props.onProgressChange && this.props.onProgressChange(progress);
    }

    //es6 语法 '${表达式}%'==表达式+'%'
    render() {
        return (
            <div className="component-progress row" ref="progressBar" onClick={this.changeProgress}>
                <div className="progress" style={{width: this.props.progress+'%', background: this.props.barColor}} ></div>
            </div>
        );
    }
}