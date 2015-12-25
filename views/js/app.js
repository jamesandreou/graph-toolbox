import React, { Component } from 'react';
import { Toolbar } from './toolbar'

export class App extends Component{

	constructor(){
		super();	
		this.canvasCSS = {
			width : "70vw",
			height : "100vh"
		};
	}

	render(){
		return (
			<div>
				<Toolbar />
				<canvas style={this.canvasCSS} >Get a better browser..</canvas>
			</div>
		);
	}

}