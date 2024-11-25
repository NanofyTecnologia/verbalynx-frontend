/*
  Warnings:

  - You are about to drop the column `taskId` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `feedbacks` table. All the data in the column will be lost.
  - Added the required column `class_id` to the `feedbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `task_id` to the `feedbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_taskId_fkey";

-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_userId_fkey";

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "taskId",
DROP COLUMN "userId",
ADD COLUMN     "class_id" TEXT NOT NULL,
ADD COLUMN     "task_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_ClassToFeedback" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToFeedback_AB_unique" ON "_ClassToFeedback"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToFeedback_B_index" ON "_ClassToFeedback"("B");

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToFeedback" ADD CONSTRAINT "_ClassToFeedback_A_fkey" FOREIGN KEY ("A") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToFeedback" ADD CONSTRAINT "_ClassToFeedback_B_fkey" FOREIGN KEY ("B") REFERENCES "feedbacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
