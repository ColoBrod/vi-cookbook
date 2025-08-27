import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";

async function main() {
  const hash = await bcrypt.hash("CookBook28469", 10);
  const user = await prisma.user.create({
    data: {
      email: "vi@outlook.com",
      name: "Vi",
      password: hash,
    },
  });
  console.log("User created:", user);
}

main().finally(() => prisma.$disconnect());
