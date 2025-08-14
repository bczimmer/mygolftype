// Enhanced email API route with dynamic teasers
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Teaser content for each personality type
const TEASERS = {
  CIUC: {
    title: "The Social Striker",
    motto: "Let's play ready golf for $20 a side",
    preview: "You are golf's ultimate competitor-connector: the player who transforms every round into a social competition. You don't just play golf—you orchestrate it. Your magnetic energy pulls groups together while your competitive fire keeps everyone engaged.",
    powerPairing: "CCUC (The Stats Socialite) - 89%",
    dangerZone: "FIDR (The Golf Monk) - 23%",
    exclusive: "Social Striker Exclusive: Betting game organizer toolkit"
  },
  CIUR: {
    title: "The Weekend Warrior", 
    motto: "It's Saturday, let's have fun!",
    preview: "You've cracked the code on golf's true purpose: maximum fun in minimum time. While others stress about scores or spend hours on mechanics, you know that golf's real victory is four hours of friendship, laughter, and occasional great shots.",
    powerPairing: "CCUR (The Techno Recreator) - 92%",
    dangerZone: "FCDC (The Grinder) - 18%",
    exclusive: "Weekend Warrior Exclusive: Ultimate playlist and party planning guide"
  },
  CIDC: {
    title: "The Tournament Director",
    motto: "Let's do this right, but enjoy it", 
    preview: "You are golf's perfect ambassador—the player who elevates every round from casual game to memorable event. You possess the rare gift of bringing structure and gravitas to golf while keeping it thoroughly enjoyable.",
    powerPairing: "CCDC (The Club Champion) - 94%",
    dangerZone: "FCUR (The Quick Thinker) - 31%",
    exclusive: "Tournament Director Exclusive: Event organization templates and formats"
  },
  CIDR: {
    title: "The Social Ambassador",
    motto: "What's the hurry? We're golfing!",
    preview: "You understand golf's greatest secret: the game is just an excuse for four hours of uninterrupted human connection. While others chase scores or perfect swings, you're building relationships, creating memories, and ensuring everyone leaves happier than they arrived.",
    powerPairing: "CCDR (The Teaching Pro Friend) - 96%", 
    dangerZone: "FIUC (The Efficient Assassin) - 22%",
    exclusive: "Social Ambassador Exclusive: Conversation starters and group harmony toolkit"
  },
  CCUC: {
    title: "The Stats Socialite",
    motto: "According to my Arccos data...",
    preview: "You've discovered golf's perfect fusion: the analytical precision of data with the joy of sharing it. While others either obsess over numbers privately or ignore them completely, you've created a third way—turning statistics into stories and metrics into conversations.",
    powerPairing: "CIUC (The Social Striker) - 89%",
    dangerZone: "FIDR (The Golf Monk) - 19%", 
    exclusive: "Stats Socialite Exclusive: Data sharing templates and teaching frameworks"
  },
  CCUR: {
    title: "The Techno Recreator",
    motto: "My launch monitor says...",
    preview: "You've achieved golf's holy grail: combining cutting-edge technology with pure enjoyment. While others see gadgets as pressure or distraction, you've discovered that data enhances rather than diminishes the fun.",
    powerPairing: "CIUR (The Weekend Warrior) - 92%",
    dangerZone: "FCDC (The Grinder) - 24%",
    exclusive: "Techno Recreator Exclusive: Device setup guides and emerging tech reviews"
  },
  CCDC: {
    title: "The Club Champion", 
    motto: "Let me show you the proper way",
    preview: "You represent golf's finest tradition: excellence achieved through knowledge, shared with grace. You don't just play golf at a high level—you elevate everyone around you through your combination of technical mastery and social leadership.",
    powerPairing: "CIDC (The Tournament Director) - 94%",
    dangerZone: "CIUR (The Weekend Warrior) - 29%",
    exclusive: "Club Champion Exclusive: Teaching frameworks and mentorship guides"
  },
  CCDR: {
    title: "The Teaching Pro Friend",
    motto: "Have you tried this drill?",
    preview: "You possess golf's most generous gift: the ability to help others improve while keeping the game thoroughly enjoyable. You're the player everyone wants in their group—not because you're the best (though you're quite good), but because you make everyone else better.",
    powerPairing: "CIDR (The Social Ambassador) - 96%",
    dangerZone: "FIUC (The Efficient Assassin) - 21%",
    exclusive: "Teaching Pro Friend Exclusive: Instruction frameworks and drill libraries"
  },
  FIUC: {
    title: "The Efficient Assassin",
    motto: "Nods, hits, walks",
    preview: "You are golf's ultimate predator: silent, swift, and devastatingly effective. While others analyze, socialize, or deliberate, you simply execute. Your quiet intensity and lightning pace mask a competitive fire that burns hotter than anyone realizes.",
    powerPairing: "CIUC (The Social Striker) - 85%",
    dangerZone: "CIDR (The Social Ambassador) - 22%",
    exclusive: "Efficient Assassin Exclusive: Speed optimization and pressure tactics guide"
  },
  FIUR: {
    title: "The Zen Speedster",
    motto: "I just love being out here",
    preview: "You've solved golf's greatest paradox: playing fast while staying peaceful. You flow through 18 holes like water down a mountain—swift, natural, unforced. While others either rush anxiously or dawdle deliberately, you've found the perfect rhythm.",
    powerPairing: "FCUR (The Quick Thinker) - 91%",
    dangerZone: "CCDC (The Club Champion) - 28%",
    exclusive: "Zen Speedster Exclusive: Flow state optimization and pace mastery guides"
  },
  FIDC: {
    title: "The Feel Player",
    motto: "I need to see it first",
    preview: "You possess golf's rarest gift: the ability to see shots before they exist. While others calculate, you create. Your pre-shot visualization isn't just mental preparation—it's artistic composition. You paint shots with your clubs, sculpting ball flights that exist first in your imagination, then in reality.",
    powerPairing: "FIDR (The Golf Monk) - 91%",
    dangerZone: "CCUR (The Techno Recreator) - 48%",
    exclusive: "Feel Player Exclusive: Visualization exercises from tour pros"
  },
  FIDR: {
    title: "The Golf Monk",
    motto: "Listen to the course",
    preview: "You experience golf as a moving meditation. While others chase scores, you seek something deeper—a connection with the game that transcends numbers. Your slow, deliberate pace isn't about indecision; it's about presence.",
    powerPairing: "FCDR (The Range Scientist) - 94%",
    dangerZone: "CIUC (The Social Striker) - 23%",
    exclusive: "Golf Monk Exclusive: Meditation techniques and mindfulness frameworks"
  },
  FCUC: {
    title: "The Calculated Assassin", 
    motto: "137 yards, half-club wind, let's go",
    preview: "You are golf's precision instrument: a player who combines analytical excellence with ruthless efficiency. While others either think too much or too little, you've found the perfect balance—gathering exactly the data you need, making the optimal decision, and executing without hesitation.",
    powerPairing: "FIDC (The Feel Player) - 88%",
    dangerZone: "CCUR (The Techno Recreator) - 31%",
    exclusive: "Calculated Assassin Exclusive: Decision trees and course strategy frameworks"
  },
  FCUR: {
    title: "The Quick Thinker",
    motto: "Interesting data point",
    preview: "You possess golf's most practical intelligence: the ability to process information rapidly without getting bogged down in analysis paralysis. While others either overthink or underthink, you've mastered the art of smart, fast decisions.",
    powerPairing: "FIUR (The Zen Speedster) - 91%",
    dangerZone: "CIDC (The Tournament Director) - 31%",
    exclusive: "Quick Thinker Exclusive: Strategy adaptation frameworks and course reading guides"
  },
  FCDC: {
    title: "The Grinder",
    motto: "This putt breaks 3.5 inches",
    preview: "You are golf's ultimate competitor—the player who extracts every fraction of a stroke from their ability through sheer force of will and methodical precision. While others hope, you calculate. While others guess, you know.",
    powerPairing: "FIDC (The Feel Player) - 88%",
    dangerZone: "CIUR (The Weekend Warrior) - 18%",
    exclusive: "Grinder Exclusive: Shot tracking template and analysis framework"
  },
  FCDR: {
    title: "The Range Scientist",
    motto: "I'm working on something",
    preview: "You understand golf's deepest truth: the game is an endless laboratory where every swing teaches something new. While others chase scores or social experiences, you pursue understanding—the pure joy of discovering how your body, mind, and club can work together more perfectly.",
    powerPairing: "FIDR (The Golf Monk) - 94%",
    dangerZone: "CIUC (The Social Striker) - 16%",
    exclusive: "Range Scientist Exclusive: Practice design frameworks and learning acceleration guides"
  }
};

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

    // Get teaser content for this personality type
    const teaser = TEASERS[personalityType as keyof typeof TEASERS];
    
    if (!teaser) {
      return NextResponse.json(
        { error: `Unknown personality type: ${personalityType}` },
        { status: 400 }
      );
    }

    // Generate the compatibility matrix HTML (embedded as base64 or inline)
    const compatibilityMatrixHTML = `
      <div style="background: white; border-radius: 12px; padding: 20px; margin: 30px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; color: #16a34a; font-size: 20px; font-weight: bold; margin-bottom: 15px;">
          🎯 FREE GIFT: Power Pairings Matrix
        </div>
        <div style="text-align: center; color: #6b7280; font-size: 14px; margin-bottom: 20px;">
          Your Complete Compatibility Guide
        </div>
        <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center;">
          <p style="margin: 0; font-size: 14px; color: #374151;">
            <strong>Your Best Match:</strong> ${teaser.powerPairing}<br>
            <strong>Avoid If Possible:</strong> ${teaser.dangerZone}
          </p>
          <p style="margin: 15px 0 0 0; font-size: 12px; color: #6b7280;">
            <a href="https://mygolftype.com/compatibility-matrix" style="color: #22c55e; text-decoration: none;">
              → View Complete 16x16 Compatibility Matrix
            </a>
          </p>
        </div>
      </div>
    `;

    // Send the assessment results email
    const { data, error } = await resend.emails.send({
      from: 'MyGolfType <results@mygolftype.com>',
      to: [email],
      subject: `Your Golf Personality: ${teaser.title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Your Golf Personality Results</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fffe;">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #22c55e; font-size: 28px; margin-bottom: 10px;">Your Golf Personality</h1>
            <div style="font-size: 48px; font-weight: bold; color: #16a34a; margin: 20px 0;">${personalityType}</div>
            <h2 style="color: #374151; font-size: 22px; margin-bottom: 10px;">${teaser.title}</h2>
            <p style="font-style: italic; color: #6b7280; font-size: 18px;">"${teaser.motto}"</p>
          </div>

          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #16a34a; margin-top: 0;">Hi ${firstName || 'there'}!</h3>
            <p>You've completed the MyGolfType assessment! Your golf personality type is <strong>${personalityType}</strong> - ${teaser.title}.</p>
            <p>This means you have a unique approach to the game that affects everything from how you prepare for rounds to how you interact with playing partners.</p>
          </div>

          ${compatibilityMatrixHTML}

          <div style="background-color: #1f2937; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
            <h3 style="color: #22c55e; margin-top: 0;">Want Your Complete Golf Profile?</h3>
            <p style="margin-bottom: 20px;">Get a comprehensive 25-page report with detailed analysis, course strategy tips, and perfect playing partner matches for your ${teaser.title} type.</p>
            <a href="https://mygolftype.com/premium/${personalityType.toLowerCase()}" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Get Full Report - $19.99</a>
          </div>

          <!-- TEASER CONTENT STARTS HERE -->
          <div style="background: white; padding: 30px; border-radius: 12px; margin: 30px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <h2 style="color: #16a34a; font-size: 24px; margin-bottom: 20px; text-align: center;">
              Your Core Type: ${teaser.title}
            </h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 25px;">
              ${teaser.preview}
            </p>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #374151; margin-top: 0; font-size: 18px;">🔒 Your Premium Report Includes:</h3>
              <ul style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                <li><strong>25+ Pages</strong> of personalized insights</li>
                <li><strong>Compatibility scores</strong> with all 16 GolfTypes</li>
                <li><strong>Equipment recommendations</strong> based on 10,000+ data points</li>
                <li><strong>Mental game strategies</strong> designed for your specific type</li>
                <li><strong>Course management plans</strong> optimized for your style</li>
                <li><strong>Finding your tribe</strong> action plans and templates</li>
                <li><strong>Bonus:</strong> Phone wallpaper and wallet card with your type</li>
                <li><strong>${teaser.exclusive}</strong></li>
              </ul>
            </div>

            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0;">
              <h4 style="color: #92400e; margin-top: 0; font-size: 16px;">⚠️ Limited Time Launch Price</h4>
              <p style="color: #92400e; font-size: 14px; margin: 0;">
                <span style="text-decoration: line-through;">$49.99</span> → <strong>$19.99</strong>
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://mygolftype.com/premium/${personalityType.toLowerCase()}" 
                 style="background-color: #22c55e; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                UNLOCK MY PREMIUM REPORT
              </a>
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <p style="font-style: italic; color: #6b7280; font-size: 14px; text-align: center;">
                "Learning I'm ${teaser.title} changed everything. I found my people and my golf improved dramatically."
              </p>
            </div>

          </div>
          <!-- TEASER CONTENT ENDS HERE -->

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; text-align: center;">
            <p>Thanks for taking the assessment!</p>
            <p>Best regards,<br>The MyGolfType Team</p>
            <p style="margin-top: 20px;">
              <a href="https://mygolftype.com" style="color: #22c55e;">MyGolfType.com</a> | 
              <a href="mailto:support@mygolftype.com" style="color: #6b7280;">Support</a> |
              <a href="#" style="color: #6b7280;">Unsubscribe</a>
            </p>
          </div>

        </body>
        </html>
      `,
      text: `
Your Golf Personality: ${personalityType} - ${teaser.title}

"${teaser.motto}"

Hi ${firstName || 'there'}!

You've completed the MyGolfType assessment! Your golf personality type is ${personalityType} - ${teaser.title}.

${teaser.preview}

COMPATIBILITY HIGHLIGHTS:
Your Best Match: ${teaser.powerPairing}
Avoid If Possible: ${teaser.dangerZone}

Want Your Complete Golf Profile?
Get a comprehensive 25-page report with detailed analysis, course strategy tips, and perfect playing partner matches for your ${teaser.title} type.

LIMITED TIME: $19.99 (normally $49.99)

Get your report: https://mygolftype.com/premium/${personalityType.toLowerCase()}

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