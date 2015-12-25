import React, { Component } from 'react';
import { Tool } from './tool';

export class Toolbar extends Component{

	constructor(){
		super();	
		this.css = {
			width : "10vw",
			height : "100vh",
			background : "#2c2c2c"
		};
	}

	render(){
		return (
			<div style={this.css}>
				<Tool name="Add"/>
				<Tool name="Subtract"/>
			</div>
		);
	}

}