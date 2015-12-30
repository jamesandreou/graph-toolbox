import Graph from './graph';
import Generator from './generator';
import Algorithm from './algorithm';
import PanelTools from './paneltools';
import Animation from './animate';

export default class Display{

	constructor(app, g){
		this.app = app;
		this.g = g;
		this.animate = new Animation(g, this);
		this.gen = new Generator(this.g);
		this.tools = new PanelTools(this.g);
		this.algs =  new Algorithm(this.g, this);
		this.tool = 'sel';
		this.bound = {obj : null, type : null};
	}

	initCanvas(ref){
		this.ctx = ref.getContext('2d');
		this.dim = {width : ref.width, height: ref.height, 
			off : ref.getBoundingClientRect()};
		this.gen.test(this.dim);
	}

	executeCommand(section, cmd){
		switch (section){
			case 'Algorithms':
				this.algs.execute(cmd, this.dim);
				break;
			case 'Tools':
				this.tools.execute(cmd, this.dim);
				break;
			case 'Graphs':
				this.gen.execute(cmd, this.dim);
				break;
		}
		this.render();
	}

	resize(ref){
		this.ctx = ref.getContext('2d');
		let oldDim = this.dim;
		this.dim = {width : ref.width, height: ref.height, 
			off : ref.getBoundingClientRect()};
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

	render(){
		this.ctx.clearRect(0, 0, this.dim.width, this.dim.height);
		this.renderGrid();
		this.ctx.beginPath();
		this.ctx.moveTo(this.dim.width, 200);
		this.ctx.lineTo(this.dim.width, 400);
		this.ctx.stroke();
		this.g.draw(this.ctx, this.dim, this.bound.obj);
	}

	handleMouseDown(e){
		let shouldUpdate = false;
		e.preventDefault();
	    let x = Math.floor(e.pageX-this.dim.off.left);
	    let y = Math.floor(e.pageY-this.dim.off.top);
	     switch(this.tool){
	    	case 'sel':
	    		this.bound = this.selectObject(x, y);
	    		break;
	    	case 'addv':
	    		this.g.addVerticeReal(x, y, 0);
	    		break;
	    	case 'adde':
	    		if(this.bound.type !== 'v'){
	    			this.bound = this.selectObject(x, y);
	    		}else{
	    			let selectSecond = this.selectObject(x, y);
	    			if(this.bound.type === 'v'){
	    				let success = this.g.addNewEdgeIfPossible(this.bound.obj, selectSecond.obj);
	    				if(!success) this.bound = {obj : null, type : null};
	    			}else{
	    				this.bound = selectSecond;
	    			}
	    		}
	    		break;
	    	case 'weight':
	    		/*
	    		this.bound.obj = selectObject(app, x, y);
	    		if(this.bound.type === 'e'){
	    			$('.weight-input').show();
	    			$('.weight-input').focus();
	    			$('.weight-input').val(this.bound.obj.weight);
	    		}else{
	    			$('.weight-input').hide();
	    		}
	    		*/
	    		break;
	    	case 'dir':
	    		if(this.bound.type === 'e'){
	    			let selectDirection = this.selectObject(x, y);
	    			if(selectDirection.type === 'v' && 
	    				(this.bound.obj.v1 === selectDirection.obj || this.bound.obj.v2 === selectDirection.obj)){
	    			this.bound.obj.dir = selectDirection.obj;
	    			this.bound.obj = null;
	    			this.bound.type = null;
	    			}else{
	    				this.bound.obj.dir = null;
	    				this.bound = selectDirection;
	    			}
	    			shouldUpdate = true;
	    		}else{
	    			this.bound = this.selectObject(x, y);
	    		}
	    		break;
	    	case 'del':
	    		let toDelete = this.selectObject(x, y);
	    		this.deleteObject(toDelete);
	    		break;
	    }
	    this.render();
	    if(shouldUpdate) this.app.update();
	}

	handleMouseMove(e){
		e.preventDefault();
 		if(this.bound.type === null || this.tool !== 'sel') return;
 		let x = Math.floor(e.pageX-this.dim.off.left);
	    let y = Math.floor(e.pageY-this.dim.off.top);
 		this.moveObject(x, y);
 		this.render();
	}

	handleMouseUp(e){
		e.preventDefault();
 		if(this.tool === 'sel'){
		    this.bound = {obj : null, type : null};
	   	}
	   	this.render();
	}

	selectObject(x, y){
		// Returns object that is found at x,y
		// Sets this.bound.type to type of object found
		let r = Math.min(this.dim.width, this.dim.height) / 40;
		for(let v of this.g.v){
			this.ctx.beginPath();
			this.ctx.arc(v.x, v.y, r, 0, Math.PI * 2, false);
			if(this.ctx.isPointInPath(x, y)){
				return {obj : v, type : 'v'};
			} 
			this.ctx.closePath();
		}
		for(let e of this.g.e){
			// Create path surrounding the edge's bezier curve with two more bezier curves shifted
			this.ctx.beginPath();
			this.ctx.moveTo(e.v1.x - 8, e.v1.y - 8);
			this.ctx.quadraticCurveTo(e.c1 + 8, e.c2 - 8, e.v2.x + 8, e.v2.y - 8);
			this.ctx.lineTo(e.v2.x - 8, e.v2.y + 8);
			this.ctx.quadraticCurveTo(e.c1 - 8, e.c2 + 8, e.v1.x + 8, e.v1.y + 8);
			this.ctx.lineTo(e.v1.x - 8, e.v1.y - 8);
			if(this.ctx.isPointInPath(x, y)){
				return {obj : e, type : 'e'};
			}
			this.ctx.closePath();
			// If weighted add hitbox of weight
			if(e.weight !== null){
				this.ctx.beginPath();
				this.ctx.font = 'bolder ' + (r / 1.5 * 1.25) + 'px Georgia';
				var w = this.ctx.measureText(e.weight.toString()).width + this.ctx.lineWidth + 4;
				var h = r * 1.25 + 3;
				this.ctx.rect(e.wx-w/2, e.wy - h / 2, w, h);
				if(this.ctx.isPointInPath(x, y)){
					return {obj : e, type : 'e'};
				}
			}
		}
		return {obj : null, type : null};
	}


	moveObject(x, y){
		let o = this.bound.obj;
		if(this.bound.type === 'v'){
	 		o.x = x;
	 		o.y = y;
	 		for(let e of this.g.e){
	 			if(e.v1 === o || e.v2 === o){
	 				e.cacheControlPoints();
	 			}
	 		}
	 	}else if(this.bound.type === 'e'){
	 		o.curveX = x - ((o.v2.x - o.v1.x) / 2 + o.v1.x);
	 		o.curveY = y - ((o.v2.y - o.v1.y) / 2 + o.v1.y);
	 		o.cacheControlPoints();
	 	}
	}

	deleteObject(toDelete){
		// Delete all edges that are incident to vertice
		// Delete vertice
		// or if an edge just delete edge
		if(toDelete.type === 'v'){
			let badEdges = [];
			for(let i = 0; i < this.g.e.length; i++){
				if(this.g.e[i].v1 === toDelete.obj || this.g.e[i].v2 === toDelete.obj){
					badEdges.push(i);
				}
			}
			while(badEdges.length > 0){
				this.g.e.splice(badEdges.pop(), 1);
			}
			for(let i = 0; i < this.g.v.length; i++){
				if(this.g.v[i] === toDelete.obj){
					this.g.v.splice(i, 1);
					break;
				}
			}
			for(let i = 0; i < this.g.v.length; i++){
				this.g.v[i].label = i.toString();
			}
		}else if(toDelete.type === 'e'){
			for(let i = 0; i < this.g.e.length; i++){
				if(this.g.e[i] === toDelete.obj){
					this.g.e.splice(i, 1);
					break;
				}
			}
		}
	}

}