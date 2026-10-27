import z, { number } from "zod";
import { LessonProjection, LessonSchema } from "../Lessons/lesson.type";
import { ObjectId } from "mongodb";
import { limits } from "../../utils/types";
import { type CommentType,CommentSchema } from "../Comments/comments.type";
const LinksSchema=z.object({
    link:z.url().nonempty(),
    name:z.string().max(200).min(2).nonempty(),
    data:z.string().max(200).min(2).nonempty(),
})

const referenceSchema=z.object({
    link:z.url(),
    description:z.string().min(20).max(2000)
})

const TimelineSchema=z.object({
    time:z.coerce.date().nonoptional(),
    name:z.string().max(200).min(2).nonempty(),
    description:z.string().max(600).min(10).nonempty()
})

const  InterestingSchema=z.object({
    name:z.string().nonempty(),
    description:z.string().max(600).min(10).nonempty(),
    happyMeter:z.number().max(100).min(0).positive().nonoptional()
})
const  HardSchema=z.object({
    name:z.string().max(200).min(2).nonempty(),
    description:z.string().max(600).min(10).nonempty(),
    rating:z.number().max(100).min(0).positive().nonoptional()
})

const  PartsSchema=z.object({
    interesting:z.array(InterestingSchema).nonempty(),
    hard:z.array(HardSchema).nonempty()
})

const pointsSchema=z.object({
    idea:z.array(z.object({
        cameFrom:z.string().min(20).max(50),
        approach:z.string().min(20).max(50)
    })).optional(),
    why:z.array(z.record(z.string()/*reasons*/,z.string()))

})


export const projectSchema=z.object({
    _id: z.instanceof(ObjectId),
    name:z.string().min(1).max(200).nonempty(),
    description:z.string().min(30).max(2000).nonempty(),
    links:LinksSchema,
    references:z.array(referenceSchema),
    timeline:z.array(TimelineSchema),
    parts:z.array(PartsSchema),
    rating:z.number().max(100).min(0).positive().nonoptional(),
    points:z.array(pointsSchema),
    createdAt:z.coerce.date()
})
export const projectSchemaWithLesson=projectSchema.extend({
    lesson:z.array(LessonSchema)
})
export const projectSchemaWithLessonComment=projectSchema.extend({
    lesson:z.array(LessonSchema),
    comment:z.array(CommentSchema)
})
export const projectSchemaWithComment=projectSchema.extend({
    comment:z.array(CommentSchema)
})
export const addProjectSchema=projectSchema.omit({
    _id:true,
    createdAt:true
})

export const updateProjectSchema=z.object({
    name:z.string().min(1).max(200).optional(),
    description:z.string().min(30).max(2000).optional(),
    links:LinksSchema.optional(),
    references:z.array(referenceSchema).optional(),
    timeline:z.array(TimelineSchema).optional(),
    parts:z.array(PartsSchema).optional(),
    rating:z.number().max(100).min(0).positive().optional(),
    lessons:z.array(LessonSchema).optional(),
    points:z.array(pointsSchema).optional()
})
export const projectProjectionSchema=z.object({
    _id:z.number().min(1).max(1).optional(),
    createdAt:z.number().min(1).max(1).optional(),
    name:z.number().min(1).max(1).optional(),
    description:z.number().min(1).max(1).optional(),
    links:z.number().min(1).max(1).optional(),
    references:z.number().min(1).max(1).optional(),
    timeline:z.number().min(1).max(1).optional(),
    parts:z.number().min(1).max(1).optional(),
    rating:z.number().min(1).max(1).optional(),
    lessons:z.number().min(1).max(1).optional(),
    points:z.number().min(1).max(1).optional()
})
export type ProjectProjectionType=z.infer<typeof projectProjectionSchema>
export type UpdateProjectType=z.infer<typeof updateProjectSchema>
export type ProjectType=z.infer<typeof projectSchema>
export type ProjectWithLessonType=z.infer<typeof projectSchemaWithLesson>
export type AddProjectType=z.infer<typeof addProjectSchema>
export type projectSchemaWithLessonType=z.infer<typeof projectSchemaWithLesson>

//requests

export const addProjectRequest=z.object({
    data:addProjectSchema
})

export const updateProjectRequest=z.object({
    data:updateProjectSchema,
    _id:z.instanceof(ObjectId)
})

export const removeProjectRequest=z.object({
    _id:z.instanceof(ObjectId)
})

export const findProjectRequest=z.object({
    _id:z.instanceof(ObjectId),
    projection:projectProjectionSchema,
    lessonProjection:LessonProjection.optional(),
    lessonLimits:limits.optional(),
    lesson:z.boolean(),
    comment:z.boolean(),
}).superRefine(
    (data,ctx)=>{
        if(data.lesson && (!data.lessonProjection||!data.lessonLimits)){
            ctx.addIssue({
                code:"custom",
                message:"some values expected to know the lessons project you want arent submitted",
                path:["lessonProjection","lessonLimits"]
            })
        }
        
    }
)



export const findProjectsRequest=z.object({
    projection:projectProjectionSchema,
    lessonProjection:LessonProjection.optional(),
    lessonLimits:limits.optional(),
    limits:limits.nonoptional(),
    lesson:z.boolean(),
    comment:z.boolean()
}).superRefine(
    (data,ctx)=>{
        if(data.lesson && (!data.lessonProjection||!data.lessonLimits)){
            ctx.addIssue({
                code:"custom",
                message:"some values expected to know the lessons project you want arent submitted",
                path:["lessonProjection","lessonLimits"]
            })
        }
    }
)



export const findProjectsByFieldsRequest=z.object({
    projection:projectProjectionSchema,
    lessonProjection:LessonProjection.optional(),
    operation:z.enum(["and","or"]).nonoptional(),
    fields:z.array(z.record(z.string(),z.string())).nonempty(),
    lessonLimits:limits.optional(),
    limits:limits.nonoptional(),
    lesson:z.boolean(),
    comment:z.boolean(),

}).superRefine(
    (data,ctx)=>{
        if(data.lesson && (!data.lessonProjection||!data.lessonLimits)){
            ctx.addIssue({
                code:"custom",
                message:"some values expected to know the lessons project you want arent submitted",
                path:["lessonProjection","lessonLimits"]
            })
        }
    }
)

export type addProjectRequestType=z.infer<typeof addProjectRequest>
export type updateProjectRequestType=z.infer<typeof updateProjectRequest>
export type removeProjectRequestType=z.infer<typeof removeProjectRequest>
export type findProjectRequestType=z.infer<typeof findProjectRequest>
export type findProjectsRequestType=z.infer<typeof findProjectsRequest>
export type findProjectsByFieldsRequestType=z.infer<typeof findProjectsByFieldsRequest>