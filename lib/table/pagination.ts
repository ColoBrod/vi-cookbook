import { MyPagination } from "@/types/general";
import { GridPaginationModel } from "@mui/x-data-grid";

interface PrismaPagination {
  page: number;
  take: number;
}

export function myToGridPaginationModel(input: MyPagination): GridPaginationModel {
  return ({
    page: input.page - 1,
    pageSize: input.take,
  });
}

export function prismaToGridPaginationModel(input: PrismaPagination): GridPaginationModel {
  return ({
    page: input.page - 1,
    pageSize: input.take,
  });
}

export function gridToPrismaPaginationModel(input: GridPaginationModel): PrismaPagination {
  return ({
    page: input.page + 1,
    take: input.pageSize,
  });
}
