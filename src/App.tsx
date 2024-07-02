import { useState } from "react";
import Duration from "./components/Duration";
import Input from "./components/Input";
import Navbar from "./components/Navbar";

function App() {
  const [id, setid] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  const handleID = (id: string) => {
    if (id === "") {
      throw new Error("Invalid URL");
    }
    setid(id);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  return (
    <div className="bg-zinc-900 text-zinc-200 h-screen font-mono">
      <Navbar />
      <Input sendID={handleID} sendDuration={handleDuration} />
      <Duration pID={id} duration={duration} />
    </div>
  );
}

export default App;
