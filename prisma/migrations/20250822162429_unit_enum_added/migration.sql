/*
  Warnings:

  - You are about to alter the column `unit` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Ingredient` MODIFY `unit` ENUM('G', 'ML', 'TSP', 'TBSP', 'PCS') NOT NULL;
