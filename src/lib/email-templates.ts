/**
 * Email HTML templates for SpeakEasy streak reminders.
 */

export interface StreakEmailData {
  displayName: string;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  appUrl: string;
}

/** Motivational messages depending on streak size */
function getStreakMessage(streak: number): string {
  if (streak >= 100)
    return "You're a legend! 100+ days of dedication! Don't let it end now.";
  if (streak >= 30)
    return "Over a month of daily learning — that's incredible discipline!";
  if (streak >= 14)
    return "Two weeks strong! You're building an amazing habit.";
  if (streak >= 7) return "A whole week! You're on fire! 🔥";
  if (streak >= 3) return "Great start! A few more days and it becomes a habit.";
  return "Every day counts! Keep the momentum going.";
}

export function buildStreakReminderEmail(data: StreakEmailData): {
  subject: string;
  html: string;
} {
  const { displayName, streak, appUrl } = data;
  const firstName = displayName.split(' ')[0] || 'Learner';
  const motivationalMsg = getStreakMessage(streak);

  const subject =
    streak >= 7
      ? `🔥 ${firstName}, your ${streak}-day streak is at risk!`
      : `Don't break your streak, ${firstName}! (${streak} day${streak !== 1 ? 's' : ''})`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SpeakEasy Streak Reminder</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px 24px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">SpeakEasy</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Your English Learning Journey</p>
            </td>
          </tr>

          <!-- Streak Badge -->
          <tr>
            <td style="padding:32px 24px 16px;text-align:center;">
              <div style="display:inline-block;background:#fff7ed;border:2px solid #fb923c;border-radius:50%;width:80px;height:80px;line-height:80px;font-size:36px;text-align:center;">
                🔥
              </div>
              <h2 style="margin:16px 0 4px;color:#1f2937;font-size:22px;">
                ${streak}-day streak at risk!
              </h2>
              <p style="margin:0;color:#6b7280;font-size:14px;">
                You haven't practised today yet.
              </p>
            </td>
          </tr>

          <!-- Motivational Message -->
          <tr>
            <td style="padding:8px 24px 24px;">
              <div style="background:#f0fdf4;border-left:4px solid #22c55e;border-radius:0 8px 8px 0;padding:16px 20px;">
                <p style="margin:0;color:#15803d;font-size:15px;line-height:1.5;">
                  ${motivationalMsg}
                </p>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:0 24px 32px;text-align:center;">
              <a href="${appUrl}/dashboard"
                 style="display:inline-block;background:#6366f1;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;padding:14px 40px;border-radius:12px;">
                Practice Now →
              </a>
              <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;">
                Just 5 minutes is enough to keep your streak alive!
              </p>
            </td>
          </tr>

          <!-- Quick Actions -->
          <tr>
            <td style="padding:0 24px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background:#f9fafb;border-radius:12px;padding:16px;" align="center">
                    <p style="margin:0 0 12px;color:#6b7280;font-size:13px;">Quick links:</p>
                    <a href="${appUrl}/daily-practice" style="color:#6366f1;text-decoration:none;font-size:13px;font-weight:500;margin:0 8px;">Daily Practice</a>
                    <span style="color:#d1d5db;">•</span>
                    <a href="${appUrl}/vocabulary" style="color:#6366f1;text-decoration:none;font-size:13px;font-weight:500;margin:0 8px;">Vocabulary</a>
                    <span style="color:#d1d5db;">•</span>
                    <a href="${appUrl}/games/word-puzzle" style="color:#6366f1;text-decoration:none;font-size:13px;font-weight:500;margin:0 8px;">Unjumble</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #e5e7eb;padding:20px 24px;text-align:center;">
              <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;">
                You're receiving this because you enabled streak reminders on SpeakEasy.
              </p>
              <a href="${appUrl}/profile"
                 style="color:#9ca3af;text-decoration:underline;font-size:12px;">
                Manage email preferences
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  return { subject, html };
}
