export enum AuthErrorCode {
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
}

export class AuthError extends Error {
  public code: AuthErrorCode;

  public constructor(code: AuthErrorCode) {
    const message = `AuthErrorCode: Пользователь неавторизован`;
    super(message);

    this.code = code;
    this.name = 'AuthError';
    this.message = message;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function getUserId(request: Request): number {
  const idStr = request.headers.get('x-user-id');
  const error = new AuthError(AuthErrorCode.Unauthorized);

  if (idStr === null) throw error;

  const id = parseInt(idStr);
  if (isNaN(id) || id <= 0) throw error;

  return id;
}
