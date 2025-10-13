import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;

  // Aqui você pode validar e salvar no banco (exemplo com Mongo, Prisma etc.)
  console.log("Usuário cadastrado:", name, email);

  // Exemplo de resposta simulada
  return NextResponse.json({ message: "Usuário registrado com sucesso!" }, { status: 201 });
}
