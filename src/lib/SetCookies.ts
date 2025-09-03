"use server";

import { cookies } from "next/headers";

// Define the Cookie type for better type safety
interface CookieOptions {
  expires?: Date | number;
  maxAge?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export async function setCookie(
  key: string,
  value: string | number,
  options?: CookieOptions
): Promise<void> {
  try {
    const cookieStore = await cookies();

    cookieStore.set({
      name: key,
      value: String(value),
      ...options,
      ...(options?.expires instanceof Date && {
        expires: options.expires,
      }),
      ...(typeof options?.expires === "number" && {
        expires: options.expires,
      }),
    });
  } catch (error) {
    console.error("Failed to set cookie:", error);
    throw error;
  }
}
