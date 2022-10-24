import {IsNotEmpty, IsString} from "class-validator";
import {BaseDTO} from "../../config/base.dto";

export class BookDTO extends BaseDTO {

   @IsNotEmpty()
   @IsString()
   "ISBN": string

  @IsNotEmpty()
  @IsString()
   "Book-Title": string

  @IsNotEmpty()
  @IsString()
   "Book-Author": string

  @IsNotEmpty()
  @IsString()
   "Year-Of-Publication": string

  @IsNotEmpty()
  @IsString()
   "Publisher": string

  @IsNotEmpty()
  @IsString()
   "Image-URL-S": string

  @IsNotEmpty()
  @IsString()
   "Image-URL-M": string

  @IsNotEmpty()
  @IsString()
   "Image-URL-L": string
}

