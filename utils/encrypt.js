import CryptoJS from "crypto-js";

export default function encrypt(obj, key) {
    return CryptoJS.AES.encrypt(JSON.stringify(obj), key).toString();
}
