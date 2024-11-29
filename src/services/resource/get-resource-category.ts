import { fetcher } from "@/config/fetcher";
import { TypeResourceData } from "@/types";

export const getResourceCategory = async (resource: string) => {
  return await fetcher
    .get<TypeResourceData[]>(`/${resource}`)
    .then((res) => res.data);
};
