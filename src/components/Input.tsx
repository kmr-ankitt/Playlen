import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { extractPlaylistID } from "../utils/getPlaylistId";

type FormValues = {
  playlist: string;
};

type InputProps = {
  sendDuration: (duration: {
    totalDuration: number;
    averageDuration: number;
    playlistTitle: string;
    playlistThumbnail: string;
  }) => void;
  isSubmitted: (isSubmitted: boolean) => void;
  sendLink: (link: string) => void;
};

function Input({ sendDuration, isSubmitted, sendLink }: InputProps) {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [pID, setPID] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {

      const id = extractPlaylistID(data.playlist);
      setPID(id);
      sendLink(`https://www.youtube.com/playlist?list=${id}`);
      isSubmitted(true);
      console.log(pID);

      const response = await axios.post(
        "https://playlen-backend.onrender.com/api/playlistItems",
        { pID: id }
      );
      sendDuration(response.data);
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      } else {
        setError("Invalid Playlist URL");
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2 h-[100vh] items-center justify-center  max-sm:h-[100vh] bg-zinc-900 text-zinc-200"
      >
        <input
          type="text"
          placeholder="Playlist URL"
          className="p-2 w-1/3 min-w-[16rem] placeholder:text-center bg-zinc-200 text-zinc-600 outline-none focus:bg-zinc-300 focus:transition-[2s]"
          {...register("playlist", { required: true })}
        />
        {error && <div className="text-red-500">{error}</div>}
        <input
          type="submit"
          value="submit"
          className="p-2 bg-[#DF470A] uppercase w-1/3 min-w-[16rem] hover:bg-[#df460aca] hover:transition-[2s]"
          />
      </form>
    </div>
  );
}

export default Input;
