-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('INCALL', 'OUTCALL');

-- AlterTable
ALTER TABLE "Ad" ADD COLUMN     "service_type" "ServiceType" NOT NULL DEFAULT 'INCALL';
