import { addProject, findprojectById, findProjects, findprojectsById, findprojectsFieldsByAnd, findprojectsFieldsByOr, findprojectsFieldsWithLessonByAnd, findprojectsFieldsWithLessonByor, findProjectsWithLesson, findProjectWithLesson, removeProject } from "./project.repository";
import type { AddProjectType, findProjectRequestType, findProjectsByFieldsRequestType, findProjectsRequestType, ProjectType, ProjectWithLessonType } from "./project.types";
import { ObjectId } from "mongodb";
import { restructuredToArraySearchOrAnd, restructuredToArraySearchOrFromObject } from './../../utils/restructure';

export const createProject=async(data:AddProjectType):Promise<ProjectType>=>{
    const response= await addProject(data)
    if(!response.acknowledged){
        throw new Error("what's upp beijing")
    }
    const project= await findprojectById(response.insertedId,{})
    if(!project||!project.hasOwnProperty("_id")){
        throw new Error("what's upp beijing")
    }
    return project 
}

export const deleteProject=async(data:ObjectId):Promise<{message:string}>=>{
    data=new ObjectId(data)
    const response= await removeProject(data)
    if(!response.deletedCount){
        throw new Error("what's upp beijing")
    }
    const project= await findprojectById(data,{})
    if(project){
        throw new Error("what's upp beijing")
    }
    return {message:"deleted successfully"} 
}


export const getProjectByID=async(data:findProjectRequestType):Promise<ProjectWithLessonType[] |ProjectType>=>{
    if(data.lesson==true){
        console.log("here///////////////////////////////////////////")
        const response=await findProjectWithLesson(data._id,data.lessonProjection!,{skip:data.lessonLimits!.skip,limit:data.lessonLimits!.limit})
        if(!response){
            throw new Error("what's upp beijing")
        }
        return response as ProjectWithLessonType[]
    }else{
        const response=await findprojectById(data._id,data.lessonProjection!)
        if(!response){
            throw new Error("what's upp beijing")
        }
        return response as ProjectType
    }
}

export const getProjects=async(data:findProjectsRequestType):Promise<ProjectType[]|ProjectWithLessonType[]>=>{
    if(data.lesson){
        const response=await findProjectsWithLesson(data.projection,data.lessonProjection!,{skip:data.lessonLimits!.skip,limit:data.lessonLimits!.limit},{limit:data.limits.limit!,skip:data.limits.skip!})
        if(!response){
            throw new Error("what's upp beijing")
        }
        return response as ProjectWithLessonType[]
    }else{
        const response=await findProjects({limit:data.limits.limit!,skip:data.limits.skip!},data.lessonProjection!)
        if(!response){
            throw new Error("what's upp beijing")
        }
        return response as ProjectType[]
    }
}

export const getProjectsByFields=async(data:findProjectsByFieldsRequestType):Promise<ProjectType[]|ProjectWithLessonType[]>=>{
    if(data.lesson){
        let restructuredFields;
        let response;
        if(Array.isArray(data.fields)){
            restructuredFields= restructuredToArraySearchOrAnd(data.fields)
        }else if(typeof data.fields=="object"){
            restructuredFields= restructuredToArraySearchOrFromObject(data.fields)
        }else{
            throw new Error("what's upp beijing")
        }
        if(data.operation=="and"){
        response=await findprojectsFieldsWithLessonByAnd (restructuredFields,data.projection,data.lessonProjection!,{skip:data.lessonLimits!.skip,limit:data.lessonLimits!.limit},{limit:data.limits.limit!,skip:data.limits.skip!})
        if(!response){
            throw new Error("what's upp beijing")
        }
        }
        if(data.operation=="or"){
         response=await findprojectsFieldsWithLessonByor (restructuredFields,data.projection,data.lessonProjection!,{skip:data.lessonLimits!.skip,limit:data.lessonLimits!.limit},{limit:data.limits.limit!,skip:data.limits.skip!})
            if(!response){
                throw new Error("what's upp beijing")
            }   
        }
        return response as ProjectWithLessonType[]
    }else{
        let restructuredFields;
        let response;
        if(Array.isArray(data.fields)){
            restructuredFields= restructuredToArraySearchOrAnd(data.fields)
        }else if(typeof data.fields=="object"){
            restructuredFields= restructuredToArraySearchOrFromObject(data.fields)
        }else{
            throw new Error("what's upp beijing")
        }
        if(data.operation=="and"){
        response=await findprojectsFieldsByAnd (restructuredFields,data.projection)
        if(!response){
            throw new Error("what's upp beijing")
        }
        }
        if(data.operation=="or"){
         response=await findprojectsFieldsByOr (restructuredFields,data.projection)
            if(!response){
                throw new Error("what's upp beijing")
            }   
        }
        return response as ProjectType[]
    }
}
