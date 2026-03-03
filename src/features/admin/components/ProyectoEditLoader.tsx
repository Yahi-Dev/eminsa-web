"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProyectoForm from "@/features/admin/components/ProyectoForm";
import type { ProyectoAPI } from "@/features/admin/types";

export default function ProyectoEditLoader() {
  const params = useParams();
  const router = useRouter();
  const [proyecto, setProyecto] = useState<ProyectoAPI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    fetch(`/api/proyectos/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setProyecto(data.proyecto);
        else router.push("/admin/proyectos");
      })
      .catch(() => router.push("/admin/proyectos"))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#0099ce] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!proyecto) return null;
  return <ProyectoForm proyecto={proyecto} isEditing />;
}
