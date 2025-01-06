-- DropForeignKey
ALTER TABLE "rubrics" DROP CONSTRAINT "rubrics_taskId_fkey";

-- AddForeignKey
ALTER TABLE "rubrics" ADD CONSTRAINT "rubrics_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
