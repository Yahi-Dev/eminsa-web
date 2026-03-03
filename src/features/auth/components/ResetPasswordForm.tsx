"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError(
        "Enlace inválido o expirado. Solicita un nuevo enlace de recuperación."
      );
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (!token) {
      setError(
        "Enlace inválido o expirado. Solicita un nuevo enlace de recuperación."
      );
      return;
    }

    setIsSubmitting(true);

    const result = await authClient.resetPassword({
      newPassword: password,
      token: token!,
    });

    if (result.error) {
      setError(result.error.message || "No se pudo restablecer la contraseña. El enlace puede haber expirado.");
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00269b] via-[#00175d] to-[#00269b] p-4">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Back link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          Volver al inicio de sesión
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00269b] to-[#00175d] p-8 text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Nueva contraseña
            </h1>
            <p className="text-white/70 text-sm">
              Ingresa tu nueva contraseña para restablecer el acceso
            </p>
          </div>

          {success ? (
            /* Success state */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Contraseña actualizada
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                Tu contraseña ha sido restablecida exitosamente.
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Serás redirigido al inicio de sesión en unos segundos...
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-[#00269b] hover:text-[#00175d] font-medium transition-colors"
              >
                <ArrowLeft size={16} />
                Ir al inicio de sesión
              </Link>
            </motion.div>
          ) : (
            /* Form state */
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                >
                  <AlertCircle size={20} className="shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#6d6e6d] mb-2">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    disabled={!token}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00269b]/30 focus:border-[#00269b] transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6d6e6d] mb-2">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    disabled={!token}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00269b]/30 focus:border-[#00269b] transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="Repite tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !token}
                className="w-full py-3 bg-[#00269b] text-white font-semibold rounded-lg hover:bg-[#00175d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Actualizando contraseña...
                  </>
                ) : (
                  "Restablecer contraseña"
                )}
              </button>

              {!token && (
                <div className="text-center">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#00269b] hover:text-[#00175d] transition-colors"
                  >
                    Solicitar nuevo enlace de recuperación
                  </Link>
                </div>
              )}
            </form>
          )}
        </div>

        <p className="text-center text-white/50 text-sm mt-6">
          © {new Date().getFullYear()} Grupo EMINSA. Todos los derechos
          reservados.
        </p>
      </motion.div>
    </div>
  );
}
