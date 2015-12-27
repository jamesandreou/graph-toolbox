import React, { Component } from 'react';
import { PanelSection } from './section';
import Display from './display';
import { CommandBox } from './commandbox';

export class Panel extends Component{

	constructor(){
		super();
		this.sections = ["Tools", "Algorithms", "Graphs"];
		this.state = {
			activeSection : "Algorithms"
		};
	}

	setSection(i){
		this.setState({activeSection : this.sections[i]});
	}

	render(){
		let style = {
			background : '#121314',
			position: "absolute",
			top : "0",
			left : window.innerWidth - this.props.size,
			textAlign : "center",
			width : this.props.size,
			height : "100%"
		};
		return (
			<div style={style}>
				<span>
					{this.sections.map(function(sec, i){
						return(
							<PanelSection onClickEvent={this.setSection.bind(this, i)} size={this.props.size / 3} text={sec} 
							key={i} active={this.state.activeSection === sec} />
						);
					}, this)}
				</span>
				<CommandBox section={this.state.activeSection}/>
			</div>
		);
	}

}

