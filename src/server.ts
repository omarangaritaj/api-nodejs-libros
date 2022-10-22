import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { ConfigServer } from "./config/config";
import { ProductRouter } from "./product/product.router";
import { SeedRouter } from "./seed/seedRouter";
import { DataSource } from "typeorm";


class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv("PORT");

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.dbConnect();
    this.app.use(morgan("dev"));

    this.app.use(
      cors({
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
      })
    );

    this.app.use("/api", this.routers());
    this.listen();
  }

  routers(): Array<express.Router> {
    return [
      new ProductRouter().router,
      new SeedRouter().router,
    ];
  }

  async dbConnect(): Promise<DataSource | void> {
    return this.initConnect
      .then(() => {
        console.log("Connect Success");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Listen in ${this.port} :: ENV = ${this.getEnvironment("ENV")}`
      );
    });
  }
}

new ServerBootstrap();
