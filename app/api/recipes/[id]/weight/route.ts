import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
  params: { id: string }
};

export async function GET(request: Request, { params }: Params) {
  const id = parseInt(params.id);

  if (isNaN(id)) return NextResponse.json(
    { error: "Invalid recipe id" }, 
    { status: 400 }
  );

  const items = await prisma.recipeItem.aggregate({
    where: { recipeId: id },
    _sum: { amount: true },
  });

  const weight = items._sum.amount

  if (weight === null) return NextResponse.json(
    { error: `Recipe with id ${id} not found or has no items.`}, 
    { status: 404 }
  );

  return NextResponse.json({ weight }, { status: 200 });

  // const recipe = await prisma.recipe.findUnique({ 
  //   where: { id },
  //   include: {
  //     items: true,
  //   },
  // });
  //
  // if (recipe === null) return NextResponse.json(
  //   { error: `Recipe with id ${id} not found`}, 
  //   { status: 404 }
  // );
  // const weight = recipe.items.reduce((acc, item) => acc += item.amount, 0);
  // return NextResponse.json({ weight }, { status: 200 });
}
