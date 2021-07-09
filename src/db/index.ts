import { MongoClient } from "mongodb";

export async function connect() {
  const dbString = process.env.MONGO_URL;
  console.log(dbString);
  
  const client = new MongoClient(dbString, {
    useUnifiedTopology: true,
  });
  const connection = await client.connect();
  return connection.db("sample_airbnb");
}
