import mongoose, { mongo } from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_JOB_SEEKING_APP"
    }).then(()=>{
        console.log("Connected to Mongodb database");
    }).catch((err)=>{
        console.log(`Some error ocuured connectiong to database ${err}`);
    })
}