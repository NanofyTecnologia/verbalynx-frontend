/*
  Warnings:

  - You are about to drop the column `comment` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `tips` on the `feedbacks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "feedback_criterion" ADD COLUMN     "tips" TEXT[];

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "comment",
DROP COLUMN "level",
DROP COLUMN "tips";
