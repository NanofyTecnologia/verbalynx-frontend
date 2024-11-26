/*
  Warnings:

  - You are about to drop the `_EvaluationToFeedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `evaluations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EvaluationToFeedback" DROP CONSTRAINT "_EvaluationToFeedback_A_fkey";

-- DropForeignKey
ALTER TABLE "_EvaluationToFeedback" DROP CONSTRAINT "_EvaluationToFeedback_B_fkey";

-- DropForeignKey
ALTER TABLE "evaluations" DROP CONSTRAINT "evaluations_rubricId_fkey";

-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_EvaluationToFeedback";

-- DropTable
DROP TABLE "evaluations";

-- CreateTable
CREATE TABLE "criteria" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "score" INTEGER[],
    "rubric_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_criterion" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "feedback_id" TEXT NOT NULL,
    "criterion_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedback_criterion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "criteria_id_key" ON "criteria"("id");

-- AddForeignKey
ALTER TABLE "criteria" ADD CONSTRAINT "criteria_rubric_id_fkey" FOREIGN KEY ("rubric_id") REFERENCES "rubrics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_criterion" ADD CONSTRAINT "feedback_criterion_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "feedbacks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_criterion" ADD CONSTRAINT "feedback_criterion_criterion_id_fkey" FOREIGN KEY ("criterion_id") REFERENCES "criteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
