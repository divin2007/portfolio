import { addProjectRequest,type addProjectRequestType, addProjectSchema,type AddProjectType,  findProjectRequest,type findProjectRequestType, findProjectsByFieldsRequest, type findProjectsByFieldsRequestType, findProjectsRequest,type findProjectsRequestType, updateProjectRequest,type updateProjectRequestType,type UpdateProjectType } from './project.types';
export function toAddProjectRequest(data:addProjectRequestType):addProjectRequestType{
    const result= addProjectRequest.safeParse(data)
    if(result.error){
        console.log(result.error)
        throw new Error("whatssup beijing")
    }
    return result.data
}

export function toUpdateProject(data:UpdateProjectType):updateProjectRequestType{
    const result=updateProjectRequest.safeParse(data)
    if(result.error){
        throw new Error("whatssup beijing")
    }
    return result.data
}



export function toFindProjectsByFieldsRequest(data:findProjectsByFieldsRequestType):findProjectsByFieldsRequestType{
    const result=findProjectsByFieldsRequest.safeParse(data)
    if(result.error){
        console.log(result.error,data)

        throw new Error("whatsupp beijing")
    }
    return result.data
    
}

export function toFindProjectsRequest(data:findProjectsRequestType):findProjectsRequestType{
    const result=findProjectsRequest.safeParse(data)
    if(result.error){
        throw new Error("whatsupp beijing")
    }
    return result.data
    
}

export function toFindProjectRequest(data:findProjectRequestType):findProjectRequestType{
    const result=findProjectRequest.safeParse(data)
    if(result.error){
        throw new Error("whatsupp beijing")
    }
    return result.data
    
}