import React, {Component} from 'react';
//import '../../styles/musiclistui.less';
import Musiclistitem from '../commen/musiclistitem.js';

export default class MusicListUI extends Component {

	constructor(props){
		super(props);
	}

    render() {

    	let listEle = null;
    	//map() return new array. do nothing with origenal array
        listEle=this.props.musiclist.map((item) =>{
        	return (
        		<Musiclistitem 
        			key={item.id} 
        			musicItem={item}
        			focus={item===this.props.currentMusicItem}
        		>
        			{item.title}
        		</Musiclistitem>
        	)
        });

        return (
            <ul style={{color: '#000'}}>
               {listEle}
            </ul>
        );
    }
}