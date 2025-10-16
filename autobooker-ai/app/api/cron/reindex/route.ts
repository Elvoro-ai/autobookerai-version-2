import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const header = request.headers.get("x-cron-secret");
  if (!secret || header !== secret) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // TODO: your job logic
    // await reindexAll();
    return NextResponse.json({ ok: true, ranAt: new Date().toISOString() });
  } catch (e: any) {
    console.error("cron reindex error:", e);
    return new NextResponse("Cron failed", { status: 500 });
  }
}
