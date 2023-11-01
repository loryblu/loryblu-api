/*
  Warnings:

  - The values [MALE,FEMALE] on the enum `Genders` will be removed. If these variants are still used in the database, this will fail.
  - The values [ADMIN,USER] on the enum `Roles` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTIVE,DISABLED,BLOCKED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Genders_new" AS ENUM ('male', 'female');
ALTER TABLE "children_profiles" ALTER COLUMN "gender" TYPE "Genders_new" USING ("gender"::text::"Genders_new");
ALTER TYPE "Genders" RENAME TO "Genders_old";
ALTER TYPE "Genders_new" RENAME TO "Genders";
DROP TYPE "Genders_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Roles_new" AS ENUM ('admin', 'user');
ALTER TABLE "credentials" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "credentials" ALTER COLUMN "role" TYPE "Roles_new" USING ("role"::text::"Roles_new");
ALTER TYPE "Roles" RENAME TO "Roles_old";
ALTER TYPE "Roles_new" RENAME TO "Roles";
DROP TYPE "Roles_old";
ALTER TABLE "credentials" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('active', 'disabled', 'blocked');
ALTER TABLE "credentials" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "credentials" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "credentials" ALTER COLUMN "status" SET DEFAULT 'disabled';
COMMIT;

-- AlterTable
ALTER TABLE "credentials" ALTER COLUMN "status" SET DEFAULT 'disabled',
ALTER COLUMN "role" SET DEFAULT 'user';
