var planar = require('./build/Release/planar.node');
var express = require('express');
var bodyParser = require("body-parser");
var favicon = require('serve-favicon');
var app = express();
require('./router/main')(app);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 5000));
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(__dirname + '/views/assets/favicon.ico'));
app.engine('html', require('ejs').renderFile);

app.listen(app.get('port'), function() {
  console.log('gtheory.com is running on port', app.get('port'));
});

//planarity testing
app.post('/planar',function(req,res){
  var g = req.body.graph.split("-");
  planar.initGraph(Number(g[0]));
  for(i = 1; i < g.length-1; i++){
    var pos = g[i].indexOf(",");
    planar.addEdge(Number(g[i].substr(0,pos)), Number(g[i].substr(pos+1)));
  }
  res.end(planar.sum());
});


