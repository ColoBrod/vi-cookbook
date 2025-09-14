export type Uuid = string;
export type Weight = number;

export interface Minerals {
  Na: number,
  K: number,
  Ca: number,
  Fe: number,
  Mg: number,
  Zn: number,
  P: number,
  Se: number,
}

export interface Vitamins {
  A: number;
  C: number;
  D: number;
  E: number;
  K: number;
  B1: number;
  B2: number;
  B3: number;
  B6: number;
  B9: number;
  B12: number;
}

/**
 * @prop pages Общее количество страниц
 * @prop total Общее количество элементов на странице
 */
export interface MyPagination {
  page: number;
  pages: number;
  total: number;
  skip: number;
  take: number;
}
