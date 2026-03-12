
import { decryptWithPrivateKey, encryptWithPublicKey, generateKeys } from "../utils/asymmetric.js"
import logger from "../utils/logger.js";


export const getNewKeys = (req, res) => {
    const keys = generateKeys();
    res.json(keys);
};

export const encryptData = (req, res) => {
    try{
        const {publicKey, text} = req.body;

        const result = encryptWithPublicKey(publicKey, text);
        res.json({
            encrypted: result
        });
    } catch (error) {
        logger.error(`${error}`);
        res.status(400).json ({
            error: "Encrytion failed. check public key"
        });
    }
}

export const decryptData = (req, res) => {
    try {
        const {privateKey, encrypted} = req.body;

        const result = decryptWithPrivateKey(privateKey, encrypted);
        res.json({
            decrypted: result
        });
    } catch (error) {
        logger.error(`${error}`);
        res.status(400).json({
            error: "Decryption failed. check your private key"
        })
    }
}