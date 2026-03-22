/*
  Warnings:

  - You are about to drop the column `stripeConnectId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `priceId` on the `Webinar` table. All the data in the column will be lost.
  - You are about to drop the column `stripeProductId` on the `Webinar` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'CAPTURED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED', 'PAUSED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeConnectId",
DROP COLUMN "stripeCustomerId",
ADD COLUMN     "razorpayContactId" VARCHAR(255),
ADD COLUMN     "razorpayLinkedAccount" VARCHAR(255);

-- AlterTable
ALTER TABLE "Webinar" DROP COLUMN "priceId",
DROP COLUMN "stripeProductId",
ADD COLUMN     "price" INTEGER,
ADD COLUMN     "razorpayItemId" VARCHAR(255),
ADD COLUMN     "razorpayPlanId" VARCHAR(255);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "razorpaySubscriptionId" VARCHAR(255) NOT NULL,
    "razorpayPlanId" VARCHAR(255) NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_razorpaySubscriptionId_key" ON "Subscription"("razorpaySubscriptionId");

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");

-- CreateIndex
CREATE INDEX "Subscription_razorpaySubscriptionId_idx" ON "Subscription"("razorpaySubscriptionId");
