import * as React from 'react';
import {Component} from 'react';
import {svg, placeholderWrapper, imgStyles, placeholderChild} from './styles';
import {fetchImg} from './fetcher'
import { Dimensions } from './types';

export interface ProgressiveImgProps {
  src: string;
  dimensions?: Dimensions;
  children?: () => void;
}

export type FetchingState = 'loading' | 'complete' | 'error';
export interface ProgressiveImgState {
  progress: number;
  total: number;
  fetchingState: FetchingState;
  responseSrc?: string;
}

export class ProgressiveImg extends Component<ProgressiveImgProps, ProgressiveImgState> {
  state: ProgressiveImgState = {
    progress: 0,
    total: 0,
    fetchingState: 'loading'
  }
  static defaultProps = {
    dimensions: {width: '100%'}
  }

  // TODO: Handle src changes
  componentWillReceiveProps() {

  }
  
  async componentWillMount() {
    const {src} = this.props;

    try {
      const responseSrc = await fetchImg(src, this.onProgress);
      this.setState({fetchingState: 'complete', responseSrc});
    } catch (e) {
      this.setState({fetchingState: 'error'});
      console.log('error', e);
    }
  }

  onProgress = (progress: number, total: number) => {
    // TODO: delay state updates
    this.setState({progress, total});
  }

  get isLoading() {
    return this.state.fetchingState === 'loading'
  }
  
  get placeholder() {
    const {dimensions} = this.props;
    const {progress, total} = this.state;
    const percentage = -100 + (!total ? 0 : Math.round((progress * 100) / total));
    
    return (
      <div style={placeholderWrapper(dimensions)}>
        {svg}
        <div style={placeholderChild(percentage)}>
          
        </div>
      </div>
    );
  }

  get img() {
    const {dimensions} = this.props;
    const {responseSrc} = this.state;
    
    return (
      <img src={responseSrc} style={imgStyles(dimensions)} />
    );
  }

  render() {
    const {isLoading} = this;
    const content = isLoading ? this.placeholder : this.img;

    return (
      content
    );
  }
}