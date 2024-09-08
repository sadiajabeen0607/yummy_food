import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {}
    }

}, {minimize: false});

const authModel = mongoose.models.Auth || mongoose.model("Auth", authSchema);

export default authModel;