import { NextResponse } from "next/server";

let server_state: string | null = null;

export async function GET() {
  if (!server_state) {
    return NextResponse.json({ message: null }, { status: 401 });
  }

  return NextResponse.json({ message: server_state }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const { state } = await request.json();

    if (!state) {
      return NextResponse.json(
        { error: "Invalid auth state" },
        { status: 400 }
      );
    }

    server_state = state;

    return NextResponse.json(
      { message: state, success: true },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
