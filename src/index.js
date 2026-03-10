import app from './app.js';
import sequelize from './config/database.js';
import logger from './utlis/logger.js';


try {
    await sequelize.authenticate();
    
    app.listen(8000, () => {
        logger.info(" Master Server is LIVE on port 8000");
    });

} catch (error) {
    logger.error("Failed to start:", error);
}