import { ObjectId, type DeleteResult, type InsertOneModel, type InsertOneResult, type UpdateResult } from "mongodb";
import { CommentCollection } from "../../database/mongo";
import type {  AddCommentType, CommentType, UpdateCommentType } from "./comments.type";
import type { limitsType } from "../../utils/types";


export const addComment=async(data:AddCommentType):Promise<InsertOneResult>=>{
    const resp=await CommentCollection.insertOne({_id:new ObjectId(),...data,createdAt:new Date()})
    return resp
}

export const removeComment=async(data:ObjectId):Promise<DeleteResult>=>{
    const resp=await CommentCollection.deleteOne({_id:data})
    return resp
}

export const findCommentByObject=async(data:ObjectId,limit:limitsType)=>{
    const resp=await CommentCollection.aggregate([
        {$match:{
            _id:data
        }},
        {$skip:limit.skip},
        {$limit:limit.limit}

    ]).toArray()

    return resp
}

export const updateComment=async(data:UpdateCommentType,_id:ObjectId):Promise<UpdateResult>=>{
    const resp=await CommentCollection.updateOne({_id:_id},{$set:data})
    return resp
}

export const findCommentByUser=async(owner:ObjectId,limits:limitsType):Promise<CommentType[]>=>{
    const resp=await CommentCollection.find({owner:owner},{
        limit:limits.limit,
        skip:limits.skip,
    }).toArray()
    return resp
}

export const findCommentById=async(_id:ObjectId):Promise<CommentType>=>{
    const resp=await CommentCollection.findOne({_id:_id})
    return resp as CommentType
}