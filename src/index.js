import dotenv from 'dotenv';
import app from './app.js';
import logger from './utlis/logger.js';

dotenv.config();

const port = 8000;

app.listen(port, () => {
    logger.info(`server is running in port ${port}`)
})