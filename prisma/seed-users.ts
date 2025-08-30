import prisma from "@/lib/prisma";

export async function createUsers() {
  await prisma.user.createMany({
    data: [
      {
        email: "colobrod@cookbook.com",
        name: "ColoBrod",
        password: "$2b$10$GE98T/nXZw9VQdECRnhHpeo1Z.rEwCN1ui5wX.yelcv2FBPngTOce",
      },
      {
        email: "vi@cookbook.com",
        name: "Vi",
        password: "$2b$10$MPItkR9Zexyp/4zeEV7aSeltkUHOXuwWLqB0XYNYSmSjLfYH8rg2q",
      },
    ],
  });
}
