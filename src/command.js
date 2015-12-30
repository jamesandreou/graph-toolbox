import React, { Component } from 'react';
import CommandList from './commandlist'

export class Command extends Component{

	constructor (){
		super();
		this.cmdList = new CommandList();
		this.state = {
			hover : false
		};
	}

	handleMouseEnter(){
		this.setState({hover : true});
	}

	handleMouseLeave(){
		this.setState({hover : false});
	}

	render(){
		let cmd = this.cmdList.list[this.props.sec][this.props.cmd];
		let executable = cmd.req(this.props.graph);
		let col = executable ? '#ffffff' : '#5c5c5c';
		let style = {
			background : this.state.hover && executable ? '#5c5c5c' : '#2c2c2c'
		};
		let nameStyle = {
			textDecoration : this.state.hover && executable ? 'underline' : 'none',
			fontSize : this.props.nameSize,
			color : col
		};
		let descStyle = {
			color : col,
			fontSize : this.props.nameSize / 2
		}
		return (
			<div onClick={this.props.onClickEvent} className='command' style={style} 
				onMouseEnter={this.handleMouseEnter.bind(this)} 
				onMouseLeave={this.handleMouseLeave.bind(this)}>
			 	<div className='commandName' style={nameStyle}>{cmd.name}</div>
			 	<svg viewBox="0 0 64 32" height={this.props.size.h * 0.5} width={this.props.size.w *0.8} 
			 		preserveAspectRatio="xMidYMid meet" fitstyle={{verticalAlign: "middle"}}>
					{this.cmdList.getIcon(this.props.cmd, col)}
				</svg>
			 	<div style={descStyle}>{cmd.desc}</div>
			 </div>
		);
	}
}