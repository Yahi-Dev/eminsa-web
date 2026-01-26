"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Newspaper, 
  FolderKanban, 
  LogOut, 
  User,
  Plus,
  Edit,
  Eye,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useContent } from "@/context/content-context";

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { noticias, proyectos } = useContent();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#001689] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const noticiasPublicadas = noticias.filter(n => n.publicado).length;
  const proyectosPublicados = proyectos.filter(p => p.publicado).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#001689] rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 50 50" className="w-6 h-6 text-white">
                    <circle cx="25" cy="25" r="4" fill="currentColor"/>
                    <circle cx="25" cy="25" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="25" cy="25" r="16" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="font-bold text-[#001689]">EMINSA Admin</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[#76777A]">
                <User size={18} />
                <span>{user?.nombre}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#001689] mb-2">
            ¡Bienvenido, {user?.nombre?.split(" ")[0]}!
          </h1>
          <p className="text-[#76777A]">
            Gestione el contenido de noticias y proyectos del sitio web.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#001689]/10 rounded-xl flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-[#001689]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-[#001689]">{noticias.length}</p>
            <p className="text-[#76777A] text-sm">Noticias Totales</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#001689]">{noticiasPublicadas}</p>
            <p className="text-[#76777A] text-sm">Noticias Publicadas</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#00A3E0]/10 rounded-xl flex items-center justify-center">
                <FolderKanban className="w-6 h-6 text-[#00A3E0]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-[#001689]">{proyectos.length}</p>
            <p className="text-[#76777A] text-sm">Proyectos Totales</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#001689]">{proyectosPublicados}</p>
            <p className="text-[#76777A] text-sm">Proyectos Publicados</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Noticias Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#001689]/10 rounded-xl flex items-center justify-center">
                    <Newspaper className="w-6 h-6 text-[#001689]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#001689]">Noticias</h2>
                    <p className="text-[#76777A] text-sm">Gestionar noticias del sitio</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <Link
                href="/admin/noticias/nueva"
                className="flex items-center gap-3 p-4 bg-[#001689] text-white rounded-lg hover:bg-[#000E53] transition-colors"
              >
                <Plus size={20} />
                <span className="font-medium">Crear Nueva Noticia</span>
              </Link>
              <Link
                href="/admin/noticias"
                className="flex items-center gap-3 p-4 bg-gray-100 text-[#001689] rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Edit size={20} />
                <span className="font-medium">Ver y Editar Noticias</span>
              </Link>
              <Link
                href="/noticias"
                target="_blank"
                className="flex items-center gap-3 p-4 bg-gray-100 text-[#76777A] rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Eye size={20} />
                <span className="font-medium">Ver Página Pública</span>
              </Link>
            </div>
          </div>

          {/* Proyectos Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#00A3E0]/10 rounded-xl flex items-center justify-center">
                    <FolderKanban className="w-6 h-6 text-[#00A3E0]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#001689]">Proyectos</h2>
                    <p className="text-[#76777A] text-sm">Gestionar proyectos realizados</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <Link
                href="/admin/proyectos/nuevo"
                className="flex items-center gap-3 p-4 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0091C7] transition-colors"
              >
                <Plus size={20} />
                <span className="font-medium">Crear Nuevo Proyecto</span>
              </Link>
              <Link
                href="/admin/proyectos"
                className="flex items-center gap-3 p-4 bg-gray-100 text-[#001689] rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Edit size={20} />
                <span className="font-medium">Ver y Editar Proyectos</span>
              </Link>
              <Link
                href="/proyectos"
                target="_blank"
                className="flex items-center gap-3 p-4 bg-gray-100 text-[#76777A] rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Eye size={20} />
                <span className="font-medium">Ver Página Pública</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
