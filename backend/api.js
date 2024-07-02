import express from "express";
import axios from "axios";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

function parseISODurationToMinutes(duration) {
  const regex = /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  const matches = duration.match(regex);
  if (!matches) {
    return null;
  }
  const days = parseInt(matches[1] || 0);
  const hours = parseInt(matches[2] || 0);
  const minutes = parseInt(matches[3] || 0);
  const seconds = parseInt(matches[4] || 0);
  const totalMinutes = days * 24 * 60 + hours * 60 + minutes + seconds / 60;
  return Math.round(totalMinutes);
}

async function getVideoDuration(videoIds) {
  try {
    let duration = 0;
    for (const videoID of videoIds) {
      const url = `https://www.googleapis.com/youtube/v3/videos`;
      const response = await axios.get(url, {
        params: {
          part: "contentDetails",
          id: videoID,
          // eslint-disable-next-line no-undef
          key: process.env.YOUTUBE_API_KEY,
        },
      });
      const data = response.data.items[0].contentDetails.duration;
      duration += parseISODurationToMinutes(data);
    }

    console.log(duration)
    return duration;
  } catch (error) {
    console.log("Error fetching video duration:", error);
    return null;
  }
}

app.post("/api/playlistItems", async (req, res) => {
  console.log("Request received");
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          playlistId: req.body.pID,
          maxResults: 50,
          // eslint-disable-next-line no-undef
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    const data = response.data;
    const videoIDs = data.items.map((item) => item.snippet.resourceId.videoId);
    console.log(videoIDs);

    const duration = await getVideoDuration(videoIDs);
    res.status(200).send(`${duration}`);

  } catch (error) {
    console.error("Error fetching playlist items:", error);
    res.status(500).send("Error fetching playlist items", error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
