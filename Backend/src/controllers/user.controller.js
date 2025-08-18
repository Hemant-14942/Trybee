import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({
    success: true,
    token,
  });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    if (!validator.isEmail) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: "Error occurred while registering user",
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        msg: error.message,
      });
    }
  } catch (error) {}
};

const getUserProfile = async (req, res) => {
  const {userId} = req.body;
  try {
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const { name, email, password, image, phone, address } = req.body;

    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    if (address && typeof address === "object") {
      user.address = {
        ...user.address,
        ...address,
      };
    }
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "users",
      });
      user.image = uploadRes.secure_url;
    }

    if (password && password.length >= 8) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      msg: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        phone: updatedUser.phone,
        address: updatedUser.address,
      },
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export { loginUser, registerUser, adminLogin , getUserProfile , updateUserProfile };
