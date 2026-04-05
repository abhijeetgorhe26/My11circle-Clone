
import User from '../models/user.js';
import { sendEmail } from "../utils/mailSender.js";
import generateOtp from "../utils/otpGenerator.js";










// verfiy otp 
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // ⏰ Check expiry
        if (!user.otpExpired || user.otpExpired < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        // 🔐 Check OTP match
        if (user.otpCode !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // ✅ Success → verify user
        user.isVerfied = true;
        user.otpCode = undefined;
        user.otpExpired = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully"
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
        const { name, email, password, } = req.body;

        // check user existance in DB
        const existUser = await User.findOne({ email });

        if (existUser && existUser.isVerfied) {
            return res.status(201).json({
                success: false,
                error: "User already exist in DB"
            })
        }
        // 🔥 Generate OTP
        const otp = generateOtp();

        const otpExpired = Date.now() + 5 * 60 * 1000;
        console.log("OTP:", otp);

        // 🔥 Create user
        if (!existUser) {
            const user = await User.create({
                name,
                email,
                password,
                otpCode: otp,
                otpExpired: otpExpired
            });
        }
        else {
            existUser.name = name;
            existUser.password = password;
            existUser.otpCode = otp;
            existUser.otpExpired = otpExpired;

            await existUser.save();
        }

        // for testing

        // 🔥 Send OTP (just for info)
        await sendEmail(
            email,
            "Welcome to App 🎉",
            `Your OTP is ${otp}`
        );

        res.status(201).json({
            success: true,
            message: "User registered & OTP sent to email"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to send OTP" });
    }
};

// for logged in
export const login = async (req, res) => {
    try {
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


export const test = async (req, res) => {
    try {
        res.send("Testing successful...");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch data' })
    }
}


