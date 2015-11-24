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
	this.curveX = 0;
	this.curveY = 0;
	this.cx = 0;
	this.cy = 0;
	// Avoid recalculating bezier control point constantly, save alot of cpu
	this.cacheControlPoint = function(){
		// Calculate control points based off bezier function at t = 0.5, derivative critical point
		// I rearranged the equation for x,y respectively given x0,x1 and t = 0.5
		// Interesting that it simplifies down to c = (P / 0.25 -P1-P2) / 2
		var px = (this.v2.x - this.v1.x) / 2 + this.v1.x + this.curveX;
		var py = (this.v2.y - this.v1.y) / 2 + this.v1.y + this.curveY;
		this.c1 = (px / 0.25 - this.v2.x - this.v1.x) / 2;
		this.c2 = (py / 0.25 - this.v2.y - this.v1.y) / 2;
	}
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
	app['2d'].lineWidth = 2;
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
	app['2d'].lineWidth = v === app['bound'] ? 4 : 2;
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
	app['2d'].lineWidth = e === app['bound'] ? 4 : 2;
	app['2d'].beginPath();
	app['2d'].moveTo(e.v1.x, e.v1.y);
	app['2d'].quadraticCurveTo(e.c1, e.c2, e.v2.x, e.v2.y);
	app['2d'].stroke();
	app['2d'].closePath();
}

/* Event Listeners */

function initEventListeners(app){
	$(window).resize(function() { resize(app);});
	toolEvents(app);
	canvasEvents(app);
}

function toolEvents(app){
	$('.tool > img').click(function(){
		selectTool(app, this);
	});
	$('.tool > img').mouseenter(function(){
		if($(this).parent().hasClass('active')) return;
		var oldSrc = $(this).attr('src');
		var newSrc = oldSrc.substring(0, oldSrc.length - 5) + '0.svg';
		$(this).attr('src', newSrc);
	});
	$('.tool > img').mouseleave(function(){
		if($(this).parent().hasClass('active')) return;
		var oldSrc = $(this).attr('src');
		var newSrc = oldSrc.substring(0, oldSrc.length - 5) + '1.svg';
		$(this).attr('src', newSrc);
	});
}

function canvasEvents(app){
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
	var id = $(tool).parent().attr('id');
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
			if(!$(this).parent().hasClass('active')) $(this).parent().addClass('active');
		}else{
			newSrc += '1.svg';
			if($(this).parent().hasClass('active')) $(this).parent().removeClass('active');
		}
		$(this).attr('src', newSrc);
	});
}

function moveObject(app, x, y){
	var o = app['bound'];
	if(app['boundType'] === 'v'){
 		o.x = x;
 		o.y = y;
 		for(var i = 0; i < app['g'].e.length; i++){
 			var e = app['g'].e[i];
 			if(e.v1 === o || e.v2 === o){
 				e.cacheControlPoint();
 			}
 		}
 	}else if(app['boundType'] === 'e'){
 		o.curveX = x - ((o.v2.x - o.v1.x) / 2 + o.v1.x);
 		o.curveY = y - ((o.v2.y - o.v1.y) / 2 + o.v1.y);
 		o.cacheControlPoint();
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
	// Resize toolbar
	$('.tool > img').width($('.panel').width() * 0.25);
	$('.tool').width(($('.panel').width() - 24) / 3);
	if($(window).width() < 400){
		$('h1').css('font-size', 16);
	}else if($(window).width() < 700){
		$('h1').css('font-size', 22);
	}else{
		$('h1').css('font-size', 36);
	} 
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
		var e = app['g'].e[i];
		// Create path surrounding the curves bezier curve with two more bezier curves shifted
		app['2d'].beginPath();
		app['2d'].moveTo(e.v1.x - 8, e.v1.y - 8);
		app['2d'].quadraticCurveTo(e.c1 + 8, e.c2 - 8, e.v2.x + 8, e.v2.y - 8);
		app['2d'].lineTo(e.v2.x - 8, e.v2.y + 8);
		app['2d'].quadraticCurveTo(e.c1 - 8, e.c2 + 8, e.v1.x + 8, e.v1.y + 8);
		app['2d'].lineTo(e.v1.x - 8, e.v1.y - 8);
		if(app['2d'].isPointInPath(x, y)){
			app['2d'].closePath();
			app['boundType'] = 'e';
			return e;
		}
		app['2d'].closePath();
	}
	return null;
}

/* Preloaded graphs */

function addV(app, label, x, y, col){
	app['g'].v.push(new Vertice(label, x, y, app['colors'][col]));
}

function addE(app, v1, v2, dir, weight){
	app['g'].e.push(new Edge(app['g'].v[v1], app['g'].v[v2], dir, weight));
}

function defaultGraph(app){
	addV(app, "1", 300, 200, 0);
	addV(app, "2", 700, 400, 1);
	addV(app, "3", 500, 600, 2);
	addV(app, "4", 600, 50, 3);
	addV(app, "5", 900, 200, 3);
	addE(app, 0, 1, null, null);
	app['g'].e[0].curveX = -50;
	app['g'].e[0].curveY = -180;
	addE(app, 2, 4, null, null);
	app['g'].e[1].curveX = -50;
	app['g'].e[1].curveY = -180;
	addE(app, 0, 4, null, null);
	app['g'].e[2].curveX = 80;
	app['g'].e[2].curveY = 40;
	addE(app, 0, 2, null, null);
	addE(app, 1, 3, null, null);
	addE(app, 2, 3, null, null);
	addE(app, 3, 4, null, null);
	for(var i = 0; i < app['g'].e.length; i++){
		app['g'].e[i].cacheControlPoint();
	}
}

$(window).ready(function(){
	var app = {'canvas' : document.getElementById('canvas'), 
				'2d' : canvas.getContext('2d'),
				'g' : {v : [], e : []},
				'colors' : ['#32cd32', '#ff0000', '#7ec0ee', '#ffff00'], // 1 - green, 2 - red, 3 - blue, 4 - yellow
				'tool' : 1, // 1 - Select, 2 - Add Vertice, 3 - Add Edge, 4 - Edge Weight, 5 - Edge Dir, 6 - Delete
				'bound' : null,
				'boundType' : null
			};
	initEventListeners(app);
	defaultGraph(app);
	resize(app);
});
