/*
  Warnings:

  - You are about to drop the column `fullname` on the `children_profiles` table. All the data in the column will be lost.
  - Added the required column `name` to the `children_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `children_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "children_profiles" DROP COLUMN "fullname",
ADD COLUMN     "nameChild" TEXT NOT NULL,
ADD COLUMN     "surnameChild" TEXT NOT NULL;
