import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  exp: number;
  [key: string]: any;
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: JWTPayload = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);

    return decoded.exp < now;
  } catch (e) {
    console.error('Erro ao decodificar token:', e);
    return true;
  }
}
