/*
  Warnings:

  - You are about to drop the column `area` on the `Specialist` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DoctorArea" AS ENUM ('CARDIOLOGISTS', 'OBS_AND_GYNAE', 'MEDICINE', 'ENT', 'DERMATOLOGY_AND_SKIN', 'EYE', 'ORAL_AND_DENTAL', 'HAEMATOLOGIST', 'CANCER', 'NEUROLOGY', 'CHEST', 'PSYCHIATRIST', 'UROLOGIST', 'PGYSIOTHERAPY', 'CHILD', 'NUTRITIONIST', 'ORTHOPEDIC', 'SURGERY', 'ENDOCRINOLOGY', 'NEPHROLOGY', 'SPINE_AND_NEUROSURGERY');

-- AlterTable
ALTER TABLE "Specialist" DROP COLUMN "area",
ADD COLUMN     "specialization" "DoctorArea" NOT NULL DEFAULT 'MEDICINE';
