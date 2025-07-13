-- AlterEnum
ALTER TYPE "ServiceType" ADD VALUE 'MIXED';

-- CreateTable
CREATE TABLE "AdCity" (
    "id" TEXT NOT NULL,
    "adId" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdCity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdCity_adId_cityId_key" ON "AdCity"("adId", "cityId");

-- AddForeignKey
ALTER TABLE "AdCity" ADD CONSTRAINT "AdCity_adId_fkey" FOREIGN KEY ("adId") REFERENCES "Ad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdCity" ADD CONSTRAINT "AdCity_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
