import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({
  path:
    process.env.NODE_ENV !== undefined
      ? `.${process.env.NODE_ENV.trim()}.env`
      : ".env",
});

const Config = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};


export const dbConnection = async (): Promise<any> => {
  try {
    await mongoose.connect(`mongodb://${Config.host}:${Config.port}/${Config.database}`,
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