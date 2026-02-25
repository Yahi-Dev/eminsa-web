"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NoticiaForm from "@/components/admin/NoticiaForm";
import type { NoticiaAPI } from "@/features/admin/types";

export default function EditarNoticiaPage() {
  const params = useParams();
  const router = useRouter();
  const [noticia, setNoticia] = useState<NoticiaAPI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    fetch(`/api/noticias/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setNoticia(data.noticia);
        else router.push("/admin/noticias");
      })
      .catch(() => router.push("/admin/noticias"))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#001689] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!noticia) return null;
  return <NoticiaForm noticia={noticia} isEditing />;
}
