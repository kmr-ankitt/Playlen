import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { extractPlaylistID } from '../utils/getPlaylistId';

type FormValues = {
  playlist: string;
};

type InputProps = {
  sendDuration: (duration: { totalDuration: number, averageDuration: number }) => void;
  isSubmitted: (isSubmitted: boolean) => void;
};


function Input({sendDuration, isSubmitted }: InputProps) {
  const { register, handleSubmit } = useForm<FormValues>();
  const [pID, setPID] = useState("");
  const [error, setError] = useState<string | null>(null);


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const id = extractPlaylistID(data.playlist);
      setPID(id);
      isSubmitted(true);
      console.log(pID);

      const response = await axios.post('https://playlen-backend.onrender.com/api/playlistItems', { pID: id });
      console.log(response.data);
      sendDuration(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      } else {
        setError('Invalid Playlist URL');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-2 h-[70vh] items-center justify-center  max-sm:h-[50vh]">
        <input
          type="text"
          placeholder="Playlist URL"
          className="p-2 w-1/3 min-w-[16rem] placeholder:text-center bg-zinc-200 text-zinc-600 outline-none"
          {...register('playlist', { required: true })}
        />
        {error && <div className="text-red-500">{error}</div>}
        <input type="submit" value="submit" className="p-2 bg-[#DF470A] uppercase w-1/3 min-w-[16rem]" />
      </form>
    </div>
  );
}

export default Input;