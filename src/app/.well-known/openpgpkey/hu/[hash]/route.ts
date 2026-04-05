import fs from "fs";
import { NextRequest } from "next/server";
import path from "path";

function dearmor(asc: string): Uint8Array {
  const lines = asc.split("\n");

  const b64 = lines
    .filter(line =>
      !line.startsWith("-----") &&
      !line.includes(":") &&   // ← Commentなど除外
      line.trim() !== ""
    )
    .join("");

  return Uint8Array.from(Buffer.from(b64, "base64"));
}

export async function GET(_req: NextRequest, ctx: RouteContext<'/.well-known/openpgpkey/hu/[hash]'>) {
  if ((await ctx.params).hash === 'azcitsam8yfuipketufi3zyjhdbghckf') {
    const asc = fs.readFileSync(
      path.join(process.cwd(), "public/pgp.asc"),
      "utf-8"
    );
    const binaryKey = dearmor(asc);

    return new Response(new Uint8Array(binaryKey), {
      headers: {
        "Content-Type": "application/octet-stream",
        "Cache-Control": "public, max-age=300",
      },
    });
  } else {
    return new Response(null, {
      status: 404
    })
  }
}