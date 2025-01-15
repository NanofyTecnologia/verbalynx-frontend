/*
  Warnings:

  - You are about to drop the `_ClassToFeedback` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClassToFeedback" DROP CONSTRAINT "_ClassToFeedback_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToFeedback" DROP CONSTRAINT "_ClassToFeedback_B_fkey";

-- DropTable
DROP TABLE "_ClassToFeedback";

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
