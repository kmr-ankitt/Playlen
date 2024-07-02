import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  playlist: string;
};

type InputProps = {
  sendID: (id: string) => void;
};

function Input({ sendID }: InputProps) {
  const { register, handleSubmit } = useForm<FormValues>();
  const [pID, setPID] = useState("");
  const [error, setError] = useState<string | null>(null);

  const extractPlaylistID = (url: string): string => {
    try {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      const urlObj = new URL(url);
      return urlObj.searchParams.get('list') || "";
    } catch (error) {
      console.error('Invalid URL');
      return "";
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const id = extractPlaylistID(data.playlist);
      setPID(id);
      sendID(id);

      const response = await axios.post('http://localhost:5000/api/playlistItems', { pID: id });
      console.log(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-2 h-[60vh] items-center justify-center">
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