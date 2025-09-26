import { BACKEND_URL } from '@/lib/constants';
import { createSession } from '@/lib/sessions';
import { redirect } from 'next/navigation';
import type { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const accessToken = searchParams.get('accessToken');
  const userId = searchParams.get('userId');
  const name = searchParams.get('name');
  const avatar = searchParams.get('avatar');

  if (!accessToken || !userId || !name) throw new Error('Google oauth failed!');

  const resAuth = await fetch(`${BACKEND_URL}/auth/verify-token`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  if (resAuth.status === 401) throw new Error('jwt verification failed!');

  await createSession({
    user: {
      id: userId,
      name,
      avatar: avatar ?? undefined,
    },
    accessToken,
  });
  redirect('/');
}
