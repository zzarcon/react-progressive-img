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
        <div>
          <h1>Default</h1>
          <ProgressiveImg src={imageSrc} dimensions={dimensions} />
        </div>
        <div>
          <h1>Custom Basic</h1>
          <ProgressiveImg src={imageSrc} dimensions={dimensions} >
            {(state, percentage, src) => {
              if (state === 'error') {
                return <div>Error</div>;
              } else if (state === 'complete') {
                return <img style={{height: 300}} src={src} />;
              } else {
                return <div>Loading {percentage}%</div>;
              }
            }}
          </ProgressiveImg>
        </div>
        <div>
          <h1>Custom Circle</h1>
          <ProgressiveImg src={imageSrc} dimensions={dimensions} >
            {(state, percentage, src) => {
              if (state === 'error') {
                return <div>Error</div>;
              } else if (state === 'complete') {
                return <img style={{height: 300}} src={src} />;
              } else {
                return (
                  <div></div>                 
                );
              }
            }}
          </ProgressiveImg>
        </div>
      </div>
    )
  }
}