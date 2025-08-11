import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, personalityType, personalityName, personalityMotto } = await request.json();

    // Validate required fields
    if (!email || !personalityType) {
      return NextResponse.json(
        { error: 'Missing required fields: email and personalityType' },
        { status: 400 }
      );
    }

    // Send the assessment results email
    const { data, error } = await resend.emails.send({
      from: 'MyGolfType <onboarding@resend.dev>', // We'll change this to your domain later
      to: [email],
      subject: `Your Golf Personality: ${personalityName || personalityType}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Your Golf Personality Results</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #22c55e; font-size: 28px; margin-bottom: 10px;">Your Golf Personality</h1>
            <div style="font-size: 48px; font-weight: bold; color: #16a34a; margin: 20px 0;">${personalityType}</div>
            <h2 style="color: #374151; font-size: 22px; margin-bottom: 10px;">${personalityName || 'Your Golf Type'}</h2>
            ${personalityMotto ? `<p style="font-style: italic; color: #6b7280; font-size: 18px;">"${personalityMotto}"</p>` : ''}
          </div>

          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #16a34a; margin-top: 0;">Hi ${firstName || 'there'}!</h3>
            <p>You've completed the MyGolfType assessment! Your golf personality type is <strong>${personalityType}</strong> - ${personalityName}.</p>
            <p>This means you have a unique approach to the game that affects everything from how you prepare for rounds to how you interact with playing partners.</p>
          </div>

          <div style="background-color: #1f2937; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
            <h3 style="color: #22c55e; margin-top: 0;">Want Your Complete Golf Profile?</h3>
            <p style="margin-bottom: 20px;">Get a comprehensive 25-page report with detailed analysis, course strategy tips, and perfect playing partner matches for your ${personalityName} type.</p>
            <a href="https://mygolftype.com/premium" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Get Full Report - $19.97</a>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <p>Thanks for taking the assessment!</p>
            <p>Best regards,<br>The MyGolfType Team</p>
            <p style="margin-top: 20px;">
              <a href="https://mygolftype.com" style="color: #22c55e;">MyGolfType.com</a> | 
              <a href="#" style="color: #6b7280;">Unsubscribe</a>
            </p>
          </div>

        </body>
        </html>
      `,
      text: `
Your Golf Personality: ${personalityType} - ${personalityName}

Hi ${firstName || 'there'}!

You've completed the MyGolfType assessment! Your golf personality type is ${personalityType} - ${personalityName}.

${personalityMotto ? `"${personalityMotto}"` : ''}

This means you have a unique approach to the game that affects everything from how you prepare for rounds to how you interact with playing partners.

Want Your Complete Golf Profile?
Get a comprehensive 25-page report with detailed analysis, course strategy tips, and perfect playing partner matches for your ${personalityName} type.

Visit: https://mygolftype.com/premium

Thanks for taking the assessment!

Best regards,
The MyGolfType Team

MyGolfType.com
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json(
      { success: true, messageId: data.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}