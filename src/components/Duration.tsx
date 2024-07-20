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
      className=" flex flex-col w-full items-center text-[1.2rem] bg-zinc-900 text-zinc-200 p-6  max-sm:text-[1rem] max-sm:mt-[-8rem] max-sm:mt-0"
      id="final-result"
    >
      <div className="  flex gap-6 justify-center max-sm:gap-4 max-sm:flex-col  flex-wrap  ">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div> <p className="text-red-500">  Total Duration:</p>
            {durationInHoursMinutes !== "0 hours 00 minutes" ? (
              <p> {durationInHoursMinutes} </p>
            ) : (
              <Skeleton />
            )}
          </div>
          <div> <p className="text-red-500">  
            Average Duration:{" "} </p>
            {duration.averageDuration !== 0 ? <p> {avgDuration} </p> : <Skeleton />}
          </div>
          <div> <p className="text-red-500">  
            Total Duration at 1.25x:{" "} </p>
            {duration.totalDuration !== 0 ? <p> {duration1_25x} </p> : <Skeleton />}
          </div>
          <div> <p className="text-red-500">  
            Total Duration at 1.5x:{" "}</p>
            {duration.totalDuration !== 0 ? <p> {duration1_5x} </p> : <Skeleton />}
          </div>
          <div> <p className="text-red-500">  
            Total Duration at 1.75x:{" "}</p>
            {duration.totalDuration !== 0 ? <p> {duration1_75x} </p> : <Skeleton />}
          </div>
          <div> <p className="text-red-500">  
            Total Duration at 2x:{" "}</p>
            {duration.totalDuration !== 0 ? <p> {duration2x} </p> : <Skeleton />}
          </div>
        </SkeletonTheme>
      </div>
    </div>
  );
};

export default Duration;
