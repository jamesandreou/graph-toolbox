import React, { Component } from 'react';

export class Tool extends Component{

	constructor(){
		super();	
		this.css = {
			width : "100%",
			height : "12%",
			textAlign: "center",
			background : "#5f5f5f"
		};
	}

	render(){
		return (
			<div style={this.css}>
				<img src='../assets/adde_btn_0.svg'></img>
				<p> {this.props.name} </p>
			</div>
		);
	}

}