import * as React from 'react';
import { Dimensions } from './types';

export const svg = (
  <svg fill="currentColor" height="32" width="32" viewBox="0 0 16 16" style={{display: 'inline-block', verticalAlign: 'middle', position: 'absolute', zIndex: 1, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(177, 188, 208, 0.6)'}}>
    <path d="M14.998 2c0.001 0.001 0.001 0.001 0.002 0.002v11.996c-0.001 0.001-0.001 0.001-0.002 0.002h-13.996c-0.001-0.001-0.001-0.001-0.002-0.002v-11.996c0.001-0.001 0.001-0.001 0.002-0.002h13.996zM15 1h-14c-0.55 0-1 0.45-1 1v12c0 0.55 0.45 1 1 1h14c0.55 0 1-0.45 1-1v-12c0-0.55-0.45-1-1-1v0z"></path>
    <path d="M13 4.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5 0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5z"></path>
    <path d="M14 13h-12v-2l3.5-6 4 5h1l3.5-3z"></path>
  </svg>
);

export const placeholderWrapper = (dimensions: Dimensions): any => ({
  border: '1px solid #F4F5F7',
  borderRadius: 4,
  overflow: 'hidden',
  position: 'relative',
  ...dimensions
});

export const placeholderChild = (percentage: number) => ({
  transform: `translateY(${percentage}%)`,
  height: '100%',
  backgroundColor: 'rgba(244, 245, 247, 0.5)',
  transition: 'transform .4s cubic-bezier(0.215, 0.61, 0.355, 1)'
})

// max-width: 100%; max-height: 100vh;
export const imgStyles = (dimensions: Dimensions) => ({
  opacity: 0,
  borderRadius: 4,
  boxShadow: 'rgba(9, 30, 66, 0.2) 0px 1px 1px, rgba(9, 30, 66, 0.24) 0px 0px 1px 0px',
  animation: 'progressive-img-fade-in 1s forwards cubic-bezier(0.39, 0.575, 0.565, 1)', // TODO: insert animation in document
  ...dimensions
})