-- CreateTable
CREATE TABLE "People" (
    "id" SERIAL NOT NULL,
    "dni" TEXT NOT NULL,
    "code_identity" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "ccv" TEXT NOT NULL,
    "code_key" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT,
    "refreshing_token" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonBalances" (
    "id" SERIAL NOT NULL,
    "id_people" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "id_people" INTEGER NOT NULL,
    "ip_log" TEXT NOT NULL,
    "dateInp" TIMESTAMP(3) NOT NULL,
    "dateUtil" TIMESTAMP(3),
    "dateOut" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "id_people" INTEGER,
    "id_addressee" INTEGER,
    "id_transfer" INTEGER,
    "message" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update__at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" SERIAL NOT NULL,
    "id_people" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "People_dni_key" ON "People"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "People_card_number_key" ON "People"("card_number");

-- CreateIndex
CREATE UNIQUE INDEX "PersonBalances_id_key" ON "PersonBalances"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PersonBalances_id_people_key" ON "PersonBalances"("id_people");

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Transfer_id_key" ON "Transfer"("id");

-- AddForeignKey
ALTER TABLE "PersonBalances" ADD CONSTRAINT "PersonBalances_id_people_fkey" FOREIGN KEY ("id_people") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_id_people_fkey" FOREIGN KEY ("id_people") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_people_fkey" FOREIGN KEY ("id_people") REFERENCES "People"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_addressee_fkey" FOREIGN KEY ("id_addressee") REFERENCES "People"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_transfer_fkey" FOREIGN KEY ("id_transfer") REFERENCES "Transfer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_id_people_fkey" FOREIGN KEY ("id_people") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
