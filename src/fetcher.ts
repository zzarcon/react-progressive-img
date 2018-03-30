import { OnProgressFunc } from "./types";

export const fetchImg = (src: string, onProgress: OnProgressFunc): Promise<string> => (
  new Promise((resolve, reject) => {
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
  })
)