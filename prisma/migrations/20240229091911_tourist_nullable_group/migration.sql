-- DropForeignKey
ALTER TABLE "Tourist" DROP CONSTRAINT "Tourist_groupId_fkey";

-- AlterTable
ALTER TABLE "Tourist" ALTER COLUMN "groupId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tourist" ADD CONSTRAINT "Tourist_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
