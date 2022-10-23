import {NextFunction, Request, Response} from "express";
import {HttpResponse, HttpStatus} from "../response/http.response";
import {validationResult} from 'express-validator'

export class SharedMiddleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {
  }

  checkCustomerRole(req: Request, res: Response, next: NextFunction) {

    return next();
  }

  checkAdminRole(req: Request, res: Response, next: NextFunction) {

    return next();
  }

  errorValidation(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.BAD_REQUEST).json({errors})
    }
    next()
  }
}
