/*
  Warnings:

  - You are about to drop the column `patientId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `specialistId` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `patient_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialist_id` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_specialistId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "patientId",
DROP COLUMN "specialistId",
ADD COLUMN     "patient_id" TEXT NOT NULL,
ADD COLUMN     "specialist_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_specialist_id_fkey" FOREIGN KEY ("specialist_id") REFERENCES "Specialist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
