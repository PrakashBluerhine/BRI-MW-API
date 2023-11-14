/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import {
  Injectable,
} from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const uniqid = require('uniqid');

@Injectable()
export class CommonService {
  constructor() {}

  async customResponse(
    data: object,
    message: string,
    status: string,
    userToken?: object,
  ): Promise<ResponseDto> {
    const dto = new ResponseDto();
    dto.status = status;
    dto.message = message;
    dto.data = data;
    // dto.errors = error;
    return dto;
  }

  async customResponseToken(
    data: object,
    message: string,
    status: string,
    roleModules?: any,
  ) {
    const dto = new ResponseDto();
    dto.status = status;
    dto.message = message;
    dto.data = data;

    return dto;
  }

 


  generateUID() {
    // I generate the UID from two parts here
    // to ensure the random number provide enough bits.
    let firstPart = ((Math.random() * 46656) | 0).toString();
    let secondPart = ((Math.random() * 46656) | 0).toString();
    firstPart = ('000' + firstPart).slice(-3);
    secondPart = ('000' + secondPart).slice(-3);
    const uuid = firstPart + secondPart;
    return uuid;
  }

  async generatePassword() {
    let randNumber = Math.round(Date.now() / 1000).toString();
    randNumber = randNumber.substr(randNumber.length - 7);
    let randUniqid = uniqid().toUpperCase();
    randUniqid = randUniqid.substr(randUniqid.length - 7);
    const userCode = randUniqid + randNumber;
    return userCode;
  }



}


