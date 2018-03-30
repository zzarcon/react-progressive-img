import * as React from 'react';
import {Component} from 'react';
import ProgressiveImg from '../src';

export interface AppState {
  imageSrc: string; 
}

// const defaultImageSrc = 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Big_%26_Small_Pumkins.JPG';
const defaultImageSrc = 'https://iso.500px.com/wp-content/uploads/2014/07/big-one.jpg';

export default class App extends Component <{}, AppState> {
  state: AppState = {
    imageSrc: defaultImageSrc
  }

  render() {
    const {imageSrc} = this.state;
    const dimensions = {width: 300, height: 150};

    // TODO: allow edit dimensions
    // TODO: allow edit imageSrc
    return (
      <div>
        <ProgressiveImg src={imageSrc} dimensions={dimensions} />
      </div>
    )
  }
}