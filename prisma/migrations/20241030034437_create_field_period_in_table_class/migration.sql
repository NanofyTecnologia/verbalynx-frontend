/*
  Warnings:

  - Added the required column `period` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "period" TEXT NOT NULL;
