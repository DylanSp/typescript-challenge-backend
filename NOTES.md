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