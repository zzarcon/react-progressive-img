import * as React from 'react';
import {Component} from 'react';

export interface ProgressiveImgProps {
  src: string;
  dimensions?: Dimensions;
  children?: () => void;
}

export type Dimensions = {width?: number | string, height?: number | string};
export type OnProgressFunc = (progress: number, total: number) => void;
export type FetchingState = 'loading' | 'complete' | 'error';
export interface ProgressiveImgState {
  progress: number;
  total: number;
  fetchingState: FetchingState;
  responseSrc?: string;
}

// TODO: Move into own file
const fetchImg = (src: string, onProgress: OnProgressFunc): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', src, true);
    xhr.responseType = 'blob';
    xhr.onprogress = (e) => {
      onProgress(e.loaded, e.total);
    };
    xhr.onload = () => {
      // TODO: revoke
      const src = URL.createObjectURL(xhr.response);
      
      resolve(src); 
    };
    xhr.onerror = reject;
    xhr.send();
  });
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
  
  // TODO: Move style generation into utility
  get placeholder() {
    const {dimensions} = this.props;
    const {progress, total} = this.state;
    const percentage = -100 + Math.round((progress * 100) / total);
    const style = {
      ...dimensions,
      border: '1px solid #F4F5F7',
      borderRadius: 4,
      overflow: 'hidden'
    };
    const childrenStyle = {
      transform: `translateY(${percentage}%)`,
      height: '100%',
      backgroundColor: 'rgba(244, 245, 247, 0.5)',
      transition: 'transform .3s'
    };

    return (
      <div style={style}>
        <div style={childrenStyle}>

        </div>
      </div>
    );
  }

  get img() {
    const {dimensions} = this.props;
    const {responseSrc} = this.state;
    // max-width: 100%; max-height: 100vh;
    const style = {...dimensions};

    return (
      <img src={responseSrc} style={style} />
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