import crypto from 'crypto';

export const generateKeys = () => {
    const {publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'

        }
    });

    return { publicKey, privateKey};
};

export const encryptWithPublicKey = (publicKey, text) => {
    const buffer = Buffer.from(text, 'utf8');



    const encrypted = crypto.publicEncrypt( 
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },buffer);

    return encrypted.toString('base64');

}

export const decryptWithPrivateKey = (privateKey, encryptedBase64) => {
    const buffer = Buffer.from(encryptedBase64, 'base64');

    const decrypted = crypto.privateDecrypt( 
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        }, buffer);

    return decrypted.toString('utf8');

};