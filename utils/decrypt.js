import CryptoJS from "crypto-js";

export default function decrypt(cypher, key) {
    const bytes = CryptoJS.AES.decrypt(cypher, key);
    let decryptedData = null;
    try {
        decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (err) {
        return null
    }
    return decryptedData;
} 
