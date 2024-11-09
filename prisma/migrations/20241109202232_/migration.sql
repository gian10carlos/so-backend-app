-- AlterTable
ALTER TABLE "People" ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT;

-- AlterTable
ALTER TABLE "PersonBalances" ALTER COLUMN "amount" SET DEFAULT 100;
