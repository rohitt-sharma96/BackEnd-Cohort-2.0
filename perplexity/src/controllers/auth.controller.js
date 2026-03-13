import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js";



export async function registerUser(req, res, next) {

    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isAlreadyRegistered) {
        return res.status(409).json({
            message: "user already exists",
            success: false,
            err: "user already exists"
        })
    }


    const user = await userModel.create({
        username,
        email,
        password
    })


    //text optional rehta hai
    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html:
        `
            <p>Hi ${username}</p>
            <p>Thankyou for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
            <p>Best regards,<br>The Perplexity Team<p>
        `
    })

    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}