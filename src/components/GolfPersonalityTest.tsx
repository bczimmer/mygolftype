'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Share, X, Copy, Check, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const GolfPersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [personalityType, setPersonalityType] = useState('');
  
  // New state for session tracking
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const questions = [
    // Social Energy Questions (1-8)
    {
      id: 1,
      category: 'social',
      question: 'Your ideal group size for golf is:',
      options: [
        { text: 'Just me and one other', value: 'F' },
        { text: 'Foursome always - more the merrier', value: 'C' },
        { text: 'Threesome - perfect balance', value: 'C' },
        { text: "Don't care as long as we play", value: 'F' }
      ]
    },
    {
      id: 2,
      category: 'social',
      question: 'After an incredible shot, you:',
      options: [
        { text: 'Retrieve your ball and smile', value: 'F' },
        { text: 'High-fives all around', value: 'C' },
        { text: 'Grin and accept congratulations', value: 'F' },
        { text: 'Celebrate and save this gem for story time', value: 'C' }
      ]
    },
    {
      id: 3,
      category: 'social',
      question: 'When paired with strangers, you:',
      options: [
        { text: 'Exchange pleasantries then focus on your game', value: 'F' },
        { text: 'Try to learn more about them', value: 'C' },
        { text: 'Stick with your usual playing partner', value: 'F' },
        { text: "Make sure everyone's having fun", value: 'C' }
      ]
    },
    {
      id: 4,
      category: 'social',
      question: 'Your cart conversation consists of:',
      options: [
        { text: 'Comfortable silence', value: 'F' },
        { text: 'Thoughtful conversation', value: 'C' },
        { text: 'Strategy and swing observations', value: 'F' },
        { text: 'Work, life, whatever', value: 'C' }
      ]
    },
    {
      id: 5,
      category: 'social',
      question: 'At the turn, you prefer to:',
      options: [
        { text: 'Grab whatever is ready and keep moving', value: 'F' },
        { text: 'Order food, a drink or two, take a moment', value: 'C' },
        { text: 'Use the bathroom and go', value: 'F' },
        { text: 'Buy a round for the group', value: 'C' }
      ]
    },
    {
      id: 6,
      category: 'social',
      question: 'Post-round, you:',
      options: [
        { text: 'Head straight home', value: 'F' },
        { text: 'Belly up to the bar for drinks and stories', value: 'C' },
        { text: 'Enter your GHIN stats in the car', value: 'F' },
        { text: "Organize next week's game", value: 'C' }
      ]
    },
    {
      id: 7,
      category: 'social',
      question: 'When someone asks "what\'d you shoot?":',
      options: [
        { text: 'Give them a quick number and move on', value: 'F' },
        { text: 'Give a number, but add a story or two', value: 'C' },
        { text: '"Meh, coulda been worse"', value: 'F' },
        { text: 'Tell them, and ask how they played', value: 'C' }
      ]
    },
    {
      id: 8,
      category: 'social',
      question: 'Your preferred practice routine:',
      options: [
        { text: 'An empty range with headphones', value: 'F' },
        { text: 'Hit a few buckets with friends', value: 'C' },
        { text: 'Surgical and purposeful', value: 'F' },
        { text: "Putting contest with whoever is up for it", value: 'C' }
      ]
    },
    // Information Processing Questions (9-16)
    {
      id: 9,
      category: 'processing',
      question: 'Club selection process:',
      options: [
        { text: 'See the shot, grab the club', value: 'I' },
        { text: 'Calculate range, wind, elevation, temperature...', value: 'C' },
        { text: 'Whatever feels right', value: 'I' },
        { text: 'Pace it off and reference your yardage book', value: 'C' }
      ]
    },
    {
      id: 10,
      category: 'processing',
      question: 'Reading putts:',
      options: [
        { text: 'See the line immediately', value: 'I' },
        { text: 'Survey, Aimpoint, check notes', value: 'C' },
        { text: 'First instinct is usually right', value: 'I' },
        { text: 'Read the putt from at least two sides', value: 'C' }
      ]
    },
    {
      id: 11,
      category: 'processing',
      question: 'Your swing thought:',
      options: [
        { text: 'One feeling, maybe none', value: 'I' },
        { text: 'Checkpoint sequence', value: 'C' },
        { text: 'Words like "smooth" or "easy"', value: 'I' },
        { text: 'Specific positions and angles', value: 'C' }
      ]
    },
    {
      id: 12,
      category: 'processing',
      question: 'When buying new clubs:',
      options: [
        { text: 'Hit them once, know immediately', value: 'I' },
        { text: 'Hit a few configurations on the simulator', value: 'C' },
        { text: 'Whatever looks good at address', value: 'I' },
        { text: 'Fall into an internet rabbit hole', value: 'C' }
      ]
    },
    {
      id: 13,
      category: 'processing',
      question: 'Course strategy:',
      options: [
        { text: "Play what's in front of you", value: 'I' },
        { text: 'Execute the play with the highest success probability', value: 'C' },
        { text: "Changes depending on how I'm hitting it", value: 'I' },
        { text: 'Make a solid plan and stick to it', value: 'C' }
      ]
    },
    {
      id: 14,
      category: 'processing',
      question: 'Practice philosophy:',
      options: [
        { text: 'Hit balls until it feels good', value: 'I' },
        { text: 'Structured drills - no aimless practice', value: 'C' },
        { text: "Build a repeatable feeling", value: 'I' },
        { text: 'Best done with performance data', value: 'C' }
      ]
    },
    {
      id: 15,
      category: 'processing',
      question: 'Wind adjustment:',
      options: [
        { text: 'Feels like about one club', value: 'I' },
        { text: '1 mph = 1 yard calculation', value: 'C' },
        { text: 'Watch the trees and guess', value: 'I' },
        { text: 'Calculate in quarter club increments', value: 'C' }
      ]
    },
    {
      id: 16,
      category: 'processing',
      question: 'Learning new shots:',
      options: [
        { text: 'Experiment until it works', value: 'I' },
        { text: 'Watch YouTube tutorials and slow motion', value: 'C' },
        { text: 'Copy a move I saw executed well', value: 'I' },
        { text: 'Get a lesson with launch monitor feedback', value: 'C' }
      ]
    },
    // Pace Questions (17-24)
    {
      id: 17,
      category: 'pace',
      question: 'Your tee time is 8:00 AM. You arrive at:',
      options: [
        { text: '7:30 - full warmup routine', value: 'D' },
        { text: '7:45 - quick bucket', value: 'U' },
        { text: '7:55 - straight to first tee', value: 'U' },
        { text: '7:40 - standard prep time', value: 'D' }
      ]
    },
    {
      id: 18,
      category: 'pace',
      question: 'Pre-shot routine takes:',
      options: [
        { text: 'Same every time, about 30 seconds', value: 'D' },
        { text: 'One practice swing and go', value: 'U' },
        { text: 'Depends on the shot difficulty', value: 'D' },
        { text: 'As little time as possible', value: 'U' }
      ]
    },
    {
      id: 19,
      category: 'pace',
      question: 'When others are away:',
      options: [
        { text: 'Already at my ball planning', value: 'U' },
        { text: 'Watch them hit, learn from it', value: 'D' },
        { text: 'Walking ahead if safe', value: 'U' },
        { text: 'Clean clubs, fix divots', value: 'D' }
      ]
    },
    {
      id: 20,
      category: 'pace',
      question: 'Ready golf means:',
      options: [
        { text: "Whoever's ready hits", value: 'U' },
        { text: 'Still should follow honors mostly', value: 'D' },
        { text: 'The way golf should be played', value: 'U' },
        { text: 'Fine if we are asked to pick it up', value: 'D' }
      ]
    },
    {
      id: 21,
      category: 'pace',
      question: 'Looking for a lost ball:',
      options: [
        { text: 'Two minutes max, take the penalty', value: 'U' },
        { text: 'Use the time allowed', value: 'D' },
        { text: 'Quick look, provisional ready', value: 'U' },
        { text: 'Everyone helps search properly', value: 'D' }
      ]
    },
    {
      id: 22,
      category: 'pace',
      question: 'Waiting on the tee box:',
      options: [
        { text: 'Painful - let us through', value: 'U' },
        { text: 'Part of the game, relax', value: 'D' },
        { text: 'Good time to recalculate score', value: 'D' },
        { text: 'Should have started earlier/later', value: 'U' }
      ]
    },
    {
      id: 23,
      category: 'pace',
      question: 'Cart path only days:',
      options: [
        { text: 'Take three clubs and walk fast', value: 'U' },
        { text: 'Drive to each ball properly', value: 'D' },
        { text: 'Grab entire bag, hustle', value: 'U' },
        { text: 'Plan the route carefully', value: 'D' }
      ]
    },
    {
      id: 24,
      category: 'pace',
      question: 'Scorecard management:',
      options: [
        { text: 'Update after each hole before moving', value: 'D' },
        { text: 'Every few holes when convenient', value: 'U' },
        { text: 'Quick marks, add it up later', value: 'U' },
        { text: 'Score, net, fairway, green and putt total', value: 'D' }
      ]
    },
    // Competition Questions (25-32)
    {
      id: 25,
      category: 'purpose',
      question: 'Improving your lie:',
      options: [
        { text: 'Never, play it as it lies', value: 'C' },
        { text: 'Roll it in fairway if needed', value: 'R' },
        { text: "Depends who I'm playing with", value: 'R' },
        { text: 'Only in official competitions', value: 'C' }
      ]
    },
    {
      id: 26,
      category: 'purpose',
      question: 'Gimmes inside 2 feet:',
      options: [
        { text: 'No gimmes ever', value: 'C' },
        { text: "Of course, we're not on tour", value: 'R' },
        { text: 'Only in match play', value: 'C' },
        { text: 'Whatever speeds things up', value: 'R' }
      ]
    },
    {
      id: 27,
      category: 'purpose',
      question: 'A bad round means:',
      options: [
        { text: 'Analyze what went wrong', value: 'C' },
        { text: 'At least I was outside', value: 'R' },
        { text: 'Work harder on my game', value: 'C' },
        { text: 'Still better than working', value: 'R' }
      ]
    },
    {
      id: 28,
      category: 'purpose',
      question: 'Playing from appropriate tees:',
      options: [
        { text: "Whatever's most fun for everyone", value: 'R' },
        { text: 'I like a challenge', value: 'C' },
        { text: 'Black tees or Blue tees, minimum', value: 'C' },
        { text: 'Wherever my friends are playing', value: 'R' }
      ]
    },
    {
      id: 29,
      category: 'purpose',
      question: 'Breakfast ball on first tee:',
      options: [
        { text: "That's not a real score then", value: 'C' },
        { text: 'Everyone gets one mulligan', value: 'R' },
        { text: "Not if we're keeping handicap", value: 'C' },
        { text: "Of course. Let's start the day right", value: 'R' }
      ]
    },
    {
      id: 30,
      category: 'purpose',
      question: 'Music on the course:',
      options: [
        { text: 'Ruins the competition atmosphere', value: 'C' },
        { text: 'Makes it more enjoyable', value: 'R' },
        { text: 'Fine in casual rounds only', value: 'C' },
        { text: 'Turn. It. Up.', value: 'R' }
      ]
    },
    {
      id: 31,
      category: 'purpose',
      question: 'When someone needs a rules ruling:',
      options: [
        { text: 'I know most of them', value: 'C' },
        { text: "Make something up that's fair", value: 'R' },
        { text: 'Check the USGA app', value: 'C' },
        { text: 'Give them the benefit', value: 'R' }
      ]
    },
    {
      id: 32,
      category: 'purpose',
      question: 'Ideal stakes for a match:',
      options: [
        { text: 'Pride is enough', value: 'C' },
        { text: 'Drinks and laughs', value: 'R' },
        { text: 'Enough to matter', value: 'C' },
        { text: 'Just happy to be out', value: 'R' }
      ]
    }
  ];

  // Simplified personality descriptions for brevity
  type PersonalityKey = 'CIUC' | 'CIUR' | 'CIDC' | 'CIDR' | 'CCUC' | 'CCUR' | 'CCDC' | 'CCDR' | 'FIUC' | 'FIUR' | 'FIDC' | 'FIDR' | 'FCUC' | 'FCUR' | 'FCDC' | 'FCDR';
 
  const personalityDescriptions: Record<PersonalityKey, {
  name: string;
  description: string;
  motto: string;
  strengths: string[];
  challenges: string[];
  bestWith: string[];
  avoidWith: string[];
}> = {
    'CIUC': {
      name: 'The Social Striker',
      description: 'The Connecting, Intuitive, Urgent, Competitor',
      motto: 'Ready golf for $20 a side',
      strengths: ['Energizes the group', 'Keeps pace moving', 'Makes golf fun and competitive'],
      challenges: ['May overwhelm quiet players', 'Competition focus might annoy recreators'],
      bestWith: ['CCUC', 'CIUC', 'FCUC'],
      avoidWith: ['FIDR', 'FCDR']
    },
    'CIUR': {
      name: 'The Weekend Warrior',
      description: 'The Connecting, Intuitive, Urgent, Recreator',
      motto: 'Saturday fun day!',
      strengths: ['Makes every round enjoyable', 'Never slows down play', 'Great energy'],
      challenges: ['Might annoy serious competitors', 'Can be too loud for some'],
      bestWith: ['CCUR', 'CIUR', 'CIDR'],
      avoidWith: ['FCDC', 'FIDC']
    },
    'CIDC': {
      name: 'The Tournament Director',
      description: 'The Connecting, Intuitive, Deliberate, Competitor',
      motto: 'Do it right and enjoy it',
      strengths: ['Natural organizer', 'Balances fun with competition', 'Great at reading people'],
      challenges: ['Can be too structured', 'Pace might frustrate urgent players'],
      bestWith: ['CCDC', 'CIDC', 'FIDC'],
      avoidWith: ['FCUR', 'FIUR']
    },
    'CIDR': {
      name: 'The Social Ambassador',
      description: 'The Connecting, Intuitive, Deliberate, Recreator',
      motto: 'No hurry, we are golfing!',
      strengths: ['Creates welcoming atmosphere', 'Remembers everyone', 'Makes golf relaxing'],
      challenges: ['Too slow for many', 'May talk too much for focused players'],
      bestWith: ['CCDR', 'CIDR', 'FIDR'],
      avoidWith: ['FCUC', 'FIUC']
    },
    'CCUC': {
      name: 'The Stats Socialite',
      description: 'The Connecting, Calculated, Urgent, Competitor',
      motto: 'According to my Arccos data...',
      strengths: ['Data-driven improvement', 'Helps others with strategy', 'Fast despite calculations'],
      challenges: ['Can over-analyze', 'May bore non-technical players'],
      bestWith: ['CIUC', 'CCUC', 'FCUC'],
      avoidWith: ['FIDR', 'CIDR']
    },
    'CCUR': {
      name: 'The Techno Recreator',
      description: 'The Connecting, Calculated, Urgent, Recreator',
      motto: 'My launch monitor says...',
      strengths: ['Makes technology fun', 'Helpful with equipment', 'Keeps things light'],
      challenges: ['Gadget talk may annoy purists', 'Can get distracted by tech'],
      bestWith: ['CIUR', 'CCUR', 'FCUR'],
      avoidWith: ['FIDC', 'FCDC']
    },
    'CCDC': {
      name: 'The Club Champion',
      description: 'The Connecting, Calculated, Deliberate, Competitor',
      motto: 'Let me show you the proper way',
      strengths: ['Excellent course knowledge', 'Natural teacher', 'Respects the game'],
      challenges: ['Can be pedantic', 'Pace frustrates urgent players'],
      bestWith: ['CIDC', 'CCDC', 'FCDC'],
      avoidWith: ['CIUR', 'FIUR']
    },
    'CCDR': {
      name: 'The Teaching Pro Friend',
      description: 'The Connecting, Calculated, Deliberate, Recreator',
      motto: 'Have you tried this drill?',
      strengths: ['Generous with knowledge', 'Makes learning fun', 'Very patient'],
      challenges: ['May give too much advice', 'Can slow down play'],
      bestWith: ['CIDR', 'CCDR', 'FCDR'],
      avoidWith: ['FIUC', 'FCUC']
    },
    'FIUC': {
      name: 'The Efficient Assassin',
      description: 'The Focused, Intuitive, Urgent, Competitor',
      motto: 'Nods, hits, walks',
      strengths: ['Never slows play', 'Clutch under pressure', 'Leads by example'],
      challenges: ['Can seem unfriendly', 'May intimidate others'],
      bestWith: ['FCUC', 'FIUC', 'CIUC'],
      avoidWith: ['CCDR', 'CIDR']
    },
    'FIUR': {
      name: 'The Zen Speedster',
      description: 'The Focused, Intuitive, Urgent, Recreator',
      motto: 'I just love being out here',
      strengths: ['Peaceful presence', 'Never holds up play', 'Pure joy for the game'],
      challenges: ['May seem disconnected', 'Not competitive enough for some'],
      bestWith: ['FCUR', 'FIUR', 'CIUR'],
      avoidWith: ['CCDC', 'FCDC']
    },
    'FIDC': {
      name: 'The Feel Player',
      description: 'The Focused, Intuitive, Deliberate, Competitor',
      motto: 'I need to see it first',
      strengths: ['Great touch around greens', 'Excellent visualization', 'Clutch performer'],
      challenges: ['Can be too slow', 'May overthink shots'],
      bestWith: ['FCDC', 'FIDC', 'CIDC'],
      avoidWith: ['CCUR', 'CIUR']
    },
    'FIDR': {
      name: 'The Golf Monk',
      description: 'The Focused, Intuitive, Deliberate, Recreator',
      motto: 'Listen to the course',
      strengths: ['Never rattled', 'Appreciates the game deeply', 'Calming presence'],
      challenges: ['Too slow for many', 'Not social enough for some'],
      bestWith: ['FCDR', 'FIDR', 'CIDR'],
      avoidWith: ['FIUC', 'FCUC', 'CIUC']
    },
    'FCUC': {
      name: 'The Calculated Assassin',
      description: 'The Focused, Calculated, Urgent, Competitor',
      motto: '137 yards, half-club wind, go',
      strengths: ['Extremely precise', 'Fast despite calculations', 'Data-driven success'],
      challenges: ['Can seem robotic', 'May frustrate feel players'],
      bestWith: ['FIUC', 'FCUC', 'CCUC'],
      avoidWith: ['CIDR', 'FIDR']
    },
    'FCUR': {
      name: 'The Quick Thinker',
      description: 'The Focused, Calculated, Urgent, Recreator',
      motto: 'Interesting data point',
      strengths: ['Makes math fun', 'Efficient without pressure', 'Good pace'],
      challenges: ['May overanalyze', 'Can confuse non-math types'],
      bestWith: ['FIUR', 'FCUR', 'CCUR'],
      avoidWith: ['CIDC', 'FIDC']
    },
    'FCDC': {
      name: 'The Grinder',
      description: 'The Focused, Calculated, Deliberate, Competitor',
      motto: 'This putt breaks 3.5 inches',
      strengths: ['Extremely consistent', 'Great under pressure', 'Course management expert'],
      challenges: ['Can slow down play', 'May seem antisocial'],
      bestWith: ['FIDC', 'FCDC', 'CCDC'],
      avoidWith: ['CIUR', 'CCUR']
    },
    'FCDR': {
      name: 'The Range Scientist',
      description: 'The Focused, Calculated, Deliberate, Recreator',
      motto: 'Working on something',
      strengths: ['Always improving', 'Very consistent', 'Shares technical knowledge'],
      challenges: ['Can be too technical', 'May lose sight of scoring'],
      bestWith: ['FIDR', 'FCDR', 'CCDR'],
      avoidWith: ['CIUC', 'FIUC']
    }
  };

  // Initialize session on component mount
  useEffect(() => {
    initializeSession();
  }, []);

  // Reset question timer when question changes
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestion]);

  const initializeSession = async () => {
    try {
      // Get user data from sessionStorage (set by landing page)
      const storedUserId = sessionStorage.getItem('userId');
      const referrer = sessionStorage.getItem('referrer') || 'direct';
      const userAgent = sessionStorage.getItem('userAgent') || '';
      
      if (!storedUserId) {
        console.error('No user ID found in session');
        setIsLoading(false);
        return;
      }

      setUserId(storedUserId);
      
      // Create new assessment session
      const { data: sessionData, error: sessionError } = await supabase
        .from('assessment_sessions')
        .insert([{
          user_id: storedUserId,
          questions_answered: 0,
          user_agent: userAgent,
          referrer: referrer
        }])
        .select()
        .single();

      if (sessionError) {
        throw sessionError;
      }

      setSessionId(sessionData.session_id);
      console.log('Assessment session initialized:', sessionData.session_id);
      setIsLoading(false);

    } catch (error) {
      console.error('Error initializing session:', error);
      setIsLoading(false);
    }
  };

  const saveResponse = async (questionIndex: number, responseValue: string) => {
    if (!sessionId) return;

    try {
      const question = questions[questionIndex];
      const responseTime = Date.now() - questionStartTime;
      
      // Save individual response
      await supabase.from('assessment_responses').insert([{
        session_id: sessionId,
        question_id: question.id,
        question_category: question.category,
        response_value: responseValue,
        response_time_ms: responseTime
      }]);
      
      // Update session progress
      await supabase
        .from('assessment_sessions')
        .update({ 
          questions_answered: questionIndex + 1 
        })
        .eq('session_id', sessionId);

      console.log(`Question ${questionIndex + 1} saved: ${responseValue} (${responseTime}ms)`);
        
    } catch (error) {
      console.error('Error saving response:', error);
    }
  };

  const handleAnswer = async (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    
    // Save this response to database
    await saveResponse(currentQuestion, value);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await calculateAndSavePersonality(newAnswers);
    }
  };

  const sendResultsEmail = async (personalityType: string) => {
    try {
      const userEmail = sessionStorage.getItem('userEmail');
      const userName = sessionStorage.getItem('userName');
      
      if (!userEmail) {
        console.log('No email found in session, skipping email send');
        return;
      }

      const description = personalityDescriptions[personalityType as PersonalityKey];
      
      const response = await fetch('/api/send-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          firstName: userName,
          personalityType: personalityType,
          personalityName: description?.name || 'Your Golf Type',
          personalityMotto: description?.motto || ''
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Results email sent successfully:', result.messageId);
      } else {
        console.error('Failed to send results email:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending results email:', error);
    }
  };

  // Sharing functions
  const handleNativeShare = async () => {
    const description = personalityDescriptions[personalityType as PersonalityKey] || personalityDescriptions['CIUC'];
    const shareData = {
      title: `I'm ${personalityType} - ${description.name} | MyGolfType`,
      text: `Just discovered my golf personality - I'm ${personalityType} (${description.name})! What's yours? Takes 2 minutes to find out!`,
      url: 'https://mygolftype.com'
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return true;
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
  console.log('Error sharing:', err);
}
        return false;
      }
    }
    return false;
  };

  const handleShare = async () => {
    const shared = await handleNativeShare();
    if (!shared) {
      setIsShareModalOpen(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('https://mygolftype.com');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://mygolftype.com')}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const description = personalityDescriptions[personalityType as PersonalityKey] || personalityDescriptions['CIUC'];
    const text = `Just discovered my golf personality - I'm ${personalityType} (${description.name})! What's yours? Takes 2 minutes to find out! https://mygolftype.com`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = () => {
    const description = personalityDescriptions[personalityType as PersonalityKey] || personalityDescriptions['CIUC'];
    const text = `Just discovered my golf personality - I'm ${personalityType} (${description.name})! What's yours? Takes 2 minutes to find out! https://mygolftype.com`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToEmail = () => {
    const description = personalityDescriptions[personalityType as PersonalityKey] || personalityDescriptions['CIUC'];
    const subject = encodeURIComponent(`What's Your Golf Personality? I'm ${personalityType}!`);
    const body = encodeURIComponent(`Hey! I just took this cool golf personality assessment and discovered I'm ${personalityType} - ${description.name}.\n\n"${description.motto}"\n\nWhat's your golf personality? Takes just 2 minutes to find out:\nhttps://mygolftype.com`);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
  };

  const calculateAndSavePersonality = async (allAnswers: Record<number, string>) => {
    const counts: Record<string, Record<string, number>> = {
      social: { C: 0, F: 0 },
      processing: { I: 0, C: 0 },
      pace: { U: 0, D: 0 },
      purpose: { C: 0, R: 0 }
    };

    questions.slice(0, 32).forEach((q, index) => {
      const answer = allAnswers[index];
      if (answer && counts[q.category] && counts[q.category][answer] !== undefined) {
        counts[q.category][answer]++;
      }
    });

    const social = counts.social.C >= 5 ? 'C' : 'F';
    const processing = counts.processing.I >= 5 ? 'I' : 'C';
    const pace = counts.pace.U >= 5 ? 'U' : 'D';
    const purpose = counts.purpose.C >= 5 ? 'C' : 'R';

    const type = social + processing + pace + purpose;
    setPersonalityType(type);

    // Save completion to database
    if (sessionId && userId) {
      try {
        // Update session as completed
        await supabase
          .from('assessment_sessions')
          .update({
            completed_at: new Date().toISOString(),
            personality_type: type,
            questions_answered: 32
          })
          .eq('session_id', sessionId);

        // Save final results
        await supabase.from('assessment_results').insert([{
          session_id: sessionId,
          user_id: userId,
          personality_type: type,
          social_score: social,
          processing_score: processing,
          pace_score: pace,
          purpose_score: purpose
        }]);

        console.log('Assessment completed and saved:', type);

      } catch (error) {
        console.error('Error saving completion:', error);
      }
    }

    // Send results email
    await sendResultsEmail(type);

    setShowResults(true);
  };

  const getProgress = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setPersonalityType('');
    // Note: We don't reset sessionId here - let them create a new session if they want to retake
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing your assessment...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const description = personalityDescriptions[personalityType as PersonalityKey] || personalityDescriptions['CIUC'];
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">Your Golf Personality</h1>
          <div className="text-6xl font-bold text-green-600 mb-4">{personalityType}</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{description.name}</h2>
          <p className="text-xl italic text-gray-600">&quot;{description.motto}&quot;</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-700 leading-relaxed">{description.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">Your Strengths</h3>
            <ul className="space-y-2">
              {description.strengths.map((strength, idx) => (
                <li key={idx} className="text-gray-700">✓ {strength}</li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-3">Watch Out For</h3>
            <ul className="space-y-2">
              {description.challenges.map((challenge, idx) => (
                <li key={idx} className="text-gray-700">! {challenge}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Premium Upsell Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-bold mb-2">Want Your Complete Golf Profile?</h3>
          <p className="text-green-100 mb-4">
            Get a comprehensive 25-page report with detailed analysis, course strategy tips, 
            and perfect playing partner matches for your {description.name} type.
          </p>
          <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition">
            Get Full Report - $9.99
          </button>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={resetTest}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition mr-4"
          >
            Take Test Again
          </button>
          <button
            onClick={handleShare}
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center gap-2 mx-auto"
          >
            <Share size={20} />
            Share Results
          </button>
        </div>

        {/* Share Modal */}
        {isShareModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
              <button 
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Share MyGolfType</h3>
                <div className="text-center p-4 bg-green-50 rounded-lg mb-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">{personalityType}</div>
                  <div className="text-lg font-semibold text-gray-800">{description.name}</div>
                  <div className="text-sm text-gray-600 italic">&quot;{description.motto}&quot;</div>
                </div>
                <p className="text-gray-600 text-center">Invite others to discover their golf personality!</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share Link
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value="https://mygolftype.com"
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-1"
                  >
                    {copiedLink ? <Check size={16} /> : <Copy size={16} />}
                    {copiedLink ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 mb-3">Share on social media</p>
                
                <button
                  onClick={shareToFacebook}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Facebook size={20} />
                  Share on Facebook
                </button>

                <button
                  onClick={shareToTwitter}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
                >
                  <Twitter size={20} />
                  Share on Twitter
                </button>

                <button
                  onClick={shareToWhatsApp}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  <MessageCircle size={20} />
                  Share on WhatsApp
                </button>

                <button
                  onClick={shareToEmail}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Share via Email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-green-700">Golf Personality Assessment</h1>
          <span className="text-sm text-gray-600">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{currentQ.question}</h2>
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition border-2 border-transparent hover:border-green-300"
            >
              <span className="text-gray-700">{option.text}</span>
            </button>
          ))}
        </div>
      </div>

      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="flex items-center text-gray-600 hover:text-gray-800 transition"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Previous Question
        </button>
      )}
    </div>
  );
};

export default GolfPersonalityTest;