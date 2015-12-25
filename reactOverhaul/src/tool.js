import React, { Component } from 'react';

export class Tool extends Component{

	constructor(){
		super();
		this.state = {
			col : '#5c5c5c'
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
			<div style={this.css}>
			<svg viewBox="0 0 64 64" width={this.props.size * 0.9} height={this.props.size * 0.9} preserveAspectRatio="xMidYMid meet" fitstyle={style}>
				{this.renderIcon(this.props.type)}
			</svg>
			</div>
		);
	}


	renderIcon(type){
		let bgCol = '#141414';
		switch(type){
			case 'sel':
				return (
					<g>
					<path transform="rotate(-26.727214813232422 33.74142837524413,23.632715225219723) " id="svg_36" d="m32.02369,42.10813c-3.66549,-0.63617 -6.80387,-3.48182 -7.75547,-7.08627c-0.45189,-1.84002 -0.18725,-3.77017 -0.27666,-5.65029c-0.01659,-4.82576 -0.02488,-9.65154 -0.03805,-14.47732c0.43073,-1.49774 2.24733,-2.2856 3.62935,-1.54503c0.12017,-0.39384 0.03205,-1.09941 0.07425,-1.61045c-0.24533,-1.40498 0.75688,-2.83451 2.21226,-2.92964c0.8356,-0.00536 1.83554,0.62935 1.4548,-0.77605c-0.25815,-1.44796 0.87856,-3.09706 2.43278,-2.96359c1.48487,-0.13776 2.613,1.37358 2.434,2.77477c0.06848,0.83613 1.87987,-0.54834 2.51344,0.38159c0.80751,0.47922 1.35968,1.39376 1.2074,2.33897c0.04642,2.58993 -0.06372,5.19588 0.11728,7.77335c1.32818,-0.67235 3.22075,0.15377 3.49254,1.63247c-0.03014,4.59478 0.07658,9.19311 -0.08101,13.78543c-0.53476,4.72367 -5.02733,8.71801 -9.82306,8.43444c-0.53149,0.00134 -1.06741,0.00641 -1.59385,-0.08236zm3.27964,-1.25486c4.02623,-0.68027 7.19314,-4.57267 6.96658,-8.66544c0.03058,-3.95556 0.15577,-7.91736 0.00911,-11.87069c-0.09351,-1.44511 -2.4896,-1.09535 -2.33435,0.23827c-0.00076,2.9321 -0.00145,5.86403 -0.0023,8.79585c-0.74584,0.7692 -2.08118,0.3058 -2.97626,0.93092c-1.98842,0.86787 -3.25208,2.99262 -3.29499,5.13165c-1.07301,1.66331 -1.55851,-1.04366 -0.94336,-1.93517c0.71151,-2.68981 3.21437,-4.6965 5.96379,-4.95994c-0.02309,-6.18768 0.05789,-12.37795 -0.0724,-18.56376c-0.77864,-1.75246 -2.95971,-0.21537 -2.37883,1.31893c-0.05732,4.67804 -0.00639,9.35761 -0.08638,14.03546c-0.52015,0.83177 -1.50527,0.04293 -1.18382,-0.72455c-0.02221,-5.86016 -0.04444,-11.72045 -0.06657,-17.58063c-0.41703,-1.03489 -2.26525,-0.87305 -2.29453,0.26286c-0.02223,6.04748 -0.04524,12.09496 -0.06791,18.14238c-0.48647,0.68519 -1.48566,0.08949 -1.21694,-0.65841c-0.01769,-4.55501 0.05008,-9.11263 -0.06845,-13.6663c-0.02988,-1.35549 -2.29956,-1.32171 -2.33033,-0.06482c-0.04488,4.6692 0.01198,9.34134 -0.12445,14.00872c0.12893,1.18903 -1.54567,0.62184 -1.16,-0.27761c-0.02034,-3.17275 0.05577,-6.34933 -0.07382,-9.51966c-0.76318,-1.95581 -3.04556,-0.34106 -2.40912,1.28458c0.00715,5.62667 -0.05123,11.25598 0.09084,16.88112c0.34903,4.32156 4.50983,7.88004 8.83791,7.59609c0.40821,-0.01695 0.81514,-0.06371 1.21658,-0.13987l0,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#000000" fill={this.state.col}/>
  					<ellipse ry="5.30598" rx="5.30598" id="svg_38" cy="9.583" cx="18.79338" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#000000" fill={this.state.col}/>
					<text fontWeight="bold" stroke={this.state.col} transform="matrix(0.3952723529750775,0,0,0.5559273971165859,17.229926784815113,25.804202517850843) " textAnchor="middle" fontFamily="Monospace" fontSize="22" y="59.58796" x="37.21191" strokeWidth="1" fill={this.state.col}>Select</text>
					</g>
				);
			case 'addv':
				return (
					<g>
					<ellipse stroke="#000000" ry="15.01694" rx="15.01694" id="svg_20" cy="24.70004" cx="26.29526" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={this.state.col}/>
					<path id="svg_21" d="m37.11761,7.42582l5.38181,0l0,-5.38204l5.52096,0l0,5.38204l5.38227,0l0,5.52096l-5.38227,0l0,5.38204l-5.52096,0l0,-5.38204l-5.38181,0l0,-5.52096z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#000000" fill={this.state.col}/>
					<g id="svg_27">
					<rect transform="rotate(-26.404560089111328 22.42422676086426,24.412738800048828) " stroke="#000000" id="svg_24" height="16.41852" width="4.9389" y="16.20348" x="19.95477" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={bgCol}/>
					<rect id="svg_25" transform="rotate(26 29.635559082031254,24.39800834655761) " stroke="#000000" height="16.41852" width="4.9389" y="16.18875" x="27.16611" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={bgCol}/>
					<rect stroke="#000000" id="svg_26" height="2.13574" width="4.39597" y="30.69665" x="23.83936" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={bgCol}/>
					</g>
					<text fontWeight="bold" stroke={this.state.col} transform="matrix(0.3952723529750775,0,0,0.5559273971165859,17.229926784815113,25.804202517850843) " textAnchor="middle" fontFamily="Monospace" fontSize="22" y="59.58796" x="37.21191" strokeWidth="1" fill={this.state.col}>Add Vertice</text>
					</g>
				 );
			case 'adde':
				return (
					<g>
					<rect transform="rotate(-49.18491744995117 31.307498931884783,25.35078048706055) " id="svg_35" height="28.13173" width="2.00226" y="11.28491" x="30.30637" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#000000" fill={this.state.col}/>
					<path id="svg_21" d="m37.11761,7.42582l5.38181,0l0,-5.38204l5.52096,0l0,5.38204l5.38227,0l0,5.52096l-5.38227,0l0,5.38204l-5.52096,0l0,-5.38204l-5.38181,0l0,-5.52096z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#000000" fill={this.state.col}/>
					<g stroke="null" id="svg_28">
					<ellipse stroke="#000000" ry="6.85773" rx="6.85773" id="svg_20" cy="13.43734" cx="17.23504" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={this.state.col}/>
					<g stroke="null" id="svg_27">
					<rect stroke="#000000" transform="matrix(0.4090255262986638,-0.20308261172494255,0.20308261172494255,0.4090255262986638,2.238400153254707,27.296580644874645) " id="svg_24" height="16.41852" width="4.9389" y="-22.7668" x="37.10082" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={bgCol}/>
					<rect stroke="#000000" id="svg_25" transform="matrix(0.4104492653039876,0.20018948264166989,-0.20018948264166989,0.4104492653039876,12.381790243371226,16.774444696459422) " height="16.41852" width="4.9389" y="-21.17179" x="6.74896" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={bgCol}/>
					<rect stroke="#000000" id="svg_26" height="0.97532" width="2.00749" y="16.17579" x="16.11351" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={bgCol}/>
					</g>
					</g>
					<g id="svg_29" stroke="null">
					<ellipse id="svg_30" stroke="#000000" ry="6.85773" rx="6.85773" cy="35.01167" cx="45.02296" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={this.state.col}/>
					<g id="svg_31" stroke="null">
					<rect id="svg_32" stroke="#000000" transform="matrix(0.4090255262986638,-0.20308261172494255,0.20308261172494255,0.4090255262986638,2.238400153254707,27.296580644874645) " height="16.41852" width="4.9389" y="46.60785" x="70.59296" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={bgCol}/>
					<rect id="svg_33" stroke="#000000" transform="matrix(0.4104492653039876,0.20018948264166989,-0.20018948264166989,0.4104492653039876,12.381790243371226,16.774444696459422) " height="16.41852" width="4.9389" y="-5.38466" x="82.1501" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={bgCol}/>
					<rect id="svg_34" stroke="#000000" height="0.97532" width="2.00749" y="37.75012" x="43.90144" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={bgCol}/>
					</g>
					</g>
					<text fontWeight="bold" stroke={this.state.col} transform="matrix(0.3952723529750775,0,0,0.5559273971165859,17.229926784815113,25.804202517850843) " textAnchor="middle" fontFamily="Monospace" fontSize="22" y="59.58796" x="37.21191" strokeWidth="1" fill={this.state.col}>Add Edge</text>
					</g>
				 );
			case 'dir':
				return (
					<g>
					<path transform="rotate(-59.239200592041016 33.14716720581055,24.887741088867188) " stroke="#000000" id="svg_47" d="m38.68546,37.3457l0.30494,-3.28201l-3.58955,-0.57114c-9.08823,-1.44597 -17.99676,-7.57754 -22.95686,-15.8008c-0.88992,-1.47534 -1.48557,-2.89677 -1.32364,-3.1587c0.37143,-0.60097 9.4214,-5.38532 10.1867,-5.38532c0.31221,0 1.06217,0.87992 1.66657,1.95536c2.57776,4.58658 9.24913,9.37038 13.94623,10.00037l1.90423,0.25543l-0.3274,-2.83652c-0.33989,-2.9446 -0.24422,-3.56294 0.55075,-3.56294c0.50839,0 15.68636,11.30793 16.1204,12.00999c0.32907,0.53258 -1.75852,2.50835 -9.23281,8.73822c-3.24677,2.706 -6.27459,4.92009 -6.72885,4.92009c-0.72687,0 -0.78926,-0.39283 -0.5207,-3.28204l0,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={this.state.col}/>
					<text fontWeight="bold" stroke={this.state.col} transform="matrix(0.3952723529750775,0,0,0.5559273971165859,17.229926784815113,25.804202517850843) " textAnchor="middle" fontFamily="Monospace" fontSize="22" y="59.58796" x="37.21191" strokeWidth="1" fill={this.state.col}>Directed</text>
					</g>
				 );
			case 'del':
				return (
					<g>
					<path id="svg_46" d="m10.73407,22.81454l0,0c0,-11.59883 9.40254,-21.00146 21.00145,-21.00146l0,0c5.56996,0 10.91186,2.21264 14.85021,6.15123c3.93869,3.93852 6.15126,9.28026 6.15126,14.85023l0,0c0,11.59882 -9.40245,21.00147 -21.00146,21.00147l0,0c-11.59891,0 -21.00145,-9.40265 -21.00145,-21.00147l0,0zm33.91264,9.39483l0,0c4.62378,-6.35441 3.93643,-15.12864 -1.62048,-20.68555c-5.5569,-5.5569 -14.3312,-6.24419 -20.68545,-1.62041l22.30593,22.30596l0,0zm-25.82208,-18.78959c-4.62408,6.35447 -3.93673,15.12857 1.62018,20.68534c5.5569,5.55704 14.3312,6.24435 20.68545,1.62056l-22.30563,-22.30591l0,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#000000" fill={this.state.col}/>
					<text fontWeight="bold" stroke={this.state.col} transform="matrix(0.3952723529750775,0,0,0.5559273971165859,17.229926784815113,25.804202517850843) " textAnchor="middle" fontFamily="Monospace" fontSize="22" y="59.58796" x="37.21191" strokeWidth="1" fill={this.state.col}>Delete</text>
					</g>
				 );
			case 'weight':
				return (
					<g>
					<rect stroke="#000000" transform="rotate(48.48933029174805 21.323406219482415,12.536419868469245) " id="svg_39" height="4.31138" width="18.98304" y="10.38073" x="11.83188" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={this.state.col}/>
					<rect id="svg_42" stroke="#000000" transform="rotate(48.48933029174805 43.42115783691408,36.613479614257805) " height="4.31138" width="18.98304" y="34.45779" x="33.92964" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={this.state.col}/>
					<rect stroke="#000000" id="svg_43" height="1.37499" width="6.60745" y="20.04167" x="29.93251" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={this.state.col}/>
					<rect stroke="#000000" transform="rotate(-55.922786712646484 33.30366516113281,24.96584129333496) " id="svg_44" height="1.36671" width="9.61078" y="24.28249" x="28.49827" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" fill={this.state.col}/>
					<text fontWeight="bold" stroke={this.state.col} transform="matrix(0.3952723529750775,0,0,0.5559273971165859,17.229926784815113,25.804202517850843) " textAnchor="middle" fontFamily="Monospace" fontSize="22" y="59.58796" x="37.21191" strokeWidth="1" fill={this.state.col}>Edge Weight</text>
					</g>
				 );
		}
	}

}