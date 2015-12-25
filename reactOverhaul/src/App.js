import React, { Component } from 'react';
import { Toolbar } from './toolbar';

export class App extends Component {

  constructor(){
    super();
    this.state = {
      screen : {width : window.innerWidth,
                height : window.innerHeight}
    };
    this.css = {
      width : this.state.screen.width,
      height : this.state.screen.height
    };
  }


  render() {
    return (
      <div style={this.css}>
        <Toolbar state={this.state} />
      </div>
    );
  }
}