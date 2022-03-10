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

export function createSchema(connection: Connection): Model<PostIt>{
    console.log('aa' );

    let a = connection.model('PostIt', postIt);
    console.log('a', a);
    return a;

}

