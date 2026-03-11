import Post from "../models/post.js";
import logger from "../utils/logger.js";

export const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        logger.debug(` Sniper Search: ID ${id}`);

        const post = await Post.findByPk(id);

        if (!post) {
           
            logger.warn(` Post not found: ID ${id}`);
            return res.status(404).json({ message: "Post not found" });
        }

        logger.info(`Found: ${post.title}`);
        res.json(post);
    } catch (error) {
        logger.error(` Controller Error: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        logger.debug(`Building Post: ${title}`);

        const newPost = await Post.create({ title, content });

        logger.info(` Created Successfully: ID ${newPost.id}`);
        res.status(201).json(newPost);
    } catch (error) {
        // Correct Error Name: SequelizeValidationError
        if (error.name === 'SequelizeValidationError') {
            logger.warn(` Data Blocked: ${error.errors[0].message}`);
            return res.status(400).json({ error: error.errors[0].message });
        }

        logger.error(`System Failure: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};