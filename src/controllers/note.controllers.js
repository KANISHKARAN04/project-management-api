import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import APIResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import APIError from "../utils/api-error.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";
import { ProjectNote } from "../models/note.models.js";

export const createNote = asyncHandler(async(req,res)=>{
    const {projectId}=req.params;
    const {content}=req.body;

    const project=await Project.findById(projectId);

    if(!project){
        throw new APIError(404,"Project Not found");
    }

    const note=await ProjectNote.create({
        project:new mongoose.Types.ObjectId(projectId),
        createdBy:new mongoose.Types.ObjectId(req.user._id),
        content:content
    })

    return res
        .status(201)
        .json(
            new APIResponse(201,note,"Note created successfully")
        )
})

export const getNoteDetails = asyncHandler(async(req,res)=>{
    const {projectId,noteId}=req.params;

    const project = await Project.findById(projectId);

    if(!project){
        throw new APIError(404,"Project not found");
    }

    const note = await ProjectNote.findOne({
        _id:new mongoose.Types.ObjectId(noteId),
        project:new mongoose.Types.ObjectId(projectId)
    })

    if(!note){
        throw new APIError(404,"Note not found");
    }

    return res.status(201).json(
            new APIResponse(200,note,"Note updated successfully")
        )
})

export const listNotes = asyncHandler(async(req,res)=>{
    const {projectId} = req.params;
    
    const project = await Project.findById(projectId);
    
    if(!project){
        throw new APIError(404,"Project not found");
    }

    const notes=await ProjectNote.findOne({
        project:new mongoose.Types.ObjectId(projectId)
    })

    if(!note){
        throw new APIError(404,"Note not found");
    }

    return res
        .status(201)
        .json(
            new APIResponse(201,notes,"Notes fetched successfully")
        )
})

export const updateNotes = asyncHandler(async(req,res)=>{
    const {projectId,noteId}=req.params;
    const {content}=req.body;

    const project=await Project.findById(projectId);

    if(!project){
        throw new APIError(404,"Project Not found");
    }

    const note = await ProjectNote.findOne({
        _id:new mongoose.Types.ObjectId(noteId),
        project:new mongoose.Types.ObjectId(projectId)
    })

    if(!note){
        throw new APIError(404,"Note not found");
    }

    if(content) note.content=content;

    await note.save();

    return res.status(201).json(
        new APIResponse(200,note,"Note updated successfully")
    )
})

export const deleteNotes = asyncHandler(async(req,res)=>{

    const {projectId,noteId}=req.params;

    const project=await Project.findById(projectId);

    if(!project){
        throw new APIError(404,"Project Not found");
    }

    const note = await ProjectNote.findByIdAndDelete({
        _id:new mongoose.Types.ObjectId(noteId),
        project:new mongoose.Types.ObjectId(projectId)
    })

    if(!note){
        throw new APIError(404,"Note not found");
    }

     return res.status(200).json(
            new APIResponse(200,{},"Data deleted successfully")
        )
})