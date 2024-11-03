import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type DurationProps = {
  duration: {
    totalDuration: number;
    averageDuration: number;
    playlistTitle: string;
    playlistThumbnail: string;
  };
  link: string;
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

const Duration: React.FC<DurationProps> = ({ duration, link }) => {
  const durationInHoursMinutes = convertMinutesToHours(duration.totalDuration);
  const avgDuration = convertMinutesToHours(duration.averageDuration);
  const duration1_25x = calculateNewDuration(duration.totalDuration, 1.25);
  const duration1_5x = calculateNewDuration(duration.totalDuration, 1.5);
  const duration1_75x = calculateNewDuration(duration.totalDuration, 1.75);
  const duration2x = calculateNewDuration(duration.totalDuration, 2);

  return (
    <div
      className=" flex flex-col h-full w-full items-center justify-center text-[1.2rem] gap-10 bg-zinc-900 text-zinc-200 p-6  max-sm:text-[1rem] "
      id="final-result"
    >
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <div className="flex items-center bg-zinc-800 rounded-xl w-[90%] gap-10 p-10 max-sm:flex-col justify-evenly">
            {duration.playlistTitle ? (
              <h1 className="text-[1.5rem] uppercase underline">
              {duration.playlistTitle}
              </h1>
            ) : (
              <Skeleton width={200} height={30} />
            )}
            {duration.playlistThumbnail ? (
              <a href={link} target="_blank" rel="noopener noreferrer">
              <img
                src={duration.playlistThumbnail}
                alt="Playlist Thumbnail"
                className="rounded-md hover:opacity-50 hover:transition-opacity"
              />
              </a>
            ) : (
              <Skeleton width={150} height={150} />
            )}
            </div>
        
        <div className="  flex gap-6 justify-center max-sm:gap-4 max-sm:flex-col  flex-wrap  ">
          <div>
            {" "}
            <p className="text-red-500"> Total Duration:</p>
            {durationInHoursMinutes !== "0 hours 00 minutes" ? (
              <p> {durationInHoursMinutes} </p>
            ) : (
              <Skeleton />
            )}
          </div>
          <div>
            {" "}
            <p className="text-red-500">Average Duration: </p>
            {duration.averageDuration !== 0 ? (
              <p> {avgDuration} </p>
            ) : (
              <Skeleton />
            )}
          </div>
          <div>
            {" "}
            <p className="text-red-500">Total Duration at 1.25x: </p>
            {duration.totalDuration !== 0 ? (
              <p> {duration1_25x} </p>
            ) : (
              <Skeleton />
            )}
          </div>
          <div>
            {" "}
            <p className="text-red-500">Total Duration at 1.5x: </p>
            {duration.totalDuration !== 0 ? (
              <p> {duration1_5x} </p>
            ) : (
              <Skeleton />
            )}
          </div>
          <div>
            {" "}
            <p className="text-red-500">Total Duration at 1.75x: </p>
            {duration.totalDuration !== 0 ? (
              <p> {duration1_75x} </p>
            ) : (
              <Skeleton />
            )}
          </div>
          <div>
            {" "}
            <p className="text-red-500">Total Duration at 2x: </p>
            {duration.totalDuration !== 0 ? (
              <p> {duration2x} </p>
            ) : (
              <Skeleton />
            )}
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default Duration;
