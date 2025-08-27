import { Unit } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

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
  /**
   * Создаем пользователей
   */
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
  /**
   * Продукты
   */
  await prisma.product.createMany({
    data: [
      {
        "id": 1,
        "slug": "carrot",
        "name": "Морковь",
        "calories": 41,
        "protein": 0.9,
        "fat": 0.24,
        "carbs": 9.6
      },
      {
        "id": 2,
        "slug": "garlic",
        "name": "Чеснок",
        "calories": 149,
        "protein": 6.5,
        "fat": 0.5,
        "carbs": 33
      },
      {
        "id": 3,
        "slug": "beet",
        "name": "Свекла",
        "calories": 46,
        "protein": 1.7,
        "fat": 0.15,
        "carbs": 46
      },
      {
        "id": 4,
        "slug": "tofu",
        "name": "Тофу",
        "calories": 85,
        "protein": 12.5,
        "fat": 7,
        "carbs": 2
      },
      {
        "id": 5,
        "slug": "tomato",
        "name": "Томаты",
        "calories": 18,
        "protein": 0.88,
        "fat": 0.2,
        "carbs": 3.89
      },
      {
        "id": 6,
        "slug": "parsley",
        "name": "Петрушка",
        "calories": 49,
        "protein": 3.7,
        "fat": 0.4,
        "carbs": 3.6
      },
      {
        "id": 7,
        "slug": "bell_pepper",
        "name": "Болгарский перец",
        "calories": 25,
        "protein": 1,
        "fat": 0.3,
        "carbs": 5.25
      },
      {
        "id": 8,
        "slug": "onion",
        "name": "Лук репчатый",
        "calories": 41,
        "protein": 1.4,
        "fat": 0.2,
        "carbs": 8.2
      },
      {
        "id": 10,
        "slug": "cherry_tomatoes",
        "name": "Помидоры черри",
        "calories": 21.5,
        "protein": 0.8,
        "fat": 0.15,
        "carbs": 3.3
      },
      {
        "id": 11,
        "slug": "cucumbers",
        "name": "Огурцы",
        "calories": 15,
        "protein": 0.65,
        "fat": 0.11,
        "carbs": 3.63
      },
      {
        "id": 12,
        "slug": "peach",
        "name": "Персик",
        "calories": 46,
        "protein": 0.9,
        "fat": 0.1,
        "carbs": 113
      },
    ]
  });
  /**
   * Рецепты
   */
  await prisma.recipe.create({
    data: {
      id: 1,
      slug: 'borscht',
      name: 'Классический веган-борщ',
      userId: 1,
      ingredients: {
        create: [
          {
            productId: 1,
            amount: 10,
            unit: Unit.G,
          },
        ]
      },
    },
    include: {
      ingredients: true,
    },
  });
  await prisma.recipe.create({
    data: {
      id: 2,
      slug: 'spaghetti',
      name: 'Спагетти',
      userId: 1,
      ingredients: {
        create: [
          {
            productId: 1,
            amount: 10,
            unit: Unit.G,
          },
        ]
      },
    },
    include: {
      ingredients: true,
    },
  });
  await prisma.recipe.create({
    data: {
      id: 3,
      slug: 'tofu_scrambled',
      name: 'Тофу-скрэмбл',
      userId: 1,
      ingredients: {
        create: [
          {
            productId: 4,
            amount: 150,
            unit: Unit.G,
          },
          {
            productId: 6,
            amount: 5,
            unit: Unit.G,
          },
          {
            productId: 7,
            amount: 20,
            unit: Unit.G,
          },
          {
            productId: 5,
            amount: 30,
            unit: Unit.G,
          },
          {
            productId: 8,
            amount: 7,
            unit: Unit.G,
          },
          {
            productId: 2,
            amount: 3,
            unit: Unit.G,
          },
          {
            productId: 10,
            amount: 15,
            unit: Unit.G,
          },
          {
            productId: 11,
            amount: 15,
            unit: Unit.G,
          },
        ]
      },
    },
    include: {
      ingredients: true,
    },
  });
}
