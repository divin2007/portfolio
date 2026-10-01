import { ObjectId } from "mongodb";
import type { ProjectProjectionType } from "../modules/Projects/project.types";
import type { LessonProjectionType } from "../modules/Lessons/lesson.type";
import type { DocumentDataForLookUp, limitsType } from "./types";
import { removeUndefined } from "./undefinedRemover";

export function queryRestructurer(DocumentData:DocumentDataForLookUp,data:ObjectId,projection:ProjectProjectionType,childDocumentProjection:LessonProjectionType,limits:limitsType,lessonLimits:limitsType){
    let query:string=` await ProjectCollection.aggregate([
            {
            $match:{_id:${data}}
            },
            {$lookup:{
                from:"${DocumentData.from}",
                localField:"${DocumentData.localField}",
                foreignField:"${DocumentData.foreignField}",
                pipeline:[
                    {$projection:${childDocumentProjection}},
                    ${removeLimits(limits).forEach(e=>e)}
                    ]
            }},
            {$skip:limits.skip},
            ${removeLimits(limits).map(e => JSON.stringify(e)).join(",")}
    
            {$project:${projection}}]).toArray()`
    

    return query
}
function removeLimits(data: limitsType): { [key: string]: number }[] {
    const limitsPart: { [key: string]: number }[] = [];

    if (data.skip >= 0) {
        limitsPart.push({
            $skip: data.skip
        });
    }

    if (data.limit > 0) {
        limitsPart.push({
            $limit: data.limit
        });
    }

    return limitsPart;
}

export function restructuredToArraySearchOrAnd(data:{[key:string]:any}[]){
    const newArray:{[key:string]:any}[]=[]
    for(let x of data){
        if(x==undefined){
            continue
        }
        for(let i in x){
            if(i=="_id"){
                x[i]=new ObjectId(x[i])
            }
            if(typeof x[i] =="string"){
                if(x[i][0]=="/"){
                    const sliced=x[i]
                    if (sliced[0] === "/") {
                        const lastSlash = sliced.lastIndexOf("/");

                        const pattern = sliced.slice(1, lastSlash);
                        const flags = sliced.slice(lastSlash + 1);

                        const regex = new RegExp(pattern);
                        x[i] = regex;
                        continue;
                    }
                }
        }
        }
        newArray.push(x)
    }
    return newArray
}

export function restructuredToArraySearchOrFromObject(data: any): { [key: string]: any }[] {
    const array: { [key: string]: any }[] = [];
    for (const i in data) {
        const newObject: { [key: string]: any } = {};

        if (i === undefined) {
            continue;
        }
        if (typeof data[i] == "string") {
            const sliced = data[i];

            if (sliced[0] === "/") {
                const lastSlash = sliced.lastIndexOf("/");

                const pattern = sliced.slice(1, lastSlash);
                const flags = sliced.slice(lastSlash + 1);

                const regex = new RegExp(pattern);
                newObject[i] = regex;
                array.push(newObject);
                continue;
            }
        }

        newObject[i] = data[i];
        array.push(newObject);
    }
    return array;
}