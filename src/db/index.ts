import { MongoClient } from "mongodb";

const dbString = process.env.MONGO_URL;

export async function connect() {
  console.log(dbString);
  const client = new MongoClient(dbString, {
    useUnifiedTopology: true,
  });
  const connection = await client.connect();
  return connection.db("sample_airbnb");
}
