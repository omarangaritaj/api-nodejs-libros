import {Request, Response} from "express";
import {HttpResponse} from "../../shared/response/http.response";
import {SeedService} from "../services/seedService";

export class SeedController {
  constructor(
    private readonly seedService: SeedService = new SeedService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {
  }


  async createSeed(req: Request, res: Response) {
    try {
      const data = await this.seedService.createSeed();
      if (!data) {
        return this.httpResponse.NotFound(res, "Problema al crear los datos, es posible que ya los haya almacenado");
      }
      return this.httpResponse.Ok(res, {savedBooks: data});
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
