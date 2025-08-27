import { getRecipeById } from '@/model/recipe';

export type RecipeJoined = NonNullable<Awaited<ReturnType<typeof getRecipeById>>>;
