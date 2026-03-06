"use client";

import Link from "next/link";
import {
  ChevronRight,
  BookOpen,
  Download,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Eye,
  Droplet,
  Thermometer,
  Zap
} from "lucide-react";
import { useTranslations } from "next-intl";

const chapterIcons = [AlertTriangle, Eye, Wrench, Droplet, Zap, Thermometer];

export default function ManualMantenimientoPage() {
  const t = useTranslations("pages.mtn.recursos.manual");

  const chapters = Array.from({ length: 6 }, (_, i) => ({
    number: i + 1,
    title: t(`chapters.${i}.title`),
    description: t(`chapters.${i}.description`),
    icon: chapterIcons[i],
  }));

  const maintenanceSchedule = Array.from({ length: 3 }, (_, i) => ({
    frequency: t(`schedule.${i}.frequency`),
    tasks: Array.from({ length: 5 }, (_, j) => t(`schedule.${i}.tasks.${j}`)),
  }));

  const downloads = Array.from({ length: 4 }, (_, i) => ({
    title: t(`downloads.${i}.title`),
    description: t(`downloads.${i}.description`),
    size: t(`downloads.${i}.size`),
    type: t(`downloads.${i}.type`),
  }));
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00269b] to-[#00175d] text-white py-12">
        <div className="container-eminsa">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">{t("breadcrumb.home")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn" className="hover:text-white transition-colors">{t("breadcrumb.mtn")}</Link>
            <ChevronRight size={14} />
            <Link href="/mtn/recursos" className="hover:text-white transition-colors">{t("breadcrumb.recursos")}</Link>
            <ChevronRight size={14} />
            <span className="text-white">{t("breadcrumb.manual")}</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <BookOpen size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t("hero.title")}</h1>
              <p className="text-white/70">{t("hero.subtitle")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Importance Banner */}
      <section className="py-6 bg-amber-50 border-b border-amber-100">
        <div className="container-eminsa">
          <div className="flex items-start gap-4">
            <AlertTriangle size={24} className="text-amber-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-800">{t("banner.title")}</p>
              <p className="text-amber-700 text-sm mt-1">
                {t("banner.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-12">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("manualContent")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.map((chapter) => {
              const Icon = chapter.icon;
              return (
                <div
                  key={chapter.number}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00269b]/10 rounded-xl flex items-center justify-center group-hover:bg-[#00269b] transition-colors">
                      <Icon size={24} className="text-[#00269b] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-[#0099ce]">{t("chapterLabel", { number: chapter.number })}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-[#00269b] transition-colors">
                        {chapter.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {chapter.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Maintenance Schedule */}
      <section className="py-12 bg-white">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t("scheduleTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {maintenanceSchedule.map((schedule, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={20} className="text-[#00269b]" />
                  <h3 className="text-lg font-bold text-gray-900">{schedule.frequency}</h3>
                </div>
                <ul className="space-y-2">
                  {schedule.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-12">
        <div className="container-eminsa">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("downloadsTitle")}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {downloads.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    doc.type === 'PDF' ? 'bg-red-100' : 'bg-green-100'
                  }`}>
                    <BookOpen size={24} className={doc.type === 'PDF' ? 'text-red-600' : 'text-green-600'} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{doc.title}</h3>
                    <p className="text-sm text-gray-500">{doc.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{doc.type} • {doc.size}</p>
                  </div>
                </div>
                <button className="flex-shrink-0 flex items-center gap-2 bg-[#00269b] hover:bg-[#00175d] text-white px-4 py-2 rounded-lg transition-colors">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
    </div>
  );
}
