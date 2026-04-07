import JWT from 'jsonwebtoken';
import userModel from '../models/userSchema.js'



export const requireLogin = async (req, res, next) => {
    try {
        console.log("Is cookies-get a function?", typeof req.cookies.get);

        // 2. Try reading WITHOUT the signed flag to see if the cookie exists at all
        const token = req.cookies.get('tokenabhi', { signed: true });
        console.log(token);

        if (!token) {
            return res.redirect('/login');
        }


        const decode = JWT.verify(token, process.env.JWT_token);
        req.user = decode;
        console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
        res.clearCookie('tokenabhi');
        return res.redirect('/login');
    }
}