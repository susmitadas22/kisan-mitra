/*
  Warnings:

  - You are about to drop the column `image` on the `Inventory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "image",
ALTER COLUMN "price" DROP NOT NULL;
