import prisma from '@/lib/prisma';

export default async function() {
  const products = await prisma.product.findMany();

  return (
    <pre>
      {JSON.stringify(products, null, 2)}
    </pre>

  );
}
