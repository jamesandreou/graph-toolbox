export default class Algorithm{

	constructor(g){
		this.g = g;
	}

	execute(cmd, dim){
		switch(cmd){
			case 'planar' :
				this.planarTest();
				break;
		}
	}

	planarTest(){
		// Convert graph to a single string
		let stringifyGraph = this.g.v.length.toString() + "-";
		for(let e of this.g.e){
	        stringifyGraph += e.v1.label.toString() + "," + e.v2.label.toString() + "-";
	    }
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log(xhttp.responseText);
		}
		};
		xhttp.open("POST", "/planar", true);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		const request = JSON.stringify({graph : stringifyGraph});
		xhttp.send(request);
		
	    // Send graph to planar.cpp
	    /*
	    $.post("/planar", {graph : stringifyGraph}, function(data){
	        if(data === "no") return;
	        var res = data.split("-");
	        for(var i = 0; i < this.g.v.length; i++){
	        	this.g.v[i].col = app['colors'][0];
	        }
	        if(res[0] === "p"){
	            res.shift();
	            producePlanarEmbedding(app, res);
	        }else if(res[0] === "k"){
	            res.shift();
	            isolateKurotowski(app, res);
	        }
	        draw(app);
	    });
	   */
	}


}