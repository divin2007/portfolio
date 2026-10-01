import {type BunRequest} from "bun"
import type{ AddLessonAddRequestType, AddLessonType } from "./lesson.type"
import { toAddLesson, toLessonRemoveRequest, toLessonSearchByAndOrRequest, toLessonSearchIdRequest, toUpdateRequestLesson } from "./lesson.validator"
import { addLesson, getLessonById, getLessonsFieldsByOrAnd, patchLesson, removeLesson } from "./lessons.service"
import { findLessonById } from './lesson.repository';

export const AddLesson=async (req:BunRequest)=>{
    try{
    const body=await req.json()
    console.log(body)
    const response=await addLesson(body as AddLessonType)
    if(!response){
        return Response.json("an error occured My brother",{
            status:500,
            statusText:"not added"
        })
    }
    return Response.json({message:"lesson added successfully",data:response},{
        status:200,
        statusText:"sucessfull"
    })

}catch(e){
    console.log(e);
    return Response.json(e,{
        status:400,
        statusText:"an error occured"
    })
    }
}

export const RemoveLesson=async(req:BunRequest)=>{
    try{
    const object={_id:req.params.id}
    const validRequest= toLessonRemoveRequest(object)
    const response=await removeLesson(validRequest)
    if(response.acknowledged!==true){
        throw new Error("wat's up beijing")
    }
    return new Response("deleted successfully",{
        status:200,
        statusText:"deleted lesson successfully"
    })
    }catch(e){
        console.log(e)
        return Response.json(e,{
            status:400,
            statusText:"an error occured"
    })  
    }
}

export const GetLessonById=async(req:BunRequest)=>{
    try{
    const Url=new URL(req.url)    
    const data=JSON.parse(Url.searchParams.get("data")!)
    const validRequest=toLessonSearchIdRequest(data)
    const response=await getLessonById(validRequest)
    return Response.json(response,{
        status:200,
        statusText:"successlly fetched",
    })
    }catch(e){
        console.log(e)
        return Response.json(e,{
            status:500,
            statusText:"an error occured"
        })
    }
}

export const GetLessonsFieldsByOrAnd=async(req:BunRequest)=>{
    try{
        const url=new URL(req.url)
        const body=JSON.parse(url.searchParams.get("data")!)
        const validated=toLessonSearchByAndOrRequest(body)
        const response=await getLessonsFieldsByOrAnd(validated)
        return Response.json(response,{
        status:200,
        statusText:"successlly fetched",
    })
    }catch(e){   
        console.log(e)
        return Response.json(e,{
            status:500,
            statusText:"an error occured"
        })
    }
}

export const PatchLesson=async(req:BunRequest)=>{
   try{
    const body={_id:req.params.id,updateData:await req.json()}
    const valid=toUpdateRequestLesson(body)
    const response= await patchLesson(valid)
       if(!response){
        return Response.json("an error occured My brother",{
            status:500,
            statusText:"not added"
        })
    }
    return Response.json({message:"lesson added successfully",data:response},{
        status:200,
        statusText:"sucessfull"
    })

}catch(e){
    console.log(e);
    return Response.json(e,{
        status:400,
        statusText:"an error occured"
    })
    }
}

