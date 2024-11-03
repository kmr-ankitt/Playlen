import express from "express";
import axios from "axios";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import { parseISODurationToMinutes } from "./utils/decoder.js";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

async function getVideoDuration(videoIds) {
  try {
    const requests = videoIds.map(videoID => {
      const url = `https://www.googleapis.com/youtube/v3/videos`;
      return axios.get(url, {
        params: {
          part: "contentDetails",
          id: videoID,
          // eslint-disable-next-line no-undef
          key: process.env.YOUTUBE_API_KEY,
        },
      });
    });

    const responses = await Promise.all(requests);
    const totalDuration = responses.reduce((acc, response) => {
      const data = response.data.items[0].contentDetails.duration;
      return acc + parseISODurationToMinutes(data);
    }, 0);

    return { totalDuration, videoCount: videoIds.length };
  } catch (error) {
    console.log("Error fetching video duration:", error);
    return null;
  }
}

async function fetchPlaylistDetails(playlistId) {
  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/playlists", {
      params: {
        part: "snippet",
        id: playlistId,
        // eslint-disable-next-line no-undef
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    const playlistTitle = response.data.items[0].snippet.title;
    const playlistThumbnail = response.data.items[0].snippet.thumbnails.medium.url;

    return { playlistTitle, playlistThumbnail };
  } catch (error) {
    console.error("Error fetching playlist details:", error);
    return null;
  }
}

async function fetchAllVideos(playlistId) {
  let videoIDs = [];
  let nextPageToken = "";
  try {
    do {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "snippet",
            playlistId: playlistId,
            maxResults: 50,
            pageToken: nextPageToken,
            // eslint-disable-next-line no-undef
            key: process.env.YOUTUBE_API_KEY,
          },
        }
      );

      const data = response.data;
      nextPageToken = data.nextPageToken || "";
      videoIDs = videoIDs.concat(data.items.map((item) => item.snippet.resourceId.videoId));
    } while (nextPageToken);

    return videoIDs;
  } catch (error) {
    console.error("Error fetching playlist items:", error);
    return null;
  }
}

app.get("/", async (req, res) => {
  res.send("Server is running");
})
app.post("/api/playlistItems", async (req, res) => {
  console.log("Request received");
  try {
    const [videoIDs, playlistDetails] = await Promise.all([
      fetchAllVideos(req.body.pID),
      fetchPlaylistDetails(req.body.pID)
    ]);

    if (videoIDs && playlistDetails) {
      const { totalDuration, videoCount } = await getVideoDuration(videoIDs);
      const averageDuration = Math.round(totalDuration / videoCount);
      res.status(200).json({ 
        totalDuration, 
        averageDuration, 
        playlistTitle: playlistDetails.playlistTitle, 
        playlistThumbnail: playlistDetails.playlistThumbnail 
      });
    } else {
      res.status(500).send("Error fetching playlist items or details");
    }
  } catch (error) {
    console.error("Error fetching playlist items:", error);
    res.status(500).send("Error fetching playlist items");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
