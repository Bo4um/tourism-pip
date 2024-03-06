-- DropForeignKey
ALTER TABLE "Guide" DROP CONSTRAINT "Guide_userId_fkey";

-- DropForeignKey
ALTER TABLE "Landmark" DROP CONSTRAINT "Landmark_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Landmark" DROP CONSTRAINT "Landmark_guideId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_landmarkId_fkey";

-- DropForeignKey
ALTER TABLE "Tourist" DROP CONSTRAINT "Tourist_userId_fkey";

-- AlterTable
ALTER TABLE "Guide" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Landmark" ALTER COLUMN "groupId" DROP NOT NULL,
ALTER COLUMN "guideId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "landmarkId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tourist" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Guide" ADD CONSTRAINT "Guide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tourist" ADD CONSTRAINT "Tourist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Landmark" ADD CONSTRAINT "Landmark_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Landmark" ADD CONSTRAINT "Landmark_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_landmarkId_fkey" FOREIGN KEY ("landmarkId") REFERENCES "Landmark"("id") ON DELETE SET NULL ON UPDATE CASCADE;
