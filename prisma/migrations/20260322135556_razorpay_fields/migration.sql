/*
  Warnings:

  - You are about to drop the column `price` on the `Webinar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Webinar" DROP COLUMN "price",
ADD COLUMN     "priceId" TEXT;
