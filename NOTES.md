# Packages
- package.json referenced the "mongo" package instead of the "mongodb" package; the latter is the official MongoDB driver for Node, and is what I assume was intended.
- Installed ts-node-dev for ease of local development.
- Installed dotenv for loading .env file contents into environment variables.
- Installed io-ts and fp-ts for validating request bodies.

# Filtering
I wasn't sure what kind of query language to use for filtering the /stays endpoint; I ended up using a variant on MongoDB syntax. Example queries are in the readme. It currently only supports specifying the exact number of bedrooms/beds/bathrooms required, but it could be fairly easily extended to allow for less-than/greater-than operations. It also doesn't support OR operations, such as "4 bedrooms OR 6 beds". The code for creating the MongoDB query is also somewhat ad-hoc; it could probably be made more generic, either by writing a more generic way of building filters or by using a library such as Mongoose.