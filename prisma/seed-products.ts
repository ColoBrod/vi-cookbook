import prisma from "@/lib/prisma";

export enum ProductUuid {
  // Вода
  Water = '15948eb2-1f06-4b4e-9e2d-e001a750b9ab',

  // Соусы
  Mayonnaise = '2281a917-6929-4e02-8b5e-00f498f438e0',
  Ketchup = '5679e8f3-8393-41fb-8f78-05d454d35fbf',
  Sriracha = '77503719-8d97-4332-90cb-5b4230823885',
  Mustard = '2fb65849-b71c-47a8-947d-3fc387827238',

  // Сыры, мазики
  MozzarellaCheese = 'fa6b4e53-8480-44bd-9c2f-030de0bc795d',
  PizzaCheese = 'a6619b51-35a3-43fb-bbbd-c8c86fe2759b',

  // Молоко
  OatMilk = '3f0600f1-58dd-4109-9ebd-755998d92d88',
  CoconutMilkArroyD = '5146f3cc-8c90-493c-9056-7ba381300860',

  // Консервы
  Pickles = 'bd83a6ed-a01f-460c-90ec-2035c5ede528',
  CannedCorn = '0c3cd302-3444-4b6b-8f41-b7aaff27ec7f',
  SunDriedTomatoes = 'd3076bc9-1736-4733-a5b2-98b6e3035f6d',
  TomatoPaste = '982221df-51eb-41fd-916f-20b9d2b0b45d',
  CannedRedBeans = '99172469-106d-4801-b125-16009f05b0bf',
  CannedWhiteBeans = 'cbb00d14-7fa2-4dd6-8f4b-b3bd934a8954',
  TomatoesPuree = '714d12ff-0a14-43b5-82e3-235632fcb5e0',
  CucumberPickle = '512532e9-80bb-4468-974f-e28312334e54',

  // Бакалея
  Lavash = '77f082ab-e3b6-4f1b-a950-d03a00f7f3fe',
  Pita = '79c1b8f8-07d9-46e3-a869-b2933e988863',
  Buns = '0d401408-011e-45dc-8632-ce86f72ec473',
  ToastBread = '4771efab-5420-4131-8e27-41906ef64c3f',
  SunflowerOil = '135f391a-b475-4ab9-9171-2a7c96434110',
  RiceVinegar = '313bf93a-7540-4e18-aac9-e791c1bf67b8',
  AppleVinegar = '75d6cfc6-204c-409c-9cd8-39e0cad75a14',
  WineVinegar = 'b9d176a8-01f2-41d9-9c52-91d15380284a',
  SoySauce = 'ab1f6884-3b18-40fe-89f5-30285527bc0b',
  PearlBarley = '4297a1ab-6074-454e-a702-c3981c1f638b',

  // Овощи
  WhiteCabbage = 'f789f2ea-3536-440c-971d-c38560196fbe',
  Potato = '77bae138-e0c4-433a-a23c-e354168536c2',
  ChineseCabbage = '5541ee39-a6ad-46be-aedf-7b9050e12ec9',
  RedCabbage = 'acc9a470-c8ff-4792-8c13-c7fc3a736424',
  Garlic = 'ce1f63d9-98d8-43db-b07c-b28b165ae1c9',
  Beet = '4e2638b1-1a0c-4029-ac03-08dec3b278e8',
  Carrot = 'c2fdd572-0352-4231-9024-803bde5cdb2d',
  Tomato = 'c0d4af07-e3c9-4f3c-9f51-6a1f437e2e4c',
  BellPepper = '7436d6ed-d7d5-4ce4-ac1e-adbf65fea13a',
  Onion = 'f110c0ff-c2d2-42c1-a389-313b23f652f2',
  CherryTomatoes = '8b2a459a-e55b-4369-a116-05325f92929f',
  Cucumbers = 'bb541fa7-9f39-48ed-ac7d-d3465c7f9900',
  RedOnion = '83a1e620-3f67-43dc-88bc-0409cc40bc1d',
  IcebergLettuce = '680ef836-0b8d-48b7-a1bd-520d29c84f3f',

