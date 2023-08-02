-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_userId_fkey";

-- DropIndex
DROP INDEX "items_userId_key";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "userId";

-- DropTable
DROP TABLE "user";

