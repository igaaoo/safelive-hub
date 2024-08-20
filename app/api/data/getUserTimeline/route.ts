import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { validateToken } from "@/utils/jwtController";
const prisma = new PrismaClient();

export async function POST(request: Request,) {
  const { token, login_ad, type } = await request.json();

  if (!token || !validateToken(token)) return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });

  try {
    let userTimeline = await prisma.historico_usuarios.findMany(
      {
        where: { login_ad: login_ad }
      });

    return NextResponse.json({ result: userTimeline }, { status: 200 });

  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}