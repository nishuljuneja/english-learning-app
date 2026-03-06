import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { Resend } from 'resend';
import { buildStreakReminderEmail } from '@/lib/email-templates';

/**
 * POST /api/cron/streak-reminder
 *
 * Sends daily email reminders to users who:
 *   1. Have emailReminders enabled
 *   2. Have a streak ≥ 1
 *   3. Haven't been active today (lastActiveDate ≠ today)
 *
 * Protected by CRON_SECRET — pass it as Authorization: Bearer <secret>
 *
 * Trigger this via:
 *   • Vercel Cron (see vercel.json)
 *   • External cron service (cron-job.org, etc.)
 *   • GitHub Actions scheduled workflow
 */

export async function POST(request: NextRequest) {
  // ── Auth check ─────────────────────────────────────────────────────
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json(
      { error: 'CRON_SECRET not configured' },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── Resend setup ───────────────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json(
      { error: 'RESEND_API_KEY not configured' },
      { status: 500 }
    );
  }
  const resend = new Resend(resendKey);

  const fromEmail =
    process.env.EMAIL_FROM || 'SpeakEasy <reminders@speakeasy.app>';
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://speakeasy.app';

  // ── Find users who need a reminder ─────────────────────────────────
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  try {
    const adminDb = getAdminDb();

    // Query all users with streak >= 1, then filter out those who explicitly opted out
    const snapshot = await adminDb
      .collection('users')
      .where('streak', '>=', 1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ sent: 0, message: 'No users need reminders' });
    }

    let sent = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const doc of snapshot.docs) {
      const user = doc.data();

      // Skip if explicitly opted out (default is on)
      if (user.emailReminders === false) {
        skipped++;
        continue;
      }

      // Skip if they already practised today
      if (user.lastActiveDate === today) {
        skipped++;
        continue;
      }

      // Skip if no email
      if (!user.email) {
        skipped++;
        continue;
      }

      const emailData = {
        displayName: user.displayName || 'Learner',
        streak: user.streak || 1,
        lastActiveDate: user.lastActiveDate || '',
        appUrl,
      };

      const { subject, html } = buildStreakReminderEmail(emailData);

      try {
        await resend.emails.send({
          from: fromEmail,
          to: user.email,
          subject,
          html,
        });
        sent++;
      } catch (err: any) {
        errors.push(`${user.email}: ${err.message || 'send failed'}`);
      }
    }

    return NextResponse.json({
      sent,
      skipped,
      total: snapshot.size,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err: any) {
    console.error('Streak reminder cron error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal error' },
      { status: 500 }
    );
  }
}

// Also support GET for Vercel Cron (which sends GET requests)
export async function GET(request: NextRequest) {
  return POST(request);
}
