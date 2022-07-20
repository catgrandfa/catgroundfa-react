import CryptoJS from 'crypto-js';

type _typeObj = { [anyKey: string]: any };

/**
 * @param deepClone 深拷贝，对象里面有数组，数组不能深拷贝
 * @param _object 如果不传返回为空对象 必须是js的{}对象
 * @param _obj 可选 返回传入的@param _object 必须是js的{}对象,
 */
export const deepClone = (_object: _typeObj, _obj: _typeObj = {}): _typeObj => {
  if (!(Object.prototype === Object.getPrototypeOf(_object))) {
    return new Error('传入参数***_object***类型错误');
  }
  for (let key in _object) {
    if (
      _object[key] &&
      Object.prototype === Object.getPrototypeOf(_object[key])
    ) {
      _obj[key] = deepClone(_object[key]);
    } else if (
      _object[key] &&
      Array.prototype === Object.getPrototypeOf(_object[key])
    ) {
      _obj = _object[key].map((o: any) => ({ ...o }));
    }
    {
      _obj[key] = _object[key];
    }
  }
  return _obj;
};

/**
 * 下载文件
 */
export const download = (url: string, name: string) => {
  const a = document.createElement('a');
  a.download = name;
  a.rel = 'noopener';
  a.href = url;
  //触发模拟点击
  a.dispatchEvent(new MouseEvent('click'));
  // 或者 a.click()
};

/**
 * aes 加密
 * @param word
 * @returns {*}
 */
export const aes_encrypt = function (word: string) {
  const key = CryptoJS.enc.Utf8.parse('zyhtest');
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const aes_decrypt = function (word: string) {
  const key = CryptoJS.enc.Utf8.parse('zyhtest');
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};
