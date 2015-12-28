import React, { Component } from 'react'

export class PanelSection extends Component{

	constructor (){
		super();
		this.state = {
			hover : false
		}
	}

	handleMouseEnter(){
		this.setState({hover : true});
	}

	handleMouseLeave(){
		this.setState({hover : false});
	}

	handleResize(){
      this.props.heightSet(this.refs.sec.offsetHeight);
      this.forceUpdate();
	}

	componentDidMount(){
	    window.addEventListener('resize', (function(){
	      setTimeout(this.handleResize.bind(this), 100);
	    }).bind(this));
		this.props.heightSet(this.refs.sec.offsetHeight);
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

	render(){
		let textSize = this.computeTextSize("Algorithms", this.props.size);
		let textStyle = {
			width : this.props.size,
			paddingTop : '6px',
			paddingBottom : '6px',
			overflow : "hidden",
			fontFamily : "Courier New",
			fontWeight : (this.props.active || this.state.hover) ? "bold" : "normal",
			fontSize : textSize,
			textAlign : "center",
			color : (this.props.active || this.state.hover) ? "#ffffff" : "#5c5c5c",
			cursor : "pointer"
		};
		let markerStyle = {
			width : this.props.size,
			height : "2px",
			cursor : "pointer",
			background : (this.props.active) ? "#84bd00" : "#2c2c2c"
		};
		return (
			<div ref="sec" onClick={this.props.onClickEvent} onMouseEnter={this.handleMouseEnter.bind(this)} 
				onMouseLeave={this.handleMouseLeave.bind(this)} style={{display : "inline-block"}}>
				<div style={textStyle}>{this.props.text}</div>
				<div style={markerStyle}/>
			</div>
		);
	}
}