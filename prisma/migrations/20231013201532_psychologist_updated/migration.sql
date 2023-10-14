/*
  Warnings:

  - You are about to drop the column `contactNo` on the `Psychologist` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Psychologist` table. All the data in the column will be lost.
  - Added the required column `phone_number` to the `Psychologist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_image` to the `Psychologist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Psychologist" DROP COLUMN "contactNo",
DROP COLUMN "profileImage",
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "profile_image" TEXT NOT NULL;
