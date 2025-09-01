export type Uuid = string;
export type Weight = number;

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
