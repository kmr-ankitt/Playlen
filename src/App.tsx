import { useState, useRef } from "react";
import Duration from "./components/Duration";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  const [duration, setDuration] = useState({
    totalDuration: 0,
    averageDuration: 0,
    playlistTitle: "",
    playlistThumbnail: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [link, setLink] = useState("");
  const durationRef = useRef<HTMLDivElement>(null); // Ref for the Duration component

  const handleDuration = (duration: {
    totalDuration: number;
    averageDuration: number;
    playlistTitle: string;
    playlistThumbnail: string;
  }) => {
    setDuration(duration);
  };

  const handleSubmit = (isSubmitted: boolean) => {
    setIsSubmitted(isSubmitted);
    if (isSubmitted) {
      // Scroll to the Duration component when form is submitted
      setTimeout(() => {
        durationRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200); // Delay to ensure rendering of the component
    }
  };

  const handleLink = (link: string) => {
    setLink(link);
  };

  return (
    <div className="bg-zinc-900 text-zinc-200 h-screen w-full font-mono scroll-smooth">
      <Navbar />
      <Hero />
      <Input
        sendDuration={handleDuration}
        isSubmitted={handleSubmit}
        sendLink={handleLink}
      />
      {isSubmitted && (
        <div ref={durationRef} className="h-full w-full">
          <Duration duration={duration} link={link} />
        </div>
      )}
    </div>
  );
}

export default App;
