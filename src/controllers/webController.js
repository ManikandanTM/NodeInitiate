import { v4 as uuidv4 } from "uuid";
import userModel from "../models/userModel.js";


let webController = {};

webController.signIn = async (req, res, next) => {
    return res.status(200).json({ status_code: 200, message: "API Works"});
}

export default webController;