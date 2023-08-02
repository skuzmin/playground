-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(355) NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);
