import APIResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";

/*const healthcheck = async (req, res, next) =>{
    try{
        res
        .status(200)
        .json(
            new APIResponse(200,{message:"Server is running"})
        );
    }catch(err){
        next(err)
    }
};*/

const healthcheck = asyncHandler(async(req,res)=>{
    res
        .status(200)
        .json(
            new APIResponse(200,{message:"Server is running"})
        );
})

export default healthcheck;