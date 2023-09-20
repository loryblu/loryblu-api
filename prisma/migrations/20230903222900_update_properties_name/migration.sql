/*
  Warnings:

  - You are about to drop the column `birthday` on the `children_profiles` table. All the data in the column will be lost.
  - Added the required column `birthdate` to the `children_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "children_profiles" DROP COLUMN "birthday",
ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL;
