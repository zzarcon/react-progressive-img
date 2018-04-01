# react-progressive-img
> Progressive image rendering made easy

# Install

```
$ yarn add react-progressive-img
```

# Usage 

**default**

```javascript
import ProgressiveImg from 'react-progressive-img';

<ProgressiveImg
  src="https://your-site/some-image.png" 
/>
```

**all props**

```javascript
import ProgressiveImg from 'react-progressive-img';

<ProgressiveImg
  src="https://your-site/some-image.png"
  dimensions={{width: '100%', height: 150}}
/>
```

**render props**

```javascript
import ProgressiveImg from 'react-progressive-img';

<ProgressiveImg src="https://your-site/some-image.png" >
  {(state, percentage, src) => {
    if (state === 'error') {
      return <div>Error</div>;
    } else if (state === 'complete') {
      return <img src={src} />;
    } else {
      return <div>Loading {percentage}%</div>;
    }
  }}
```