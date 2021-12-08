-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
