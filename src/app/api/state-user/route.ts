let server_state: string | null = null;

export async function GET() {
  return new Response(
    JSON.stringify({
      message: server_state,
    }),
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const { state } = await request.json();

  server_state = state;

  return new Response(
    JSON.stringify({
      message: state,
    }),
    { status: 200 }
  );
}
