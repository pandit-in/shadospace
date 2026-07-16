CREATE TYPE "vote_type" AS ENUM('upvote', 'downvote');--> statement-breakpoint
ALTER TABLE "like" ADD COLUMN "type" "vote_type" NOT NULL;