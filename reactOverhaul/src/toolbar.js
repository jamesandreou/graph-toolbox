import React, { Component } from 'react';
import { Tool } from './tool';

export class Toolbar extends Component{

	constructor(){
		super();	
		this.state = {
			active : 'sel',
			toolSize : 64
		};
	}

	componentWillMount() {
		this.state.toolSize = this.props.size;
	}

	componentWillUpdate() {
		this.state.toolSize = this.props.size;
	}

	handleClick(i){
		this.props.onUpdate({activeTool : this.props.tools[i]});
		this.setState({active : this.props.tools[i]});
	}

	render(){
		let style = {
			background : '#141414',
			position: "absolute",
			top : "0",
			left : "0",
			textAlign : "center",
			width : this.state.toolSize,
			height : "100%"
		};
		return (
			<div style={style}>
				{this.props.tools.map(function(tool, i) {
		          return (
		            <Tool onClickEvent={this.handleClick.bind(this, i)} key={i} type={tool}
		            size={this.state.toolSize} active={this.state.active === tool} />
		          );
		        }, this)}
			</div>
		);
	}

}