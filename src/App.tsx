import { useState } from "react";
import Calculator from "./components/Calculator";
import Input from "./components/Input";
import Navbar from "./components/Navbar";

function App() {
  const [id, setid] = useState<string>("");

  const handleID = (id: string) => {
    if (id === "") {
      throw new Error("Invalid URL");
    }
    setid(id);
  };

  return (
    <div className="bg-zinc-900 text-zinc-200 h-screen font-mono">
      <Navbar />
      <Input sendID={handleID} />
      <Calculator pID={id} />
    </div>
  );
}

export default App;
