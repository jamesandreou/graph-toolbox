import React, { Component } from 'react';
import { Toolbar } from './toolbar';
import { Panel } from './panel';
import Display from './display';

export class App extends Component {

  constructor(){
    super();
    this.state = {
      screen : {width : window.innerWidth,
                height : window.innerHeight},
      activeTool : 'sel'
    };
    this.display = new Display();
  }

  handleResize(){
      this.setState({screen : {width : window.innerWidth,
                  height : window.innerHeight}});
      this.display.resize(this.refs.canvas);
      this.display.render(this.state);
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
        display: "block",
        backgroundColor: "#F3ECE2",
        position: "absolute",
        top: '0',
        left: toolSize,
        width: canvasWidth,
        height: '100%'
    };
    return (
      <div style={style}>
        <Toolbar onUpdate={this.onUpdate.bind(this)} state={this.state} tools={tools} size={toolSize} />
        <canvas ref="canvas" style={canvasStyle} width={canvasWidth} height={style.height}>You have a bad browser..</canvas>
        <Panel display={this.display} size={panelSize} />
      </div>
    );
  }
}