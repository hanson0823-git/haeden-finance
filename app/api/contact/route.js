import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, situation, message } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Send email notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Haeden Finance <onboarding@resend.dev>',
            to: 'hanson@haedenfinance.com.au',
            reply_to: email,
            subject: `New enquiry from ${firstName} ${lastName}`,
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
                <h2 style="color:#0D1B2A;border-bottom:3px solid #F5C200;padding-bottom:12px;">
                  New Enquiry – Haeden Finance
                </h2>
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:8px 0;color:#666;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${firstName} ${lastName}</td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#0D1B2A;">${email}</a></td></tr>
                  ${situation ? `<tr><td style="padding:8px 0;color:#666;">Situation</td><td style="padding:8px 0;">${situation}</td></tr>` : ''}
                </table>
                <div style="margin-top:20px;background:#f5f5f5;padding:16px;border-radius:8px;">
                  <p style="color:#666;margin:0 0 6px;font-size:13px;">Message</p>
                  <p style="margin:0;color:#0D1B2A;white-space:pre-wrap;">${message}</p>
                </div>
                <p style="margin-top:20px;font-size:12px;color:#999;">
                  Submitted via haedenfinance.com.au on ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })} AEST
                </p>
              </div>
            `,
          }),
        });
        if (!emailRes.ok) {
          const err = await emailRes.text();
          console.error('Resend error:', emailRes.status, err);
        } else {
          console.log('Email sent successfully');
        }
      } catch (emailErr) {
        console.error('Email send failed:', emailErr.message);
      }
    } else {
      console.warn('RESEND_API_KEY not set — email not sent');
    }

    // 2. Forward to GHL webhook
    const webhookUrl = process.env.GHL_WEBHOOK_URL || 'https://services.leadconnectorhq.com/hooks/oy1P2WdMfCKjEaiy32un/webhook-trigger/baAwKApRgpW4ZUuablmC';
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          situation,
          message,
          name: `${firstName} ${lastName}`.trim(),
          source: 'Haeden Finance Website',
          timestamp: new Date().toISOString(),
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) console.error('GHL webhook error:', res.status);
      else console.log('GHL webhook triggered successfully');
    } catch (webhookErr) {
      console.error('GHL webhook call failed:', webhookErr.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

