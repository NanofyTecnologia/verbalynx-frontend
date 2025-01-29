-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
