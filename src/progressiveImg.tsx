import * as React from 'react';
import {Component, ReactNode} from 'react';
import {svg, placeholderWrapper, imgStyles, placeholderChild} from './styles';
import {fetchImg} from './fetcher'
import { Dimensions } from './types';

export interface ProgressiveImgProps {
  src: string;
  dimensions?: Dimensions;
  children?: (status: FetchingState, percentage: number, src: string) => ReactNode;
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

  get percentage() {
    const {progress, total} = this.state;

    return !total ? 0 : Math.round((progress * 100) / total);
  }
  
  get placeholder() {
    const {percentage} = this;
    const {dimensions} = this.props;

    return (
      <div style={placeholderWrapper(dimensions)}>
        {svg}
        <div style={placeholderChild(-100 + percentage)}>
          
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
    const {percentage} = this;
    const {children} = this.props;
    const {fetchingState, progress, total, responseSrc} = this.state;
    const {isLoading} = this;
    const content = children ? children(fetchingState, percentage, responseSrc) : isLoading ? this.placeholder : this.img;

    return (
      content
    );
  }
}