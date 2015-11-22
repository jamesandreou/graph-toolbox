'use strict';

$(window).ready(function(){
	var app = {'canvas' : document.getElementById('canvas'), 
				'2d' : canvas.getContext('2d'),
				'g' : {v : [], e : []},
				'tool' : 1, // 1 - Select, 2 - Add Vertice, 3 - Add Edge, 4 - Delete
				'bound' : null
			};
	resizeCanvas(app);
	initEventListeners(app);
	app['g'].v.push(new Vertice("1", 100, 100, '#32cd32'));
	app['g'].v.push(new Vertice("2", 400, 200, '#ff0000'));
	app['g'].e.push(new Edge(app['g'].v[0], app['g'].v[1], null, null));
	draw(app);
});

/* Base Objects */


function Vertice(label, x, y, col) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.col = col;
}

function Edge(v1, v2, dir, weight){
	this.v1 = v1;
	this.v2 = v2;
	if(dir !== null && (dir === v1 || dir === v2)){
		this.dir = dir;
	}else{
		this.dir = null;
	}
	if(weight !== null){
		this.weight = weight;
	}else{
		this.weight = null;
	}
	this.curve = 0;
}

/* Canvas Drawing Functions */

function draw(app){
	drawBackground(app);
	for(var i = 0; i < app['g'].e.length; i++){
		drawEdge(app, app['g'].e[i]);
	}
	for(var i = 0; i < app['g'].v.length; i++){
		drawVertice(app, app['g'].v[i]);
	}
}

function drawBackground(app){
	var w = app['canvas'].width, h = app['canvas'].height;
	var gridSize = Math.min(w, h) / 40;
	app['2d'].strokeStyle = '#add8e6';
	// Grid
	for(var x = 0; x < w; x += gridSize){
		app['2d'].beginPath();
		app['2d'].moveTo(x, 0);
		app['2d'].lineTo(x, h);
		app['2d'].stroke();
		app['2d'].closePath();
	}
	for(var y = 0; y < h; y += gridSize){
		app['2d'].beginPath();
		app['2d'].moveTo(0, y);
		app['2d'].lineTo(w, y);
		app['2d'].stroke();
		app['2d'].closePath();
	}
}

function drawVertice(app, v){
	var r = app['canvas'].width / 80;
	app['2d'].font = (r * 1.25) + 'px Georgia';
	app['2d'].textBaseline = 'middle';
	app['2d'].textAlign = 'center';
	app['2d'].fillStyle = v.col;
	app['2d'].strokeStyle = '#000000';
	app['2d'].lineWidth = 2;
	app['2d'].beginPath();
	app['2d'].arc(v.x, v.y, r, 0, Math.PI * 2, false);
	app['2d'].fill();
	app['2d'].stroke();
	app['2d'].closePath();
	app['2d'].fillStyle = '#000000';
	app['2d'].fillText(v.label, v.x, v.y);
}

function drawEdge(app, e){
	app['2d'].strokeStyle = '#000000';
	app['2d'].lineWidth = 2;
	app['2d'].beginPath();
	app['2d'].moveTo(e.v1.x, e.v1.y);
	app['2d'].lineTo(e.v2.x, e.v2.y);
	app['2d'].stroke();
	app['2d'].closePath();
}

/* Event Listeners */

function initEventListeners(app){
	$('#sel-btn').click(function (){
		app['tools'] = 1;
	});
	$('#addv-btn').click(function (){
		app['tools'] = 2;
	});
	$('#adde-btn').click(function (){
		app['tools'] = 3;
	});
	$('#del-btn').click(function (){
		app['tools'] = 4;
	});
	$("#canvas").mousedown(function(e){
	    var x = Math.floor(e.pageX-$("#canvas").offset().left);
	    var y = Math.floor(e.pageY-$("#canvas").offset().top);
	    if(app['bound'] === null){
	    	app['bound'] = findObjectAt(app, x, y);
	    	console.log(app['bound']);
	    }
 	});
 	$("#canvas").mouseup(function(e){
	    app['bound'] = null;
 	});
}

/* Helper functions for UI */

function resizeCanvas(app){
	document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no"; 
	app['canvas'].width = $('.canvas-container').width();
	app['canvas'].height = $('.canvas-container').height();
}

function findObjectAt(app, x, y){
	var r = app['canvas'].width / 80;
	for(var i = 0; i < app['g'].v.length; i++){
		var v = app['g'].v[i];
		app['2d'].beginPath();
		app['2d'].arc(v.x, v.y, r, 0, Math.PI * 2, false);
		if(app['2d'].isPointInPath(x, y)) return v;
		app['2d'].closePath();
	}
	for(var i = 0; i < app['g'].e.length; i++){
		var o = app['g'].e[i];
		// Linear Distance Check, used if edge is not curved
		if(o.curve === 0){
			var a = Math.sqrt((o.v2.x - o.v1.x) * (o.v2.x - o.v1.x) +
                                  (o.v2.y - o.v1.y) * (o.v2.y - o.v1.y));
            var b = Math.sqrt((o.v2.x - x) * (o.v2.x - x) +
                              (o.v2.y - y) * (o.v2.y - y));
            var c = Math.sqrt((o.v1.x - x) * (o.v1.x - x) +
                              (o.v1.y - y) * (o.v1.y - y));
            if(a <= b + c + 1 && a > b + c - 1){
                return o;
            }
		}
	}
	return null;
}