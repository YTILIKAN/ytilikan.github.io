import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Revalidation ISR à la demande.
 *
 * Le back-office (API ytilikan-community) appelle cette route après chaque
 * écriture éditoriale (réordonnancement équipe/FAQ, mise à jour émission,
 * programme, membre, FAQ) pour purger immédiatement le cache de la landing.
 *
 * Sécurisé par un secret partagé (header `x-revalidate-secret`).
 */
export async function POST(request: Request) {
  const secret = request.headers.get('x-revalidate-secret');
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || !secret || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    revalidateTag('site-content');
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { error: 'Revalidation failed', detail: String(err) },
      { status: 500 },
    );
  }
}
