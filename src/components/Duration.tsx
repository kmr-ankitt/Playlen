type DurationProps = {
  duration: number;
};

function convertMinutesToHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} hours ${remainingMinutes
    .toString()
    .padStart(2, "0")} minutes`;
}

function calculateNewDuration(duration: number, factor: number): string {
  const newDuration = duration / factor;
  return convertMinutesToHours(Math.round(newDuration));
}

const Duration: React.FC<DurationProps> = ({ duration }) => {
  const durationInHoursMinutes = convertMinutesToHours(duration);
  const duration1_25x = calculateNewDuration(duration, 1.25);
  const duration1_5x = calculateNewDuration(duration, 1.5);
  const duration1_75x = calculateNewDuration(duration, 1.75);
  const duration2x = calculateNewDuration(duration, 2);

  return (
    <div className="flex flex-col items-center justify-center text-[1rem] gap-2">
      <div>
        {/* <p>
          Total Duration in Minutes:{" "}
          {duration !== 0 ? `${duration} minutes` : "--"}
        </p> */}
        <p>
          Total Duration in Hours:{" "}
          {durationInHoursMinutes !== "0 hours 00 minutes"
            ? durationInHoursMinutes
            : "--"}
        </p>
        <p>Duration at 1.25x speed: {duration !== 0 ? duration1_25x : "--"}</p>
        <p>Duration at 1.5x speed: {duration !== 0 ? duration1_5x : "--"}</p>
        <p>Duration at 1.75x speed: {duration !== 0 ? duration1_75x : "--"}</p>
        <p>Duration at 2x speed: {duration !== 0 ? duration2x : "--"}</p>
      </div>
    </div>
  );
};

export default Duration;
