/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Ad` table. All the data in the column will be lost.
  - You are about to drop the `AdImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdImage" DROP CONSTRAINT "AdImage_adId_fkey";

-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "imageUrl",
ADD COLUMN     "images" JSONB,
ADD COLUMN     "shortDescription" TEXT;

-- DropTable
DROP TABLE "AdImage";
