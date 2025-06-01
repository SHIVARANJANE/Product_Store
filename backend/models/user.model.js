import mongoose from "mongoose";

const userlogin = new mongoose.Schema({
    username: String,
    pwd: String,
    img: String
});

const userLogin = mongoose.model("userLogin", userlogin);

export default userLogin;