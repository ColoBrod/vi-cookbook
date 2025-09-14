import prisma from '@/lib/prisma';
// import { Prisma } from '@/app/generated/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { HttpStatus } from '@/lib/http-status';
import { isPrismaError } from '@/lib/prisma';

export async function GET() {
  try {
    const collection = await prisma.collection.create({ 
      data: {
        name: 'asdf',
        author: { 
          connect: { id: 1 },
        },
      },
    });
    return NextResponse.json({ collection }, { status: HttpStatus.Ok });
  }
  catch(e) {
    console.log(e);
    console.log('Error instance:');
    // console.log(e instanceof Prisma.PrismaClientKnownRequestError);
    // console.log(Object.getPrototypeOf(e));
    console.log(isPrismaError(e));
    return NextResponse.json({ error: 'couldnt create collection' }, { status: HttpStatus.NotFound });
  }

}
