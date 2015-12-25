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
			height : "100%",
			overflow : "hidden"
		};
		let padding = {
			width : this.state.toolSize,
			height : Math.floor(this.state.toolSize * 0.25)
		}
		return (
			<div style={style}>
				<svg viewBox="0 0 64 64" width={this.state.toolSize} height={this.state.toolSize} preserveAspectRatio="xMidYMid meet" fitstyle={{verticalAlign: "middle"}}>
					{this.renderBanner()}
				</svg>
				<div style={padding}></div>
				{this.props.tools.map(function(tool, i) {
		          return (
		            <Tool onClickEvent={this.handleClick.bind(this, i)} key={i} type={tool}
		            size={this.state.toolSize} active={this.state.active === tool} />
		          );
		        }, this)}
		        <div style={padding}></div>
		        <div style={padding}></div>
		        <svg viewBox="0 0 64 64" width={this.state.toolSize} height={Math.floor(this.props.state.screen.height * 0.04)} preserveAspectRatio="xMidYMid meet" fitstyle={{verticalAlign: "middle"}}>
					{this.renderHelp()}
				</svg>
			</div>
		);
	}

	renderBanner(){
		return (
			<g>
			<path id="svg_2" d="m4.22823,60.43915c1.12856,0.58156 2.66966,1.94106 3.86243,1.44341c0.78264,-0.32124 1.24077,-2.14388 1.72684,-3.10271c3.65978,-7.21069 7.63749,-15.41179 10.5326,-22.42791c0,-0.31312 0.16639,-0.55547 -0.08075,-0.98045c1.61981,-2.63635 2.7187,-5.5332 4.48868,-8.46643c0.56031,-0.93266 1.13026,-2.22604 1.91634,-2.59837l1.45172,-0.60656c1.84559,-0.47453 3.19339,-0.45795 4.4804,0.77949c0.6525,0.63112 0.95218,1.6725 1.58324,2.29873c0.4267,0.42828 2.05337,1.4812 2.65792,1.31811c0.46956,-0.12687 0.85678,-0.59967 1.18653,-1.1995l1.14688,-2.11902c0.32106,-0.60313 0.50401,-1.1831 0.35414,-1.64606c-0.1926,-0.59656 -1.96397,-1.3842 -2.5574,-1.50798c-0.87001,-0.18608 -1.9016,0.13362 -2.78808,-0.0675c-1.7414,-0.40045 -2.49294,-1.51916 -3.1026,-3.32848c-4.29742,-2.52591 -10.08279,-4.16886 -16.81898,-2.04983c-1.82725,0.57497 -3.57895,1.01169 -4.78035,2.18014c-0.24028,0.67889 0.23579,0.81386 0.73499,0.80559c-0.39045,0.35593 -1.02153,0.56202 -0.65731,1.39748c4.11131,-1.88841 12.09474,-2.5409 12.63681,1.32483c0.11876,0.85997 -0.65073,2.0448 -1.12373,3.0237c-1.49139,3.0877 -3.31385,5.59255 -4.63549,8.38874c-0.49083,0.02795 -0.60267,0.29655 -0.86506,0.47279c-4.29053,6.26158 -8.98186,14.07384 -13.01725,21.08182c-0.53718,0.93263 -1.80935,2.31009 -1.65124,3.14072c0.23752,1.27046 2.19014,1.86201 3.3187,2.44528z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#ffffff" fill="#ffffff"/>
			<text fontWeight="bold" stroke="#ffffff" transform="matrix(0.4391884122603073,0,0,0.4391884122603073,-3.3303626624222478,5.747829039609835) " textAnchor="middle" fontFamily="Monospace" fontSize="24" id="svg_3" y="10.15499" x="44.57872" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill="#ffffff">Graph</text>
			<text fontWeight="bold" stroke="#ffffff" transform="matrix(0.4391884122603073,0,0,0.4391884122603073,-3.3303626624222478,5.747829039609835) " textAnchor="middle" fontFamily="Monospace" fontSize="24" y="125.64843" x="108.36335" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill="#ffffff">Theory</text>
			<ellipse stroke="#ffffff" ry="2.93665" rx="2.93665" id="svg_6" cy="47.19208" cx="23.05658" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill="#ffffff"/>
			<ellipse id="svg_7" stroke="#ffffff" ry="2.93665" rx="2.93665" cy="10.21704" cx="38.91608" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill="#ffffff"/>
			<ellipse id="svg_8" stroke="#ffffff" ry="2.93665" rx="2.93665" cy="9.01569" cx="56.66943" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill="#ffffff"/>
			<ellipse id="svg_9" stroke="#ffffff" ry="2.93665" rx="2.93665" cy="45.72376" cx="54.26672" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill="#ffffff"/>
			<ellipse id="svg_10" stroke="#ffffff" ry="2.93665" rx="2.93665" cy="31.57446" cx="43.32104" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill="#ffffff"/>
			<rect transform="rotate(3.486829996109009 55.5599060058593,27.636688232421843) " stroke="#ffffff" id="svg_11" height="32.97052" width="1.46832" y="11.15143" x="54.82574" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill="#ffffff"/>
			<rect stroke="#ffffff" id="svg_12" transform="rotate(54.180625915527344 33.45027923583986,39.58952331542968) " height="28.42714" width="1.46832" y="25.37595" x="32.71612" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill="#ffffff"/>
			<rect id="svg_13" transform="rotate(88.79130554199219 39.58349609375,46.12420654296875) " stroke="#ffffff" height="32.97052" width="1.46832" y="29.63895" x="38.84933" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill="#ffffff"/>
			<rect stroke="#ffffff" id="svg_15" transform="rotate(-10.911686897277832 41.28901290893552,21.086030960083015) " height="20.78103" width="1.46832" y="10.69552" x="40.55485" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill="#ffffff"/>
			<rect id="svg_17" stroke="#ffffff" transform="rotate(-150.45608520507812 50.26220703125,20.49530029296875) " height="20.78103" width="1.46832" y="10.10479" x="49.52804" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill="#ffffff"/>
			<rect id="svg_18" stroke="#ffffff" transform="rotate(88.23194885253906 48.25994873046875,9.282654762268065) " height="20.78103" width="1.46832" y="-1.10786" x="47.52579" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill="#ffffff"/>
			</g>
		);
	}

	renderHelp(){
		return (
			 <g>
			  <path stroke="#000000" d="m31.89804,1.82571c-17.02953,0 -30.83476,13.50728 -30.83476,30.17023c0,16.66295 13.80523,30.17023 30.83476,30.17023c17.02957,0 30.8348,-13.50729 30.8348,-30.17023c0,-16.66295 -13.80523,-30.17023 -30.8348,-30.17023zm2.81719,47.54709l-5.74278,0l0,-5.38971l5.74278,0l0,5.38971zm0,-11.14312l0,1.78035l-5.74278,0l0,-2.19421c0,-6.62091 7.70127,-7.67189 7.70127,-12.37697c0,-2.14689 -1.96024,-3.79107 -4.52718,-3.79107c-2.66121,0 -4.99418,1.91754 -4.99418,1.91754l-3.26964,-3.97476c0,0 3.22249,-3.28757 8.77669,-3.28757c5.27705,0 10.1747,3.19618 10.1747,8.58495c0.00269,7.53992 -8.11888,8.40902 -8.11888,13.34174z" strokeWidth="0" fill="#5c5c5c"/>
			 </g>
		);
	}

}