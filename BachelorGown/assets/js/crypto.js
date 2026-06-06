
export const encrypt = (data, key, iv) => {
  const CryptoJS = require('crypto-js');
  const keyVal = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256(key).toString());
  const ivVal = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256(iv).toString());

  const encrypted = CryptoJS.AES.encrypt(data, keyVal, {
    iv: ivVal,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  
  const hexStr = encrypted.ciphertext.toString().toUpperCase();

  return hexStr;
}

export const decrypt = (data, key, iv) => {
  const CryptoJS = require("crypto-js");
  const keyVal = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256(key).toString());
  const ivVal = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256(iv).toString());

  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, keyVal, {
    iv: ivVal,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);

  return decryptedStr
}
