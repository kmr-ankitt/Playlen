// Ref: https://developers.google.com/youtube/v3/docs/playlistItems/list and https://developers.google.com/youtube/v3/docs/videos/list?apix_params=%7B%22part%22%3A%5B%22snippet%22%5D%2C%22id%22%3A%5B%229E006QLHt0Y%22%5D%7D

// server.ts
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/playlistItems", async (req, res) => {
  const { pID } = req.query;
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!pID || !apiKey) {
    return res.status(400).send("Playlist ID and API Key are required.");
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          playlistId: pID,
          key: apiKey,
        },
      }
    );

    res.json(response.data.items);
  } catch (error) {
    res.status(500).send("Error fetching playlist items.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
