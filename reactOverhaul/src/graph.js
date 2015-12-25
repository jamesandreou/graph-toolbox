import Vertice from './vertice';
import Edge from './edge';

export default class Graph{

	constructor(){
		this.adj = []; // implement later for algorithms
		this.v = [];
		this.e = [];
	}

	addVertice(dim, x, y, col){
		let realX = dim.width * x / 100;
		let realY = dim.height * y / 100;
		this.v.push(new Vertice({
			label : this.v.length, 
			x : realX, 
			y : realY, 
			col : col}));
	}

	addEdge(v1, v2, dir, weight, cx, cy){
		this.e.push(new Edge({
			v1 : this.v[v1],
			v2 : this.v[v2],
			dir : (dir !== 0) ? 
				((dir === 1) ? this.v[v1] : this.v[v2]) : null,
			weight : weight,
			curveX : cx,
			curveY : cy
		}));
	}

	resize(oldDim, newDim){
		let factorX = newDim.width / oldDim.width;
		let factorY = newDim.height / oldDim.height;
		for(let v of this.v){
			v.setPos(v.x * factorX, v.y * factorY);
		}
		for(let e of this.e){
			e.cacheControlPoints();
		}
	}

	draw(ctx, dim){
		for(let e of this.e){
			e.draw(ctx, dim);
		}
		for(let v of this.v){
			v.draw(ctx, dim);
		}
	}

}