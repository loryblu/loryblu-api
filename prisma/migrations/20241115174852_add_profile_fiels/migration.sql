-- CreateEnum
CREATE TYPE "Profile" AS ENUM ('parent', 'child');

-- AlterTable
ALTER TABLE "children_profiles" ADD COLUMN     "profile" "Profile" NOT NULL DEFAULT 'child';

-- AlterTable
ALTER TABLE "parent_profiles" ADD COLUMN     "profile" "Profile" NOT NULL DEFAULT 'parent';
