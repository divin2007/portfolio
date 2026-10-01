import { type BunRequest } from "bun"
import { toAddProjectRequest, toFindProjectRequest, toFindProjectsByFieldsRequest, toFindProjectsRequest } from './project.validator';
import { createProject,  getProjectsByFields, getProjectByID, getProjects } from "./project.service";
import type { addProjectRequestType } from "./project.types";
import { ObjectId } from "mongodb";

export const GetProjectsByFields=async(req:BunRequest)=>{
    try{
    const url=new URL(req.url)
    const request=url.searchParams.get("data")
    if(!request) return Response.json({"message":"no request sent",},{status:400});
    const data=toFindProjectsByFieldsRequest(JSON.parse(request))
    const response=await getProjectsByFields(data)
       return Response.json({message:"data has been found",data:response},{
        status:200,
        statusText:"successfully fetched"
    })
     }catch(e){   
        console.log(e)
        return Response.json(e,{
            status:500,
            statusText:"an error occured"
        })
    }
}


export const GetProjects=async(req:BunRequest)=>{
    try{
    const url=new URL(req.url)
    const request=url.searchParams.get("data")
    if(!request) return Response.json({"message":"no request sent",},{status:400});
    const data=toFindProjectsRequest(JSON.parse(request))
    const response=await getProjects(data)
     if(!response){
        throw new Error("ohhh an error")
    }
    return Response.json({message:"data has been found",data:response},{
        status:200,
        statusText:"successfully fetched"
    })
     }catch(e){   
        console.log(e)
        return Response.json(e,{
            status:500,
            statusText:"an error occured"
        })
    }
    }
export const GetProjectByID=async(req:BunRequest)=>{
    try{
    const Id=req.params.id
    const url=new URL(req.url)
    const data=JSON.parse(url.searchParams.get("filter")!)

    if(data==null){
        throw new Error ("nothing sent")
    }
    data._id=new ObjectId(Id)
    const validRequest=toFindProjectRequest(data)
    const response=await getProjectByID(validRequest)
    if(!response){
        throw new Error("ohhh an error")
    }
    return Response.json({message:"data has been found",data:response},{
        status:200,
        statusText:"successfully fetched"
    })
     }catch(e){   
        console.log(e)
        return Response.json(e,{
            status:500,
            statusText:"an error occured"
        })
    }
}

export const CreateProject=async(req:BunRequest)=>{
    try{
    const data=await req.json() as addProjectRequestType
    const validRequest=toAddProjectRequest(data)
    const response=await createProject(validRequest.data)
    if(!response){
        throw new Error("ohhh an error")
    }
    return Response.json({message:"data has been found",data:response},{
        status:200,
        statusText:"successfully fetched"
    })
     }catch(e){   
        console.log(e)
        return Response.json(e,{
            status:500,
            statusText:"an error occured"
        })
    }
}