/*
  Warnings:

  - You are about to drop the column `userId` on the `ProfileImage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileImageId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProfileImage" DROP CONSTRAINT "ProfileImage_userId_fkey";

-- DropIndex
DROP INDEX "ProfileImage_userId_key";

-- AlterTable
ALTER TABLE "ProfileImage" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_profileImageId_key" ON "User"("profileImageId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "ProfileImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
