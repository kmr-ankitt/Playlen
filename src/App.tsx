import { useState } from "react";
import Duration from "./components/Duration";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  const [duration, setDuration] = useState({ totalDuration: 0, averageDuration: 0 });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDuration = (duration: { totalDuration: number, averageDuration: number }) => {
    setDuration(duration);
  };

  const handleSubmit = (isSubmitted: boolean) => {
    setIsSubmitted(isSubmitted);
  };

  return (
    <div className="bg-zinc-900 text-zinc-200 h-screen w-full font-mono">
      <Navbar />
      <Hero />
      <Input sendDuration={handleDuration} isSubmitted={handleSubmit} />
      {isSubmitted && <Duration duration={duration} />}
    </div>
  );
}

export default App;
