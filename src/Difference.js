import { DateTime } from "luxon";
import { useState, useEffect, useRef } from "react";

// Returns difference between server time and local time.
const difference = (time) => {
  return Math.round(DateTime.now().toSeconds() - time);
};

// Pad numbers with leading zero.
const pad = (v) => {
  return v.toString().padStart(2, "0");
};

// Display time in stopwatch format.
const stopwatch = (n) => {
  let sign = n < 0 ? "-" : "";
  n = Math.abs(n);
  let m = Math.floor(n / 60);
  return `Difference: ${sign}${pad(Math.floor(m / 60))}:${pad(
    Math.floor(m % 60)
  )}:${pad(n % 60)}`;
};

// Store a previous value.
export const Prev = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

// Display the time difference.
export function Difference({ time }) {
  const [diff, setDiff] = useState(difference(time));
  const oldTime = Prev(time);
  useEffect(() => {
    if (oldTime !== time) {
      setDiff(difference(time));
    }
    const timer = setTimeout(() => {
      setDiff(() => diff + 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [time, oldTime, diff]);
  return <p>{stopwatch(diff)}</p>;
}
