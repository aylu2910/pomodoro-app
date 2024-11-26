import { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  // Convert timeLeft into mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    // Cleanup interval when component unmounts or when timer stops
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Reset function
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(15 * 60); // Reset to 15 minutes
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Pomodoro Timer</h1>
      <h2>{formatTime(timeLeft)}</h2>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={resetTimer} style={{ marginLeft: "10px" }}>
        Reset
      </button>
    </div>
  );
};

export default PomodoroTimer;
