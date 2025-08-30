import prisma from "@/lib/prisma";

import { createUsers } from "./seed-users";
import { createProducts } from "./seed-products";
import { createTags } from "./seed-tags";
import { createRecipes } from "./seed-recipes";

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });

async function main() {
  await createUsers();
  await createProducts();
  await createTags();
  await createRecipes();
}

