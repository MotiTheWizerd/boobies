-- AlterTable
ALTER TABLE "Ad" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "mobile" TEXT,
ADD COLUMN     "monthViews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "telegram" TEXT,
ADD COLUMN     "titsSize" TEXT,
ADD COLUMN     "totalViews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "whatsapp" TEXT;
