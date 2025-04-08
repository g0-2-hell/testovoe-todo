import { BadRequestException } from "@nestjs/common";
import {ERROR} from '../constants'
export class EmailAlreadyRegistered extends BadRequestException {
  constructor(message: string = ERROR.EMAIL_ALREADY_REGISTERED) {
    super(message);
  }
}
