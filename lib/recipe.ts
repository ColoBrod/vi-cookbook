import fs from "fs";
import path from "path";

export function getRecipeImagePath(slug: string): string {
  const fullPath = path.join(process.cwd(), "public", "recipes", `${slug}.jpg`);
  const imageExists = fs.existsSync(fullPath);
  return imageExists ? `/recipes/${slug}.jpg` : `/recipes/default.jpg`;
}
