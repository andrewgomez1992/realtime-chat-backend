import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

// 3 days
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: "3d", // Use '3d' instead of maxAge for simplicity
  });
};

// pushing latest
export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password is required.");
    }
    const user = await User.create({ email, password });
    // return token as a cookie
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        // firstName: user.firstName,
        // lastName: user.lastName,
        // image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).send("Internal Server Error");
  }
};
