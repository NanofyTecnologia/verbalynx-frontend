-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EvaluationToFeedback" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "feedbacks_id_key" ON "feedbacks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_EvaluationToFeedback_AB_unique" ON "_EvaluationToFeedback"("A", "B");

-- CreateIndex
CREATE INDEX "_EvaluationToFeedback_B_index" ON "_EvaluationToFeedback"("B");

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EvaluationToFeedback" ADD CONSTRAINT "_EvaluationToFeedback_A_fkey" FOREIGN KEY ("A") REFERENCES "evaluations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EvaluationToFeedback" ADD CONSTRAINT "_EvaluationToFeedback_B_fkey" FOREIGN KEY ("B") REFERENCES "feedbacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
