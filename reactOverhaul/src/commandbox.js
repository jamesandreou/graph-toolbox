import React, { Component } from 'react';
import { Command } from './command'

export class CommandBox extends Component{

	constructor (){
		super();
		this.box = {
			Algorithms : ['Planarity Test', 'Minimum Coloring', 'Minimum Vertex Cover', 
				'Shortest Directed Path', 'Minimum Spanning Tree'],
			Tools : ['Center Graph', 'Make DAG', 'Connect All Components'],
			Graphs : ['K5', 'K33', 'Peterson', 'Bidiakis Cube']
		};
	}

	render(){
		let style = {
			width : '100%'
		};
		return (
			<div style={style}> 
				{this.box[this.props.section].map(function(cmd, i){
					return (
						<Command cmd={cmd} />
					);
				}, this)};
			</div>
		);
	}
}