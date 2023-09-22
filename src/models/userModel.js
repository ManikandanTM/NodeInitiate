import mongoose from "mongoose";
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: { type: String, minLength: 1, maxLength: 10, require: false },
    password: { type: String, minLength: 4, maxLength: 20, require: true, trim: true}
}, { timestamps: true});

export default mongoose.model('Users', userSchema);