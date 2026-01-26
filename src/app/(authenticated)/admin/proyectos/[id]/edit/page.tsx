"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useContent } from "@/context/content-context";
import ProyectoForm from "@/components/admin/ProyectoForm";
import { Proyecto } from "@/data/content";

export default function EditarProyectoPage() {
  const params = useParams();
  const router = useRouter();
  const { obtenerProyecto } = useContent();
  const [proyecto, setProyecto] = useState<Proyecto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const found = obtenerProyecto(id);
    
    if (found) {
      setProyecto(found);
    } else {
      router.push("/admin/proyectos");
    }
    setLoading(false);
  }, [params.id, obtenerProyecto, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#00A3E0] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!proyecto) {
    return null;
  }

  return <ProyectoForm proyecto={proyecto} isEditing />;
}
