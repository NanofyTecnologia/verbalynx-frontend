/*
  Warnings:

  - You are about to drop the column `level` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `rubric` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `levels` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `rubrics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "levels" DROP CONSTRAINT "levels_evaluationId_fkey";

-- AlterTable
ALTER TABLE "evaluations" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "score" INTEGER[];

-- AlterTable
ALTER TABLE "rubrics" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "level",
DROP COLUMN "rubric";

-- DropTable
DROP TABLE "levels";
