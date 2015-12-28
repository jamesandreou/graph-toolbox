import React, { Component } from 'react';
import CommandList from './commandlist'

export class Command extends Component{

	constructor (){
		super();
		this.state = {
			executable : true,
			hover : false
		};
		this.cmdList = new CommandList();
	}

	handleMouseEnter(){
		this.setState({hover : true});
	}

	handleMouseLeave(){
		this.setState({hover : false});
	}

	render(){
		let cmd = this.cmdList.list[this.props.sec][this.props.cmd];
		let style = {
			width : '100%',
			background : this.state.hover ? '#5c5c5c' : '#2c2c2c',
			cursor : 'pointer',
			height : this.props.size.h
		};
		let nameStyle = {
			color : '#ffffff',
			fontWeight : 'bold',
			textDecoration : this.state.hover ? 'underline' : 'none',
			fontSize : this.props.nameSize,
			textAlign : 'center',
			paddingTop : '4px'
		};
		let descStyle = {
			color : '#ffffff',
			fontSize : this.props.nameSize / 2
		}
		return (
			<div onClick={this.props.onClickEvent} style={style} onMouseEnter={this.handleMouseEnter.bind(this)} 
				onMouseLeave={this.handleMouseLeave.bind(this)}>
			 	<div style={nameStyle}>{cmd.name}</div>
			 	<svg viewBox="0 0 64 32" height={this.props.size.h * 0.5} width={this.props.size.w *0.8} 
			 		preserveAspectRatio="xMidYMid meet" fitstyle={{verticalAlign: "middle"}}>
					{this.cmdList.getIcon(this.props.cmd, '#fff')}
				</svg>
			 	<div style={descStyle}>{cmd.desc}</div>
			 </div>
		);
	}
}