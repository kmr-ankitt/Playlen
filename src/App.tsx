import { useState } from "react";
import Duration from "./components/Duration";
import Input from "./components/Input";
import Navbar from "./components/Navbar";

function App() {
  const [duration, setDuration] = useState<number>(0);


  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  return (
    <div className="bg-zinc-900 text-zinc-200 h-screen font-mono">
      <Navbar />
      <Input sendDuration={handleDuration} />
      <Duration duration={duration} />
    </div>
  );
}

export default App;
