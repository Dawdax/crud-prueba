"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { postResource } from "@/services/resource/post-resourse";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FormContext } from "../form/form-context";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PlusCircleIcon } from "lucide-react";

// Definir el esquema de validación con Zod para todos los campos
const ResourceSchema = z.object({
  category: z.string().min(1, "La categoría es obligatorio"),
  name: z.string().min(1, "El nombre es obligatorio"),
  age: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "La edad es obligatorio")
  ),
  colour: z.string().min(1, "El color es obligatorio"),
});

export type ResourceFormValues = z.infer<typeof ResourceSchema>;

const customerFormResolver = zodResolver(ResourceSchema);

const AllInputLabel = [
  {
    name: "category",
    label: "Categoría",
    placeholder: "Ingrese la categoría...",
  },
  {
    name: "name",
    label: "Nombre",
    placeholder: "Ingrese el nombre...",
  },
  {
    name: "age",
    label: "Edad",
    placeholder: "Ingrese la edad...",
  },
  {
    name: "colour",
    label: "Color",
    placeholder: "Ingrese el color...",
  },
] as const;

export const CreateResourceForm = () => {
  const [openModal, setOpenModal] = useState(false);

  const form = useForm<ResourceFormValues>({
    resolver: customerFormResolver,
    defaultValues: {
      category: "",
      name: "",
      age: 0,
      colour: "",
    },
  });

  const onSubmit = async (values: ResourceFormValues) => {
    try {
      await postResource(values);
      setOpenModal(false);
      form.reset();
      toast.success("Recurso creado correctamente");

      form.reset();
    } catch (error) {
      toast.error("El recurso no se pudo crear");
      console.log("No se pudo crear el recurso", error);
    }
  };
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircleIcon /> Nuevo recurso
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar de recurso</DialogTitle>
          <DialogDescription>
            Ingresa los datos del recurso. Haz click en Guardar cuando termines.
          </DialogDescription>
        </DialogHeader>
        <FormContext
          form={form}
          onSubmit={onSubmit}
          className="grid gap-2 md:grid-cols-2 grid-cols-1"
        >
          {AllInputLabel.map((item) => (
            <FormField
              key={item.name}
              name={item.name}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> {item.label} </FormLabel>
                  <FormControl>
                    <Input placeholder={item.placeholder} {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <DialogFooter className="col-span-full">
            <Button className="w-full" variant="default">
              Guardar recurso
            </Button>
          </DialogFooter>
        </FormContext>
      </DialogContent>
    </Dialog>
  );
};
