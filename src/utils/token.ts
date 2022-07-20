import CryptoJS from 'crypto-js';
const secretkey = 'jsUnicom';
const TokenKey = 'x-token';
// let getUToken = function() {
//   return Cookies.get(TokenKey)
// }

const getUToken = () => {
  // const pKey = TokenKey + '_' + process.env.VUE_APP_ENAME;
  const pKey = TokenKey + '_' + 'react-admin';

  const ciphertext = localStorage[pKey];
  let text, store;
  if (ciphertext) {
    text = CryptoJS.AES.decrypt(ciphertext, secretkey).toString(
      CryptoJS.enc.Utf8,
    );
  }
  try {
    if (text) {
      store = JSON.parse(text);
    }
  } catch (e) {
    console.log(e);
  }
  return store;
};

// let setUToken = function(token, expireTime) {
//   return Cookies.set(TokenKey, token, { expires: expireTime })
// }

const setUToken = (value: any) => {
  if (value) {
    // const pKey = TokenKey + '_' + process.env.VUE_APP_ENAME;
    const pKey = TokenKey + '_' + 'react-admin';

    localStorage[pKey] = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      secretkey,
    ).toString();
  }
};

const removeUToken = function () {
  // return Cookies.remove(TokenKey)
  window.localStorage.removeItem(TokenKey + '_' + process.env.VUE_APP_ENAME);
};

const setStore = (key: string, value: any) => {
  if (value) {
    // const pKey = key + '_' + process.env.REACT_APP_APP_ENAME
    const pKey = key + '_' + process.env.VUE_APP_ENAME;
    localStorage[pKey] = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      secretkey,
    ).toString();
  }
};

const getStore = (key: string) => {
  // const pKey = key + '_' + process.env.REACT_APP_APP_ENAME
  const pKey = key + '_' + process.env.VUE_APP_ENAME;
  const ciphertext = localStorage[pKey];
  let text, store;
  if (ciphertext) {
    text = CryptoJS.AES.decrypt(ciphertext, secretkey).toString(
      CryptoJS.enc.Utf8,
    );
  }
  try {
    if (text) {
      store = JSON.parse(text);
    }
  } catch (e) {
    console.log(e);
  }
  return store;
};

export { getUToken, setUToken, removeUToken, setStore, getStore };
