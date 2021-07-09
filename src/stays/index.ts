import express from "express";
import { isLeft } from "fp-ts/lib/Either";
import * as t from "io-ts";
import { FilterQuery } from "mongodb";
import { getDatabase } from "../db";

// maximum number of listings that can be returned from one query;
// user can specify a lower limit
const MAX_LIMIT = 25;

// defines an io-ts codex for validating request bodies
// the static type can be examined with "type RequestBodySchema = t.TypeOf<typeof requestBodySchema>;"
const requestBodySchema = t.partial({
  limit: t.number,
  skip: t.number,
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

type ResponseBody = {
  meta: {
    start: number,
    size: number,
    next?: number
  },
  results: unknown[]
};

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

  let limit = MAX_LIMIT;
  if (requestBody.right.limit !== undefined && requestBody.right.limit < 25) {
    limit = requestBody.right.limit;
  }

  const skip = requestBody.right.skip ?? 0;

  const db = await getDatabase();
  const col = db.collection("listingsAndReviews");

  const resultsCursor = col
    .find(query)
    .sort({
      _id: 1  // sort by _id ascending, so we have a defined order for skipping
    })
    .limit(limit)
    .skip(skip);
  const results = [];
  for (let doc = 0; (doc < limit) && (await resultsCursor.hasNext()); doc++) {
    results.push(await resultsCursor.next());
  }

  // resultsCursor.hasNext() doesn't return correct response for some reason;
  // so instead, check based on number of results skipped + number of results returned
  const hasNext = (skip + results.length) < (await resultsCursor.count());

  const response: ResponseBody = {
    meta: {
      start: 0,
      size: results.length
    },
    results
  };
  if (hasNext) {
    response.meta.next = skip + limit;
  }

  res.json(response);
});

export default router;
