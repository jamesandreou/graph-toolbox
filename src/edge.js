export default class Edge{

	constructor(args){
		this.v1 = args.v1;
		this.v2 = args.v2;
		this.dir = args.dir;
		this.weight = args.weight;
		this.curveX = args.curveX;
		this.curveY = args.curveY;
		this.cx = 0;
		this.cy = 0;
		this.wx = 0;
		this.wy = 0;
		this.col = this.getColor(0);
		this.cacheControlPoints();
	}

	cacheControlPoints(){
		// Calculate control points based off bezier function at t = 0.5, derivative critical point
		// I rearranged the equation for x,y respectively given x0,x1 and t = 0.5
		// Interesting that it simplifies down to c = (P / 0.25 -P1-P2) / 2
		let px = (this.v2.x - this.v1.x) / 2 + this.v1.x + this.curveX;
		let py = (this.v2.y - this.v1.y) / 2 + this.v1.y + this.curveY;
		this.c1 = (px / 0.25 - this.v2.x - this.v1.x) / 2;
		this.c2 = (py / 0.25 - this.v2.y - this.v1.y) / 2;
		this.wx = px;
		this.wy = py;
	}

	draw(ctx, dim, bound){
		let r = Math.min(dim.width, dim.height) / 40;
		ctx.strokeStyle = this.col;
		ctx.lineWidth = bound ? 4 : 2;
		ctx.beginPath();
		ctx.moveTo(this.v1.x, this.v1.y);
		ctx.quadraticCurveTo(this.c1, this.c2, this.v2.x, this.v2.y);
		ctx.stroke();
		ctx.closePath();
		// Draw weight of edge
		if(this.weight !== null){
			ctx.font = 'bolder ' + (r / 1.5 * 1.25) + 'px Georgia';
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'center';
			ctx.beginPath();
			let w = ctx.measureText(this.weight.toString()).width + ctx.lineWidth + 4;
			let h = r * 1.25 + 3;
			ctx.rect(this.wx-w/2, this.wy - h / 2, w, h);
			ctx.fillStyle = '#ffffff';
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
			ctx.fillStyle = '#000000';
			ctx.fillText(this.weight.toString(), this.wx, this.wy);
		}
		// Draw directed edge
		if(this.dir !== null){
			let v1 = this.dir === this.v1 ? this.v1 : this.v2;
			let v2 = this.dir === this.v1 ? this.v2 : this.v1;
			let p1x = this.xOfCurve(v1.x, this.c1, v2.x, 0.25);
			let p1y = this.yOfCurve(v1.y, this.c2, v2.y, 0.25);
			let p2x = this.xOfCurve(v1.x, this.c1, v2.x, 0.3);
			let p2y = this.yOfCurve(v1.y, this.c2, v2.y, 0.3);
			let d = Math.sqrt((p2x-p1x) * (p2x-p1x) + (p2y-p1y) * (p2y-p1y));
			let pct = r / d;
			let endX = p1x + pct * (p2x - p1x);
			let endY = p1y + pct * (p2y - p1y);
			let angle = Math.atan2(endY - p1y, endX - p1x);
			ctx.beginPath();
			ctx.moveTo(endX + r / 3 * Math.cos(angle+Math.PI/2), endY + r / 3 * Math.sin(angle+Math.PI/2));
			ctx.lineTo(p1x, p1y);
			ctx.lineTo(endX + r / 3 * Math.cos(angle-Math.PI/2), endY + r / 3 * Math.sin(angle-Math.PI/2));
			ctx.stroke();
		}
	}

	getColor(n){
		switch(n){
			case 0 :
				return '#000000';
			case 1 :
				return '#ff0000';
			default:
				return '#000000';
		}
	}

	xOfCurve(x1, cx, x2, t){
		return (1-t) * (1-t) * x1 + 2 * (1-t) * t * cx + t * t * x2;
	}

	yOfCurve(y1, cy, y2, t){
		return (1-t) * (1-t) * y1 + 2 * (1-t) * t * cy + t * t * y2;
	}

}