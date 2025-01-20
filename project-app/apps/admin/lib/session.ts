import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// const secretKey = process.env.SESSION_SECRET;
const secretKey = 'aevr234v2345623q2554v63';
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  (await cookies()).set('sessionAdmin', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function getSession() {
  const session = (await cookies()).get('sessionAdmin')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  return Number(payload.userId);
}

export async function deleteSession() {
  (await cookies()).delete('session');
}

type SessionPayload = {
  userId: number;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
}
