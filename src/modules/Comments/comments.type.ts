
import { ObjectId } from 'mongodb';
import z, { object } from 'zod';
import { limits } from '../../utils/types';

export const CommentSchema=z.object({
    _id:z.instanceof(ObjectId).nonoptional(),
    type:z.enum(["advice","normal"]).nonoptional(),
    data:z.string().min(1).max(200).nonempty(),
    owner:z.instanceof(ObjectId).nonoptional(),
    object:z.object({type:z.enum(["lesson","project"]),_id:z.instanceof(ObjectId).nonoptional()}),
    createdAt:z.coerce.date()
})

export const UpdateCommentSchema=CommentSchema.omit({
    createdAt:true,
    _id:true,
    owner:true,
    object:true
})
export const AddCommentSchema=CommentSchema.omit({
    createdAt:true,
    _id:true,
})
export const GetCommentByUserRequestSchema=z.object({
    owner:z.instanceof(ObjectId).nonoptional(),
    limits:limits
})

export const GetCommentByObjectRequestSchema=z.object({
    _id:z.instanceof(ObjectId).nonoptional(),
    limits:limits,
})


export const UpdateCommentRequestSchema=z.object({
    comment:UpdateCommentSchema,
    owner:z.instanceof(ObjectId),
    _id:z.instanceof(ObjectId).nonoptional(),
})

export const DeleteCommentRequestSchema=z.object({
    owner:z.instanceof(ObjectId),
    _id:z.string().nonempty(),
})

export const AddCommentRequestSchema=z.object({
    comment:AddCommentSchema
})
export type AddCommentType=z.infer<typeof AddCommentSchema>;
export type AddCommentRequestType=z.infer<typeof AddCommentRequestSchema>;
export type removeCommentRequestType=z.infer<typeof DeleteCommentRequestSchema>;
export type UpdateCommentRequestType=z.infer<typeof UpdateCommentRequestSchema>;
export type GetCommentByObjectRequestType=z.infer<typeof GetCommentByObjectRequestSchema>;
export type GetCommentByOwnerRequestType=z.infer<typeof GetCommentByUserRequestSchema>;
export type CommentType=z.infer<typeof CommentSchema>;
export type UpdateCommentType=z.infer<typeof UpdateCommentSchema>;
