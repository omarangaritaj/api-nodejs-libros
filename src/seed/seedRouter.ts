import { BaseRouter } from "../shared/router/router";
import { SeedController } from "./controllers/seedController";
import { SeddMiddleware } from "./middlewares/seddMiddleware";
export class SeedRouter extends BaseRouter<
  SeedController,
  SeddMiddleware
> {
  constructor() {
    super(SeedController, SeddMiddleware);
  }

  routes(): void {
    this.router.get("/seed", (req, res) =>
      this.controller.getSeed(req, res)
    );
  }
}
