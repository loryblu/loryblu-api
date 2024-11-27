/*
  Warnings:

  - You are about to drop the column `profile` on the `children_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `parent_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "children_profiles" DROP COLUMN "profile";

-- AlterTable
ALTER TABLE "parent_profiles" DROP COLUMN "profile";

-- DropEnum
DROP TYPE "Profile";
