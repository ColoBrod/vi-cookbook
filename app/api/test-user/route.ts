import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  // Omit password from response
  const { password, ...userWithoutPassword } = user;
  
  return NextResponse.json(userWithoutPassword, { status: 200 });
}
