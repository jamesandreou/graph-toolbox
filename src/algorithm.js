export default class Algorithm{

	constructor(g, display){
		this.g = g;
		this.display = display;
	}

	execute(cmd, dim){
		switch(cmd){
			case 'planar' :
				this.planarTest(dim);
				break;
		}
	}

	/* Planarity Testing Algorithm */

	planarTest(dim){
		// Convert graph to a single string
		let stringifyGraph = this.g.v.length.toString() + "-";
		for(let e of this.g.e){
	        stringifyGraph += e.v1.label.toString() + "," + e.v2.label.toString() + "-";
	    }
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = (function(dim){
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				const data = xhttp.responseText;
				if(data === "no") return;
		        let res = data.split("-");
		        if(res[0] === "p"){
		           res.shift();
		           this.producePlanarEmbedding(res, dim);
		        }else if(res[0] === "k"){
		           res.shift();
		           this.isolateKurotowski(res);
		        }
			}
			this.display.render();
		}).bind(this, dim);
		xhttp.open("POST", "/planar", true);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		const request = JSON.stringify({graph : stringifyGraph});
		xhttp.send(request);
	}

	producePlanarEmbedding(res, dim){
		let newPositions = [];
	    for(let v of this.g.v){
	        newPositions.push({x : v.x, y : v.y});
	    }
	    // calculate new points
	    for(let i = 0; i < res.length - 1; i++){
	        let lab, nx, ny, nw, nh, mw, mh, xcord, ycord, resarr;
	        resarr = res[i].split(",");
	        lab = Number(resarr[0]);
	        nx = Number(resarr[1]);
	        ny = Number(resarr[2]);
	        nw = dim.width * 0.9;
	        nh = dim.height * 0.9;
	        mw = dim.width * 0.05;
	        mh = dim.height * 0.05;
	        xcord = nw / (2 * this.g.v.length -4);
	        ycord = nh / (this.g.v.length -2);
	        newPositions[lab].x = mw + nx * xcord;
	        newPositions[lab].y = mh + ny * ycord;
	    }
	    for(let e of this.g.e){
	        e.curveX = 0;
	        e.curveY = 0;
	    }
		this.display.animate.begin(newPositions, 1000);
	}

	isolateKurotowski(res){
		for(let v of this.g.v){
			v.col = v.getColor(0);
		}
		for(let e of this.g.e){
			e.col = e.getColor(0);
		}
	    for(let i = 0; i < res.length - 1; i++){
	        res[i] = res[i].slice(1, res[i].length - 1);
	        let vertices = res[i].split(",");
	        for(let e of this.g.e){
	            if((e.v1 === this.g.v[vertices[0]] && e.v2 === this.g.v[vertices[1]])
	                || (e.v1 === this.g.v[vertices[0]] && e.v2 === this.g.v[vertices[1]])){
	                e.col = e.getColor(1);
	                e.v1.col = e.v1.getColor(1);
	                e.v2.col = e.v1.getColor(1);
	                break;
	            }
	        }
	    }
	}

}