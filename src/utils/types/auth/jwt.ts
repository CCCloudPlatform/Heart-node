export interface JwtPayload {
  // 토큰 만료시간
  exp: number;

  // 토큰이 발급된 시간
  iat: string;

  // 토큰 발급자. issuer
  iss?: string;

  // 토큰 제목
  sub?: string;

  // 토큰 대상자
  aud?: string;

  // Not Before, 토큰 활성날짜와 비슷
  nbf?: string;

  // JWT 고유 식별자
  jit?: string;
}
