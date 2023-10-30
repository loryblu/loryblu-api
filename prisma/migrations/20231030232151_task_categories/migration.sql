-- CreateEnum
CREATE TYPE "TaskGroup" AS ENUM ('study', 'routine');

-- CreateTable
CREATE TABLE "task_categories" (
    "id" TEXT NOT NULL,
    "group" "TaskGroup" NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "task_categories_pkey" PRIMARY KEY ("id")
);