  // Зелень
  Parsley = 'aa741021-dd1f-4725-830b-1c5d492f7620',
  RedBasil = 'c2b19be1-7fff-48c7-a61a-3a7eb83feb79',
  Mint = 'f5082b56-a08b-417b-89cf-09702bbdf80e',
  Dill = 'df759fa7-ff82-42c6-b93d-213d3078e0e9',
  Coriander = 'ac036e5c-08cd-4a84-995c-89a1deb88e52',

  // Грибы
  Champignons = 'bb8fde08-70a1-4124-8d35-cd3b7e1fcd0e',

  // Фрукты
  Peach = '024e87c9-9a45-49ab-9255-010bf3a8c7b4',

  // Белок
  Tofu = '82cee239-1b5d-4ad8-8f2c-cf9506225540',
  SmokedTofu = 'c678bcfe-0712-47c7-ae77-db43f6c32719',
  Falafel = '7a6926d0-d93c-48a2-b78f-c18e40f7e88a',
  SoySchnitzel = '7c689de9-9b09-4312-acd5-eb2f14715d80',
  Chickpeas = 'ba8a2eee-54fa-4051-b1ef-3f762b43fad5',
  RedLentils = '682a9f3c-95b8-4975-9d48-4f9c8c78a8c4',

  // Орехи
  PineNuts = 'ac08896a-f066-46c5-905b-633c3002bd64',

  // Специи
  Salt = '014cf200-be84-4a03-9c03-5947670fb3df',
  BlackPepper = '0c7caab5-310b-4429-a2b6-5dd9262290f1',
  Turmeric = '757c10f6-669a-4416-a364-7a80a7712488',
  Nutmeg = 'a8e1cc50-dc6b-4cfe-80d5-1f3a3305391d',
  CayennePepper = '1e89cf9d-70aa-4035-a38f-c949f9bfbadf',
  LemonJuice = 'e150a00f-0d5b-42ad-9ec8-2bb8a38e0d2a',
  JerusalemArtichokeSyrup = '59db5be9-6cdf-4776-853f-1c0d7de320fc',
  GrapeSugar = '2c1a0322-2e70-4b90-9067-3386e79b4903',
  BayLeaf = '946daa0c-b507-4d15-841f-f3e15aa8364b',
  HopsSuneli = 'c3b00b8c-9613-4466-8b60-56f0e9bc2d06',
  Paprika = '7a3e113e-944c-410c-abfb-2ab608a1b68a',
  CorianderGround = 'e704d12e-860d-4068-86dd-5c508b840a0b',
  Zira = '8fba489b-26f6-4937-999c-1cca2b701306',
  SvanSalt = 'f91b2a12-bb45-4446-aa35-c06aa85f93a6',
  KalaNamak = '0b7834be-add9-4890-aa3e-33f3d0f76c00',
}

