/*
  Warnings:

  - You are about to alter the column `name` on the `players` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(32)`.

*/
-- AlterTable
ALTER TABLE "players" ALTER COLUMN "name" SET DATA TYPE VARCHAR(32);
