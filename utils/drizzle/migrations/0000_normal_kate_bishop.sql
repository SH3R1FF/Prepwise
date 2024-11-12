CREATE TABLE IF NOT EXISTS "Prepwise" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonMockResponse" text NOT NULL,
	"jobPosition" varchar NOT NULL,
	"jobDesc" varchar NOT NULL,
	"jobExperience" varchar NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" varchar,
	"mockId" varchar NOT NULL
);
