import { BaseRouter } from "../shared/router/router";
import { SeedController } from "./controllers/seedController";
export class CategoryRouter extends BaseRouter<SeedController, SeedController> {
  constructor() {
    // super(SeedController);
  }

  routes(): void {
    this.router.get("/seed", (req, res) =>
      this.controller.getSeed(req, res)
    );
  }
}
