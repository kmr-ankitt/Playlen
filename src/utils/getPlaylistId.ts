export const extractPlaylistID = (url: string): string => {
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
  