/*
  Warnings:

  - You are about to drop the column `id` on the `Message` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Message_id_key";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "id";
