import { NextRequest, NextResponse } from "next/server";

const UPSTREAM = "https://chtaura.co/api/orders";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch {
    return NextResponse.json({ error: "Failed to place order" }, { status: 502 });
  }
}

export async function GET() {
  try {
    const upstream = await fetch(UPSTREAM, { next: { revalidate: 0 } });
    const data = await upstream.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 502 });
  }
}
