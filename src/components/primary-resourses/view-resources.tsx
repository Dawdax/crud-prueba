import { getResource } from "@/services/resource/get-resourse";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CreateResourceForm } from "./create-resources";
import { Button } from "../ui/button";
import { EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

const headerItems = [{ header: "Categoría" }, { header: "Acción" }];
export default async function ViewResources() {
  const resources = await getResource();

  return (
    <div className="shadow-lg border p-5 w-full max-w-lg">
      <header className="mb-10 border-b-0 flex justify-between gap-4 items-center m-auto">
        <p className="text-2xl font-bold ">Recursos</p>
        <CreateResourceForm />
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
          {resources.map((resource) => (
            <TableRow key={resource}>
              <TableCell>{resource}</TableCell>

              <TableCell className="flex justify-end gap-2">
                <Button asChild variant="ghost">
                  <Link href={`/${resource}`}>
                    <EyeIcon />
                    Detalles
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href={`/${resource}/edit`}>
                    <PencilIcon />
                    Editar
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
