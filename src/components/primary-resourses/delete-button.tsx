"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { deleteResource } from "@/services/resource/delete-resource";

export default function DeleteButton({ category, id }: any) {
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    setLoading(true);
    await deleteResource(category, id);
  };

  return (
    <Button disabled={loading} onClick={handleOnClick} variant="ghost">
      {loading ? <Loader2Icon className="animate-spin" /> : <Trash2Icon />}
      Eliminar
    </Button>
  );
}
