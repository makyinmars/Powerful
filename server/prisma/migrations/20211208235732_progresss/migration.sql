/*
  Warnings:

  - Made the column `picture` on table `Progress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Progress" ALTER COLUMN "picture" SET NOT NULL;
