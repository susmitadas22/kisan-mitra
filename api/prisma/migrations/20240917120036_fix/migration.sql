/*
  Warnings:

  - You are about to drop the column `cases` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `prevent` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "cases",
DROP COLUMN "prevent",
ADD COLUMN     "cause" TEXT,
ADD COLUMN     "preventions" TEXT,
ADD COLUMN     "symptoms" TEXT;
