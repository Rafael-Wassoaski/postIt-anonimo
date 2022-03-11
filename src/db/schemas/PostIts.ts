import mongoose, {Connection, Model} from "mongoose";
import PostIt from "../../interfaces/PostIt";
const {Schema} = mongoose;

const postIt = new Schema({
    from: String,
    to: String,
    text: String,
    createdAt: Date,
    updatedAt: Date
});

export async function createSchema(connection: Connection): Promise<Model<PostIt>>{
    return await connection.model('PostIt', postIt);
}

