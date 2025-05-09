import prismadb from '@/lib/prismadb';
import { HttpStatusCode } from 'axios';
import bcrypt from 'bcrypt';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { name, email, password } = await request.json();

		const existingUser = await prismadb.user.findUnique({ where: { email } });
		if (existingUser)
			return new Response('Email taken', { status: HttpStatusCode.Conflict });

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prismadb.user.create({
			data: {
				name,
				email,
				hashedPassword,
				emailVerified: new Date(),
			},
		});

		return new Response(JSON.stringify(user), {
			status: HttpStatusCode.Created,
		});
	} catch (error) {
		console.log(error);
		return new Response('Ínternal Server Error', {
			status: HttpStatusCode.InternalServerError,
		});
	}
}

// GET - Quando se busca dados
// POST - Quando se cria dados ou para login, etc
// PUT - Para atualizar um registro por completo (Não muito usado)
// PATCH - Atualiza algum dado
// DELETE - Para deletar algum dado ou registro
