import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { validateToken } from "@/utils/jwtController";

export async function GET(request: Request,) {
  const token = request.headers.get('token') as string;


  if (!token || !validateToken(token)) return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });

  try {
    let stores = await prisma.lojas.findMany();
    return NextResponse.json({ result: stores }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }


}