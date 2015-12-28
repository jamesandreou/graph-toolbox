import React, { Component } from 'react';

export class Command extends Component{

	constructor (){
		super();
		this.state = {
			executable : true
		};
	}

	render(){
		let col = '#' + Math.ceil(Math.random() * 0xffffff).toString(16);;
		let style = {
			width : '100%',
			background : col,
			cursor : 'pointer',
			paddingTop : '60px',
			paddingBottom : '60px'
		};
		return (
			<div onClick={this.props.onClickEvent} style={style}> {this.props.cmd} </div>
		);
	}
}