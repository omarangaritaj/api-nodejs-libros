import {NextFunction, Request, Response} from "express";
import {SharedMiddleware} from "../../shared/middlewares/shared.middleware";

import {BookDTO} from "../dto/bookDTO";
import {validate} from "class-validator";

export class BookMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }

  bookValidator(req: Request, res: Response, next: NextFunction) {
      next();
  }
}
