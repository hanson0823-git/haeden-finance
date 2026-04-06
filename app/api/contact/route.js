import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, situation, message } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Here you would integrate your email service (Resend, SendGrid, etc.)
    // For now, we log and return success so the form works
    console.log('Contact form submission:', {
      name: `${firstName} ${lastName}`,
      email,
      situation,
      message,
      timestamp: new Date().toISOString(),
    });

    // Example: Resend integration
    // const { Resend } = await import('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@haedenfinance.com.au',
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `New enquiry from ${firstName} ${lastName}`,
    //   html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
    //          <p><strong>Email:</strong> ${email}</p>
    //          <p><strong>Situation:</strong> ${situation}</p>
    //          <p><strong>Message:</strong> ${message}</p>`,
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
