import CryptoJS from "crypto-js";

const SECRET_KEY="eRadAdminSecret";
export const getSecretKeyInBase64Format = ()=>{
    console.log(SECRET_KEY,' SECRET_KEY');
    var words = CryptoJS.enc.Utf8.parse(SECRET_KEY); 
    var base64 = CryptoJS.enc.Base64.stringify(words); 
    console.log(base64,' base64');
    return base64;
}


export const encryptFieldUsingAES = (value)=>{
    return CryptoJS.AES.encrypt(value, getSecretKeyInBase64Format()).toString();
}


export const decryptAESString = (encryptedString:string) =>{
  try{
    return CryptoJS.AES.decrypt(encryptedString, getSecretKeyInBase64Format()).toString(CryptoJS.enc.Utf8)
  }catch(e)
  {
    console.log(e,'exception');
  }
}

export const getEncryptedShaValue = (originalText:string)=>{
    return CryptoJS.SHA256(originalText).toString();
}

export const getEncryptedMD5Value = (shaValue:string)=>{
    return CryptoJS.MD5(shaValue).toString();
}