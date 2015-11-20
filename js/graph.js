'use strict';

$(window).ready(function(){
	var app = {'canvas' : document.getElementById('canvas'), 
				'2d' : canvas.getContext('2d')};
	resizeCanvas(app);
	drawBackground(app);
	drawVertice(app);
});

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

function drawVertice(app){
	var r = app['canvas'].width / 80;
	app['2d'].font = (r * 1.25) + 'px Georgia';
	app['2d'].textBaseline = 'middle';
	app['2d'].textAlign = 'center';
	app['2d'].fillStyle = '#32cd32';
	app['2d'].strokeStyle = '#000000';
	app['2d'].lineWidth = 2;
	app['2d'].beginPath();
	app['2d'].arc(100, 100, r, 0, Math.PI * 2, false);
	app['2d'].fill();
	app['2d'].stroke();
	app['2d'].closePath();
	app['2d'].fillStyle = '#000000';
	app['2d'].fillText("89", 100, 100);
}

/* Helper functions for UI */
function resizeCanvas(app){
	document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no"; 
	app['canvas'].width = $('.canvas-container').width();
	app['canvas'].height = $('.canvas-container').height();
}
