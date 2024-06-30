import express from 'express';
import axios from 'axios';

const app = express();
const port = 5000;

app.get('/api/playlistItems', async (req, res) => {
  try {
    const response = await axios.get('https://www.youtube.com/playlist?list=' + req.query.pID);
    const data = response.data;
    const videoIDs = data.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
    res.send(videoIDs);
  } catch (error) {
    console.error('Error fetching playlist items:', error);
    res.status(500).send('Error fetching playlist items');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
