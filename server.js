const express = require("express");
const app = express();
const { createClient } = require("redis");

const redisClient = createClient();

app.get("/store/:key", async (req, res) => {
  const { key } = req.params;
  const value = req.query;
  await redisClient.connect();
  await redisClient.set(key, JSON.stringify(value));
  return res.send("Success");
});

app.get("/:key", async (req, res) => {
  const { key } = req.params;
  await redisClient.connect();
  const rawData = await redisClient.get(key);
  return res.json(JSON.parse(rawData));
});

app.get("/", (req, res) => {
  return res.send("Hello world");
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}`);
});
