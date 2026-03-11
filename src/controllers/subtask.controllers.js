import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { Tasks } from "../models/task.models.js";
import { Subtask } from "../models/subtask.models.js";
import APIResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import APIError from "../utils/api-error.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

export const createSubTasks= asyncHandler(async(req,res)=>{
    const {title,isCompleted}=req.body;
    const {projectId,taskId}=req.params;

    const project=await Project.findById(projectId);

    if(!project){
        throw new APIError(404,"Project not found");
    }

    const task = await Tasks.findById({
        _id: new mongoose.Types.ObjectId(taskId),
        project: new mongoose.Types.ObjectId(projectId)
    });

    if (!task) {
        throw new APIError(404, "Task not found in this project");
    }

    const subTask=await Subtask.create({
        title,
        taskID:new mongoose.Types.ObjectId(taskId),
        isCompleted,
        createdBy:new mongoose.Types.ObjectId(req.user._id)
    });

    return res
            .status(201)
            .json(
                new APIResponse(201,subTask,"Subtask created successfully")
            )
});

export const updateSubTasks= asyncHandler(async(req,res)=>{
    const {title,isCompleted}=req.body;
    const {projectId,taskId,subTaskId} = req.params;
    
    const project=await Project.findById(projectId);

    if(!project){
        throw new APIError(404,"Project not found");
    }

    const task = await Tasks.findById(taskId);
    
    if (!task) {
        throw new APIError(404, "Task not found");
    }
        
    const subTask=await Subtask.findOne({
        _id:subTaskId,
        taskID:taskId
    });


    if(!subTask){
        throw new APIError(404,"SubTask not found");
    }
    
    if(title) subTask.title=title;
    
    if(isCompleted) subTask.isCompleted=isCompleted;
    
    await subTask.save();
    
    return res.status(201).json(
        new APIResponse(200,task,"Subtask updated successfully")
    )
});

export const deleteSubTasks= asyncHandler(async(req,res)=>{
    const {projectId,taskId,subTaskId} = req.params;

    const project=await Project.findById(projectId);

    if(!project){
        throw new APIError(404,"Project not found");
    }
    const task = await Tasks.findById(taskId);
    
    if (!task) {
        throw new APIError(404, "Task not found");
    }
        
    const subTask=await Subtask.findByIdAndDelete({
        _id:new mongoose.Types.ObjectId(subTaskId),
        task:new mongoose.Types.ObjectId(taskId)
    });

    if(!subTask){
        throw new APIError(404,"SubTask not found");
    }

    return res.status(200).json(
        new APIResponse(200,{},"Data deleted successfully")
    )
});