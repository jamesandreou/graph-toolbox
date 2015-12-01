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

function Edge(v1, v2, dir, weight, curveX, curveY){
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
	this.curveX = curveX;
	this.curveY = curveY;
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
		var w = app['2d'].measureText(e.weight.toString()).width + app['2d'].lineWidth + 4;
		var h = r * 1.25 + 3;
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
		app['2d'].moveTo(endX + r / 3 * Math.cos(angle+Math.PI/2), endY + r / 3 * Math.sin(angle+Math.PI/2));
		app['2d'].lineTo(p1x, p1y);
		app['2d'].lineTo(endX + r / 3 * Math.cos(angle-Math.PI/2), endY + r / 3 * Math.sin(angle-Math.PI/2));
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
	$('#planar').click(throttle(function(){
		planarTest(app);
	}, 5000));
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
	    		app['g'].v.push(new Vertice((app['g'].v.length).toString(), x, y, app['colors'][0]));
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
	    	case 4:
	    		app['bound'] = selectObject(app, x, y);
	    		if(app['boundType'] === 'e'){
	    			$('.weight-input').show();
	    			$('.weight-input').focus();
	    			$('.weight-input').val(app['bound'].weight);
	    		}else{
	    			$('.weight-input').hide();
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
 	$('.weight-input').bind('input propertychange', function() {
 		var text = $('.weight-input').val();
 		if(text.length === 0){
 			app['bound'].weight = null;
 		}else{
	 		for(var i = 0; i < text.length; i++){
	 			if(!(text.charAt(i) >= '0' && text.charAt(i) <= '9')){
	 				return;
	 			}
	 		}
	 		app['bound'].weight = parseInt(text);
 		}
 		draw(app);
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
	$('.weight-input').hide();
	app['bound'] = selectObject(app, -1, -1);
	draw(app);
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
	// or if an edge just delete edge
	if(app['boundType'] === 'v'){
		var badEdges = [];
		for(var i = 0; i < app['g'].e.length; i++){
			if(app['g'].e[i].v1 === toDelete || app['g'].e[i].v2 === toDelete){
				badEdges.push(i);
			}
		}
		while(badEdges.length > 0){
			app['g'].e.splice(badEdges.pop(), 1);
		}
		for(var i = 0; i < app['g'].v.length; i++){
			if(app['g'].v[i] === toDelete){
				app['g'].v.splice(i, 1);
				break;
			}
		}
		for(var i = 0; i < app['g'].v.length; i++){
			app['g'].v[i].label = i.toString();
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
    // Toolbar
    var bannerSize = Math.floor($('.panel').height() * 0.15);
	var componentSize = Math.floor($('.panel').height() * 0.1);
	var topMargin = Math.floor($('.panel').height() * 0.03);
	$('.panel').width(bannerSize + 8);
	$('.tool').css('height', componentSize);
	$('.tool').css('padding-top', topMargin);
	$('.tool > img').css('width', componentSize - $('.tool > .label').height());
	$('.tool > img').css('height', componentSize - $('.tool > .label').height());
	$('.banner').css('width', bannerSize*0.8);
	$('.banner').css('height', bannerSize*0.8);
	$('.banner').css('padding-top', bannerSize*0.1)
	$('.slider').height($('.tool').height());
	$('.slider').width(Math.floor($('.panel').width() / 32));
	setSlider(app);
	$('.weight-input').css('left', $(window).width() - $('.weight-input').outerWidth() 
		- $('.controls').outerWidth() - 12);
	// Controls
	var imgSize = Math.floor($('.controls').height() * 0.15);
	$('.controls').width(imgSize + 16);
	$('.algorithm').css('height', imgSize);
	$('.algorithm').css('padding-top', $('.controls').height() * 0.02);
	$('.algorithm').css('padding-bottom', $('.controls').height() * 0.02);
	$('.algorithm > img').css('width', imgSize - $('.algorithm > .label').height());
	$('.algorithm > img').css('height', imgSize - $('.algorithm > .label').height());
	// canvas size
    $('.canvas-container').width($(window).width() - $('.panel').width() - $('.controls').width());
    var w = $('.canvas-container').width(); 
    var h = $('.canvas-container').height();
    var oldW = app['canvas'].width;
    var oldH = app['canvas'].height;
	app['canvas'].width = w;
	app['canvas'].height = h;
	var r = Math.min(app['canvas'].width, app['canvas'].height) / 40;
	// Recalculate positions of vertices based on new size
	var factorX = w / oldW;
	var factorY = h / oldH;
	for(var i = 0; i < app['g'].v.length; i++){
		var v  = app['g'].v[i];
		v.x = v.x * factorX;
		v.y = v.y * factorY;
	}
	// Recalculate control points
	for(var i = 0; i < app['g'].e.length; i++){
		app['g'].e[i].cacheControlPoint();
	}
	draw(app);
}

function setSlider(app){
	var pos = $('.tool').first().offset().top + $('.tool').outerHeight() * 
		(app['tool']-1) + parseInt($('.tool').css('padding-top'));
	$('.slider').css('top', pos);
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
		// Create path surrounding the edge's bezier curve with two more bezier curves shifted
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
		// If weighted add hitbox of weight
		if(e.weight !== null){
			app['2d'].beginPath();
			app['2d'].font = 'bolder ' + (r / 1.5 * 1.25) + 'px Georgia';
			var w = app['2d'].measureText(e.weight.toString()).width + app['2d'].lineWidth + 4;
			var h = r * 1.25 + 3;
			app['2d'].rect(e.wx-w/2, e.wy - h / 2, w, h);
			if(app['2d'].isPointInPath(x, y)){
				app['2d'].closePath();
				app['boundType'] = 'e';
				return e;
			}
		}
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
	var newEdge = new Edge(v1, v2, null, null, 0, 0);
	app['g'].e.push(newEdge);
	newEdge.cacheControlPoint();
	draw(app);
	return true;
}

function throttle(callback, delay) {
    var previousCall = new Date().getTime() - delay;
    return function() {
        var time = new Date().getTime();
        if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
        }
    };
}

function initUI(app){
	$('.weight-input').hide();
	selectTool(app, 'sel-btn');
}

/* ALGORITHMS */

function planarTest(app){
	genCode(app);
	// Convert graph to a single string
	var stringifyGraph = app['g'].v.length.toString() + "-";
	for(var i = 0; i < app['g'].e.length; i++){
		var e = app['g'].e[i];
        stringifyGraph += e.v1.label.toString() + "," + e.v2.label.toString() + "-";
    }
    // Send graph to planar.cpp
    $.post("/planar", {graph : stringifyGraph}, function(data){
        if(data === "no") return;
        var res = data.split("-");
        for(var i = 0; i < app['g'].v.length; i++){
        	app['g'].v[i].col = app['colors'][0];
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
}

function producePlanarEmbedding(app, res){
	var newPositions = [];
    for(var i = 0; i < app['g'].v.length; i++){
        newPositions.push(new Vertice(app['g'].v[i].label, app['g'].v[i].x, 
        	app['g'].v[i].y, app['colors'][0]));
    }
    // calculate new points
    for(var i = 0; i < res.length - 1; i++){
        var lab, nx, ny, nw, nh, mw, mh, xcord, ycord, resarr;
        resarr = res[i].split(",");
        lab = Number(resarr[0]);
        nx = Number(resarr[1]);
        ny = Number(resarr[2]);
        nw = app['canvas'].width * 0.9;
        nh = app['canvas'].height * 0.9;
        mw = app['canvas'].width * 0.05;
        mh = app['canvas'].height * 0.05;
        xcord = nw / (2 * app['g'].v.length -4);
        ycord = nh / (app['g'].v.length -2);
        newPositions[lab].x = mw + nx * xcord;
        newPositions[lab].y = mh + ny * ycord;
    }
    for(var i = 0; i < app['g'].e.length; i++){
        app['g'].e[i].curveX = 0;
        app['g'].e[i].curveY = 0;
    }
    animate(app, newPositions);
}

function animate(app, newPositions){
    var intervals = 100;
    var step = [];
    var angle = [];
    var oldPositions = app['g'].v;
    for(var i = 0; i < app['g'].v.length; i++){
        step.push(Math.sqrt((oldPositions[i].x-newPositions[i].x)*(oldPositions[i].x-newPositions[i].x)
         + (oldPositions[i].y-newPositions[i].y)*(oldPositions[i].y-newPositions[i].y)) / intervals);
        if(newPositions[i].x === oldPositions[i].x){
            angle.push(Math.PI  / 2);
        }else{
            angle.push(Math.atan2(newPositions[i].y - oldPositions[i].y,newPositions[i].x-oldPositions[i].x));
        }   
    }
    var id = window.setInterval(function(){
        for(var i = 0; i < app['g'].v.length; i++){
            var signx = 1;
            var signy = 1;
            if(app['g'].v[i].x >= newPositions.x) signx = -1;
            if(app['g'].v[i].y >= newPositions.y) signy = -1;
            app['g'].v[i].x += step[i] * Math.cos(angle[i]);
            app['g'].v[i].y += step[i] * Math.sin(angle[i]);
        }
        for(var i = 0; i < app['g'].e.length; i++){
			app['g'].e[i].cacheControlPoint();
		}
        draw(app);
        intervals--;
        if(intervals === 0){
            window.clearInterval(id);
        }
    }, 10);
}

function isolateKurotowski(app, res){
    for(var i = 0; i < res.length - 1; i++){
        res[i] = res[i].slice(1, res[i].length - 1);
        var vertices = res[i].split(",");
        console.log(vertices);
        for(var j = 0; i < app['g'].e.length; j++){
            if((app['g'].e[j].v1.label === vertices[0] && app['g'].e[j].v2.label === vertices[1])
                || (app['g'].e[j].v1.label === vertices[0] && app['g'].e[j].v2.label === vertices[1])){
                app['g'].e[j].col = app['colors'][2];
                app['g'].e[j].v1.col = app['colors'][2];
                app['g'].e[j].v2.col = app['colors'][2];
                break;
            }
        }
    }
}

// Generates code for a graph while running, below are some examples generated from this method
function genCode(app){
	console.log("GENERATED CODE:");
	for(var i = 0; i < app['g'].v.length; i++){
		var v = app['g'].v[i];
		var x = v.x / app['canvas'].width * 100;
		var y = v.y / app['canvas'].height * 100;
		console.log("addV(app, " + Math.round(x) + ", " + Math.round(y) + ", 0);");
	}
	for(var i = 0; i < app['g'].e.length; i++){
		var e = app['g'].e[i];
		var w = (e.weight === null ? "null" : e.weight);
		var dir = (e.dir === null ? "null" : e.dir.label);
		console.log("addE(app, " + e.v1.label + ", " + e.v2.label + ", " +
			dir + ", " + w + ", " + Math.round(e.curveX) + ", " + Math.round(e.curveY) + ");");
	}
}

/* Preloaded graphs */

function addV(app, x, y, col){
	x = app['canvas'].width * x / 100;
	y = app['canvas'].height * y / 100;
	app['g'].v.push(new Vertice((app['g'].v.length).toString(), x, y, app['colors'][col]));
}

function addE(app, v1, v2, dir, weight, cx, cy){
	app['g'].e.push(new Edge(app['g'].v[v1], app['g'].v[v2], app['g'].v[dir], weight, cx, cy));
}

function bidiakisCube(app){
	addV(app, 10, 10, 1);
	addV(app, 15, 20, 1);
	addV(app, 20, 30, 1);
	addV(app, 40, 10, 1);
	addV(app, 45, 20, 1);
	addV(app, 50, 30, 1);
	addV(app, 10, 50, 1);
	addV(app, 25, 50, 1);
	addV(app, 40, 50, 1);
	addV(app, 20, 70, 1);
	addV(app, 35, 70, 1);
	addV(app, 50, 70, 1);
	addE(app, 0, 1, null, null, 0, 0);
	addE(app, 1, 2, null, null, 0, 0);
	addE(app, 3, 4, null, null, 0, 0);
	addE(app, 4, 5, null, null, 0, 0);
	addE(app, 0, 3, null, null, 0, 0);
	addE(app, 1, 4, null, null, 0, 0);
	addE(app, 2, 5, null, null, 0, 0);
	addE(app, 6, 7, null, null, 0, 0);
	addE(app, 7, 8, null, null, 0, 0);
	addE(app, 9, 10, null, null, 0, 0);
	addE(app, 10, 11, null, null, 0, 0);
	addE(app, 6, 9, null, null, 0, 0);
	addE(app, 7, 10, null, null, 0, 0);
	addE(app, 8, 11, null, null, 0, 0);
	addE(app, 0, 6, null, null, 0, 0);
	addE(app, 2, 9, null, null, 0, 0);
	addE(app, 3, 8, null, null, 0, 0);
	addE(app, 5, 11, null, null, 0, 0);
}

function demonstratePlanarity(app){
	addV(app, 9, 87, 0);
	addV(app, 95, 5, 0);
	addV(app, 60, 84, 0);
	addV(app, 90, 74, 0);
	addV(app, 31, 44, 0);
	addV(app, 86, 41, 0);
	addV(app, 8, 42, 0);
	addV(app, 72, 10, 0);
	addV(app, 8, 9, 0);
	addV(app, 82, 90, 0);
	addV(app, 21, 93, 0);
	addV(app, 47, 15, 0);
	addE(app, 0, 1, null, null, 0, 0);
	addE(app, 1, 2, null, null, 0, 0);
	addE(app, 3, 4, null, null, 0, 0);
	addE(app, 4, 5, null, null, 0, 0);
	addE(app, 0, 3, null, null, 0, 0);
	addE(app, 1, 4, null, null, -327, -100);
	addE(app, 2, 5, null, null, 280, -75);
	addE(app, 6, 7, null, null, 115, 260);
	addE(app, 7, 8, null, null, -184, 181);
	addE(app, 9, 10, null, null, 15, -215);
	addE(app, 10, 11, null, null, -105, -179);
	addE(app, 6, 9, null, null, 0, 0);
	addE(app, 7, 10, null, null, 0, 0);
	addE(app, 8, 11, null, null, 56, 1);
	addE(app, 0, 6, null, null, -55, -75);
	addE(app, 2, 9, null, null, 0, 0);
	addE(app, 3, 8, null, null, 0, 0);
	addE(app, 5, 11, null, null, -68, -108);
	addE(app, 9, 0, null, null, 0, 0);
	addE(app, 6, 3, null, null, 0, 0);
	addE(app, 6, 8, null, null, 179, 41);
	addE(app, 8, 5, null, null, 0, 0);
	addE(app, 8, 4, null, null, 189, -20);
	addE(app, 3, 1, null, null, -319, 83);
	addE(app, 2, 11, null, null, 0, 0);
	addE(app, 2, 10, null, null, 0, 0);
	addE(app, 10, 8, null, null, 0, 0);
	addE(app, 7, 9, null, null, 0, 0);
	addE(app, 5, 1, null, null, 0, 0);
	addE(app, 9, 1, null, null, 0, 0);
}

function defaultGraph(app){
	//bidiakisCube(app);
	demonstratePlanarity(app);
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
	resize(app);
	defaultGraph(app);
	draw(app);
});

