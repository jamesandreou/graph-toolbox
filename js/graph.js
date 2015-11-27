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
	this.wx = 0;
	this.wy = 0;
	// Avoid recalculating bezier control point constantly, save alot of cpu
	this.cacheControlPoint = function(){
		// Calculate control points based off bezier function at t = 0.5, derivative critical point
		// I rearranged the equation for x,y respectively given x0,x1 and t = 0.5
		// Interesting that it simplifies down to c = (P / 0.25 -P1-P2) / 2
		var px = (this.v2.x - this.v1.x) / 2 + this.v1.x + this.curveX;
		var py = (this.v2.y - this.v1.y) / 2 + this.v1.y + this.curveY;
		this.c1 = (px / 0.25 - this.v2.x - this.v1.x) / 2;
		this.c2 = (py / 0.25 - this.v2.y - this.v1.y) / 2;
		this.wx = px;
		this.wy = py;
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
	app['2d'].font = 'bolder ' + (r * 1.25) + 'px Georgia';
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
	var r = Math.min(app['canvas'].width, app['canvas'].height) / 40;
	app['2d'].strokeStyle = '#000000';
	app['2d'].lineWidth = e === app['bound'] ? 4 : 2;
	app['2d'].beginPath();
	app['2d'].moveTo(e.v1.x, e.v1.y);
	app['2d'].quadraticCurveTo(e.c1, e.c2, e.v2.x, e.v2.y);
	app['2d'].stroke();
	app['2d'].closePath();
	// Draw weight of edge
	if(e.weight !== null){
		app['2d'].font = 'bolder ' + (r / 1.5 * 1.25) + 'px Georgia';
		app['2d'].textBaseline = 'middle';
		app['2d'].textAlign = 'center';
		app['2d'].beginPath();
		var w = app['2d'].measureText(e.weight.toString()).width + app['2d'].lineWidth;
		var h = r * 1.25;
		app['2d'].rect(e.wx-w/2, e.wy - h / 2, w, h);
		app['2d'].fillStyle = '#ffffff';
		app['2d'].fill();
		app['2d'].stroke();
		app['2d'].closePath();
		app['2d'].fillStyle = '#000000';
		app['2d'].fillText(e.weight.toString(), e.wx, e.wy);
	}
	// Draw directed edge
	if(e.dir !== null){
		var v1 = e.dir === e.v1 ? e.v1 : e.v2;
		var v2 = e.dir === e.v1 ? e.v2 : e.v1;
		var p1x = xOfCurve(v1.x, e.c1, v2.x, 0.25);
		var p1y = yOfCurve(v1.y, e.c2, v2.y, 0.25);
		var p2x = xOfCurve(v1.x, e.c1, v2.x, 0.3);
		var p2y = yOfCurve(v1.y, e.c2, v2.y, 0.3);
		var d = Math.sqrt((p2x-p1x) * (p2x-p1x) + (p2y-p1y) * (p2y-p1y));
		var pct = r / d;
		var endX = p1x + pct * (p2x - p1x);
		var endY = p1y + pct * (p2y - p1y);
		var angle = Math.atan2(endY - p1y, endX - p1x);
		app['2d'].beginPath();
		app['2d'].moveTo(endX + r / 2 * Math.cos(angle+Math.PI/2), endY + r / 2 * Math.sin(angle+Math.PI/2));
		app['2d'].lineTo(p1x, p1y);
		app['2d'].lineTo(endX + r / 2 * Math.cos(angle-Math.PI/2), endY + r / 2 * Math.sin(angle-Math.PI/2));
		app['2d'].stroke();
	}
}

function xOfCurve(x1, cx, x2, t){
	return (1-t) * (1-t) * x1 + 2 * (1-t) * t * cx + t * t * x2;
}

function yOfCurve(y1, cy, y2, t){
	return (1-t) * (1-t) * y1 + 2 * (1-t) * t * cy + t * t * y2;
}

/* Event Listeners */

function initEventListeners(app){
	$(window).resize(function() { resize(app);});
	toolEvents(app);
	canvasEvents(app);
	selectTool(app, $('#sel-btn > img'));
}

function toolEvents(app){
	$('.tool').click(function(){
		selectTool(app, $(this).attr('id'));
	});
	$('.tool').mouseenter(function(){
		if($(this).hasClass('active')) return;
		var oldSrc = $(this).children('img').attr('src');
		var newSrc = oldSrc.substring(0, oldSrc.length - 5) + '0.svg';
		$(this).children('img').attr('src', newSrc);
		$(this).children('.label').css('color', '#ffffff');
	});
	$('.tool').mouseleave(function(){
		if($(this).hasClass('active')) return;
		var oldSrc = $(this).children('img').attr('src');
		var newSrc = oldSrc.substring(0, oldSrc.length - 5) + '1.svg';
		$(this).children('img').attr('src', newSrc);
		$(this).children('.label').css('color', '#5c5c5c');
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
	    	case 2:
	    		addV(app, x, y , 0);
	    		break;
	    	case 3:
	    		if(app['boundType'] !== 'v'){
	    			app['bound'] = selectObject(app, x, y);
	    		}else{
	    			var selectSecond = selectObject(app, x, y);
	    			if(app['boundType'] === 'v'){
	    				addNewEdgeIfPossible(app, selectSecond);
	    			}else{
	    				app['bound'] = selectSecond;
	    			}
	    		}
	    		break;
	    	case 5:
	    		if(app['boundType'] === 'e'){
	    			var selectDirection = selectObject(app, x, y);
	    			if(app['boundType'] === 'v' && 
	    				(app['bound'].v1 === selectDirection || app['bound'].v2 === selectDirection)){
	    				app['bound'].dir = selectDirection;
	    			app['bound'] = null;
	    			app['boundType'] = null;
	    			}else{
	    				app['bound'] = selectDirection;
	    			}
	    		}else{
	    			app['bound'] = selectObject(app, x, y);
	    		}
	    		break;
	    	case 6:
	    		var toDelete = selectObject(app, x, y);
	    		deleteObject(app, toDelete);
	    		break;
	    }
	    draw(app);
 	});
 	$("#canvas").mouseup(function(e){
 		e.preventDefault();
 		if(app['tool'] === 1){
		    app['bound'] = null;
		    app['boundType'] = null;
	   	}
	    draw(app);
 	});
 	$('#canvas').mousemove(function(e){
 		e.preventDefault();
 		if(app['bound'] === null || app['tool'] !== 1) return;
 		var x = Math.floor(e.pageX-$("#canvas").offset().left);
	    var y = Math.floor(e.pageY-$("#canvas").offset().top);
 		moveObject(app, x, y);
 	});
}

