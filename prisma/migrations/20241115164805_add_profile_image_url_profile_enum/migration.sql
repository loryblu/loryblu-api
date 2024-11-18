-- CreateEnum
CREATE TYPE "Profile" AS ENUM ('parent', 'child');

-- AlterTable
ALTER TABLE "children_profiles" ADD COLUMN     "profileImageUrl" TEXT;

-- AlterTable
ALTER TABLE "parent_profiles" ADD COLUMN     "profileImageUrl" TEXT;
