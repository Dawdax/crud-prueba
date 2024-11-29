import { fetcher } from "@/config/fetcher";
import { TypeResource } from "@/types";

export const getResource = async () => {
  return await fetcher.get<TypeResource[]>(`/`).then((res) => res.data);
};
