const asyncHandler = require('express-async-handler');
const { User, validateChangePassword } = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodeMailer = require('nodemailer');


/** 
  * @desc Get forgot password
  * @route /password/forgot-password
  * @method GET
  * @access public 
**/

const getForgotPasswordView = asyncHandler(
    (req,res)=>{
        res.render("forgot-password");
    }
)


/** 
  * @desc Send forgot password
  * @route /password/forgot-password
  * @method POST
  * @access public 
**/

const sendForgotPasswordLink = asyncHandler(
    async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const secret = process.env.JWT_SECRET + user.password;
        const token = jwt.sign({ email: user.email, id: user._id }, secret, {
            expiresIn: '15m'
        });

        const link = `http://localhost:5000/password/reset-password/${user._id}/${token}`;

        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'Password Reset Link',
            html: `<div>
                        <h4>Reset Password</h4>
                        <p>Click the link below to reset your password</p>
                        <a href="${link}">Reset Password</a>
                    </div>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("email success " + info);
            }
        });

        res.render("link-send");
    }
);


/** 
  * @desc Get reset password link
  * @route /password/reset-password/:userId/:token
  * @method GET
  * @access public 
**/

const getResetPasswordView = asyncHandler(
    async (req,res)=>{
        console.log(req.body.email);
        const {email} = req.body;
        const user = await User.findById(req.params.userId);
        // If user not found 
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        // If user found
        const secret = process.env.JWT_SECRET + user.password;
        
        try {
            jwt.verify(req.params.token, secret);
            res.render("reset-password", {email: user.email});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: "Invalid token"});
        }

    }
);


/** 
  * @desc Reset password the password
  * @route /password/reset-password/:userId/:token
  * @method POST
  * @access public 
**/

const resetPassword = asyncHandler(
    async (req,res)=>{
        
        const{error} =  validateChangePassword(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        // Check if user exists
        const {email} = req.body;
        const user = await User.findById(req.params.userId);
        // If user not found 
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        // If user found
        const secret = process.env.JWT_SECRET + user.password;
        
        try {
            jwt.verify(req.params.token, secret);
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);

            user.password = req.body.password;
            await user.save();
            res.render("success-password-reset");
        } catch (error) {
            console.log(error);
            res.status(400).json({message: "Invalid token"});
        }

    }
)


module.exports = {
    getForgotPasswordView, sendForgotPasswordLink, getResetPasswordView, resetPassword
};