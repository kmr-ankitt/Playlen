import React, { useEffect, useState } from "react";
import axios from "axios";

type CalculatorProps = {
  pID: string;
};

const Calculator: React.FC<CalculatorProps> = ({ pID }) => {
  const [videoIDs, setVideoIDs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylistItems = async () => {
      try {
        const response = await axios.get(`/api/playlistItems?pID=${pID}`);
        setVideoIDs(response.data);
      } catch (error) {
        console.error("Error fetching playlist items:", error);
        setError("Failed to fetch playlist items.");
      }
    };

    fetchPlaylistItems();
  }, [pID]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <p>Playlist ID: {pID}</p>
      {videoIDs.length > 0 ? (
        <ul>
          {/* {videoIDs.map((videoID) => ( */}
            {/* <li key={videoID}>{videoID}</li> */}
          {/* ))} */}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Calculator;