export async function createProducts() {
  await prisma.product.createMany({
    data: [
      /**
       * Консервы
       */
      /**
       * Хлебное
       */
      {
        uuid: ProductUuid.Lavash,
        slug: "lavash",
        name: "Лаваш",
        calories: 247,
        protein: 8.5,
        fat: 1.1,
        carbs: 52
      },
      {
        uuid: ProductUuid.Pita,
        slug: "pita",
        name: "Пита",
        calories: 258,
        protein: 8.3,
        fat: 1.0,
        carbs: 52.8
      },
      {
        uuid: ProductUuid.Buns,
        slug: "buns",
        name: "Булочки с кунжутом",
        calories: 284,
        protein: 9.0,
        fat: 4.2,
        carbs: 52.5
      },
      /**
       * Овощи
       */
      {
        uuid: ProductUuid.ChineseCabbage,
        slug: "chinese-cabbage",
        name: "Пекинская капуста",
        calories: 14,
        protein: 1.3,
        fat: 0.2,
        carbs: 2.3
      },
      {
        uuid: ProductUuid.RedCabbage,
        slug: "red-cabbage",
        name: "Краснокочанная капуста",
        calories: 31,
        protein: 1.4,
        fat: 0.16,
        carbs: 7.4
      },
      {
        // id: 1,
        // "uuid": "54be23ad-555a-4542-bb31-3b2e0e4c3387",
        uuid: ProductUuid.Carrot,
        slug: "carrot",
        name: "Морковь",
        calories: 41,
        protein: 0.9,
        fat: 0.24,
        carbs: 9.6
      },
      {
        // id: 2,
        // uuid: "9360a3d4-5d9e-4a07-9589-d393757ea261",
        uuid: ProductUuid.Garlic,
        slug: "garlic",
        name: "Чеснок",
        calories: 149,
        protein: 6.5,
        fat: 0.5,
        carbs: 33
      },
      {
        // id: 3,
        // uuid: "f42fd488-8012-4d64-a2a5-4554b8728b3b",
        uuid: ProductUuid.Beet,
        slug: "beet",
        name: "Свекла",
        calories: 46,
        protein: 1.7,
        fat: 0.15,
        carbs: 46
      },
      {
        // id: 5,
        // uuid: "5fa40bee-97d8-42eb-943f-e3a02230815b",
        uuid: ProductUuid.Tomato,
        slug: "tomato",
        name: "Томаты",
        calories: 18,
        protein: 0.88,
        fat: 0.2,
        carbs: 3.89
      },
      {
        // id: 6,
        // uuid: "4b972cdb-6958-4850-9676-90cec00830fe",
        uuid: ProductUuid.Parsley,
        slug: "parsley",
        name: "Петрушка",
        calories: 49,
        protein: 3.7,
        fat: 0.4,
        carbs: 3.6
      },
      {
        // id: 7,
        // uuid: "ff9d6f2e-4a7e-47d5-804f-5fcf9ff7f9c5",
        uuid: ProductUuid.BellPepper,
        slug: "bell_pepper",
        name: "Болгарский перец",
        calories: 25,
        protein: 1,
        fat: 0.3,
        carbs: 5.25
      },
      {
        // id: 8,
        // uuid: "6219d814-ad84-4609-aaf9-c02b8a0ebdf6",
        uuid: ProductUuid.Onion,
        slug: "onion",
        name: "Лук репчатый",
        calories: 41,
        protein: 1.4,
        fat: 0.2,
        carbs: 8.2
      },
      {
        // id: 10,
        // uuid: "0fcf384e-6849-435e-95e0-82f5d78f4557",
        uuid: ProductUuid.CherryTomatoes,
        slug: "cherry_tomatoes",
        name: "Помидоры черри",
        calories: 21.5,
        protein: 0.8,
        fat: 0.15,
        carbs: 3.3
      },
      {
        // id: 11,
        // uuid: "36d2f437-62db-44fb-a7f8-7863b54f57ff",
        uuid: ProductUuid.Cucumbers,
        slug: "cucumbers",
        name: "Огурцы",
        calories: 15,
        protein: 0.65,
        fat: 0.11,
        carbs: 3.63
      },
      /**
       * Фрукты
       */
      {
        // id: 12,
        // uuid: "b9a43257-c6ad-4cac-bccb-c814840651a3",
        uuid: ProductUuid.Peach,
        slug: "peach",
        name: "Персик",
        calories: 46,
        protein: 0.9,
        fat: 0.1,
        carbs: 113
      },
      /**
        * Белок
        */
      {
        uuid: ProductUuid.Tofu,
        slug: "tofu",
        name: "Тофу",
        calories: 85,
        protein: 12.5,
        fat: 7,
        carbs: 2
      },
      {
        uuid: ProductUuid.SmokedTofu,
        slug: "smoked-tofu",
        name: "Копченый Тофу",
        calories: 85,
        protein: 12.5,
        fat: 7,
        carbs: 2
      },
      { uuid: ProductUuid.Water, slug: "water", name: "Вода", calories: 0, protein: 0, fat: 0, carbs: 0 },
      { uuid: ProductUuid.Mayonnaise, slug: "mayonnaise", name: "Майонез", calories: 629, protein: 1, fat: 74.9, carbs: 0.6 },
      { uuid: ProductUuid.Ketchup, slug: "ketchup", name: "Кетчуп", calories: 93, protein: 1, fat: 0.1, carbs: 27.4 },
      { uuid: ProductUuid.Sriracha, slug: "sriracha", name: "Срирача", calories: 278, protein: 8.9, fat: 12.6, carbs: 52.8 },
      { uuid: ProductUuid.MozzarellaCheese, slug: "mozzarella-cheese", name: "Моцарелла", calories: 242, protein: 18.8, fat: 18.1, carbs: 2.2 },
      { uuid: ProductUuid.PizzaCheese, slug: "pizza-cheese", name: "Сыр для пиццы", calories: 312, protein: 12.2, fat: 14.3, carbs: 30.8 },
      { uuid: ProductUuid.Pickles, slug: "pickles", name: "Соленые огурцы", calories: 12, protein: 0.8, fat: 0.1, carbs: 2.3 },
      { uuid: ProductUuid.CannedCorn, slug: "canned-corn", name: "Консервированная кукуруза", calories: 86, protein: 3.3, fat: 1.2, carbs: 19 },
      { uuid: ProductUuid.SunDriedTomatoes, slug: "sun-dried-tomatoes", name: "Вяленые томаты", calories: 258, protein: 14, fat: 2.9, carbs: 55 },
      { uuid: ProductUuid.TomatoPaste, slug: "tomato-paste", name: "Томатная паста", calories: 82, protein: 4.3, fat: 0.5, carbs: 18.9 },
      { uuid: ProductUuid.CannedRedBeans, slug: "canned-red-beans", name: "Красная фасоль консервированная", calories: 127, protein: 8.7, fat: 0.5, carbs: 22.8 },
      { uuid: ProductUuid.CannedWhiteBeans, slug: "canned-white-beans", name: "Белая фасоль консервированная", calories: 114, protein: 7.5, fat: 0.5, carbs: 20.2 },
      { uuid: ProductUuid.TomatoesPuree, slug: "tomatoes-puree", name: "Томатное пюре", calories: 32, protein: 1.6, fat: 0.2, carbs: 7 },
      { uuid: ProductUuid.CucumberPickle, slug: "cucumber-pickle", name: "Соленый огурец", calories: 12, protein: 0.8, fat: 0.1, carbs: 2.3 },
      { uuid: ProductUuid.ToastBread, slug: "toast-bread", name: "Тостовый хлеб", calories: 265, protein: 9, fat: 3.2, carbs: 49 },
      { uuid: ProductUuid.SunflowerOil, slug: "sunflower-oil", name: "Подсолнечное масло", calories: 884, protein: 0, fat: 100, carbs: 0 },
      { uuid: ProductUuid.RiceVinegar, slug: "rice-vinegar", name: "Рисовый уксус", calories: 20, protein: 0, fat: 0, carbs: 5 },
      { uuid: ProductUuid.AppleVinegar, slug: "apple-vinegar", name: "Яблочный уксус", calories: 21, protein: 0, fat: 0, carbs: 0.9 },
      { uuid: ProductUuid.WineVinegar, slug: "wine-vinegar", name: "Винный уксус", calories: 18, protein: 0, fat: 0, carbs: 0.5 },
      { uuid: ProductUuid.SoySauce, slug: "soy-sauce", name: "Соевый соус", calories: 53, protein: 8, fat: 0, carbs: 4.9 },
      { uuid: ProductUuid.PearlBarley, slug: "pearl-barley", name: "Перловка", calories: 352, protein: 12.5, fat: 2.3, carbs: 73.5 },
      { uuid: ProductUuid.WhiteCabbage, slug: "white-cabbage", name: "Белокочанная капуста", calories: 27, protein: 1.3, fat: 0.1, carbs: 6.2 },
      { uuid: ProductUuid.Potato, slug: "potato", name: "Картофель", calories: 77, protein: 2, fat: 0.1, carbs: 17 },
      { uuid: ProductUuid.RedOnion, slug: "red-onion", name: "Красный лук", calories: 40, protein: 1.1, fat: 0.1, carbs: 9.3 },
      { uuid: ProductUuid.IcebergLettuce, slug: "iceberg-lettuce", name: "Салат айсберг", calories: 14, protein: 0.9, fat: 0.1, carbs: 2.9 },
      { uuid: ProductUuid.RedBasil, slug: "red-basil", name: "Красный базилик", calories: 23, protein: 3.2, fat: 0.6, carbs: 2.7 },
      { uuid: ProductUuid.Mint, slug: "mint", name: "Мята", calories: 44, protein: 3.8, fat: 0.7, carbs: 8.4 },
      { uuid: ProductUuid.Dill, slug: "dill", name: "Укроп", calories: 43, protein: 3.5, fat: 1.1, carbs: 7 },
      { uuid: ProductUuid.Coriander, slug: "coriander", name: "Кинза", calories: 23, protein: 2.1, fat: 0.5, carbs: 3.7 },
      { uuid: ProductUuid.Champignons, slug: "champignons", name: "Шампиньоны", calories: 22, protein: 3.1, fat: 0.3, carbs: 3.3 },
      { uuid: ProductUuid.Falafel, slug: "falafel", name: "Фалафель", calories: 333, protein: 13, fat: 17, carbs: 31 },
      { uuid: ProductUuid.SoySchnitzel, slug: "soy-schnitzel", name: "Соевый шницель", calories: 195, protein: 21, fat: 9, carbs: 7 },
      { uuid: ProductUuid.Chickpeas, slug: "chickpeas", name: "Нут", calories: 164, protein: 8.9, fat: 2.6, carbs: 27.4 },
      { uuid: ProductUuid.RedLentils, slug: "red-lentils", name: "Красная чечевица", calories: 116, protein: 9, fat: 0.4, carbs: 20 },
      { uuid: ProductUuid.PineNuts, slug: "pine-nuts", name: "Кедровые орехи", calories: 673, protein: 13.7, fat: 68.4, carbs: 13.1 },
      { uuid: ProductUuid.Salt, slug: "salt", name: "Соль", calories: 0, protein: 0, fat: 0, carbs: 0 },
      { uuid: ProductUuid.BlackPepper, slug: "black-pepper", name: "Черный перец", calories: 251, protein: 10.4, fat: 3.3, carbs: 64 },
      { uuid: ProductUuid.Turmeric, slug: "turmeric", name: "Куркума", calories: 312, protein: 9.7, fat: 3.3, carbs: 67 },
      { uuid: ProductUuid.Nutmeg, slug: "nutmeg", name: "Мускатный орех", calories: 525, protein: 5.8, fat: 36.3, carbs: 49 },
      { uuid: ProductUuid.CayennePepper, slug: "cayenne-pepper", name: "Красный перец кайенский", calories: 318, protein: 12, fat: 17, carbs: 56 },
      { uuid: ProductUuid.LemonJuice, slug: "lemon-juice", name: "Лимонный сок", calories: 22, protein: 0.4, fat: 0.2, carbs: 6.9 },
      { uuid: ProductUuid.JerusalemArtichokeSyrup, slug: "jerusalem-artichoke-syrup", name: "Сироп топинамбура", calories: 273, protein: 0, fat: 0, carbs: 68 },
      { uuid: ProductUuid.GrapeSugar, slug: "grape-sugar", name: "Виноградный сахар", calories: 400, protein: 0, fat: 0, carbs: 100 },
      { uuid: ProductUuid.BayLeaf, slug: "bay-leaf", name: "Лавровый лист", calories: 313, protein: 7.6, fat: 7.9, carbs: 75 },
      { uuid: ProductUuid.HopsSuneli, slug: "hops-suneli", name: "Хмели-сунели", calories: 314, protein: 13.8, fat: 15.1, carbs: 43 },
      { uuid: ProductUuid.Paprika, slug: "paprika", name: "Паприка", calories: 282, protein: 14, fat: 12, carbs: 54 },
      { uuid: ProductUuid.CorianderGround, slug: "coriander-ground", name: "Кориандр молотый", calories: 298, protein: 12.4, fat: 14.4, carbs: 55 },
      { uuid: ProductUuid.Zira, slug: "zira", name: "Зира", calories: 375, protein: 17.8, fat: 22.3, carbs: 44 },
      { uuid: ProductUuid.SvanSalt, slug: "svan-salt", name: "Сванская соль", calories: 0, protein: 0, fat: 0, carbs: 0 },
      { uuid: ProductUuid.KalaNamak, slug: "kala-namak", name: "Кала намак", calories: 0, protein: 0, fat: 0, carbs: 0 },
      { uuid: ProductUuid.Mustard, slug: "mustard", name: "Горчица", calories: 60, protein: 3.7, fat: 3.3, carbs: 5.8 },
    ]
  });
}
