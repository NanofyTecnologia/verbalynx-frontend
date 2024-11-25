/*
  Warnings:

  - Added the required column `level` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "tips" TEXT[];
