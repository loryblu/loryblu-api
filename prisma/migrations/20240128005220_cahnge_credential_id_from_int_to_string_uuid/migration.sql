/*
  Warnings:

  - The primary key for the `credentials` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "parent_profiles" DROP CONSTRAINT "parent_profiles_credential_id_fkey";

-- DropForeignKey
ALTER TABLE "reset_password_info" DROP CONSTRAINT "reset_password_info_credential_id_fkey";

-- AlterTable
ALTER TABLE "credentials" DROP CONSTRAINT "credentials_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "credentials_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "credentials_id_seq";

-- AlterTable
ALTER TABLE "parent_profiles" ALTER COLUMN "credential_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "reset_password_info" ALTER COLUMN "credential_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "reset_password_info" ADD CONSTRAINT "reset_password_info_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_profiles" ADD CONSTRAINT "parent_profiles_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;
