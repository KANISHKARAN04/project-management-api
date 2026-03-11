import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import APIResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import APIError from "../utils/api-error.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";
export const getProject=asyncHandler(async(req,res) =>{
    const projects=await ProjectMember.aggregate(
        [
            {
                $match: {
                user: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "project",
                pipeline: [
                    {
                    $lookup: {
                        from: "projectmembers",
                        localField: "_id",
                        foreignField: "project",
                        as: "projectmembers"
                    }
                    },
                    {
                    $addFields: {
                        members: { $size: "$projectmembers" }
                    }
                    }
                ]
                }
            },
            {
                $unwind: "$project"
            },
            {
                $project: {
                role: 1,
                "project._id": 1,
                "project.name": 1,
                "project.description": 1,
                "project.members": 1,
                "project.createdAt": 1,
                "project.createdBy": 1
                }
            }
        ]);

    return res
        .status(200)
        .json(new APIResponse(
            200,
            projects,
            "Projects fetched successfully"
        ))
});

export const getProjectByID=asyncHandler(async(req,res) =>{
    const {projectId}=req.params;

    const project=await Project.findById(
        projectId,
    )

    if(!project){
        throw new APIError(404,"Project not found");
    }

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                project,
                "Project fetched Successfully"
            )
        )
});

export const createProject=asyncHandler(async(req,res) =>{
    const {name,description}=req.body

    const project=await Project.create({
        name,
        description,
        createdBy: new mongoose.Types.ObjectId(req.user._id),
    });

    await ProjectMember.create({
        user:new mongoose.Types.ObjectId(req.user._id),
        project:new mongoose.Types.ObjectId(project._id),
        role:UserRolesEnum.ADMIN
    })

    return res
        .status(201)
        .json(
            new APIResponse(
                201,
                project,
                "Project Created Successfully"
            )
        )
});

export const updateProjectByID=asyncHandler(async(req,res)=>{
    const {name,description}=req.body;
    const {projectId}=req.params

    const project=await Project.findByIdAndUpdate(
        projectId,
        {
            name,
            description
        },{new:true}
    )

    if(!project){
        throw new APIError(404,"Project not found");
    }

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                project,
                "Project Updated Successfully"
            )
        )
});

export const deleteProjectByID=asyncHandler(async(req,res)=>{
    const {projectId}=req.params;

    const project = await Project.findByIdAndDelete(projectId);

    if(!project){
        throw new APIError(404,"Project not found");
    }

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                project,
                "Project Deleted Successfully"
            )
        )
});

export const getProjectMembers=asyncHandler(async(req,res)=>{
    const {projectId}=req.params;
    const project = await Project.findById(projectId);

    if(!project){
        throw new APIError(404,"Project not found");
    }

    const projectMembers=await ProjectMember.aggregate([
        {
            $match:{
                project:new mongoose.Types.ObjectId(projectId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"user",
                foreignField:"_id",
                as: "user",
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
                user:{
                    $arrayElemAt:["$user",0]
                }
            }
        },
        {
            $project:{
                project:1,
                user:1,
                role:1,
                createdAt:1,
                updatedAt:1,
                _id:0
            }
        }
    ])

    return res
        .status(200)
        .json(
            new APIResponse(201,projectMembers,"Project members fetched successfully")
        )
});

export const addProjectMember=asyncHandler(async(req,res)=>{
    const {email,role}=req.body;
    const {projectId}=req.params;

    const user=await User.findOne({email})

    if(!user){
        throw new APIError(404,"User does not exists");
    }

    await ProjectMember.findOneAndUpdate(
        {
            user: user._id,
            project: projectId
        },
        {
            user: user._id,
            project: projectId,
            role: role
        },
        {
            new:true,
            upsert:true
        }
    )

    return res
        .status(201)
        .json(
            new APIResponse(201,{},"Project member added successfully")
        )
});

export const updateMemberRole=asyncHandler(async(req,res)=>{
    const {projectId,userId}=req.params;
    const {newRole}=req.body;

    if(!AvailableUserRole.includes(newRole)){
        throw new APIError(400,"Invalid Role")
    }

    let projectMember = await ProjectMember.findOne({
        project:new mongoose.Types.ObjectId(projectId),
        user:new mongoose.Types.ObjectId(userId),
    })

    if(!projectMember){
        throw new APIError(400,"Project Member not found");
    }

    projectMember=await ProjectMember.findByIdAndUpdate(
        projectMember._id,{
            role:newRole
        },
        {new:true}
    )

    if(!projectMember){
        throw new APIError(400,"Project Member not found");
    }

    return res
        .status(201)
        .json(
            new APIResponse(201,{},"Project member role updated successfully")
        )
});

export const deleteMemberByID=asyncHandler(async(req,res)=>{
    const {projectId,userId}=req.params;

    let projectMember = await ProjectMember.findOne({
        project:new mongoose.Types.ObjectId(projectId),
        user:new mongoose.Types.ObjectId(userId),
    })

    if(!projectMember){
        throw new APIError(400,"Project Member not found");
    }

    projectMember=await ProjectMember.findByIdAndDelete(
        projectMember._id
    )

    if(!projectMember){
        throw new APIError(400,"Project Member not found");
    }

    return res
        .status(201)
        .json(
            new APIResponse(201,{},"Project member deleted successfully")
        )
});
