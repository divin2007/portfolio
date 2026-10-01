import z from "zod";
export type DocumentDataForLookUp={from:string,
                localField:string,
                foreignField:string}
export const limits=z.object({skip:z.number().int().min(0).nonoptional(),limit:z.number().int().min(1).nonoptional()})
export type limitsType=z.infer<typeof limits>