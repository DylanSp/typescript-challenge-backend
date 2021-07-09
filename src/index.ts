import express from "express";
import dotenv from "dotenv";
import Stays from "./stays";

dotenv.config();

const port = 3000;
const app = express();

app.use("/stays", Stays);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
