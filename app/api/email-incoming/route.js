import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();

    // שמירה בפיירסטור
    await addDoc(collection(db, "requests"), {
      raw: body,
      createdAt: Date.now()
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inbound email error:", error);
    return NextResponse.json(
      { ok: false, error: error.message || String(error) },
      { status: 500 }
    );
  }
}
