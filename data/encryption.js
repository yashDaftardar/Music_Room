const CryptoJS = require("crypto-js");
const key = "ry81=321r3idjdbnts2";

function encrypt(password) {
    var ciphertext = CryptoJS.AES.encrypt(password, key).toString();
    return ciphertext;
}

function decrypt(password) {
    var bytes = CryptoJS.AES.decrypt(password, key);
    var decryptText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptText;
}

module.exports ={
    encrypt,
    decrypt
}