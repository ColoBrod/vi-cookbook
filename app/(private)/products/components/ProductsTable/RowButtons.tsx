
import { Stack, Button } from "@mui/material";
import { Product } from "@/app/generated/prisma";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useRouter } from "next/navigation";
import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useConfirm } from "@/app/providers/ConfirmProvider";

interface RowProps {
  product: Product;
}

export default function RowButtons({ product }: RowProps) {
  const router = useRouter();
  const makeRequest = useHttpRequest();
  const confirm = useConfirm();

  return (
    <Stack 
      direction='row' 
      spacing={1} 
      alignItems='center'
      height='100%'
    >
      <Button color="primary" variant="outlined" onClick={handleEdit}>
        <EditIcon fontSize="small" />
      </Button>
      <Button color="error" variant="outlined" onClick={handleDelete}>
        <DeleteIcon fontSize="small" />
      </Button>
    </Stack>
  );

  function handleEdit() {
    router.push(`/products/edit/${product.slug}`);
  }

  async function handleDelete() {
    const ok = await confirm({
      title: `Удаление продукта`,
      description: `Ты действительно хочешь удалить продукт "${product.name}"?`,
    });
    if (ok === false) return;

    makeRequest({
      url: `/api/products/${product.id}`,
      config: { method: 'delete' },
      notification: {
        success: 'Продукт удален',
      },
      callback: {
        onTry() {
          router.refresh();
        },
      },
    });

  }

}
