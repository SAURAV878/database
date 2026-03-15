import Joi from "joi";
import logger from "../utils/logger.js";

export const createPostSchema = (req, res, next) => {

    const schema = Joi.object ({
        title: Joi.string().min(5).max(100).required(),
        content: Joi.string().required(),
        status: Joi.string().valid('draft', 'published').default('draft')
    });

    const { error }  = schema.validate(req.body);

    if(error) {
        logger.warn(`Request Blocked: ${error.details[0].message}`);
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    next();
    

};