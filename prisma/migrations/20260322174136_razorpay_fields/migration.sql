/*
  Warnings:

  - You are about to drop the column `razorpayContactId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `razorpayLinkedAccount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `razorpayItemId` on the `Webinar` table. All the data in the column will be lost.
  - You are about to drop the column `razorpayPlanId` on the `Webinar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "razorpayContactId",
DROP COLUMN "razorpayLinkedAccount",
ADD COLUMN     "stripeConnectId" VARCHAR(255),
ADD COLUMN     "stripeCustomerId" VARCHAR(255);

-- AlterTable
ALTER TABLE "Webinar" DROP COLUMN "razorpayItemId",
DROP COLUMN "razorpayPlanId",
ADD COLUMN     "stripeProductId" VARCHAR(255);
