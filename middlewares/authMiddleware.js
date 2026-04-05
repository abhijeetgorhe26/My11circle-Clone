import JWT from 'jsonwebtoken';
import userModel from '../models/userSchema.js';


export const requireLogin = async (req, res, next) => {
    try {
        console.log("Yes jwt worked well here");
        console.log(req.headers.authorization)
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_token);
        req.user = decode;
        console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}