
import User from '../models/userSchema.js';
import { sendEmail } from "../utils/mailSender.js";
import generateOtp from "../utils/otpGenerator.js";

import 'dotenv/config'





const tempUsers = new Map();




// verfiy otp 
export const verifyOtp = async (req, res) => {

    try {
        const { email, otp } = req.body;

        const tempUser = tempUsers.get(email);

        if (!tempUser) {
            return res.status(400).json({
                success: false,
                message: "No registration found. Please register again."
            });
        }

        // ⏰ Expiry check
        if (tempUser.otpExpired < Date.now()) {
            tempUsers.delete(email);

            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        // 🔐 OTP check
        if (tempUser.otpCode !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // ✅ SAVE TO DB AFTER VERIFY
        const newUser = await User.create({
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.password,
            isVerified: true
        });

        // 🧹 Remove from temp storage
        tempUsers.delete(email);

        res.status(200).json({
            success: true,
            message: "User verified & saved to DB"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "OTP verification failed"
        });
    }
};


// for register 
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const otp = generateOtp();
        const otpExpired = Date.now() + 5 * 60 * 1000;

        console.log("OTP:", otp);

        // ✅ Store in TEMP MEMORY (not DB)
        tempUsers.set(email, {
            name,
            email,
            password,
            otpCode: otp,
            otpExpired
        });

        await sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);

        console.log('i sent otp please verify it')
        res.status(200).json({
            success: true,
            message: "OTP sent to email"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to send OTP"
        });
    }
};

// for logged in
export const login = async (req, res) => {
    try {


        console.log("Login is calling")
        const { email, password } = req.body;

        console.log(password);

        const user = await User.findOne({
            email: email.toLowerCase()
        }).select("+password");


        console.log("Req.body.email: " + email);
        console.log("Email from user DB: " + user.email);

        console.log(user + "I am present inside userAuth Login function");
        if (user.email === email) {
            if (user.password === password) {
                res.status(200).json({
                    success: true,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    error: "Password is wrong"
                })
            }
        }
        else {
            res.status(401).json({
                success: false,
                error: "invalid credintials"
            })
        }

        /* const isMatch = await user.comparePassword(password);
         console.log(isMatch);
         if (!isMatch) {
             console.log('Password is not match')
             return res.status(401).json({
                 success: false,
                 error: 'Invalid credentials'
             });
         } */


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};


export const toRegister = async (req, res) => {
    try {
        res.render('register');
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to fetch data' });
    }
};

export const toLogin = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to fetch data' });
    }
}


export const toVerify = async (req, res) => {
    try {
        console.log('yes i am loaded');
        res.render('verify')
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to verify' });
    }
}


export const test = async (req, res) => {
    try {
        res.send("Testing successful...");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch data' })
    }
}


export const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);
    } catch (error) {

    }
}



