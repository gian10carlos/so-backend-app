/*
  Warnings:

  - You are about to drop the column `message` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `id_recipient` on the `Transfer` table. All the data in the column will be lost.
  - You are about to drop the column `id_sender` on the `Transfer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_id_recipient_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_id_sender_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "message",
ADD COLUMN     "message_text" TEXT;

-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "id_recipient",
DROP COLUMN "id_sender",
ADD COLUMN     "id_received" INTEGER,
ADD COLUMN     "id_send" INTEGER;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_id_send_fkey" FOREIGN KEY ("id_send") REFERENCES "People"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_id_received_fkey" FOREIGN KEY ("id_received") REFERENCES "People"("id") ON DELETE SET NULL ON UPDATE CASCADE;
