import React, { Component } from 'react';

export class Panel extends Component{

	constructor(){
		super();
		this.state = {
			size : 64
		};
	}

	componentWillMount() {
		this.state.size = this.props.size;
	}

	componentWillUpdate() {
		this.state.size = this.props.size;
	}

	render(){
		let style = {
			background : '#141414',
			position: "absolute",
			top : "0",
			left : window.innerWidth - this.state.size,
			textAlign : "center",
			width : this.state.size,
			height : "100%"
		};
		return (
			<div style={style}>
			</div>
		);
	}

}