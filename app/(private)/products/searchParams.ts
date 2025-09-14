import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';
import { parseAsString as clientParseAsString } from 'nuqs';
import { useQueryStates } from 'nuqs';

export const searchParamsSchema = {
  page: parseAsInteger.withDefault(1),
  take: parseAsInteger.withDefault(10),
  orderBy: parseAsString,
};

export const loadSearchParams = createLoader(searchParamsSchema);

// export const useProductsSearchParams = () => useQueryStates(searchParamsSchema);

// export const 

// export const { useQueryState } = createParser(searchParamsSchema);
