import Graph from './graph';
import Generator from './generator';

export default class Display{

	constructor(){
		this.g = new Graph();
		this.gen = new Generator(this.g);
	}

	initCanvas(ref){
		this.ctx = ref.getContext('2d');
		this.dim = {width : ref.width, height: ref.height};
		this.gen.bidiakisCube(this.dim);
	}

	executeCommand(section, cmd){
		console.log("Executing the command '" + cmd + "'.");
		switch (section){
			case 'Algorithms':
			case 'Tools':
				if(cmd === 'Center Graph'){
					this.centerGraph();
				}
				break;
			case 'Graphs':
		}
	}

	centerGraph(){
		if(this.g.isEmpty()) return;
		let minx = this.dim.width + 1;
		let miny = this.dim.height + 1;
		let maxx = -1;
		let maxy = -1;
		for(let v of this.g.v){
			if(v.x < minx) minx = v.x;
			if(v.y < miny) miny = v.y;
			if(v.x > maxx) maxx = v.x;
			if(v.y > maxy) maxy = v.y;
		}
		let shiftX = (minx + this.dim.width - maxx) / 2;
		let shiftY = (miny + this.dim.height - maxy) / 2;
		for(let v of this.g.v){
			v.x = shiftX + v.x - minx;
			v.y = shiftY + v.y - miny;
		}
		this.render(this.state);
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
		this.ctx.clearRect(0, 0, this.dim.width, this.dim.height);
		this.renderGrid();
		this.ctx.beginPath();
		this.ctx.moveTo(this.dim.width, 200);
		this.ctx.lineTo(this.dim.width, 400);
		this.ctx.stroke();
		this.g.draw(this.ctx, this.dim);
	}

}