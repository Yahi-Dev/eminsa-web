"use client";

import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";

interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
  focusColor?: string;
  className?: string;
}

export function PhoneInputField({
  value,
  onChange,
  error,
  label = "Teléfono",
  required = false,
  focusColor = "#00269b",
  className,
}: PhoneInputFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`phone-input-wrapper eminsa-phone-input flex items-center border rounded-xl bg-white transition-all ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        style={{ "--phone-focus-color": focusColor } as React.CSSProperties}
      >
        <PhoneInput
          flags={flags}
          defaultCountry="DO"
          value={value || ""}
          onChange={(val) => onChange(val ?? "")}
          international
          countryCallingCodeEditable={false}
          className="w-full"
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
