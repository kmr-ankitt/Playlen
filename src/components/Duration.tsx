type DurationProps = {
  duration: number;
};

const Duration: React.FC<DurationProps> = ({ duration }) => {

  return (
    <div className="flex flex-col items-center justify-center">
      <p>Duration: {duration} minutes</p>
    </div>
  );
};

export default Duration;
