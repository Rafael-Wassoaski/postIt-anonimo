import mongoose from "mongoose";
const {Schema} = mongoose;

const postIt = new Schema({
    from: String,
    to: String,
    text: String,
    createdAt: Date,
    updatedAt: Date
});

export default function createSchema(): void{
    mongoose.model('PostIt', postIt);
}