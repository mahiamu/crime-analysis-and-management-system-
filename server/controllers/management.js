import mongoose from "mongoose";
import User from "../models/User.js";


export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find().select("-password").sort({ _id: -1 });
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

