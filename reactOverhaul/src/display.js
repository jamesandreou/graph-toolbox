import Graph from './graph';
import Generator from './generator';

export default class Display{

	constructor(args){
		this.state = args.state;
		this.ctx = args.ref.getContext('2d');
		this.dim = {width : args.ref.width, height: args.ref.height};
		this.g = new Graph();
		this.gen = new Generator(this.g);
		this.gen.bidiakisCube(this.dim);
	}

	executeCommand(cmd){
		console.log("Executing the command '" + cmd + "'.");
	}

	resize(ref){
		this.ctx = ref.getContext('2d');
		let oldDim = this.dim;
		this.dim = {width : ref.width, height: ref.height};
		this.g.resize(oldDim, this.dim);
	}

	renderGrid(){
		let gridSize = Math.min(this.dim.width, this.dim.height) / 20;
		this.ctx.strokeStyle = '#add8e6';
		this.ctx.lineWidth = 2;
		for(let x = 0; x < this.dim.width; x += gridSize){
			this.ctx.beginPath();
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, this.dim.height);
			this.ctx.stroke();
			this.ctx.closePath();
		}
		for(let y = 0; y < this.dim.height; y += gridSize){
			this.ctx.beginPath();
			this.ctx.moveTo(0, y);
			this.ctx.lineTo(this.dim.width, y);
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}

	render(state){
		this.state = state;
		this.renderGrid();
		this.g.draw(this.ctx, this.dim);
	}

}