"use server";

import { fetcher } from "@/config/fetcher";
import { TypeResourceData } from "@/types";
import { revalidatePath } from "next/cache";

export const deleteResource = async (category: string, id: string) => {
  try {
    const response = await fetcher.delete<TypeResourceData[]>(
      `/${category}/${id}`
    );
    revalidatePath("/");
    return response.data;
  } catch (error) {
    console.log("Error creating resource:", error);
    throw error;
  }
};
