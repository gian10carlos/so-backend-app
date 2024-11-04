/*
  Warnings:

  - You are about to drop the column `id_addressee` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `id_people` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `id_people` on the `Transfer` table. All the data in the column will be lost.
  - Made the column `id_transfer` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `id_recipient` to the `Transfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_sender` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_addressee_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_people_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_transfer_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_id_people_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "id_addressee",
DROP COLUMN "id_people",
ALTER COLUMN "id_transfer" SET NOT NULL;

-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "id_people",
ADD COLUMN     "id_recipient" INTEGER NOT NULL,
ADD COLUMN     "id_sender" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_transfer_fkey" FOREIGN KEY ("id_transfer") REFERENCES "Transfer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_id_sender_fkey" FOREIGN KEY ("id_sender") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_id_recipient_fkey" FOREIGN KEY ("id_recipient") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
