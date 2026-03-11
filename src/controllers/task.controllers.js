import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { Tasks } from "../models/task.models.js";
import { Subtask } from "../models/subtask.models.js";
import APIResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import APIError from "../utils/api-error.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const getTasks= asyncHandler(async(req,res)=>{
    const {projectId} = req.params;

    const project = await Project.findById(projectId);

    if(!project){
        throw new APIError(404,"Project not found");
    }

    const tasks=await Tasks.find({
        project:new mongoose.Types.ObjectId(projectId)
    }).populate("assignedTo","avatar username fullName");

    return res
        .status(201)
        .json(
            new APIResponse(201,tasks,"Task fetched successfully")
        )
})

const createTasks= asyncHandler(async(req,res)=>{
    const {title,description,assignedTo,status}=req.body;
    const {projectId} = req.params;

    const project = await Project.findById(projectId);
    if(!project){
        throw new APIError(404,"Project not found");
    }
    const files=req.files || []

    const attachments=files.map((file)=>{
        return{
            url:`${process.env.SERVER_URL}/images/${file.originalname}`,
            mimetype:file.mimetype,
            size:file.size
        }
    })

    const task=await Tasks.create({
        title,
        description,
        project:projectId,
        assignedTo:assignedTo?assignedTo : undefined,
        status,
        assignedBy:req.user._id,
        attachments
    });

    return res
        .status(201)
        .json(
            new APIResponse(201,task,"Task created successfully")
        )
});

const getTaskByID = asyncHandler(async (req,res)=>{

    const {projectId,taskId} = req.params;

    const task = await Tasks.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(taskId),
                project:new mongoose.Types.ObjectId(projectId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"assignedTo",
                foreignField:"_id",
                as:"assignedTo",
                pipeline:[
                    {
                        $project:{
                            _id:1,
                            username:1,
                            fullName:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"assignedBy",
                foreignField:"_id",
                as:"assignedBy",
                pipeline:[
                    {
                        $project:{
                            _id:1,
                            username:1,
                            fullName:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                assignedTo:{
                    $arrayElemAt:["$assignedTo",0]
                },
                assignedBy:{
                    $arrayElemAt:["$assignedBy",0]
                }
            }
        }
    ]);

    if(!task || task.length === 0){
        throw new APIError(404,"Task not found");
    }

    return res
        .status(200)
        .json(
            new APIResponse(200,task[0],"Task fetched successfully")
        );
});

const updateTasks= asyncHandler(async(req,res)=>{
    const {title,description,assignedTo,status,assignedBy,proj}=req.body;
    const {projectId,taskId} = req.params;

    const task = await Tasks.findOne({
        _id: taskId,
        project: new mongoose.Types.ObjectId(projectId)
    });

    if (!task) {
        throw new APIError(404, "Task not found");
    }

    const files=req.files || []

    const attachments=files.map((file)=>{
        return{
            url:`${process.env.SERVER_URL}/images/${file.originalname}`,
            mimetype:file.mimetype,
            size:file.size
        }
    })

    if(title) task.title=title;

    if(description) task.description=description;

    if(assignedTo) task.assignedTo=new mongoose.Types.ObjectId(assignedTo);

    if(proj) task.proj=new mongoose.Types.ObjectId(proj);

    if(status) task.status=status;

    if(assignedBy) task.assignedBy=new mongoose.Types.ObjectId(assignedBy);

    if(attachments.length>0) task.attachments.push(...attachments);

    await task.save();

    return res.status(201).json(
        new APIResponse(200,task,"Task updated successfully")
    )
})

const deleteTasks= asyncHandler(async(req,res)=>{
    const {projectId,taskId} = req.params;

    const task = await Tasks.findByIdAndDelete({
        _id: taskId,
        project: new mongoose.Types.ObjectId(projectId)
    });

    if (!task) {
        throw new APIError(404, "Task not found");
    }
    return res.status(200).json(
        new APIResponse(200,{},"Data deleted successfully")
    )
})


export {
    getTasks,
    getTaskByID,
    createTasks,
    deleteTasks,
    updateTasks
}