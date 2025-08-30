import prisma from "@/lib/prisma";
import { IngredientType, Unit } from "@/app/generated/prisma";
import { ProductUuid } from "./seed-products";
import { RecipeTag } from "./seed-tags";

export enum RecipeUuid {
  Borscht = '3236caa8-4166-4c7a-9e1c-4eab16fedf18',
  Rassolnik = '03e9cb9a-a4c5-4710-b25a-a3ff3b71f034',
  SweetMustardSauce = '5a118894-6c48-4c79-938e-89c0edae198d',
  PestoRossoSauce = '442c56c2-a679-4a71-94a0-b5f902efc11c',
  Ketchunez = '3a281c00-0706-4323-8c61-88a1656fc940',
}

export async function createRecipes() {
  // Борщ классический
  await prisma.recipe.create({
    data: {
      slug: 'borshch-klassicheskiy',
      name: 'Борщ классический',
      imagePath: "/recipes/borshch-klassicheskiy.jpg",
      author: {
        connect: { email: 'colobrod@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.Onion,
            ingredientType: IngredientType.PRODUCT,
            amount: 700,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Carrot,
            ingredientType: IngredientType.PRODUCT,
            amount: 350,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.TomatoPaste,
            ingredientType: IngredientType.PRODUCT,
            amount: 100,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.RiceVinegar,
            ingredientType: IngredientType.PRODUCT,
            amount: 18,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Beet,
            ingredientType: IngredientType.PRODUCT,
            amount: 1020,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.WhiteCabbage,
            ingredientType: IngredientType.PRODUCT,
            amount: 600,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Potato,
            ingredientType: IngredientType.PRODUCT,
            amount: 460,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Water,
            ingredientType: IngredientType.PRODUCT,
            amount: 5000,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.CannedRedBeans,
            ingredientType: IngredientType.PRODUCT,
            amount: 480,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Parsley,
            ingredientType: IngredientType.PRODUCT,
            amount: 30,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Dill,
            ingredientType: IngredientType.PRODUCT,
            amount: 30,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.BayLeaf,
            ingredientType: IngredientType.PRODUCT,
            amount: 5,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.BlackPepper,
            ingredientType: IngredientType.PRODUCT,
            amount: 5,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Garlic,
            ingredientType: IngredientType.PRODUCT,
            amount: 6,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Salt,
            ingredientType: IngredientType.PRODUCT,
            amount: 50,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.CayennePepper,
            ingredientType: IngredientType.PRODUCT,
            amount: 1,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Soup },
          { name: RecipeTag.Survive },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  // Рассольник
  await prisma.recipe.create({
    data: {
      slug: 'rassolnik',
      name: 'Рассольник',
      imagePath: "/recipes/rassolnik.jpg",
      author: {
        connect: { email: 'vi@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.Water,
            ingredientType: IngredientType.PRODUCT,
            amount: 750,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.PearlBarley,
            ingredientType: IngredientType.PRODUCT,
            amount: 40,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Potato,
            ingredientType: IngredientType.PRODUCT,
            amount: 120,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Carrot,
            ingredientType: IngredientType.PRODUCT,
            amount: 60,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Onion,
            ingredientType: IngredientType.PRODUCT,
            amount: 50,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Pickles,
            ingredientType: IngredientType.PRODUCT,
            amount: 50,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.TomatoesPuree,
            ingredientType: IngredientType.PRODUCT,
            amount: 15,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.SunflowerOil,
            ingredientType: IngredientType.PRODUCT,
            amount: 15,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.CucumberPickle,
            ingredientType: IngredientType.PRODUCT,
            amount: 150,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Salt,
            ingredientType: IngredientType.PRODUCT,
            amount: 4,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.BlackPepper,
            ingredientType: IngredientType.PRODUCT,
            amount: 2,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.BayLeaf,
            ingredientType: IngredientType.PRODUCT,
            amount: 2,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Dill,
            ingredientType: IngredientType.PRODUCT,
            amount: 5,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Garlic,
            ingredientType: IngredientType.PRODUCT,
            amount: 2,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Soup },
          { name: RecipeTag.Survive },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  // Грибной Суп-крем
  await prisma.recipe.create({
    data: {
      slug: 'mushroom-cream-soup',
      name: 'Грибной Суп-крем',
      imagePath: "/recipes/mushroom-cream-soup.jpg",
      author: {
        connect: { email: 'colobrod@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.Onion,
            ingredientType: IngredientType.PRODUCT,
            amount: 412,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Carrot,
            ingredientType: IngredientType.PRODUCT,
            amount: 270,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Champignons,
            ingredientType: IngredientType.PRODUCT,
            amount: 940,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Potato,
            ingredientType: IngredientType.PRODUCT,
            amount: 560,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Garlic,
            ingredientType: IngredientType.PRODUCT,
            amount: 9,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Coriander,
            ingredientType: IngredientType.PRODUCT,
            amount: 2,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Zira,
            ingredientType: IngredientType.PRODUCT,
            amount: 2,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.SvanSalt,
            ingredientType: IngredientType.PRODUCT,
            amount: 1,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.SoySauce,
            ingredientType: IngredientType.PRODUCT,
            amount: 5,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Salt,
            ingredientType: IngredientType.PRODUCT,
            amount: 5,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.CoconutMilkArroyD,
            ingredientType: IngredientType.PRODUCT,
            amount: 1011,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Water,
            ingredientType: IngredientType.PRODUCT,
            amount: 1240,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Soup },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  // Тофу-скрэмбл
  await prisma.recipe.create({
    data: {
      slug: 'tofu-scrambled',
      name: 'Тофу-скрэмбл',
      imagePath: "/recipes/tofu-scrambled.jpg",
      author: {
        connect: { email: 'vi@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.Tofu,
            ingredientType: IngredientType.PRODUCT,
            amount: 140,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Parsley,
            ingredientType: IngredientType.PRODUCT,
            amount: 5,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.BellPepper,
            ingredientType: IngredientType.PRODUCT,
            amount: 20,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Tomato,
            ingredientType: IngredientType.PRODUCT,
            amount: 30,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Onion,
            ingredientType: IngredientType.PRODUCT,
            amount: 7,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Garlic,
            ingredientType: IngredientType.PRODUCT,
            amount: 3,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.CherryTomatoes,
            ingredientType: IngredientType.PRODUCT,
            amount: 15,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Cucumbers,
            ingredientType: IngredientType.PRODUCT,
            amount: 15,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Turmeric,
            ingredientType: IngredientType.PRODUCT,
            amount: 2.5,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.KalaNamak,
            ingredientType: IngredientType.PRODUCT,
            amount: 1,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.SoySauce,
            ingredientType: IngredientType.PRODUCT,
            amount: 10,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Breakfast },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  // Чечевичный
  await prisma.recipe.create({
    data: {
      slug: 'lentil-soup',
      name: 'Чечевичный суп',
      imagePath: "/recipes/lentil-soup.jpg",
      author: {
        connect: { email: 'colobrod@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.Onion,
            ingredientType: IngredientType.PRODUCT,
            amount: 660,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Carrot,
            ingredientType: IngredientType.PRODUCT,
            amount: 360,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.RedLentils,
            ingredientType: IngredientType.PRODUCT,
            amount: 1350,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Water,
            ingredientType: IngredientType.PRODUCT,
            amount: 5000,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.BayLeaf,
            ingredientType: IngredientType.PRODUCT,
            amount: 4,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Paprika,
            ingredientType: IngredientType.PRODUCT,
            amount: 8,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.HopsSuneli,
            ingredientType: IngredientType.PRODUCT,
            amount: 4,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.CayennePepper,
            ingredientType: IngredientType.PRODUCT,
            amount: 1,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Salt,
            ingredientType: IngredientType.PRODUCT,
            amount: 40,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Mint,
            ingredientType: IngredientType.PRODUCT,
            amount: 40,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Garlic,
            ingredientType: IngredientType.PRODUCT,
            amount: 7,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Soup },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  // Щи
  await prisma.recipe.create({
    data: {
      slug: 'schi',
      name: 'Щи',
      imagePath: "/recipes/schi.webp",
      author: {
        connect: { email: 'vi@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.Water,
            ingredientType: IngredientType.PRODUCT,
            amount: 900,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.WhiteCabbage,
            ingredientType: IngredientType.PRODUCT,
            amount: 150,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Carrot,
            ingredientType: IngredientType.PRODUCT,
            amount: 20,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Potato,
            ingredientType: IngredientType.PRODUCT,
            amount: 80,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Onion,
            ingredientType: IngredientType.PRODUCT,
            amount: 30,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.TomatoPaste,
            ingredientType: IngredientType.PRODUCT,
            amount: 15,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.BellPepper,
            ingredientType: IngredientType.PRODUCT,
            amount: 15,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.SoySchnitzel,
            ingredientType: IngredientType.PRODUCT,
            amount: 100,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Chickpeas,
            ingredientType: IngredientType.PRODUCT,
            amount: 20,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.BayLeaf,
            ingredientType: IngredientType.PRODUCT,
            amount: 2,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Salt,
            ingredientType: IngredientType.PRODUCT,
            amount: 7,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.BlackPepper,
            ingredientType: IngredientType.PRODUCT,
            amount: 2,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Parsley,
            ingredientType: IngredientType.PRODUCT,
            amount: 5,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.HopsSuneli,
            ingredientType: IngredientType.PRODUCT,
            amount: 5,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.SunflowerOil,
            ingredientType: IngredientType.PRODUCT,
            amount: 15,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Garlic,
            ingredientType: IngredientType.PRODUCT,
            amount: 2,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Soup },
          { name: RecipeTag.Survive },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  // Соус сладкая горчица
  await prisma.recipe.create({
    data: {
      slug: 'sweet-mustard-sauce',
      name: 'Соус сладкая горчица',
      uuid: RecipeUuid.SweetMustardSauce,
      imagePath: "/recipes/schi.jpg",
      author: {
        connect: { email: 'vi@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.Mayonnaise,
            ingredientType: IngredientType.PRODUCT,
            amount: 380,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Mustard,
            ingredientType: IngredientType.PRODUCT,
            amount: 90,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.GrapeSugar,
            ingredientType: IngredientType.PRODUCT,
            amount: 5,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.LemonJuice,
            ingredientType: IngredientType.PRODUCT,
            amount: 2,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Sauce },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  // Соус песто-россо
  await prisma.recipe.create({
    data: {
      slug: 'pesto-rosso-sauce',
      name: 'Соус песто-россо',
      uuid: RecipeUuid.PestoRossoSauce,
      imagePath: "/recipes/pesto-rosso-sauce.jpg",
      author: {
        connect: { email: 'colobrod@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.Garlic,
            ingredientType: IngredientType.PRODUCT,
            amount: 25,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.PineNuts,
            ingredientType: IngredientType.PRODUCT,
            amount: 25,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.RedBasil,
            ingredientType: IngredientType.PRODUCT,
            amount: 60,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.SunDriedTomatoes,
            ingredientType: IngredientType.PRODUCT,
            amount: 500,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.SunflowerOil,
            ingredientType: IngredientType.PRODUCT,
            amount: 150,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Sauce },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  // Соус кетчунез
  await prisma.recipe.create({
    data: {
      slug: 'ketchunez',
      name: 'Соус кетчунез',
      uuid: RecipeUuid.Ketchunez,
      imagePath: "/recipes/ketchunez.jpg",
      author: {
        connect: { email: 'colobrod@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.Ketchup,
            ingredientType: IngredientType.PRODUCT,
            amount: 50,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Mayonnaise,
            ingredientType: IngredientType.PRODUCT,
            amount: 50,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Sauce },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  // Тофу-сэндвич
  await prisma.recipe.create({
    data: {
      slug: 'tofu-sandwich',
      name: 'Тофу-сэндвич',
      imagePath: "/recipes/tofu-sandwich.jpg",
      author: {
        connect: { email: 'vi@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.ToastBread,
            ingredientType: IngredientType.PRODUCT,
            amount: 64,
            unit: Unit.G,
          },
          {
            ingredientUuid: RecipeUuid.SweetMustardSauce,
            ingredientType: IngredientType.RECIPE,
            amount: 45,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.SmokedTofu,
            ingredientType: IngredientType.PRODUCT,
            amount: 40,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.IcebergLettuce,
            ingredientType: IngredientType.PRODUCT,
            amount: 20,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Tomato,
            ingredientType: IngredientType.PRODUCT,
            amount: 40,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Pickles,
            ingredientType: IngredientType.PRODUCT,
            amount: 20,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Sandwich },
          { name: RecipeTag.FastFood },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  // Итальянский Сэндвич
  await prisma.recipe.create({
    data: {
      slug: 'italian-sandwich',
      name: 'Итальянский Сэндвич',
      imagePath: "/recipes/italian-sandwich.jpg",
      author: {
        connect: { email: 'colobrod@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.ToastBread,
            ingredientType: IngredientType.PRODUCT,
            amount: 64,
            unit: Unit.G,
          },
          {
            ingredientUuid: RecipeUuid.PestoRossoSauce,
            ingredientType: IngredientType.RECIPE,
            amount: 30,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.MozzarellaCheese,
            ingredientType: IngredientType.PRODUCT,
            amount: 20,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.IcebergLettuce,
            ingredientType: IngredientType.PRODUCT,
            amount: 20,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Tomato,
            ingredientType: IngredientType.PRODUCT,
            amount: 40,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Cucumbers,
            ingredientType: IngredientType.PRODUCT,
            amount: 20,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Sandwich },
          { name: RecipeTag.FastFood },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  // Шаурма
  await prisma.recipe.create({
    data: {
      slug: 'shawarma',
      name: 'Шаурма',
      imagePath: "/recipes/shawarma.jpg",
      author: {
        connect: { email: 'vi@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.Lavash,
            ingredientType: IngredientType.PRODUCT,
            amount: 80,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.SoySchnitzel,
            ingredientType: IngredientType.PRODUCT,
            amount: 100,
            unit: Unit.G,
          },
          {
            ingredientUuid: RecipeUuid.Ketchunez,
            ingredientType: IngredientType.RECIPE,
            amount: 35,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.ChineseCabbage,
            ingredientType: IngredientType.PRODUCT,
            amount: 30,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Tomato,
            ingredientType: IngredientType.PRODUCT,
            amount: 50,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Pickles,
            ingredientType: IngredientType.PRODUCT,
            amount: 20,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Rolls },
          { name: RecipeTag.FastFood },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  // Фалафель-ролл классический
  await prisma.recipe.create({
    data: {
      slug: 'falafel-roll-classic',
      name: 'Фалафель-ролл классический',
      imagePath: "/recipes/falafel-roll-classic.jpg",
      author: {
        connect: { email: 'colobrod@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.Lavash,
            ingredientType: IngredientType.PRODUCT,
            amount: 80,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Falafel,
            ingredientType: IngredientType.RECIPE,
            amount: 80,
            unit: Unit.G,
          },
          {
            ingredientUuid: RecipeUuid.SweetMustardSauce,
            ingredientType: IngredientType.PRODUCT,
            amount: 60,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.ChineseCabbage,
            ingredientType: IngredientType.PRODUCT,
            amount: 50,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Tomato,
            ingredientType: IngredientType.PRODUCT,
            amount: 40,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Pickles,
            ingredientType: IngredientType.PRODUCT,
            amount: 20,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Rolls },
          { name: RecipeTag.FastFood },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  // Фалафель-ролл итальянский
  await prisma.recipe.create({
    data: {
      slug: 'falafel-roll-italian',
      name: 'Фалафель-ролл итальянский',
      imagePath: "/recipes/falafel-roll-italian.jpg",
      author: {
        connect: { email: 'colobrod@cookbook.com' },
      },
      items: {
        create: [
          {
            ingredientUuid: ProductUuid.Lavash,
            ingredientType: IngredientType.PRODUCT,
            amount: 80,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Falafel,
            ingredientType: IngredientType.PRODUCT,
            amount: 80,
            unit: Unit.G,
          },
          {
            ingredientUuid: RecipeUuid.PestoRossoSauce,
            ingredientType: IngredientType.RECIPE,
            amount: 60,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.RedCabbage,
            ingredientType: IngredientType.PRODUCT,
            amount: 50,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.MozzarellaCheese,
            ingredientType: IngredientType.PRODUCT,
            amount: 40,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Tomato,
            ingredientType: IngredientType.PRODUCT,
            amount: 30,
            unit: Unit.G,
          },
          {
            ingredientUuid: ProductUuid.Cucumbers,
            ingredientType: IngredientType.PRODUCT,
            amount: 20,
            unit: Unit.G,
          },
        ]
      },
      tags: {
        connect: [
          { name: RecipeTag.Rolls },
          { name: RecipeTag.FastFood },
        ],
      },
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
}

