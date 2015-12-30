import React, { Component } from 'react';
import { Toolbar } from './toolbar';
import { Panel } from './panel';
import Display from './display';
import Graph from './graph'

export class App extends Component {

  constructor(){
    super();
    this.state = {
      screen : {width : window.innerWidth,
                height : window.innerHeight},
      activeTool : 'sel'
    };
    this.g = new Graph();
    this.display = new Display(this, this.g);
  }

  handleResize(){
      this.setState({screen : {width : window.innerWidth,
                  height : window.innerHeight}});
      this.display.resize(this.refs.canvas);
      this.display.render();
      this.forceUpdate();
  }

  componentDidMount(){
    window.addEventListener('resize', (function(){
      setTimeout(this.handleResize.bind(this), 100);
    }).bind(this));
    this.display.initCanvas(this.refs.canvas);
    this.display.render(this.state);
  }

  componentWillUnmount(){
    window.removeEventListener('resize');
  }

  onUpdate(newState){
    this.setState(newState);
    this.display.tool = newState.activeTool;
    this.display.bound = {obj : null, type : null};
  }

  update(){
    console.log("Updating app..");
    this.forceUpdate();
  }

  render() {
    let tools = ['sel', 'addv', 'adde', 'dir', 'weight', 'del'];
    let style = {
      width: this.state.screen.width,
      height: this.state.screen.height
    };
    let toolSize = Math.floor(style.height * 0.12);
    let panelSize = Math.floor(style.width * 0.2);
    let canvasWidth = Math.floor(style.width - toolSize - panelSize);
    let canvasStyle = {
            left: toolSize,
            width: canvasWidth
    };

    return (
      <div style={style}>
        <Toolbar onUpdate={this.onUpdate.bind(this)} state={this.state} tools={tools} size={toolSize} />
        <canvas ref="canvas" style={canvasStyle} width={canvasWidth} height={style.height}
          onMouseDown={this.display.handleMouseDown.bind(this.display)} 
          onMouseMove={this.display.handleMouseMove.bind(this.display)}
          onMouseUp={this.display.handleMouseUp.bind(this.display)}
          >You have a bad browser..</canvas>
        <Panel graph={this.g} display={this.display} size={panelSize} />
      </div>
    );
  }
}