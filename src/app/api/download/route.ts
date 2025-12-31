import { NextRequest } from "next/server";
import { createReadStream } from "fs";
import { stat } from "fs/promises";
import { join } from "path";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest) {
  const filePath = join(
    process.cwd(),
    "public",
    "files",
    "cv-mochamad-tegar.pdf"
  );

  try {
    const fileStat = await stat(filePath);
    const stream = createReadStream(filePath);

    return new Response(stream as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=cv-mochamad-tegar.pdf",
        "Content-Length": fileStat.size.toString(),
      },
    });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: "File not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
