import { HttpStatus } from "@/lib/http-status";
import { NextResponse } from "next/server";
import { isPrismaError } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import { AuthError, AuthErrorCode } from "@/lib/user";

export interface ControllerInterface {
  GET?: (request: Request) => any;
  POST?: (request: Request) => any;
  PUT?: (request: Request) => NextResponse;
  PATCH?: (request: Request) => NextResponse;
  DELETE?: (request: Request) => NextResponse;
}

// export type ControllerClass = new (...args: any[]) => ControllerInterface;
type Constructor<T> = new (...args: any[]) => T;

type HttpMethod = keyof ControllerInterface;

export function Controller<T extends ControllerInterface>(): (target: Constructor<T>) => void {
  return (target) => {
    const httpMethods: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

    for (const method of httpMethods) {
      const original = target.prototype[method];

      target.prototype[method] = async function (...args: any[]) {
        try {
          const result = await original.apply(this, args);
          return result;
        }
        catch (e) {
          return handleError(e);
        }
      };
    }
  };
}


function handleError(e: unknown): NextResponse {
  if (e instanceof AuthError) return handleAuthError(e);
  if (e instanceof ZodError) return handleValidationError(e);
  if (isPrismaError(e)) return handlePrismaError(e as PrismaClientKnownRequestError);
  return NextResponse.json(
    { message: 'Внутренняя ошибка сервера' },
    { status: HttpStatus.InternalServerError }
  );
}

function handleAuthError(e: AuthError): NextResponse {
  const { code, message } = e;
  switch (code) {
    case AuthErrorCode.Unauthorized: return NextResponse.json(
      { message }, { status: HttpStatus.Unauthorized }
    );
    case AuthErrorCode.Forbidden: return NextResponse.json(
      { message }, { status: HttpStatus.Forbidden }
    )
  }
}

function handleValidationError(e: ZodError): NextResponse {
  const { message } = e;
  return NextResponse.json({ message }, { status: HttpStatus.BadRequest });
}

function handlePrismaError(e: PrismaClientKnownRequestError): NextResponse {
  const { message, code } = e;
  return NextResponse.json({ code, message }, { status: HttpStatus.InternalServerError });
}




