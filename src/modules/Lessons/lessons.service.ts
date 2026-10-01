import { ObjectId, type DeleteResult } from "mongodb";
import { deleteLesson, findLessonById, findLessonsById, findLessonsFieldsByAnd, findLessonsFieldsByOr, insertLesson, updateLesson } from "./lesson.repository";
import { type LessonSearchByAndOrRequestType,type UpdateLessonRequestType, type AddLessonType, type LessonRemoveRequestType, type LessonSearchIdRequestType, type LessonType } from "./lesson.type";
import { toAddLesson } from "./lesson.validator";
import { restructuredToArraySearchOrAnd, restructuredToArraySearchOrFromObject } from "../../utils/restructure";

export const addLesson= async(data:AddLessonType):Promise<LessonType>=>{
    if(data.ProjectId){
        data.ProjectId=new ObjectId(data.ProjectId)
    }
    const valid=toAddLesson(data)
    const response=await insertLesson(valid)
    if(!response){
        throw Error("watsupp beijin")
    }
    const added=await findLessonById(response.insertedId,{})
    return added;
}

export const removeLesson=async(data:LessonRemoveRequestType):Promise<DeleteResult>=>{
    const dataWithObjectId={_id:new ObjectId(data._id)}
    const response=await deleteLesson(dataWithObjectId)
    if(!response){
        throw Error("watsupp beijin")
    }
    return response
}

export const getLessonById=async(data:LessonSearchIdRequestType):Promise<LessonType>=>{
    const id=new ObjectId(data._id)
    const response=await findLessonById(id,data.projection)
    if(!response){
        throw Error("watsupp beijin")
    }
    return response
}

export const getLessonsFieldsByOrAnd=async(data:LessonSearchByAndOrRequestType):Promise<LessonType[]>=>{
    const {fields,projection,operation}=data
    let result
    if(operation=="or"){
        let restructured
        if(Array.isArray(fields)){
             restructured= restructuredToArraySearchOrAnd(fields)

        }else if(typeof fields=="object"){
            
             restructured= restructuredToArraySearchOrFromObject(fields)
        }
        if(restructured==undefined){
            throw Error("whatssup beijing")
        }
        result=await findLessonsFieldsByOr(restructured,projection)
    }else{
        let restructured
        if(Array.isArray(fields)){
             restructured= restructuredToArraySearchOrAnd(fields)
        }else if(typeof fields=="object"){
             restructured= restructuredToArraySearchOrFromObject(fields)
        }
        if(restructured==undefined){
            throw Error("whatssup beijing")
        }
         result=await findLessonsFieldsByAnd(restructured,projection)       
    }
    return result as LessonType[]
}

export const patchLesson=async(data:UpdateLessonRequestType):Promise<LessonType>=>{
    const {_id,updateData}=data
    const id=new ObjectId(_id)
    const response=await updateLesson(updateData,id)
    if(!response){
        throw Error("watsupp beijin")

    }
    if(response.acknowledged!=true){
        throw Error("watsupp beijin")
    }
   
    const lesson=await findLessonById(id,{})
    return lesson
}