import { Unit } from "@/app/generated/prisma";

export const unitMap = new Map<Unit, string>([
  [Unit.G, 'г'],
  [Unit.ML, 'мл'],
  [Unit.TSP, 'ч.л.'],
  [Unit.TBSP, 'ст.л.'],
  [Unit.PCS, 'шт'],
]);
