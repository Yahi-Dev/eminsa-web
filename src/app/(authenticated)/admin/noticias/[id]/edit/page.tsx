"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useContent } from "@/context/content-context";
import NoticiaForm from "@/components/admin/NoticiaForm";
import { Noticia } from "@/data/content";

export default function EditarNoticiaPage() {
  const params = useParams();
  const router = useRouter();
  const { obtenerNoticia } = useContent();
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const found = obtenerNoticia(id);
    
    if (found) {
      setNoticia(found);
    } else {
      router.push("/admin/noticias");
    }
    setLoading(false);
  }, [params.id, obtenerNoticia, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#001689] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!noticia) {
    return null;
  }

  return <NoticiaForm noticia={noticia} isEditing />;
}
