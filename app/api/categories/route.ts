import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://chtaura.co/api/categories", {
    next: { revalidate: 300 },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
