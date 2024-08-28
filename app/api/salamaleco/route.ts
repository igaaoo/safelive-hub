import { validateToken } from "@/utils/jwtController";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

export async function POST(request: Request) {
  const { malecolasala, db, query } = await request.json();

  // Verifica se o token é válido
  if (!malecolasala || !validateToken(malecolasala)) {
    return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });
  }

  // Verifica se os parâmetros necessários foram passados
  if (!db || !query) {
    return NextResponse.json({ message: 'Informações Inválidas!' }, { status: 400 });
  }

  if (db !== process.env.DATABASE_URL) return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });


  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: db,
      },
    },
  });

  try {
    // Executa a query como uma string bruta
    const result = await prisma.$queryRawUnsafe(query);

    // Retorna o resultado da query
    return NextResponse.json({ result, message: "ok" }, { status: 200 });

  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    // Fecha a conexão com o banco de dados
    await prisma.$disconnect();
  }
}
