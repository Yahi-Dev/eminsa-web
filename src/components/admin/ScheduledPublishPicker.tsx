"use client";

import { Clock } from "lucide-react";

interface ScheduledPublishPickerProps {
  value: string; // "YYYY-MM-DDTHH:MM" or ""
  onChange: (value: string) => void;
  accentColor?: string;
}

export default function ScheduledPublishPicker({
  value,
  onChange,
  accentColor = "#001689",
}: ScheduledPublishPickerProps) {
  // Min datetime: now (rounded to next minute)
  const now = new Date();
  now.setSeconds(0, 0);
  const minDatetime = new Date(now.getTime() + 60_000)
    .toISOString()
    .slice(0, 16);

  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Clock size={16} style={{ color: accentColor }} />
        <span className="text-sm font-medium text-gray-700">
          Programar publicación
        </span>
      </div>

      <div>
        <input
          type="datetime-local"
          value={value}
          min={minDatetime}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:border-transparent"
          style={
            {
              "--tw-ring-color": accentColor,
              focusRingColor: accentColor,
            } as React.CSSProperties
          }
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow = `0 0 0 2px ${accentColor}40`)
          }
          onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
        />
      </div>

      {value ? (
        <p className="text-xs text-gray-500">
          El contenido se publicará automáticamente el{" "}
          <strong>
            {new Date(value).toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </strong>{" "}
          a las{" "}
          <strong>
            {new Date(value).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </strong>
          .
        </p>
      ) : (
        <p className="text-xs text-gray-400">
          Selecciona una fecha y hora futura para la publicación automática.
        </p>
      )}
    </div>
  );
}
