"use client";

import { useContent } from "@/context/content-context";
import RecursoForm from "@/components/admin/RecursoForm";
import Link from "next/link";
import React from "react";

export default function EditRecursoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { obtenerRecurso } = useContent();
  const recurso = obtenerRecurso(id);

  if (!recurso) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Recurso no encontrado</p>
          <Link href="/admin/recursos" className="text-[#001689] hover:underline font-medium">
            Volver a Recursos
          </Link>
        </div>
      </div>
    );
  }

  return <RecursoForm recurso={recurso} isEditing />;
}
