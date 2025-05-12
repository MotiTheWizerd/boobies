-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "area_name" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Area_area_name_key" ON "Area"("area_name");
