  import { useEffect } from 'react';
  
  // Use a hook for the handleKey event
  export const useArrowKeyEvent = (event, handler, passive = false) => {
    useEffect(() => {
      window.addEventListener(event, handler, passive);
  
      return function cleanUp() {
        window.removeEventListener(event, handler, passive);
      };
    });
  }