import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { SeedService } from "../services/seedService";

export class SeedController {
  constructor(
    private readonly seedService: SeedService = new SeedService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}


  async createSeed(req: Request, res: Response) {
    try {
      const data = this.seedService.createSeed();
      // if (!data) {
      //   return this.httpResponse.NotFound(res, "No existe dato");
      // }
      return this.httpResponse.Ok(res, {seed:true});
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
