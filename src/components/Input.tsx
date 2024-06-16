import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  playlist: string;
};

type InputProps = {
  sendID: (id: string) => void;
};

function Input({ sendID }: InputProps) {
  const { register, handleSubmit } = useForm<FormValues>();

  const extractPlaylistID = (url: string): string => {
    try {
      // Ensuring the URL has a protocol
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

  const onSubmit: SubmitHandler<FormValues> = data => {
    const id = extractPlaylistID(data.playlist);
    sendID(id);  
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
        <input type="submit" value="submit" className="p-2 bg-[#DF470A] uppercase w-1/3 min-w-[16rem]" />
      </form>
    </div>
  );
}

export default Input;
