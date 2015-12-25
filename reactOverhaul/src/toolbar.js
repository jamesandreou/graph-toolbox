import React, { Component } from 'react';
import { Tool } from './tool';

export class Toolbar extends Component{

	constructor(){
		super();	
		this.css = {
			width : "10%",
			height : "100%",
			background : "#141414",
			color: "white"
		};
	}

	computeSize(state){
		var toolSize = state.screen.height * 0.14;
		this.css.width = toolSize;
		return toolSize;
	}

	render(){
		var toolSize = this.computeSize(this.props.state);
		return (
			<div style={this.css}>
				<Tool type="adde" size={toolSize} active={true} />
			</div>
		);
	}

}