import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUptime = (startTime: number) => {
  const diff = Math.floor((Date.now() - startTime) / 1000);
  const hrs = Math.floor(diff / 3600);
  const mins = Math.floor((diff % 3600) / 60);
  const secs = diff % 60;
  return `Waktu aktif: ${hrs}j ${mins}m ${secs}d`;
};

export const handleEcho = (text: string) => {
  return text || "Penggunaan: echo [teks]";
};

export const handleCalc = (expression: string) => {
  try {
    const cleanExpr = expression.replace(/[^0-9+\-*/().]/g, "");
    return String(eval(cleanExpr));
  } catch {
    return "Error: Ekspresi tidak valid. Penggunaan: calc [ekspresi]";
  }
};

export const getDate = () => {
  return `Tanggal saat ini: ${new Date().toLocaleDateString("id-ID")}
Waktu saat ini: ${new Date().toLocaleTimeString()}
Zona waktu: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
};
