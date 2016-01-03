export default class Vertice{

	constructor(args){
		this.label = args.label;
		this.x = args.x;
		this.y = args.y;
		this.col = this.getColor(args.col);
	}

	setPos(x, y){
		this.x = x;
		this.y = y;
	}

	getColor(n){
		switch(n){
			case 0 :
				return '#32cd32';
			case 1 :
				return '#ff0000';
			case 2 :
				return '#7ec0ee';
			case 3 :
				return '#ffff00';
			case 4 :
				return '#ffa500';
			default:
				return '#32cd32';
		}
	}

	draw(ctx, dim, bound){
		let r = Math.min(dim.width, dim.height) / 40;
		ctx.font = 'bold ' + (r * 1.25) + 'px Courier New';
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
		ctx.fillStyle = this.col;
		ctx.strokeStyle = '#000000';
		let lineFactor = (window.innerWidth < 1000) ? 1 : 2;
		ctx.lineWidth = bound ? 2 * lineFactor : 1 * lineFactor;
		ctx.beginPath();
		ctx.arc(this.x, this.y, r, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		ctx.fillStyle = '#000000';
		ctx.fillText(this.label, this.x , this.y);
	}

}