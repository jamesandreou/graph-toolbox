import React, { Component } from 'react';

export class Command extends Component{

	constructor (){
		super();
		this.state = {
			executable : true
		};
	}

	setExecutable(){
		executable = true;
	}

	execute(cmd){
		this.props.display.executeCommand(cmd);
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
			<div style={style}> {this.props.cmd} </div>
		);
	}
}