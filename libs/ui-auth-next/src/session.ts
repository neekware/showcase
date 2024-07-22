import { JWTService } from '@lib/data-net-shared';

export async function getSession(name: string) {
  const { cookies } = await import('next/headers');

  const cookie = cookies().get(name);
  if (cookie && cookie.value) {
    const jwtPrev = await JWTService.decrypt(cookie.value);
    if (jwtPrev.success && jwtPrev.data) {
      return jwtPrev.data;
    }
    cookies().delete(name);
  }
  return undefined;
}
