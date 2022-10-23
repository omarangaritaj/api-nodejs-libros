import {IsNotEmpty} from "class-validator";
import {BaseDTO} from "../../config/base.dto";

export class BookDTO extends BaseDTO {

   @IsNotEmpty()
   "ISBN": string

  @IsNotEmpty()
   "Book-Title": string

  @IsNotEmpty()
   "Book-Author": string

  @IsNotEmpty()
   "Year-Of-Publication": string

  @IsNotEmpty()
   "Publisher": string

  @IsNotEmpty()
   "Image-URL-S": string

  @IsNotEmpty()
   "Image-URL-M": string

  @IsNotEmpty()
   "Image-URL-L": string
}

