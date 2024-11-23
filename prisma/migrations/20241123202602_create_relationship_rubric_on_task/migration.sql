/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `rubrics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `score` to the `levels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `rubrics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "levels" ADD COLUMN     "score" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "rubrics" ADD COLUMN     "taskId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "rubrics_taskId_key" ON "rubrics"("taskId");

-- AddForeignKey
ALTER TABLE "rubrics" ADD CONSTRAINT "rubrics_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
