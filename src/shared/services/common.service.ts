/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import {
  Injectable,
} from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';
import axios, { AxiosRequestConfig,AxiosHeaders  } from 'axios';
import * as OAuth from 'oauth-1.0a';
import { enc, HmacSHA256 } from 'crypto-js';
const uniqid = require('uniqid');

@Injectable()
export class CommonService {
 
  private oauth: OAuth;
  constructor() {
   
  }

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


  async makeNetSuitePostApiCall(endpoint: string, data: any): Promise<any> {
    const apiUrl = 'https://5718011.restlets.api.netsuite.com';
    const consumerKey = '80e31553426c117e01bcdb64466e9adc155fcb21be24a92b33187fc59081c59c';
    const consumerSecret = '2df20b759083573ebd5130fd924d81142f5124b424766516fe4dff87f6f4911f';
    const token = '35ef4724c536ac5e9ea1cdb21739a16042930ff66b4f5c86aa0f2bcc04ae4b40';
    const tokenSecret = '4f8e62d6ff0e5c8498d4396398065dbc4492e64ce0949df08018b109046a057e';
    const realm = '5718011';

    this.oauth = new OAuth({
      consumer: {
        key: consumerKey,
        secret: consumerSecret,
      },
      signature_method: 'HMAC-SHA256',
      hash_function(base_string, key) {
        return HmacSHA256(base_string, key).toString(enc.Base64);
      },
    });

    const oauthHeader = this.oauth.toHeader(
      this.oauth.authorize(
        { url: `${apiUrl}/${endpoint}`, method: 'POST' },
        { key: token, secret: tokenSecret },
      )
    );
    oauthHeader.Authorization=oauthHeader.Authorization += `, realm="${realm}"`;
    const headers = {
      ...oauthHeader,
      // Add any other headers if needed
    };

    const requestData: AxiosRequestConfig = {
      url: `${apiUrl}/${endpoint}`,
      method: 'POST',
      data,
      headers: headers,
    };

    try {
      const response = await axios(requestData);
      return response.data;
    } catch (error) {
      console.error('NetSuite API Error:', error.message);
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async makeNetSuiteGetApiCall(endpoint: string): Promise<any> {

    // const apiUrl = 'https://5718011-sb1.restlets.api.netsuite.com';
    // const consumerKey = '7dbb39f67e19efed966cdf6dca2d3a89bb814112c5b463cf34bac1728a6f6166';
    // const consumerSecret = '117b3b3f020569b05f83ab303f3edfa63c7cc3870ee788f976d37e4a3bc4ca54';
    // const token = '303b836e82624de74a03bd97ba74d51e4e8fb9b746e395d41529c10bb56495ec';
    // const tokenSecret = '2ac426e77b800d5ebe58f428304436e546a2da577c00f150d87f55255fa35ecb';
    // const realm = '5718011_SB1'; // Add this line

     const apiUrl = 'https://5718011.restlets.api.netsuite.com';
    const consumerKey = '80e31553426c117e01bcdb64466e9adc155fcb21be24a92b33187fc59081c59c';
    const consumerSecret = '2df20b759083573ebd5130fd924d81142f5124b424766516fe4dff87f6f4911f';
    const token = '35ef4724c536ac5e9ea1cdb21739a16042930ff66b4f5c86aa0f2bcc04ae4b40';
    const tokenSecret = '4f8e62d6ff0e5c8498d4396398065dbc4492e64ce0949df08018b109046a057e';
    const realm = '5718011';

    this.oauth = new OAuth({
      consumer: {
        key: consumerKey,
        secret: consumerSecret,
      },
      signature_method: 'HMAC-SHA256',
      hash_function(base_string, key) {
        return HmacSHA256(base_string, key).toString(enc.Base64);
      },
    });

    const oauthHeader = this.oauth.toHeader(
      this.oauth.authorize({ url: `${apiUrl}${endpoint}`, method: 'GET' }, { key: token, secret: tokenSecret })
    );
    oauthHeader.Authorization=oauthHeader.Authorization += `, realm="${realm}"`;
    const headers = {
      ...oauthHeader
   
    };

  console.log(headers,' headers');
  
    const requestData: AxiosRequestConfig = {
      url:`${apiUrl}${endpoint}`,
      method: 'GET',
      headers:headers
     
    };

    try {
      const response = await axios(requestData);
      return response.data;
    } catch (error) {
      // console.log(error,'error');
      console.error('NetSuite API Error:', error.message);
      throw error;
    }
  }

  


}


