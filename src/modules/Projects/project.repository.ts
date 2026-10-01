import {type DeleteResult,type InsertOneResult, ObjectId } from "mongodb";
import { ProjectCollection } from "../../database/mongo";
import type { AddProjectType, ProjectProjectionType, ProjectType, ProjectWithLessonType } from "./project.types";
import type { LessonProjectionType } from './../Lessons/lesson.type';
import type { limitsType } from "../../utils/types";

export const addProject=async(data:AddProjectType):Promise<InsertOneResult>=>{
    const response=await ProjectCollection.insertOne({_id:new ObjectId(),...data,createdAt:new Date()})
   console.log(response)
    if(!response){
        throw Error ("whatssup beinjing")
    }
    return response

}

export const removeProject=async(data:ObjectId):Promise<DeleteResult>=>{
    const response=await ProjectCollection.deleteOne(data)
    if(!response){
        throw Error ("whatssup beinjing")
    }
    return response
}

export const findprojectById= async(data:ObjectId,projection:ProjectProjectionType):Promise<ProjectType>=>{
    const response=await ProjectCollection.findOne({_id:data},{projection:projection})
    return response as ProjectType
}

export const findProjects= async(limits:limitsType,projection:ProjectProjectionType):Promise<ProjectType[]>=>{
    const response=await ProjectCollection.find({},{projection:projection,limit:limits.limit,skip:limits.skip}).toArray()
    return response as ProjectType[]
}

export const findProjectsWithLesson=async(projection:ProjectProjectionType,lessonProjection:LessonProjectionType,lessonLimits:{limit:number,skip:number},limits:{limit:number,skip:number}):Promise<any>=>{
    const response=await ProjectCollection.aggregate([
      {$lookup:{
        from:"lessons",
        localField:"_id",
        foreignField:"ProjectId",
        pipeline:[
            {$project:lessonProjection},
            {$skip:lessonLimits.skip},
            {$limit:lessonLimits.limit},
        ],
        as:"lessons",

      },},
        {$skip: limits.skip},
        {$limit: limits.limit},
        {$project:projection}

    ]).toArray() 

    return response  
}

export const findProjectWithLesson=async(data:ObjectId,lessonProjection:LessonProjectionType,lessonLimits:{limit:number,skip:number}):Promise<ProjectWithLessonType[]>=>{
    const response=await ProjectCollection.aggregate([
        {$match:{
            _id:data
        },
    },
      {$lookup:{
        from:"lessons",
        localField:"_id",
        foreignField:"ProjectId",
        pipeline:[
            {$project:lessonProjection},
        {$skip:lessonLimits.skip},
        {$limit:lessonLimits.limit},
        ],
        as:"lessons",

      },},

    ]).toArray() 

    return response  as ProjectWithLessonType[]
}

export const findprojectsById= async(data:{_id:ObjectId}[],projection:ProjectProjectionType):Promise<ProjectType[]>=>{
    const response=await ProjectCollection.find({$or:[data]},{projection:projection}).toArray()
    return response as ProjectType[]
}

export const findprojectsFieldsByOr= async(data:{[key:string]:any}[],projection:ProjectProjectionType):Promise<ProjectType[]>=>{
    const response=await ProjectCollection.find({$or:data},{projection:projection}).toArray()
    return response as ProjectType[]
}
export const findprojectsFieldsByAnd= async(data:{[key:string]:any}[],projection:ProjectProjectionType):Promise<ProjectType[]>=>{
    const response=await ProjectCollection.find({$and:[data]},{projection:projection}).toArray()
    return response as ProjectType[]
}



export const findprojectsFieldsWithLessonByor= async(data:{[key:string]:any}[],projection:ProjectProjectionType,LessonProjection:LessonProjectionType,limits:limitsType,lessonLimits:limitsType):Promise<ProjectWithLessonType[]>=>{
    const response=await ProjectCollection.aggregate([
        {
        $match:{$or:data}
        },{$lookup:{
            from:"lessons",
            localField:"_id",
            foreignField:"ProjectId",
            pipeline:[
                {$project:LessonProjection},
                {$skip:lessonLimits.skip},
                {$limit:lessonLimits.limit}
            ],
            as:"lessons"
        }},
        {$skip:limits.skip},
        {$limit:limits.limit},
        {$project:projection}]).toArray()
    return response as ProjectWithLessonType[]
    }

export const findprojectsFieldsWithLessonByAnd= async(data:{[key:string]:any}[],projection:ProjectProjectionType,LessonProjection:LessonProjectionType,limits:limitsType,lessonLimits:limitsType):Promise<ProjectWithLessonType[]>=>{
    const response=await ProjectCollection.aggregate([
        {
        $match:{$and:data}
        },
        {$lookup:{
            from:"lessons",
            localField:"_id",
            foreignField:"ProjectId",
            pipeline:[
                {$project:LessonProjection},
                {$skip:lessonLimits.skip},
                {$limit:lessonLimits.limit}
            ],
            as:"lessons"
        }},
        {$skip:limits.skip},
        {$limit:limits.limit},

        {$project:projection}]).toArray()
    return response as ProjectWithLessonType[]
}