export default class PanelTools{

	constructor(g){
		this.g = g;
	}

	execute(cmd, dim){
		switch(cmd){
			case 'center' :
				this.centerGraph(dim);
				break;
		}
	}

	centerGraph(dim){
		if(this.g.isEmpty()) return;
		let minx = dim.width + 1;
		let miny = dim.height + 1;
		let maxx = -1;
		let maxy = -1;
		for(let v of this.g.v){
			if(v.x < minx) minx = v.x;
			if(v.y < miny) miny = v.y;
			if(v.x > maxx) maxx = v.x;
			if(v.y > maxy) maxy = v.y;
		}
		let shiftX = (minx + dim.width - maxx) / 2;
		let shiftY = (miny + dim.height - maxy) / 2;
		for(let v of this.g.v){
			v.x = shiftX + v.x - minx;
			v.y = shiftY + v.y - miny;
		}
	}

}