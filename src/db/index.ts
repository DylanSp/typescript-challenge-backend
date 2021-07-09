import { Db, MongoClient } from "mongodb";

// cached singleton connection
let database: Db | undefined;

export async function connect(): Promise<Db> {
  if (database !== undefined) {
    return database;
  }

  const dbString = process.env.MONGO_URL;

  if (dbString === undefined) {
    throw new Error("Unable to connect to Mongo database");
  }
  
  const client = new MongoClient(dbString, {
    useUnifiedTopology: true,
  });
  const connection = await client.connect();
  database = connection.db("sample_airbnb");
  return database;
}
