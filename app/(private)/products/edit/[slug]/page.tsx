import ProductForm from "../../components/ProductForm.tsx";
import { getProductBySlugOrUuid } from "@/model/products";
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function({ params }: PageProps) {
  const slug = (await params).slug;
  const product = await getProductBySlugOrUuid(slug);

  if (product === null) notFound();

  return (
    <ProductForm product={product} />
  );
}
