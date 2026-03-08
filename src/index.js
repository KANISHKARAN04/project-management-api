import dotenv from "dotenv";
import app from './app.js'
import connectDB from "./db/dbConnect.js";

dotenv.config();

const port =process.env.myPORT;


connectDB()
  .then(()=>{
    app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});
  })
  .catch((err)=>{
    console.error("MongoDB Connection Error",err);
    process.exit(1);
  })
