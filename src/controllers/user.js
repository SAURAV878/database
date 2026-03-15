
import User from "../models/user.js";
import { generateSalt, hashPassword, verifyPassword } from "../utils/auth.js";
import logger from "../utils/logger.js";
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;

        const userSalt = generateSalt();
        const hashedPassword = hashPassword(password, userSalt);

        const newUser = await User.create ({
            username,
            email, 
            salt: userSalt,
            password: hashedPassword
        });
        res.status(201).json({
            message: "Success",
            userId: newUser.id
        });

    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: "Registration failed.Please try again"
        });
    }
    
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ where: { email }});

        const isMatch =user ? verifyPassword(password, user.salt, user.password): false;

        if(isMatch){
            const token = jwt.sign(
                {id: user.id, username: user.username, role: user.role},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            );

            return res.status(200).json({
                message: "login successful!",
                token: token
            });
        } else {
            return res.status(401).json({
                error: "Invalid password"
            });
        }


    }catch (error) {
        logger.error(`${error}`);
        res.status(500).json({
            error: "login failed" 
        })
    }

}