jest.mock('../src/fetcher');

import * as React from 'react';
import {shallow} from 'enzyme';
import ProgressiveImg, {ProgressiveImgProps} from '../src';
import {fetchImg} from '../src/fetcher';

describe('ProgressiveImg', () => {
  const setup = (userOptions?: {fetchImgMock?: Function, props?: Partial<ProgressiveImgProps>}) => {
    const src = 'some-img';
    const responseSrc = 'res-src';
    const fetchImgPromise = Promise.resolve(responseSrc);
    const defaultFetchImgMock = jest.fn().mockImplementation(() => fetchImgPromise);
    const defaultOptions = {fetchImgMock: defaultFetchImgMock}
    const options = {...defaultOptions, ...userOptions}
    const {fetchImgMock} = options;

    fetchImg = fetchImgMock;
    
    const component = shallow(<ProgressiveImg src={src} {...options.props} />);

    return {
      src,
      component,
      fetchImgMock,
      fetchImgPromise
    };
  };
  
  describe('default', () => {
    it('should render loading state until the image has been fetched', async () => {
      const {component, fetchImgPromise} = setup();

      expect(component.find('svg')).toHaveLength(1);

      await fetchImgPromise;

      expect(component.state('fetchingState')).toEqual('complete');
      component.update();
      expect(component.find('img').prop('src')).toEqual('res-src');
    });

    it('should render placeholder with the loaded percentage', async () => {
      const fetchPromise = Promise.resolve('remote-src');
      const fetchImgMock = jest.fn().mockImplementation((src, onProgress) => {
        onProgress(1, 10);
        onProgress(5, 10);

        return fetchPromise;
      });
      const {component} = setup({
        fetchImgMock
      });
      const instance = component.instance() as ProgressiveImg;

      await fetchPromise;

      expect(component.state('progress')).toEqual(5);
      expect(instance.percentage).toEqual(50);
    });

    it('should use passed dimensions', async () => {
      const {component, fetchImgPromise} = setup({
        props: {
          dimensions: {
            width: '100%',
            height: 200
          }
        }
      });

      expect(component.find('div').get(0).props.style.width).toEqual('100%');
      expect(component.find('div').get(0).props.style.height).toEqual(200);
      await fetchImgPromise;

      component.update();
      expect(component.find('img').prop('style').width).toEqual('100%');
      expect(component.find('img').prop('style').height).toEqual(200);
    });
  });

  describe('render props', () => {
    it('should pass responseSrc when the fetching is done', async () => {
      const fetchPromise = Promise.resolve('remote-src');
      const fetchImgMock = jest.fn().mockReturnValue(fetchPromise);
      fetchImg = fetchImgMock;
      const rendererFunc = jest.fn();
      const component = shallow(
        <ProgressiveImg src="img-src">
          {rendererFunc}
        </ProgressiveImg>
      );

      expect(rendererFunc.mock.calls[0]).toEqual(['loading', 0, undefined]);
      await fetchPromise;
      expect(rendererFunc.mock.calls[1]).toEqual(['complete', 0, 'remote-src']);
    });
    
    it('should pass percentage when there are loading updates', async () => {
      const fetchPromise = new Promise(resolve => setTimeout(() => resolve('remote-src'), 10));
      const fetchImgMock = jest.fn().mockImplementation((src, onProgress) => {
        onProgress(1, 10);
        setTimeout(() => onProgress(5, 10), 1);

        return fetchPromise;
      });
      fetchImg = fetchImgMock;
      const rendererFunc = jest.fn();
      const component = shallow(
        <ProgressiveImg src="img-src">
          {rendererFunc}
        </ProgressiveImg>
      );

      await fetchPromise;
      expect(rendererFunc.mock.calls[0]).toEqual(['loading', 10, undefined]);
      expect(rendererFunc.mock.calls[1]).toEqual(['loading', 50, undefined]);
    });
  });
});
