import express from 'express';
import morgan from 'morgan';
import logger from './utils/logger.js';
import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';


const app = express();

const stream = {
    write: (message) => logger.http(message.trim()),
};

app.use(morgan('combined', { stream }));

app.use(express.json());

app.use('/posts', postRoutes);

app.use('/', userRoutes);


app.get('/test', (req, res) => {
    logger.info('test route was hit');
    res.send("Check your terminal and app.log!");
});

app.get('/error', (req, res) => {
    logger.error("System Alert: this is the test error");
    res.status(500).send("You truggres an error");
})

app.get('/warn', (req, res) => {
    logger.warn("Suspsted User");
    res.send("Check the user");
})

export default app;