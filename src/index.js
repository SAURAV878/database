import app from './app.js';
import sequelize from './config/database.js';
import logger from './utils/logger.js';
import { encrypt, decrypt } from './utils/encrypt.js';

try {
    await sequelize.authenticate();
    
    app.listen(8000, () => {
        logger.info(" Master Server is LIVE on port 8000");
    });

} catch (error) {
    logger.error("Failed to start:", error);
}

const laboratoryTest = () => {
    const originalMessage = "Saurav is a Senior Backend Engineer!";
    
 
    const scrambled = encrypt(originalMessage);
    logger.info(`🔐 ENCRYPTED : ${scrambled}`);

    const recovered = decrypt(scrambled);
    logger.info(`DECRYPTED : ${recovered}`);


    if (originalMessage === recovered) {
        logger.info("SUCCESS: The Two-Way Street is perfect!");
    } else {
        logger.error("FAIL: The message changed!");
    }
};

laboratoryTest();