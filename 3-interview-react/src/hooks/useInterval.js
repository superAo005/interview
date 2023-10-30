import { useState, useRef, useEffect } from "react";
const useTimes = (times) => {
  const [count, setcount] = useState(times);
  const timer = useRef(null);
  const tick = () => {
    if (count > 0) {
      setcount((count) => --count);
    } else {
      clearInterval(timerRef.current);
    }
  };
  useEffect(() => {
    timer.current = setInterval(tick, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, []);
  //   useEffect(() => {
  //     if (count === 0) {
  //       clearInterval(timerRef.current);
  //     }
  //   }, [count]);
  return count;
};
export default useTimes;
