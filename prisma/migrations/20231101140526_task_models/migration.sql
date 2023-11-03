-- CreateEnum
CREATE TYPE "TaskFrequency" AS ENUM ('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');

-- CreateEnum
CREATE TYPE "TaskShift" AS ENUM ('morning', 'afternoon', 'night');

-- CreateEnum
CREATE TYPE "TaskGroup" AS ENUM ('study', 'routine');

-- CreateTable
CREATE TABLE "task_categories" (
    "id" TEXT NOT NULL,
    "group" "TaskGroup" NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "task_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "shift" "TaskShift" NOT NULL,
    "frequency" "TaskFrequency"[],
    "order" INTEGER NOT NULL,
    "category_id" TEXT NOT NULL,
    "children_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "task_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_children_id_fkey" FOREIGN KEY ("children_id") REFERENCES "children_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
