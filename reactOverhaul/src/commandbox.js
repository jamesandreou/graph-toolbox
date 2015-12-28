import React, { Component } from 'react';
import { Command } from './command'

export class CommandBox extends Component{

	constructor (){
		super();
		this.box = {
			Algorithms : ['Planarity Test', 'Minimum Coloring', 'Minimum Vertex Cover', 
				'Shortest Directed Path', 'Minimum Spanning Tree', 'Topological Sort'],
			Tools : ['Center Graph', 'Make DAG', 'Connect All Components'],
			Graphs : ['K5', 'K33', 'Peterson', 'Bidiakis Cube']
		};
	}

	execute(i){
		this.props.display.executeCommand(this.props.section, this.box[this.props.section][i]);
	}

	render(){
		let style = {
			width : '100%',
			overflow: 'auto',
			height: this.props.size
		};
		return (
			<div style={style}> 
				{this.box[this.props.section].map(function(cmd, i){
					return (
						<Command cmd={cmd} key={i} onClickEvent={this.execute.bind(this, i)}/>
					);
				}, this)}
			</div>
		);
	}
}