"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": theme === "dark" ? "#1f2937" : "#ffffff",
          "--normal-text": theme === "dark" ? "#f9fafb" : "#111827",
          "--normal-border": theme === "dark" ? "#374151" : "#d1d5db",
          "--success-bg": theme === "dark" ? "#065f46" : "#dcfce7",
          "--success-text": theme === "dark" ? "#34d399" : "#166534",
          "--success-border": theme === "dark" ? "#059669" : "#16a34a",
          "--error-bg": theme === "dark" ? "#7f1d1d" : "#fef2f2",
          "--error-text": theme === "dark" ? "#f87171" : "#dc2626",
          "--error-border": theme === "dark" ? "#dc2626" : "#ef4444",
          "--warning-bg": theme === "dark" ? "#92400e" : "#fef3c7",
          "--warning-text": theme === "dark" ? "#fbbf24" : "#d97706",
          "--warning-border": theme === "dark" ? "#d97706" : "#f59e0b",
          "--info-bg": theme === "dark" ? "#1e3a8a" : "#dbeafe",
          "--info-text": theme === "dark" ? "#60a5fa" : "#1d4ed8",
          "--info-border": theme === "dark" ? "#3b82f6" : "#2563eb",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          background: "var(--normal-bg)",
          color: "var(--normal-text)",
          border: "1px solid var(--normal-border)",
          fontSize: "14px",
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        className: "toast-custom",
      }}
      {...props}
    />
  )
}

export { Toaster }
