import type { BunRequest } from "bun";
import { DeleteComment, getCommentByObject, getCommentByUser, insertComment } from "./comments.service";
import { toAddCommentRequestType, toDeleteCommentByUserRequestType, toFindCommentByObjectRequestType, toFindCommentByUserRequestType, toUpdateCommentRequestType } from "./comments.validator";
import { updateComment } from "./comments.repository";
import { ObjectId } from "mongodb";

export const FindCommentByUser=async(req:BunRequest)=>{
    try{
        const url=new URL(req.url)
        const body=JSON.parse(url.searchParams.get("data")!)
        const validatedData= toFindCommentByUserRequestType(body)
        const result=await getCommentByUser(validatedData!)
        if(!result){
            throw new Error("what's up beinjing") 
        }
        return Response.json(result) 
    }catch(e){
        return Response.json(e)
    }
}

export const RemoveComment=async(req:BunRequest)=>{
    try{
        const url=new URL(req.url)
        const body=JSON.parse(url.searchParams.get("data")!)
        const validatedData= toDeleteCommentByUserRequestType(body)
        const result=await DeleteComment(validatedData!)
        if(!result){
            throw new Error("what's up beinjing") 
        }
        return Response.json(result) 
    }catch(e){
        return Response.json(e)
    }
}

export const UpdateComment=async(req:BunRequest)=>{
    try{
        const body=await req.json()
        const id=req.params.id
        const _id=new ObjectId(id);
        const validatedData= toUpdateCommentRequestType(body)
        const result=await updateComment(validatedData?.comment!,_id)
        if(!result){
            throw new Error("what's up beinjing") 
        }
        return Response.json(result) 
    }catch(e){
        return Response.json(e)
    }
}

export const FindCommentByObject=async (req:BunRequest)=>{
    try{
    const url=new URL(req.url)
    const body=JSON.parse(url.searchParams.get("data")!)
    const filteredBody=toFindCommentByObjectRequestType(body);
    const result=await getCommentByObject(filteredBody!)
    if(!result){
            throw new Error("what's up beinjing") 
        }
        return Response.json(result) 
    }catch(e){
        return Response.json(e)
    }
}

export const AddComment=async(req:BunRequest)=>{
    try{
        const body=await req.json();
        const validBody=toAddCommentRequestType(body);
        const result=insertComment(validBody!);
        if(!result){
                throw new Error("what's up beinjing") 
            }
                return Response.json(result) 
    }catch(e){
        return Response.json(e)
    }
}