import { MongoClient } from "mongodb"
import {type LessonType } from "../modules/Lessons/lesson.type"
import { type ProjectType } from "../modules/Projects/project.types"

const  mongodb= new MongoClient("mongodb://127.0.0.1:27017")
const db= mongodb.db("studyProject")
export const LessonCollection=db.collection<LessonType>("lessons")
export const ProjectCollection=db.collection<ProjectType>("projects")
