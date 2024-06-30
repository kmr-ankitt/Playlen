import express from 'express';
import axios from 'axios';
import 'dotenv/config';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/playlistItems', async (req, res) => {

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        part: 'snippet',
        playlistId:  req.body.pID,
        maxResults: 50,
        // eslint-disable-next-line no-undef
        key: process.env.YOUTUBE_API_KEY,
      }
    });

    const data = response.data;
    const videoIDs = data.items.map(item => item.snippet.resourceId.videoId);
    res.send(videoIDs);
  } catch (error) {
    console.error('Error fetching playlist items:', error);
    res.status(500).send('Error fetching playlist items');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
