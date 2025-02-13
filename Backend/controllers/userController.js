import user from "../models/userModel.js";

// controller to register user
export async function saveSet(req,res){

    try{
        const {userOne,userTwo}= req.body;

        // to check the incoming data is valid or not
    // if(!userName||!email||!password){
    //     return res.status(400).json("Data Missing");
    // 
        const newUser= new user({
            userOne,userTwo
        });
       const response= await newUser.save();

    return res.status(201).json({_id:response._id});

}
catch(err){
    console.log(err)
    return res.status(500).json(err.message);
}
}

// controller to process login
export async function changeandcheck(req,res){

    try{
        const {_id,array,userNum}= req.body;
        let holder=[];
        let game;
        if(userNum==1)
       {  game= await user.updateOne({_id:_id},{ $set: { userOne:array} });}
        if(userNum==2){
             game= await user.updateOne({_id:_id},{ $set: { userTwo:array} });
        }

        const arr=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8]];
        const data= await user.findOne({_id:_id});
        if(userNum==1)holder=[...data.userOne];
        if(userNum==2)holder=[...data.userTwo];

        for(let e of arr){
            if(holder[e[0]]=="X"&&holder[e[1]]=="X"&&holder[e[2]]=="X"){
                return res.status(201).json({victory:true,victor:`User ${userNum}`});
            }
        }
        return res.status(200).json({victory:false});
 }
 catch(err){
     return res.status(500).json(err);
 }
 }
 