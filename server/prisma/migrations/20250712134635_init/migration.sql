-- CreateTable
CREATE TABLE "AdMedia" (
    "id" TEXT NOT NULL,
    "adId" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdMedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdMedia" ADD CONSTRAINT "AdMedia_adId_fkey" FOREIGN KEY ("adId") REFERENCES "Ad"("id") ON DELETE CASCADE ON UPDATE CASCADE;
