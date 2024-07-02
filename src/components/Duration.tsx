import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type DurationProps = {
  duration: {
    totalDuration: number;
    averageDuration: number;
  };
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
  const durationInHoursMinutes = convertMinutesToHours(duration.totalDuration);
  const avgDuration = convertMinutesToHours(duration.averageDuration);
  const duration1_25x = calculateNewDuration(duration.totalDuration, 1.25);
  const duration1_5x = calculateNewDuration(duration.totalDuration, 1.5);
  const duration1_75x = calculateNewDuration(duration.totalDuration, 1.75);
  const duration2x = calculateNewDuration(duration.totalDuration, 2);

  return (
    <div
      className="flex flex-col items-center justify-center text-[1.2rem] bg-zinc-900 text-zinc-200 p-6  max-sm:text-[1rem] mt-[-5rem] max-sm:mt-0"
      id="final-result"
    >
      <div className="flex items-start justify-center gap-2 max-sm:gap-4 flex-col ">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p>
            Total Duration:{" "}
            {durationInHoursMinutes !== "0 hours 00 minutes" ? (
              durationInHoursMinutes
            ) : (
              <Skeleton />
            )}{" "}
          </p>
          <p>
            Average Duration:{" "}
            {duration.averageDuration !== 0 ? avgDuration : <Skeleton />}
          </p>
          <p>
            Total Duration at 1.25x:{" "}
            {duration.totalDuration !== 0 ? duration1_25x : <Skeleton />}
          </p>
          <p>
            Total Duration at 1.5x:{" "}
            {duration.totalDuration !== 0 ? duration1_5x : <Skeleton />}
          </p>
          <p>
            Total Duration at 1.75x:{" "}
            {duration.totalDuration !== 0 ? duration1_75x : <Skeleton />}
          </p>
          <p>
            Total Duration at 2x:{" "}
            {duration.totalDuration !== 0 ? duration2x : <Skeleton />}
          </p>
        </SkeletonTheme>
      </div>
    </div>
  );
};

export default Duration;
