-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('ACTIVE', 'PENDING', 'CANCELED');

-- AlterTable
ALTER TABLE "Specialist" ADD COLUMN     "area" TEXT[] DEFAULT ARRAY['Medicine', 'Dental']::TEXT[],
ADD COLUMN     "fees" INTEGER NOT NULL DEFAULT 500;

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "slot" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "is_payment_completed" BOOLEAN NOT NULL DEFAULT false,
    "patient_id" TEXT NOT NULL,
    "specialist_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_specialist_id_fkey" FOREIGN KEY ("specialist_id") REFERENCES "Specialist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
