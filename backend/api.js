import express from "express";
import axios from "axios";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import { parseISODurationToMinutes } from "./decoder.js";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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
    return { totalDuration: duration, videoCount: videoIds.length };
  } catch (error) {
    console.log("Error fetching video duration:", error);
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

app.post("/api/playlistItems", async (req, res) => {
  console.log("Request received");
  try {
    const videoIDs = await fetchAllVideos(req.body.pID);
    if (videoIDs) {
      const { totalDuration, videoCount } = await getVideoDuration(videoIDs);
      const averageDuration = Math.round(totalDuration / videoCount);
      res.status(200).json({ totalDuration, averageDuration});
    } else {
      res.status(500).send("Error fetching playlist items");
    }
  } catch (error) {
    console.error("Error fetching playlist items:", error);
    res.status(500).send("Error fetching playlist items");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
