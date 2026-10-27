import { addComment, findCommentById, findCommentByObject, findCommentByUser, removeComment, updateComment } from "./comments.repository";
import type { AddCommentRequestType, CommentType, GetCommentByObjectRequestType, GetCommentByOwnerRequestType, removeCommentRequestType, UpdateCommentRequestType } from "./comments.type";
import { findprojectById } from './../Projects/project.repository';
import { ObjectId, type DeleteResult } from "mongodb";

export const insertComment=async( data:AddCommentRequestType):Promise<CommentType>=>{ 
    const actualId=new ObjectId(data.comment.object._id)
    data.comment.object._id=actualId
    const  project=await findprojectById(data.comment.object._id,{});
    if(project==null||project==undefined){
        throw new Error("what's up beinjing")
    }
    /*the user checking is also needed*/
    const result=await addComment(data.comment);
    const comment=await findCommentById(result.insertedId);
    return comment;
}

export const getCommentByUser=async(data:GetCommentByOwnerRequestType):Promise<CommentType[]>=>{
    const actualId=new ObjectId(data.owner)
    const result= findCommentByUser(data.owner,data.limits);
    return result
}

export const getCommentByObject=async(data:GetCommentByObjectRequestType):Promise<CommentType[]>=>{
    const actualId=new ObjectId(data._id)
    const result= await findCommentByObject(actualId,data.limits);
    return result as CommentType[];
}

export const DeleteComment=async(data:removeCommentRequestType):Promise<DeleteResult>=>{
    const actualId=new ObjectId(data._id)
    const result= await removeComment(actualId/*data.owner*/);
    return result as DeleteResult
    /*check users privaladges over the action*/ 
}

export const patchComment=async( data:UpdateCommentRequestType):Promise<CommentType>=>{ 
    const  result=await updateComment(data.comment,data._id);
    const findComment=await findCommentById(data._id,);
    return findComment;
    /*the user checking and validation is also needed*/
}