import { useEffect, useState } from 'react';

function Timebar({ timer, frequency }) {
  const [progressValue, setProgressValue] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue(prevValue => {
        if (prevValue <= frequency) {
          clearInterval(interval);
          return 0;
        }
        return prevValue - frequency;
      });
    }, frequency);
    return () => clearInterval(interval);
  }, [frequency]);

  const percentage = Math.min(Math.max((progressValue / timer) * 100, 0), 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={progressValue}
      aria-valuemin={0}
      aria-valuemax={timer}
      className="w-2/3 h-3 bg-gray-200 rounded-full overflow-hidden"
    >
      <div
        className="h-full bg-indigo-600 transition-all duration-100 ease-linear rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default Timebar;
