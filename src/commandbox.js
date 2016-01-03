import React, { Component } from 'react';
import { Command } from './command';
import CommandList from './commandlist';

export class CommandBox extends Component{

	constructor (){
		super();
		this.box = {
			Algorithms : ['planar', 'mincov', 'topo', 'mst'],
			Tools : ['center', 'clear'],
			Graphs : ['k5', 'cube', 'planar']
		};
	}

	execute(i){
		this.props.display.executeCommand(this.props.section, this.box[this.props.section][i]);
	}

	computeTextSize(text, bound){
		let canvas = document.createElement("canvas");
	    let context = canvas.getContext("2d");
	    let size = 30;
	    context.font = "bold " + size + "px " + "Courier New";
	    let width = Math.ceil(context.measureText(text).width);
	    while(width >= bound){
	    	size--;
	    	context.font = "bold " + size + "px " + "Courier New";
	        width = Math.ceil(context.measureText(text).width);
	    }
	    return size;
	}

	computeNameSize(){
		let max = 0;
		let text = "";
		let cmds = new CommandList();
		for(let sec of ['Algorithms', 'Tools', 'Graphs']){
			for(let cmd of this.box[sec]){
				if(cmds.list[sec][cmd].name.length > max){
					text = cmds.list[sec][cmd].name;
					max = cmds.list[sec][cmd].name.length;
				}
			}
		}
		return this.computeTextSize(text, this.props.size.w * 0.9);
	}

	render(){
		let style = {
			height: this.props.size.h
		};
		return (
			<div className='commandBox' style={style}> 
				{this.box[this.props.section].map(function(cmd, i){
					return (
						<Command graph={this.props.graph} 
						cmd={cmd} 
						sec={this.props.section} 
						size={{h: this.props.size.h * 0.2, w : this.props.size.w}}
						key={i} 
						onClickEvent={this.execute.bind(this, i)} 
						nameSize={this.computeNameSize()}/>
					);
				}, this)}
			</div>
		);
	}
}