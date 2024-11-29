import { getResourceCategory } from "@/services/resource/get-resource-category";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import DeleteButton from "@/components/primary-resourses/delete-button";

interface Props {
  params: { category: string };
}
const headerItems = [{ header: "Categoría" }, { header: "Acción" }];

export default async function ResourcePage({ params }: Props) {
  const category = (await params).category;

  const reources = await getResourceCategory(category);

  console.log(reources);

  return (
    <div className="shadow-lg border p-5 w-full max-w-lg">
      <header className="mb-10 border-b-0 flex justify-between gap-4 items-center m-auto">
        <h1 className="text-2xl font-bold "> Categoria: {category} </h1>
      </header>

      <Table>
        <TableCaption>Lista de recursos</TableCaption>
        <TableHeader>
          <TableRow>
            {headerItems.map((item) => (
              <TableHead
                key={item.header}
                className="last-of-type:text-right last-of-type:pr-20"
              >
                {item.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {reources.map((resource) => (
            <TableRow key={resource._id}>
              <TableCell>{resource.name}</TableCell>
              <TableCell>{resource.age}</TableCell>
              <TableCell>{resource.colour}</TableCell>

              <TableCell className="flex justify-end gap-2">
                <Button asChild variant="ghost">
                  <Link href={`/${category}/${resource._id}`}>
                    <PencilIcon />
                    Editar
                  </Link>
                </Button>
                <DeleteButton category={category} id={resource._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
