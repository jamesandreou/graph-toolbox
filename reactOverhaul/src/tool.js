import React, { Component } from 'react';

export class Tool extends Component{

	constructor(){
		super();
		this.state = {
			col : "#5c5c5c"
		}	
		this.css = {
			width : "100%",
			textAlign: "center"
		};
	}

	componentWillMount(){
		this.css['height'] = this.props.size;
		this.state.col = this.props.active ? "#ffffff" : "#5c5c5c";
	}

	render(){
		let style = {
	      verticalAlign: "middle",
	    };
		return (
			<svg viewBox="0 0 64 64" width={this.props.size} height={this.props.size} preserveAspectRatio="xMidYMid meet" fitstyle={style}>
				{this.renderIcon(this.props.type)}
			</svg>
		);
	}

	renderIcon(type){
		switch(type){
			case 'addv':
				return (
					 <g>
					  <rect stroke="#000000" transform="rotate(41.710758209228516 30.144638061523438,25.894489288330078) " id="svg_7" height="2.13574" width="35.69359" y="24.82662" x="12.29784" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={this.state.col}/>
					  <path stroke="#000000" id="svg_8" d="m36.75386,10.69482l6.2644,0l0,-6.26434c2.14201,-2.26922 4.55098,-2.13575 6.42602,0l0,6.26434l6.26429,0c2.5362,2.14201 2.5362,4.55099 0,6.42603l-6.26429,0l0,6.26434c-2.00852,3.07013 -3.88356,3.3371 -6.42602,0l0,-6.26434l-6.2644,0c-3.3371,-2.00853 -2.66968,-4.4175 0,-6.42603z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={this.state.col}/>
					  <text fontFamily="Verdana" stroke="#000000" transform="matrix(0.46005088090896606,0,0,0.46005088090896606,-22.914090741425753,29.97561281453818) " textAnchor="middle" fontFamily="Sans-serif" fontSize="24" id="svg_12" y="63.1623" x="119.51921" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={this.state.col}>Add Vertice</text>
					  <ellipse stroke="#000000" ry="7.07465" rx="7.07465" id="svg_13" cy="10.61749" cx="13.17877" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={this.state.col}/>
					  <ellipse id="svg_19" stroke="#000000" ry="7.07465" rx="7.07465" cy="41.05182" cx="47.99298" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={this.state.col}/>
					 </g>
				 );
		}
	}

}