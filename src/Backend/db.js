const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const User = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:String,
    name:String,
})
const Todo = new Schema({
    title:String,
    done:Boolean, 
    userId:ObjectId
});
const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('ToDos', Todo);
module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel,
}