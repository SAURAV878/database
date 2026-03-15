import logger from "../utils/logger.js";
import jwt from 'jsonwebtoken';

export const verifyToken  = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token  = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({
            message: "NO Badge (Token) provided"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({
            message: "Fake or Expired Badge!"
        })
    }
};

export const authorize = (allowedRoles) => {
    return (req, res, next) => {
        if(!req.user) {
            return res.status(401).json({
                message: "Not Authenticated"
            });
        }

        if (allowedRoles.includes(req.user.role)) {
            next(); 
        } else {
            logger.warn(`Access Denied: User ${req.user.role} tried to hit an Admin route`);
            res.status(403).json({
                message: "Forbidden: You do not have permission"
            });
        }
    };
};