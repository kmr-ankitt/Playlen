import React, { useEffect } from 'react';
import axios from 'axios';

type CalculatorProps = {
  pID: string;
};

const Calculator: React.FC<CalculatorProps> = ({ pID }) => {
  useEffect(() => {
    const getVideoIDs = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
          params: {
            part: 'snippet',
            playlistId: pID,
            key: import.meta.env.VITE_API_KEY
          },
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY
          }
        });

        console.log('Playlist Items:', response.data.items);
      } catch (error) {
        console.error('Error fetching playlist items:', error);
      }
    };

    if (pID) {
      getVideoIDs();
    }
  }, [pID]);

  console.log('Playlist ID:', pID);

  return (
    <div>
      <p>Playlist ID: {pID}</p>
      <p>Video ID: {pID}</p>
    </div>
  );
};

export default Calculator;