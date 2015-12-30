import React, { Component } from 'react';
import { PanelSection } from './section';
import Display from './display';
import { CommandBox } from './commandbox';

export class Panel extends Component{

	constructor(){
		super();
		this.sections = ["Tools", "Algorithms", "Graphs"];
		this.state = {
			activeSection : "Algorithms",
			boxHeight : window.innerHeight - 30
		};
	}

	setSection(i){
		this.setState({activeSection : this.sections[i]});
	}

	determineBoxHeight(h){
		this.setState({boxHeight : window.innerHeight - h});
	}

	render(){
		console.log('render ' + this.state.activeSection);
		let style = {
			width : this.props.size,
		};
		return (
			<div className='panel' style={style}>
				<span>
					{this.sections.map(function(sec, i){
						return(
							<PanelSection onClickEvent={this.setSection.bind(this, i)} size={this.props.size / 3} text={sec} 
							key={i} active={this.state.activeSection === sec} heightSet={this.determineBoxHeight.bind(this)}/>
						);
					}, this)}
				</span>
				<CommandBox graph={this.props.graph} section={this.state.activeSection} display={this.props.display} 
				size={{h : this.state.boxHeight, w : this.props.size}}/>
			</div>
		);
	}

}

