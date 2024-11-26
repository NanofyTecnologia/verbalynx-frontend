/*
  Warnings:

  - Added the required column `level` to the `feedback_criterion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `feedback_criterion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedback_criterion" ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL;
