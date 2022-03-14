import mongoose, {Connection, Model} from "mongoose";
import PostIt from "../../interfaces/PostIt";
const {Schema} = mongoose;

export default new Schema({
    from: String,
    to: String,
    text: String,
    createdAt: Date,
    updatedAt: Date
});



