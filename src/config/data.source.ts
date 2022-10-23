import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({
  path:
    process.env.NODE_ENV !== undefined
      ? `.${process.env.NODE_ENV.trim()}.env`
      : ".env",
});

const Config = {
  port: Number(process.env.DB_PORT),
  database: process.env.DB_HOST,
};


export const dbConnection = async (): Promise<any> => {
  try {
    await mongoose.connect(`${Config.database}`,
      {
        // useCreateIndex: true,
        // useFindAndModify: false,
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      })
    console.log('connected to database')
  } catch (error) {
    console.log(error);
    throw new Error("Trobble with a Data Base connection");
  }
}