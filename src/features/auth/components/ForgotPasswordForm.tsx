"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await authClient.requestPasswordReset({
      email,
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (result.error) {
      setError(result.error.message || "No se pudo enviar el correo. Intente nuevamente.");
    } else {
      setSubmitted(true);
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
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Recuperar contraseña
            </h1>
            <p className="text-white/70 text-sm">
              Te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>

          {submitted ? (
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
                Correo enviado
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Si existe una cuenta con <strong>{email}</strong>, recibirás un
                correo con instrucciones para restablecer tu contraseña. Revisa
                también tu carpeta de spam.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-[#00269b] hover:text-[#00175d] font-medium transition-colors"
              >
                <ArrowLeft size={16} />
                Volver al inicio de sesión
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

              <p className="text-sm text-gray-500">
                Ingresa el correo electrónico asociado a tu cuenta y te
                enviaremos un enlace para restablecer tu contraseña.
              </p>

              <div>
                <label className="block text-sm font-medium text-[#6d6e6d] mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00269b]/30 focus:border-[#00269b] transition-colors"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#00269b] text-white font-semibold rounded-lg hover:bg-[#00175d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando correo...
                  </>
                ) : (
                  "Enviar enlace de recuperación"
                )}
              </button>
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
