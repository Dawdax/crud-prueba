import { fetcher } from "@/config/fetcher";
import { TypeResourceData } from "@/types";

export const getResourceById = async (category: string, id: string) => {
  return await fetcher
    .get<TypeResourceData[]>(`/${category}/${id}`)
    .then((res) => res.data);
};
