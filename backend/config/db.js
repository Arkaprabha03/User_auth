import mongoose from "mongoose";

const connectDB = async()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlparser:true, 
            useUnifiedTopology: true,
        });
        console.log("mongoDB connected");

    } catch (error) {
        console.error("error connecting")
    }
};
export default connectDB;
