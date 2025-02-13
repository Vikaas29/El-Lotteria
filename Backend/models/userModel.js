import mongoose from "mongoose";

// schema model for each registered user
const userSchema = mongoose.Schema({
    "userOne":{type:Array,required:true},
    "userTwo":{type:Array,required:true}
});

const user =mongoose.model("ElLotteriesUser",userSchema);

export default user;