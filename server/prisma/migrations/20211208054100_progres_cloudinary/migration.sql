/*
  Warnings:

  - Added the required column `cloudinary_id` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Progress" ADD COLUMN     "cloudinary_id" TEXT NOT NULL;
