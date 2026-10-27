import { AddCommentRequestSchema, GetCommentByObjectRequestSchema, GetCommentByUserRequestSchema, UpdateCommentRequestSchema, type AddCommentRequestType, type GetCommentByObjectRequestType, type GetCommentByOwnerRequestType, type removeCommentRequestType, type UpdateCommentRequestType } from "./comments.type";

export const toAddCommentRequestType=(data:AddCommentRequestType)=>{
    const resp=AddCommentRequestSchema.safeParse(data)
    if(resp.error){
        console.log("error")
    }
    return resp.data;
}

export const toUpdateCommentRequestType=(data:UpdateCommentRequestType)=>{
    const resp=UpdateCommentRequestSchema.safeParse(data)
    if(resp.error){
        console.log("error")
    }
    return resp.data;
    
}

export const toFindCommentByObjectRequestType=(data:GetCommentByObjectRequestType)=>{
    const resp=GetCommentByObjectRequestSchema.safeParse(data)
    if(resp.error){
        console.log("error")
    }
    return resp.data;
    
}

export const toFindCommentByUserRequestType=(data:GetCommentByOwnerRequestType)=>{
    const resp=GetCommentByUserRequestSchema.safeParse(data)
    if(resp.error){
        console.log("error")
    }
    return resp.data;   
}

export const toDeleteCommentByUserRequestType=(data:removeCommentRequestType)=>{
    const resp=GetCommentByUserRequestSchema.safeParse(data)
    if(resp.error){
        console.log("error")
    }
    return resp.data;   
}