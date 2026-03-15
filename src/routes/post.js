import express from 'express';
import { createPost, getPost } from '../controllers/post.js';
import { createPostSchema } from '../validators/validate.js';

const router = express.Router();

router.post('/', createPostSchema, createPost);
router.get('/:id', getPost);

export default router;