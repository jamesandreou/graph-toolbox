import Vertice from './vertice';
import Edge from './edge';

export default class Graph{

	constructor(){
		this.adj = []; // implement later for algorithms
		this.v = [];
		this.e = [];
	}

	addVerticeReal(realX, realY, col){
		this.v.push(new Vertice({
			label : this.v.length, 
			x : realX, 
			y : realY, 
			col : col}));
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

	addNewEdgeIfPossible(v1, v2){
		if(v1 != null && v2 != null && v1 !== v2){
			for(let e of this.e){
				if((e.v1 === v1 && e.v2 === v2) || (e.v1 === v2 && e.v2 === v1)){
					return false;
				}
			}
		}else{
			return false;
		}
		this.e.push(new Edge({
			v1 : v1,
			v2 : v2,
			dir : null,
			weight : null,
			curveX : 0,
			curveY : 0
		}));
		return true;
	}

	isEmpty(){
		return (this.v.length <= 0);
	}

	cache(){
		for(let e of this.e){
			e.cacheControlPoints();
		}
	}

	resize(oldDim, newDim){
		let factorX = newDim.width / oldDim.width;
		let factorY = newDim.height / oldDim.height;
		for(let v of this.v){
			v.setPos(v.x * factorX, v.y * factorY);
		}
		this.cache();
	}

	draw(ctx, dim, bound){
		this.cache();
		for(let e of this.e){
			e.draw(ctx, dim, e === bound);
		}
		for(let v of this.v){
			v.draw(ctx, dim, v === bound);
		}
	}

}