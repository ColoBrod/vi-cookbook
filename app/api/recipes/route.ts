import { HttpStatus } from "@/lib/http-status";
import { ControllerInterface } from "@/types/route"
import { NextResponse } from "next/server";
import { Controller } from "@/types/route";
import { recipesService } from "@/lib/services/recipesService";
import { getUserId } from "@/lib/user";
import { CreateRecipeDto, recipeSchema } from "@/lib/validation/recipes";

@Controller()
class RecipesController implements ControllerInterface {
  public async GET(request: Request) {
    const recipes = await recipesService.getAll();
    return NextResponse.json(recipes, { status: HttpStatus.Ok });
  }

  public async POST(request: Request) {
    const userId = getUserId(request);
  
    let parsed: CreateRecipeDto;

    try { parsed = await request.json() }
    catch {
      return NextResponse.json(
        { error: 'Отсутствуют данные для создания рецепта' },
        { status: HttpStatus.BadRequest }
      );
    }

    const validation = recipeSchema.safeParse(parsed);
    if (validation.error) console.log(validation.error);
    if (validation.success === false) return NextResponse.json(
      { error: validation.error }, 
      { status: HttpStatus.BadRequest }
    );

    const { data } = validation;

    const created = await recipesService.create(data, userId);
    const recipe = await recipesService.getById(created.id);

    return NextResponse.json(recipe, { status: HttpStatus.Ok });
  }
}

export const { GET, POST } = new RecipesController();
