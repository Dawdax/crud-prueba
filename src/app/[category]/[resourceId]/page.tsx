import { getResourceById } from "@/services/resource/get-resourse-by-id";

interface Props {
  params: { resourceId: string; category: string };
}

export default async function CategoryPage({ params }: Props) {
  const id = (await params).resourceId;
  const category = (await params).category;
  console.log(id, category);

  const reources = await getResourceById(category, id);
  console.log(reources);

  return (
    <div>
      <p>hola</p>
    </div>
  );
}