function selectTool(app, id){
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
	$('.tool').each(function (){
		var oldSrc = $(this).children('img').attr('src');
		var newSrc = oldSrc.substring(0, oldSrc.length - 5);
		if($(this).attr('id') === id){
			newSrc += '0.svg';
			if(!$(this).hasClass('active')) $(this).addClass('active');
			$(this).children('.label').css('color', '#ffffff');
		}else{
			newSrc += '1.svg';
			if($(this).hasClass('active')) $(this).removeClass('active');
			$(this).children('.label').css('color', '#5c5c5c');
		}
		$(this).children('img').attr('src', newSrc);
	});
	setSlider(app);
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

function deleteObject(app, toDelete){
	// Delete all edges that are incident to vertice
	// Delete vertice
	// or Delete edge
	if(app['boundType'] === 'v'){
		for(var i = 0; i < app['g'].e.length; i++){
			if(app['g'].e[i].v1 === toDelete || app['g'].e[i].v2 === toDelete){
				app['g'].e.splice(i, 1);
			}
		}
		for(var i = 0; i < app['g'].v.length; i++){
			if(app['g'].v[i] === toDelete){
				app['g'].v.splice(i, 1);
				break;
			}
		}
	}else if(app['boundType'] === 'e'){
		for(var i = 0; i < app['g'].e.length; i++){
			if(app['g'].e[i] === toDelete){
				app['g'].e.splice(i, 1);
				break;
			}
		}
	}
}

/* Helper functions for UI */

function resize(app){
	document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no"; 
    $('.canvas-container').width($(window).width() - 128);
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
	// Recalculate control points
	for(var i = 0; i < app['g'].e.length; i++){
		app['g'].e[i].cacheControlPoint();
	}
	// Toolbar
	var size = Math.floor($('.panel').height() * 0.1);
	if($(window).height() < 500){
		$('.label').css('font-size', '8px');
		$('.panel').width(80);
	}else{
		$('.label').css('font-size', '12px');
		$('.panel').width(128);
	}
	$('.tool').css('height', size);
	$('.tool > img').css('width', size - $('.label').height() - 8);
	$('.tool > img').css('height', size - $('.label').height() - 8);
	$('.banner').css('width', size);
	$('.banner').css('height', size);
	$('.slider').css('top', $())
	$('.slider').height($('.tool').height());
	setSlider(app);
	draw(app);
}

function setSlider(app){
	$('.slider').css('top', $('.tool').first().offset().top + $('.tool').outerHeight() * (app['tool']-1));
}

function selectObject(app, x, y){
	// Returns object that is found at x,y
	// Sets app['boundType'] to type of object found
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
	app['boundType'] = null;
	return null;
}

function addNewEdgeIfPossible(app, v2){
	var v1 = app['bound'];
	if(v1 !== v2){
		for(var i = 0; i < app['g'].e.length; i++){
			var e = app['g'].e[i];
			if((e.v1 === v1 && e.v2 === v2) || (e.v1 === v2 && e.v2 === v1)){
				return false;
			}
		}
	}else{
		return false;
	}
	var newEdge = new Edge(v1, v2, null, null);
	app['g'].e.push(newEdge);
	newEdge.cacheControlPoint();
	draw(app);
	return true;
}

function initUI(app){
	$('.slider').width(4);
	selectTool(app, 'sel-btn');
}

/* Preloaded graphs */

function addV(app, x, y, col){
	app['g'].v.push(new Vertice((app['g'].v.length + 1).toString(), x, y, app['colors'][col]));
}

function addE(app, v1, v2, dir, weight){
	app['g'].e.push(new Edge(app['g'].v[v1], app['g'].v[v2], dir, weight));
}

function defaultGraph(app){
	addV(app, 300, 200, 0);
	addV(app, 700, 550, 1);
	addV(app, 500, 600, 2);
	addV(app, 600, 50, 3);
	addV(app, 900, 200, 3);
	addE(app, 0, 1, app['g'].v[0], 5);
	app['g'].e[0].curveX = -50;
	app['g'].e[0].curveY = -180;
	addE(app, 2, 4, app['g'].v[4], 0);
	app['g'].e[1].curveX = -50;
	app['g'].e[1].curveY = -180;
	addE(app, 0, 4, app['g'].v[4], null);
	app['g'].e[0].curveX = 60;
	app['g'].e[0].curveY = 40;
	addE(app, 0, 2, app['g'].v[0], 3);
	addE(app, 1, 3, app['g'].v[3], 14);
	addE(app, 2, 3, app['g'].v[2], 9);
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
	initUI(app);
	defaultGraph(app);
	resize(app);
});
