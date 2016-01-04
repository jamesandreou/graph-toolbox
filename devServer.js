var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var bodyParser = require("body-parser");
var planar = require('./build/Release/planar.node');
var favicon = require('serve-favicon');

var app = express();
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({    
  extended: false
}));
app.use(favicon(path.join(__dirname, 'favicon.ico')));

var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Starting Graph Toolbox..');
});

app.post('/planar',function(req,res){
	var g = req.body.graph.split("-");
	planar.initGraph(Number(g[0]));
	for(i = 1; i < g.length-1; i++){
		var pos = g[i].indexOf(",");
		planar.addEdge(Number(g[i].substr(0,pos)), Number(g[i].substr(pos+1)));
	}
	var result = planar.result();
	res.end(result);
});

