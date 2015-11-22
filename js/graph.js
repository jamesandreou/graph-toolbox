'use strict';
/* 
   	Graph Theory Visual Web App
    Written by James Andreou, University of Waterloo
*/

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
	app['2d'].clearRect(0, 0, app['canvas'].width, app['canvas'].height);
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
	var gridSize = Math.min(w, h) / 20;
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
	var r = Math.min(app['canvas'].width, app['canvas'].height) / 40;
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
	$(window).resize(function() { resize(app);});
	$('.tool').click(function(){
		selectTool(app, this);
	});
	$("#canvas").mousedown(function(e){
		e.preventDefault();
	    var x = Math.floor(e.pageX-$("#canvas").offset().left);
	    var y = Math.floor(e.pageY-$("#canvas").offset().top);
	    switch(app['tool']){
	    	case 1:
	    		app['bound'] = selectObject(app, x, y);
	    		break;
	    }
	    draw(app);
 	});
 	$("#canvas").mouseup(function(e){
 		e.preventDefault();
	    app['bound'] = null;
	    app['boundType'] = null;
	    draw(app);
 	});
 	$('#canvas').mousemove(function(e){
 		e.preventDefault();
 		if(app['bound'] === null) return;
 		var x = Math.floor(e.pageX-$("#canvas").offset().left);
	    var y = Math.floor(e.pageY-$("#canvas").offset().top);
 		moveObject(app, x, y);
 	});
}

function selectTool(app, tool){
	var id = $(tool).attr('id');
	if(id === 'sel-btn'){
		app['tool'] = 1;
	}else if(id === 'addv-btn'){
		app['tool'] = 2;
	}else if(id === 'adde-btn'){
		app['tool'] = 3;
	}else if(id === 'edgew-btn'){
		app['tool'] = 4;
	}else if(id === 'edged-btn'){
		app['tool'] = 5;
	}else if(id === 'del-btn'){
		app['tool'] = 6;
	}
	$('.tool > img').each(function (){
		var oldSrc = $(this).attr('src');
		var newSrc = oldSrc.substring(0, oldSrc.length - 5);
		if($(this).parent().attr('id') === id){
			newSrc += '0.svg';
		}else{
			newSrc += '1.svg';
		}
		$(this).attr('src', newSrc);
	});
}

function moveObject(app, x, y){
	if(app['boundType'] === 'v'){
 		app['bound'].x = x;
 		app['bound'].y = y;
 	}
 	draw(app);
}

/* Helper functions for UI */

function resize(app){
	document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no"; 
    var w = $('.canvas-container').width(); 
    var h = $('.canvas-container').height();
	app['canvas'].width = w;
	app['canvas'].height = h;
	$('.tool > img').width($('.panel').width() * 0.25);
	$('.tool').width(($('.panel').width() - 24) / 3);
	var r = Math.min(app['canvas'].width, app['canvas'].height) / 40;
	// If vertices are outside the canvas after resize shift back in
	for(var i = 0; i < app['g'].v.length; i++){
		var v  = app['g'].v[i];
		if(v.x > w - r - 2){
			v.x -= (v.x - w) + r + 10;
		}else if(v.y > h - r - 2){
			v.y -= (v.y - h) + r + 10;
		}
	}
	draw(app);
	draw(app);
}

function selectObject(app, x, y){
	var r = Math.min(app['canvas'].width, app['canvas'].height) / 40;
	for(var i = 0; i < app['g'].v.length; i++){
		var v = app['g'].v[i];
		app['2d'].beginPath();
		app['2d'].arc(v.x, v.y, r, 0, Math.PI * 2, false);
		if(app['2d'].isPointInPath(x, y)){
			app['boundType'] = 'v';
			return v;
		} 
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
            	app['boundType'] = 'e';
                return o;
            }
		}
	}
	return null;
}

$(window).ready(function(){
	var app = {'canvas' : document.getElementById('canvas'), 
				'2d' : canvas.getContext('2d'),
				'g' : {v : [], e : []},
				'tool' : 1, // 1 - Select, 2 - Add Vertice, 3 - Add Edge, 4 - Edge Weight, 5 - Edge Dir, 6 - Delete
				'bound' : null,
				'boundType' : null
			};
	resize(app);
	initEventListeners(app);
	app['g'].v.push(new Vertice("1", 100, 100, '#32cd32'));
	app['g'].v.push(new Vertice("2", 400, 200, '#ff0000'));
	app['g'].e.push(new Edge(app['g'].v[0], app['g'].v[1], null, null));
	draw(app);
	draw(app);
});