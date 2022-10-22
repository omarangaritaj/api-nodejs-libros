import {NextFunction, Request, Response} from "express";
import {HttpResponse} from "../response/http.response";

export class SharedMiddleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {
  }

  checkCustomerRole(req: Request, res: Response, next: NextFunction) {

    return next();
  }

  checkAdminRole(req: Request, res: Response, next: NextFunction) {

    return next();
  }
}
