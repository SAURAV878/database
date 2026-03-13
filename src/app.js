import express from 'express';
import morgan from 'morgan';
import logger from './utils/logger.js';
import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';
import securityRoutes from './routes/security.js'
import rateLimit from 'express-rate-limit';



const app = express();

const stream = {
    write: (message) => logger.http(message.trim()),
};

const limiter = rateLimit ({
    windowMs: 1 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    
    handler: (req, res, next, options) => {
        logger.warn(`Rate limit is execced by IP: ${req.ip}`);
        res.status(options.statusCode).json({
            error: "To many requests",
            message: "You are clicking too fast!please wait 1min",
            retryAfter: `${options.windowMs / 1000} seconds`
        });
    }
});

app.use(limiter);

app.use(morgan('combined', { stream }));

app.use(express.json());

app.use('/posts', postRoutes);

app.use('/', userRoutes);

app.use('/', securityRoutes);


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