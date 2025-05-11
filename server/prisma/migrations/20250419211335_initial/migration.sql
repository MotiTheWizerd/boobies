/*
  Warnings:

  - You are about to drop the `AdImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdImage" DROP CONSTRAINT "AdImage_adId_fkey";

-- DropTable
DROP TABLE "AdImage";
