import CryptoJS from 'crypto-js';
import _ from 'lodash';

//私钥长度为16位,否则会报错
const aesSecretkey = CryptoJS.enc.Utf8.parse('unicom-ai-unicom');

const aesEncrypt = (value: any) => {
  console.log('type of value ', typeof value);

  if (!value || (typeof value !== 'string' && typeof value !== 'object'))
    return null;
  let encryptText: any = '';
  if (typeof value === 'string') encryptText = CryptoJS.enc.Utf8.parse(value);
  if (typeof value === 'object')
    encryptText = JSON.stringify(_.cloneDeep(value));
  return CryptoJS.AES.encrypt(encryptText, aesSecretkey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};

const aesDecrypt = (ciphertext: any, type: string) => {
  if (!ciphertext || ciphertext.length <= 0) return null;
  let decryptBytes = CryptoJS.AES.decrypt(ciphertext, aesSecretkey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  if (type === 'text') return decryptBytes.toString(CryptoJS.enc.Utf8);
  if (type === 'json')
    return JSON.parse(decryptBytes.toString(CryptoJS.enc.Utf8));
};

const base64Encode = (data: any) => {
  if (!data || data.length <= 0) return null;
  let wordArray = CryptoJS.enc.Utf8.parse(data);
  return CryptoJS.enc.Base64.stringify(wordArray);
};

const base64Decode = (data: any) => {
  if (!data || data.length <= 0) return null;
  let wordArray = CryptoJS.enc.Base64.parse(data);
  return wordArray.toString(CryptoJS.enc.Utf8);
};

const md5Encrypt = (data: any) => {
  if (!data || data.length <= 0) return null;
  return CryptoJS.MD5(data).toString();
};

const sha256Encrypt = (data: any) => {
  if (!data || data.length <= 0) return null;
  CryptoJS.SHA256(data).toString();
};

const setEncrypt = (algorithm: any, value: any) => {
  if (!algorithm || algorithm.length <= 0) return null;

  if (algorithm === 'AES') return aesEncrypt(value);
  return value;
};

const getDecrypt = (algorithm: any, value: any, type: any) => {
  if (!algorithm || algorithm.length <= 0 || !value || value.length <= 0)
    return null;
  if (algorithm === 'AES') {
    return aesDecrypt(value, type);
  }
  return value;
};

export {
  md5Encrypt,
  sha256Encrypt,
  setEncrypt,
  getDecrypt,
  base64Encode,
  base64Decode,
};
