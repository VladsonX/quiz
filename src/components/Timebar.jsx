const FREQUENCY = 100;

import { useEffect, useState } from 'react';

function Timebar({ onTimeout, currTimer, mode }) {
  const [progressValue, setProgressValue] = useState(currTimer);

  useEffect(() => {
    const timer = setTimeout(onTimeout, currTimer);
    return () => clearTimeout(timer);
  }, [onTimeout, currTimer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue(prevValue => {
        if (prevValue <= FREQUENCY) {
          clearInterval(interval);
          return 0;
        }
        return prevValue - FREQUENCY;
      });
    }, FREQUENCY);

    return () => clearInterval(interval);
  }, []);

  return <progress max={currTimer} value={progressValue} className={mode} />;
}

export default Timebar;
