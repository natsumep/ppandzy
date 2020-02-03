import CryptoJS from 'crypto-js'
const iv = CryptoJS.enc.Utf8.parse('tptdtpcbptptbtpc');
function decrypt(word, key) {
    var content = word;
    var key = CryptoJS.enc.Utf8.parse(key);
    var bytes = CryptoJS.AES.decrypt(content.toString(), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptResult = bytes.toString(CryptoJS.enc.Utf8);
    return decryptResult
    //return decryptedStr.toString();

}

//加密方法
function encrypt(word, key) {
    var content = word;
    var key = CryptoJS.enc.Utf8.parse(key); //abcdefghigkliopk密码，16位
    var encryptResult = CryptoJS.AES.encrypt(content, key, {
        iv:iv, 
        mode: CryptoJS.mode.CBC, //aes加密模式cbc
        padding: CryptoJS.pad.Pkcs7 //填充
    });
    var result = String(encryptResult);//把object转化为string
    return result

}

export default {
    encrypt,
    decrypt
}
