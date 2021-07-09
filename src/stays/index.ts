import express from "express";
import { getDatabase } from "../db";

const router = express.Router();

router.post("/", async (req, res) => {
  const db = await getDatabase();
  const col = db.collection("listingsAndReviews");

  const results = await col.find({}, { limit: 10 });

  res.json(await results.toArray());
});

export default router;
