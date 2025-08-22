-- DropForeignKey
ALTER TABLE `Ingredient` DROP FOREIGN KEY `Ingredient_recipeId_fkey`;

-- DropIndex
DROP INDEX `Ingredient_recipeId_fkey` ON `Ingredient`;

-- AddForeignKey
ALTER TABLE `Ingredient` ADD CONSTRAINT `Ingredient_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
