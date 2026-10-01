import { ObjectId } from "mongodb"
import { z} from "zod"

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


const LinksSchema=z.object({
    link:z.url().nonempty(),
    name:z.string().max(200).min(2).nonempty(),
    data:z.string().max(200).min(2).nonempty(),
})



export const LessonSchema=z.object({
    _id:z.instanceof(ObjectId).nonoptional(),
    name:z.string().max(200).min(2).nonempty(),
    timeline:z.array(TimelineSchema).nonempty(),
    description:z.string().max(600).min(10).nonempty(),
    refferences:z.array(z.string()).nonempty(),
    parts:z.array(PartsSchema).nonempty(),
    links:z.array(LinksSchema).nonempty(),
    ratings:z.number().max(100).min(0).nonoptional(),
    createdAt:z.coerce.date(),
    ProjectId:z.instanceof(ObjectId).optional()
})


export const LessonFields=z.object({
   _id:z.instanceof(ObjectId).optional(),
    name:z.string().max(200).min(2).optional(),
    timeline:z.array(TimelineSchema).optional(),
    description:z.string().max(600).min(10).optional(),
    refferences:z.array(z.string()).optional(),
    parts:z.array(PartsSchema).optional(),
    links:z.array(LinksSchema).optional(),
    ratings:z.number().max(100).min(0).optional(),
    createdAt:z.coerce.date().optional(),
    ProjectId:z.instanceof(ObjectId).optional()
})

export const LessonProjection=z.object({
   _id:z.number().min(1).max(1).optional(),
    name:z.number().min(1).max(1).optional(),
    timeline:z.number().min(1).max(1).optional(),
    description:z.number().min(1).max(1).optional(),
    refferences:z.number().min(1).max(1).optional(),
    parts:z.number().min(1).max(1).optional(),
    links:z.number().min(1).max(1).optional(),
    ratings:z.number().min(1).max(1).optional(),
    createdAt:z.number().min(1).max(1).optional(),
    ProjectId:z.number().min(1).max(1).optional()
})

export const AddLessonSchema=LessonSchema.omit({
    _id:true,
    createdAt:true
})


export const UpdateLessonSchema=LessonFields.omit({
    _id:true,
    createdAt:true
})


export type LessonType=z.infer<typeof LessonSchema>
export type AddLessonType=z.infer<typeof AddLessonSchema>
export type UpdateLessonType=z.infer<typeof UpdateLessonSchema>
export type LessonFieldsType=z.infer<typeof LessonFields>
export type LessonProjectionType=z.infer<typeof LessonProjection>

export const AddLessonAddRequest=z.object({
    lesson:AddLessonSchema
})
export type AddLessonAddRequestType=z.infer<typeof AddLessonAddRequest>

export const LessonRemoveRequest=z.object({
    _id:z.string().nonempty()
})
export type LessonRemoveRequestType=z.infer<typeof LessonRemoveRequest>

export const LessonsRemoveRequest=z.object({
    data:z.array(LessonRemoveRequest)
})
export type LessonsRemoveRequestType=z.infer<typeof LessonsRemoveRequest>

export const UpdateLessonRequest=z.object({
    _id:z.string().nonempty(),
    updateData:UpdateLessonSchema,
})
export type UpdateLessonRequestType=z.infer<typeof UpdateLessonRequest>


export const LessonSearchIdRequest=z.object({
    _id:z.string(),
    projection:LessonProjection,
})

export type LessonSearchIdRequestType=z.infer<typeof LessonSearchIdRequest>
export const LessonSearchByAndOrRequest=z.object({
    fields:z.array(z.record(z.string(),z.string())).nonempty(),
    projection:LessonProjection,
    operation: z.enum(["or", "and"])
})

export type LessonSearchByAndOrRequestType=z.infer<typeof LessonSearchByAndOrRequest>
