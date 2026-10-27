
import { removeUndefined } from '../../utils/undefinedRemover';
import { AddLessonSchema,type AddLessonType, LessonRemoveRequest,type LessonRemoveRequestType, LessonSearchByAndOrRequest,type LessonSearchByAndOrRequestType, LessonSearchIdRequest,type LessonSearchIdRequestType, UpdateLessonRequest,type UpdateLessonRequestType, UpdateLessonSchema,type UpdateLessonType } from './lesson.type';

export const toAddLesson=(data:any):AddLessonType=>{
    const result=AddLessonSchema.safeParse(data)
    
    if(!result.success){
        throw new Error(result.error.message)
    }    
    return result.data
}

export const toUpdateRequestLesson=(data:any):UpdateLessonRequestType=> {
    const result=UpdateLessonRequest.safeParse(data)
    
    if(!result.success){
        throw new Error("watsupp beijin")
    }    
    return result.data
}


export const toLessonRemoveRequest=(data:any):LessonRemoveRequestType=>{
   
    const result=LessonRemoveRequest.safeParse(data)
    if(!result.success){
        throw new Error("watsupp beijin")
    }
    return result.data

}

export const toLessonSearchIdRequest=(data:any):LessonSearchIdRequestType=>{
    const result= LessonSearchIdRequest.safeParse(data)
    if(!result.success){
        throw new Error("watsupp beijin")
    }
    return result.data 
}

export const toLessonSearchByAndOrRequest=(data:any):LessonSearchByAndOrRequestType=>{
    const result=LessonSearchByAndOrRequest.safeParse(data)
    if(!result.success){
        throw new Error("watsupp beijin")
    }
    return result.data 
}

