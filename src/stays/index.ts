import express from "express";
import { isLeft } from "fp-ts/lib/Either";
import * as t from "io-ts";
import { FilterQuery } from "mongodb";
import { getDatabase } from "../db";

// defines an io-ts codex for validating request bodies
// the static type can be examined with "type RequestBodySchema = t.TypeOf<typeof requestBodySchema>;"
const requestBodySchema = t.partial({
  filters: t.partial({
    bedrooms: t.type({
      eq: t.number
    }),
    beds: t.type({
      eq: t.number
    }),
    bathrooms: t.type({
      eq: t.number
    }),
    amenities: t.array(t.string)
  })
});

const router = express.Router();

router.post("/", async (req, res) => {
  const requestBody = requestBodySchema.decode(req.body);
  if (isLeft(requestBody)) {
    res.status(400).send("Invalid request body");
    return;
  }

  let query: FilterQuery<any> = {};
  
  if (requestBody.right.filters !== undefined) {
    if (requestBody.right.filters.bedrooms !== undefined) {
      query.bedrooms = {
        $eq: requestBody.right.filters.bedrooms.eq
      };
    }

    if (requestBody.right.filters.beds !== undefined) {
      query.beds = {
        $eq: requestBody.right.filters.beds.eq
      };
    }

    if (requestBody.right.filters.bathrooms !== undefined) {
      query.bathrooms = {
        $eq: requestBody.right.filters.bathrooms.eq
      };
    }

    if (requestBody.right.filters.amenities !== undefined) {
      query.amenities = {
        $all: requestBody.right.filters.amenities
      };
    }
  }

  const db = await getDatabase();
  const col = db.collection("listingsAndReviews");

  const results = await col.find(query, { limit: 10 });
  res.json(await results.toArray());
});

export default router;
