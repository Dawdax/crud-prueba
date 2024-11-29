"use server";

import { fetcher } from "@/config/fetcher";
import { TypeResourceData } from "@/types";
import { revalidatePath } from "next/cache";
import { ResourceFormValues } from "@/components/primary-resourses/create-resources";

export const postResource = async ({
  category,
  ...body
}: ResourceFormValues) => {
  try {
    const response = await fetcher.post<TypeResourceData[]>(
      `/${category}`,
      body
    );

    revalidatePath("/");
    return response.data;
  } catch (error) {
    console.log("Error creating resource:", error);
    throw error;
  }
};
