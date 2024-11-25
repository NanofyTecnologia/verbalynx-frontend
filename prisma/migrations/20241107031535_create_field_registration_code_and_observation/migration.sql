/*
  Warnings:

  - A unique constraint covering the columns `[registration_code]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "observation" TEXT,
ADD COLUMN     "registration_code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_registration_code_key" ON "users"("registration_code");
