import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { getUserInfos, validateToken } from "@/utils/jwtController";

export async function GET(request: Request,) {
  const token = request.headers.get('token') as string;


  if (!token || !validateToken(token)) return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });

  const userInfos = await getUserInfos(token);
  if (userInfos.role === 'usuario') return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });
  const clients = userInfos.clients.split(',');


  try {
    const prisma = new PrismaClient();


    const result = await prisma.relatorio.findMany({
      where: {
        cliente: {
          in: clients
        }
      }
    });


    await prisma.$disconnect();
    return NextResponse.json({ result: result }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}