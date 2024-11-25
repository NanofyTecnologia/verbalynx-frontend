/*
  Warnings:

  - You are about to drop the `Help` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Help";

-- CreateTable
CREATE TABLE "help_videos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "help_videos_pkey" PRIMARY KEY ("id")
);
