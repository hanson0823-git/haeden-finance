import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, situation, message } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const webhookUrl = process.env.GHL_WEBHOOK_URL;

    if (webhookUrl) {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email,
        situation,
        message,
        name: `${firstName} ${lastName}`.trim(),
        source: 'Haeden Finance Website',
        timestamp: new Date().toISOString(),
      };

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!res.ok) {
          console.error('GHL webhook error:', res.status);
        } else {
          console.log('GHL webhook triggered successfully');
        }
      } catch (webhookErr) {
        // Log but don't fail the form submission
        console.error('GHL webhook call failed:', webhookErr.message);
      }
    } else {
      console.warn('GHL_WEBHOOK_URL not set — form submission not forwarded');
    }

    console.log('Contact form submission:', { firstName, lastName, email, situation });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
