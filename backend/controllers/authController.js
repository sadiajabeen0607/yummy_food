import authModel from "../models/authModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validtor from 'validator';

// Login User
const loginUser = async(req, res) => {
    const {email, password} = req.body;
    // console.log(email);

    try {
        const user = await authModel.findOne({email: email});
        if(!user) {
            return res.json({
                success: false,
                message: "User doesn't exist"
            });
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = createToken(user._id);
        res.json({
            success: true,
            data: user,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
};

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Register User
const registerUser = async(req, res) => {
    const {name, email, password} = req.body;

    try {
        // Cheching the existance of user
        const exists = await authModel.findOne({email});

        if(exists) {
            return res.json({
                success: false,
                message: "User alreay exist"
            })
        }

        // Validate from email format and strong password
        if(!validtor.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        if(password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            })
        }

        // hashing user passwrod
        const salt = await bcrypt.genSalt(10);
        const hashedPassord = await bcrypt.hash(password, salt);

        const newUser = new authModel({
            name: name,
            email: email,
            password: hashedPassord
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({
            success: true,
            data: user,
            token: token,
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
        
    }
};

export {loginUser, registerUser}