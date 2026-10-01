import { AddLesson, GetLessonById, GetLessonsFieldsByOrAnd, PatchLesson, RemoveLesson } from "../modules/Lessons/lessons.controller"
import { CreateProject, GetProjectByID, GetProjects, GetProjectsByFields } from "../modules/Projects/project.controller"

const LessonsRoutes={
    "/api/v1/lesson":{
        GET:GetLessonById,
        POST:AddLesson,
        DELETE:RemoveLesson,
    },
    
    "/api/v1/lesson/:id":{
    //  UPDATE:"",
        PATCH:PatchLesson,
        DELETE:RemoveLesson,
        GET:GetLessonById
    },
    "/api/v1/lessons/search":{
        GET:GetLessonsFieldsByOrAnd
    }
}


const ProjectsRoutes={
    "/api/v1/project":{
        POST:CreateProject,
    },
    "/api/v1/projects":{
        GET:GetProjects,
    },
    "/api/v1/project/:id":{
        GET:GetProjectByID},
    "/api/v1/projects/search":{
        GET:GetProjectsByFields,
    },
    }

export const Routes={...LessonsRoutes,...ProjectsRoutes}
