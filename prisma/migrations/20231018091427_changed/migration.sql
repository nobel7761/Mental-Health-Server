/*
  Warnings:

  - You are about to drop the column `patient_id` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `specialist_id` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `patientId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialistId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_specialist_id_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "patient_id",
DROP COLUMN "specialist_id",
ADD COLUMN     "patientId" TEXT NOT NULL,
ADD COLUMN     "specialistId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "Specialist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
