import * as React from 'react';
import {Component} from 'react';
import Circle from 'react-circle';
import ProgressiveImg from '../src';
import {AppWrapper, CircleWrapper, CustomImg, ExampleWrapper} from './styled';
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
      <AppWrapper>
        <ExampleWrapper>
          <h1>Default</h1>
          <ProgressiveImg src={imageSrc} dimensions={dimensions} />
        </ExampleWrapper>
        <ExampleWrapper>
          <h1>Circle</h1>
          <ProgressiveImg src={imageSrc} dimensions={dimensions} >
            {(state, percentage, src) => {
              let content;

              if (state === 'error') {
                content = <div>Error</div>;
              } else if (state === 'complete') {
                content = <CustomImg src={src} />;
              } else {
                content = (
                  <Circle
                    size={'50'}
                    progress={percentage}
                    showPercentage={false}
                  />
                );
              }

              return (
                <CircleWrapper>
                  {content}
                </CircleWrapper>
              )
            }}
          </ProgressiveImg>
        </ExampleWrapper>
        <ExampleWrapper>
          <h1>Boring</h1>
          <ProgressiveImg src={imageSrc} dimensions={dimensions} >
            {(state, percentage, src) => {
              if (state === 'error') {
                return <div>Error</div>;
              } else if (state === 'complete') {
                return <img style={{height: 150}} src={src} />;
              } else {
                return <div style={{height: 150}}>Loading {percentage}%</div>;
              }
            }}
          </ProgressiveImg>
        </ExampleWrapper>
      </AppWrapper>
    )
  }
}