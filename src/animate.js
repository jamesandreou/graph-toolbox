export default class Animation{

	constructor(g, display){
		this.g = g;
		this.display = display;
		this.inProgress = false;
	}

	begin(newPositions, time){
		if(this.inProgress) return;
		this.inProgress = true;
		let intervals = time / 10;
	    let step = [];
	    let angle = [];
	    let oldPositions = this.g.v;
	    for(let i = 0; i < this.g.v.length; i++){
	        step.push(Math.sqrt((oldPositions[i].x-newPositions[i].x)*(oldPositions[i].x-newPositions[i].x)
	         + (oldPositions[i].y-newPositions[i].y)*(oldPositions[i].y-newPositions[i].y)) / intervals);
	        if(newPositions[i].x === oldPositions[i].x){
	            angle.push(Math.PI  / 2);
	        }else{
	            angle.push(Math.atan2(newPositions[i].y - oldPositions[i].y,newPositions[i].x-oldPositions[i].x));
	        }   
	    }
	    let id = window.setInterval((function(){
	        for(let i = 0; i < this.g.v.length; i++){
	            let signx = 1;
	            let signy = 1;
	            if(this.g.v[i].x >= newPositions.x) signx = -1;
	            if(this.g.v[i].y >= newPositions.y) signy = -1;
	            this.g.v[i].x += step[i] * Math.cos(angle[i]);
	            this.g.v[i].y += step[i] * Math.sin(angle[i]);
	        }
	        for(let e of this.g.e){
				e.cacheControlPoints();
			}
	        this.display.render();
	        intervals--;
	        if(intervals === 0){
	            window.clearInterval(id);
	            this.inProgress = false;
	        }
	    }).bind(this), 10);
	}

}