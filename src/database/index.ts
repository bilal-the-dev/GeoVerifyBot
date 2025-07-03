import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_URI);

console.log("Connecte to database ❤");
