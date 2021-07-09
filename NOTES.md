# Packages
- package.json referenced the "mongo" package instead of the "mongodb" package; the latter is the official MongoDB driver for Node, I assumed that was what was intended.
- Installed ts-node-dev for ease of local development.
- Installed dotenv for loading .env file contents into environment variables.
- Installed io-ts and fp-ts for validating request bodies.

# Filtering
I wasn't sure what kind of query language to use for filtering the /stays endpoint; I ended up using a variant on MongoDB syntax. Example queries are in the readme. It currently only supports specifying the exact number of bedrooms/beds/bathrooms required, but it could be fairly easily extended to allow for less-than/greater-than operations. It also doesn't support OR operations, such as "4 bedrooms OR 6 beds". The code for creating the MongoDB query is also somewhat ad-hoc; it could probably be made more generic, either by writing a more generic way of building filters or by using a library such as Mongoose.

# Pagination
Again, I wasn't sure what pagination strategy to follow. What I did was:
- Allow an optional "limits" parameter in the request body to specify a lower limit of records to be returned at once, with a hardcoded maximum of 25.
- Allow an optional "skip" parameter in the request body to specify a number of records to skip.

The response body contains a "meta" field that specifies:
- "size": the number of results returned
- "start": where the requested query started (0 if there was no skip, otherwise the value of the requested skip parameter)
- "next": only present if there are remaining results; if there are, what value to pass in for "skip" in a subsequent request to get the next page.

From manual testing, this appears to work; however, I'm not sure if it's a valid approach if the collection being queried has insertions/deletions happening concurrent with a client making requests to page through results. I'm also not sure if I'm using the correct logic for paging through the MongoDB cursor; the documentation warns against combining multiple "cursor paradigms", I chose to use `next()` and `hasNext()` exclusively. (See https://docs.mongodb.com/drivers/node/current/fundamentals/crud/read-operations/cursor/#cursor-paradigms)

# Reviews endpoint
I didn't have time to get to the reviews endpoint. As a general sketch, the route would probably be `GET /reviews/:id`, using the `id` from the URL to specify the listing ID to retrieve reviews for. It would call `getDatabase()` from `db/index.ts`, which should reuse a MongoDB connection if one's already been established.

# Testing
With more time, I would have implemented integration/end-to-end tests, using the [supertest](https://www.npmjs.com/package/supertest) library. Ideally, rather than having these tests run against the MongoDB instance from .env, I would rely on a local MongoDB instance running, seeding it with initial test data before executing the test suite.

# General code structure
The one other structural point of concern I wasn't sure about was how to divide the filtering/pagination logic between `src/stays/index.ts` and `src/db/index.ts`. In a larger-scale application, I'd probably move at least some of it into `db` for reusability, separation of concerns, and easier testing; `stays` would only be responsible for parsing the request body and passing the necessary filters to `db`. 