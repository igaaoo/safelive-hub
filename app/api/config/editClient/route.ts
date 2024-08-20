import { validateToken, getUserInfos } from "@/utils/jwtController";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

export async function POST(request: Request,) {
  const data = await request.formData();

  if (!data.get('token') || !validateToken(data.get('token') as string)) return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });


  const cliente = data.get('cliente') as string;
  const cliente_senha = data.get('cliente_senha') as string;
  const cliente_numero = data.get('cliente_numero') as string;
  const treinamentos = data.get('treinamentos') as string;
  const prazo = data.get('prazo') as string;
  const cliente_logo = data.get('cliente_logo') as File;

  if (!cliente || !cliente_senha) return NextResponse.json({ message: 'Informações Inválidas!' }, { status: 401 });

  const userInfos = await getUserInfos(data.get('token') as string);
  if (userInfos.role !== 'administrador') return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });

  const image = await cliente_logo.arrayBuffer();
  const buffer = Buffer.from(image);


  try {
    const prisma = new PrismaClient();

    await prisma.contratos.create({
      data: {
        cliente,
        cliente_senha,
        cliente_numero,
        treinamentos: Number(treinamentos),
        prazo: new Date(prazo),
        cliente_logo: buffer
      }
    });

  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  return NextResponse.json({ result: "Cliente cadastrado com sucesso!" }, { status: 200 });
}

export async function DELETE(request: Request,) {
  const { token, cliente } = await request.json();

  if (!token || !validateToken(token)) return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });

  const userInfo = await getUserInfos(token);
  if (userInfo.role !== 'administrador') return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });

  // Delete user on usuarios table
  try {
    const prisma = new PrismaClient();

    await prisma.contratos.delete({
      where: {
        cliente
      }
    });

    await prisma.$disconnect();
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ result: "Cliente deletado" }, { status: 200 });

}

export async function PUT(request: Request) {
  const data = await request.formData();

  if (!data.get('token') || !validateToken(data.get('token') as string)) return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });


  const cliente = data.get('cliente') as string;
  const cliente_senha = data.get('cliente_senha') as string;
  const cliente_numero = data.get('cliente_numero') as string;
  const treinamentos = data.get('treinamentos') as string;
  const prazo = data.get('prazo') as string;
  const cliente_logo = data.get('cliente_logo') as File;

  if (!cliente || !cliente_senha) return NextResponse.json({ message: 'Informações Inválidas!' }, { status: 401 });

  const userInfos = await getUserInfos(data.get('token') as string);
  if (userInfos.role !== 'administrador') return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });

  const image = await cliente_logo.arrayBuffer();
  const buffer = Buffer.from(image);


  try {
    const prisma = new PrismaClient();

    await prisma.contratos.update({
      where: {
        cliente
      },
      data: {
        cliente_senha,
        cliente_numero,
        treinamentos: Number(treinamentos),
        prazo: new Date(prazo),
        cliente_logo: buffer
      }
    });

  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  return NextResponse.json({ result: "Cliente atualizado com sucesso" }, { status: 200 });
}
