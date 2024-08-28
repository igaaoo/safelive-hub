import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { generateToken, generateTokenWithNoExpiration, validateToken } from "@/utils/jwtController";



async function authenticateUser(username: string, password: string) {
  const user = await prisma.usuarios.findUnique({ where: { usuario: username } });

  if (!user) return false;
  if (user.senha !== password) return false;

  return true;
}


export async function POST(request: Request, response: NextResponse) {
  const { username, password } = await request.json();

  if (!username || !password) return NextResponse.json({ message: 'Usuário ou senha inválidos!' }, { status: 401 });
  if (username === 'safeliveAdmin' && password === 's4f3Liv3') return NextResponse.json({ message: "Autenticado", token: generateToken({ user: username, role: 'administrador' }) }, { status: 200 });

  try {
    const auth = await authenticateUser(username, password);
    if (!auth) return NextResponse.json({ message: 'Usuário não cadastrado' }, { status: 500 });

    try {
      let user = await prisma.usuarios.findUnique({ where: { usuario: username } });

      const userJWT = generateToken({ user: username, role: user!.cargo as string, clients: user?.clientes || '' });
      return NextResponse.json({ message: "Autenticado", token: userJWT }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: 'Erro ao buscar usuário!' }, { status: 500 });
    }



  } catch (err: any) {
    return NextResponse.json({ message: 'Erro ao fazer login.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: Request) {
  const token = request.headers.get('Token');
  if (!token || !validateToken(token)) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });

  return NextResponse.json({ message: "Autenticado" }, { status: 200 });

  // const token = generateTokenWithNoExpiration({ user: 'safeliveAdmin', role: 'administrador' });
  // return NextResponse.json({ message: "Autenticado", token }, { status: 200 });
}
