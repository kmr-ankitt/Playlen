type DurationProps = {
  pID: string;
  duration: number;
};

const Duration: React.FC<DurationProps> = ({ pID, duration }) => {

  return (
    <div>
      <p>Playlist ID: {pID}</p>
      <p>Duration: {duration} minutes</p>
    </div>
  );
};

export default Duration;
