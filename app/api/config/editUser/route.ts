import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { validateToken, getUserInfos } from "@/utils/jwtController";
const prisma = new PrismaClient();


export async function PUT(request: Request,) {
  const { token, role, user, clients, password } = await request.json();


  if (!token || !validateToken(token)) return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });

  const userInfo = await getUserInfos(token);
  if (userInfo.role !== 'administrador') return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });

  // Create user on usuarios table
  try {
    if (!password) {
      await prisma.usuarios.update({
        where: {
          usuario: user
        },
        data: {
          cargo: role,
          clientes: clients,
        }
      });
    } else {
      await prisma.usuarios.update({
        where: {
          usuario: user
        },
        data: {
          cargo: role,
          clientes: clients,
          senha: password
        }
      });
    }


    await prisma.$disconnect();
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }


  return NextResponse.json({ result: "Usuário atualizado" }, { status: 200 });
}

export async function POST(request: Request,) {
  const { token, user, password } = await request.json();


  if (!token || !validateToken(token)) return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });

  const userInfo = await getUserInfos(token);
  if (userInfo.role !== 'administrador') return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });

  // Create user on usuarios table
  try {
    const exists = await prisma.usuarios.findUnique({
      where: {
        usuario: user
      }
    });

    if (exists) return NextResponse.json({ message: 'Usuário já cadastrado!' }, { status: 500 });

    await prisma.usuarios.create({
      data: {
        usuario: user,
        senha: password,
        cargo: 'tecnico'
      }
    });


    await prisma.$disconnect();
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }


  return NextResponse.json({ result: "Usuário Criado" }, { status: 200 });
}




