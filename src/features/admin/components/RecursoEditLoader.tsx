"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RecursoForm from "@/features/admin/components/RecursoForm";
import type { RecursoAPI } from "@/features/admin/types";

export default function RecursoEditLoader() {
  const params = useParams();
  const router = useRouter();
  const [recurso, setRecurso] = useState<RecursoAPI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    fetch(`/api/recursos/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setRecurso(data.recurso);
        else router.push("/admin/recursos");
      })
      .catch(() => router.push("/admin/recursos"))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#001689] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!recurso) return null;
  return <RecursoForm recurso={recurso} isEditing />;
}
