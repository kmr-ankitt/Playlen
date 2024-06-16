// Calculator.tsx
import React, { useEffect } from 'react';
import axios from 'axios';

type CalculatorProps = {
  pID: string;
};

const Calculator: React.FC<CalculatorProps> = ({ pID }) => {
  useEffect(() => {
    const getVideoIDs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/playlistItems`, {
          params: { pID }
        });

        console.log('Playlist Items:', response.data);
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
