import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { validateToken, getUserInfos } from "@/utils/jwtController";
const prisma = new PrismaClient();

export async function GET(request: Request,) {
  const token = request.headers.get('token');



  if (!token || !validateToken(token)) return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });

  const userInfos = await getUserInfos(token);
  if (userInfos.role !== 'administrador') return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });


  // Get users from Mysql database
  try {
    let users = await prisma.usuarios.findMany();

    return NextResponse.json({ result: users }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}