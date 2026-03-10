
import app from './app.js';
import logger from './utlis/logger.js';
import sequelize from './config/database.js';
import Post from './models/post.js';

const port = 8000;

const startServer = async() => {
    try {
        await sequelize.authenticate();
        logger.info('Database Connected');

        await sequelize.sync({force: true});
        logger.info("Database synchronized (Tables Created)");

        try {
            await Post.create({
                title: 'HEY YAMA',
                content: "leraning",
                status: "published"
            })

        }catch (error) {
            logger.info(error);
        }

        try{
            logger.info("Testing validation: sending a title that is to short")        
            await Post.create({
                title: "No",
                content: "Learning",
            });
            logger.info("sucess")

        } catch (error) {
            logger.warn(`VALICATION BLOCKED: ${error}`)
        }


        app.listen(port, () => {
            logger.info(`server is ruuning at ${port}`);
        });

    } catch (error) {
        logger.error(`${error}`);
    }
}

startServer();