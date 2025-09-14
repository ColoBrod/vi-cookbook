export function getUserId(request: Request): number {
  const idStr = request.headers.get('x-user-id');
  const error = new Error('Пользователь неавторизован');
  if (idStr === null) throw error;
  const id = parseInt(idStr);
  if (isNaN(id) || id <= 0) throw error;
  return id;
}
