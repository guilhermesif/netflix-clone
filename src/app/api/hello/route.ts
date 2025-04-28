/*eslint-disable */
import { type NextRequest, NextResponse } from 'next/server'

type Data = {
  name: string
}

// GET - Quando se busca dados
// POST - Quando se cria dados ou para login, etc
// PUT - Para atualizar um registro por completo (Não muito usado)
// PATCH - Atualiza algum dado
// DELETE - Para deletar algum dado ou registro

export async function GET(request: NextRequest): Promise<NextResponse<Data>> {
    return NextResponse.json({ name: 'John Doe' }, {status: 200});
}