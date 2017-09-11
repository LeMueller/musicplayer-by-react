import React, {Component} from 'react';
import '../styles/progress.less';

export default class Progress extends Component {

	constructor(props){
		super(props);

		this.state={

		}
	}

    render() {
        return (
            <div className="component-progress row">
                <div className="progress"></div>
            </div>
        );
    }
}