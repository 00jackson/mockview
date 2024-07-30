
import { pgTable, serial, text, varchar, } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    JobPosition: text('JobPosition').notNull(),
    JobDescription: text('JobDescription').notNull(),
    yearsExperience: text('JobExperience').notNull(),
    createdBy: varchar('CreatedBy').notNull(),
    createdAt: varchar('CreatedAt'),
    mockId: varchar('mockId').notNull(),
})

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockIdRef').notNull(),
    question: varchar('question').notNull(),
    correctAnswer: text('correctAnswer'),
    userAns: varchar('userAns'),
    feedback: text('feedback'),
    rating: text('rating'),
    userEmail: varchar('userEmail'),
    createdAt: varchar('createdAt'),
})