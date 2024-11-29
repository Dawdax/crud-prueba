import { deleteResourse } from "@/services/resource/delete-resourse";
import { TypeResource } from "@/types";

interface DeleteCategoryProps {
  resource: TypeResource;
}

export default async function DeleteCategory({
  resource,
}: DeleteCategoryProps) {
  await deleteResourse(resource);
  return <p>Eliminar</p>;
}
