/*
  Warnings:

  - You are about to drop the column `nameChild` on the `children_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `surnameChild` on the `children_profiles` table. All the data in the column will be lost.
  - Added the required column `name` to the `children_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `children_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "children_profiles" DROP COLUMN "nameChild",
DROP COLUMN "surnameChild",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;
