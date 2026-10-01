import {type DeleteResult,type InsertOneResult, ObjectId, type UpdateResult } from "mongodb";
import { LessonCollection } from "../../database/mongo";
import { type UpdateLessonType,type AddLessonType,type LessonFieldsType,type LessonProjectionType,type LessonType } from "./lesson.type";

export const insertLesson=async (data:AddLessonType):Promise<InsertOneResult>=>{
    const response=await LessonCollection.insertOne({_id: new ObjectId(),...data,createdAt:new Date()})
    return response
}

export const deleteLesson= async (data:{_id:ObjectId}):Promise<DeleteResult>=>{
    const response=await LessonCollection.deleteOne({_id: data._id})
    return response
}

export const findLessonById= async(data:ObjectId,projection:LessonProjectionType):Promise<LessonType>=>{
    const response=await LessonCollection.findOne({_id:data},{projection:projection})
    return response as LessonType
}

export const findLessonsById= async(data:{_id:ObjectId}[],projection:LessonProjectionType):Promise<LessonType[]>=>{
    const response=await LessonCollection.find({$or:[data]},{projection:projection}).toArray()
    return response as LessonType[]
}

export const findLessonsFieldsByOr= async(data:{[key:string]:any}[],projection:LessonProjectionType):Promise<LessonType[]>=>{
    const response=await LessonCollection.find({$or:data},{projection:projection}).toArray()
    return response as LessonType[]
}
export const findLessonsFieldsByAnd= async(data:{[key:string]:any}[],projection:LessonProjectionType):Promise<LessonType[]>=>{
    const response=await LessonCollection.find({$and:[data]},{projection:projection}).toArray()
    return response as LessonType[]
}

export const updateLesson=async(data:UpdateLessonType,_id:ObjectId):Promise<UpdateResult>=>{
    const response=await LessonCollection.updateOne({_id:_id},{$set:data})
    return response
}