export const useTimes = (times) => {
  const [count, setcount] = useState(times);
  const timer = useRef(null);
  useEffect(() => {
    timer.current = setInterval(() => {
      setcount((count) => count - 1);
    }, 1000);

    return () => {
      clearInterval(time.current);
    };
  }, []);
  useEffect(() => {
    if (count === 0) {
      clearInterval(timerRef.current);
    }
  }, [count]);
  return count;
};
