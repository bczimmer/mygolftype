'use client';
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

const GolfPersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [personalityType, setPersonalityType] = useState('');

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
      question: 'After making a birdie, you:',
      options: [
        { text: 'Quietly retrieve your ball', value: 'F' },
        { text: 'High-five everyone in reach', value: 'C' },
        { text: 'Smile and accept congratulations', value: 'F' },
        { text: 'Celebrate and save this gem for story time', value: 'C' }
      ]
    },
    {
      id: 3,
      category: 'social',
      question: 'When paired with strangers, you:',
      options: [
        { text: 'Exchange pleasantries then focus on your game', value: 'F' },
        { text: 'Learn their life story by hole 5', value: 'C' },
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
        { text: 'Non-stop banter', value: 'C' },
        { text: 'Strategy for the next shot', value: 'F' },
        { text: 'Work, life, everything but golf', value: 'C' }
      ]
    },
    {
      id: 5,
      category: 'social',
      question: 'At the turn, you prefer to:',
      options: [
        { text: 'Grab something quick and keep moving', value: 'F' },
        { text: 'Sit down, order food, socialize', value: 'C' },
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
        { text: 'Always stay for drinks and stories', value: 'C' },
        { text: 'Check your stats in the car', value: 'F' },
        { text: "Organize next week's game", value: 'C' }
      ]
    },
    {
      id: 7,
      category: 'social',
      question: 'When someone asks "what\'d you shoot?":',
      options: [
        { text: 'Give the number and move on', value: 'F' },
        { text: 'Provide a hole-by-hole recap', value: 'C' },
        { text: '"Not my best day" and change subject', value: 'F' },
        { text: 'Turn it into a conversation', value: 'C' }
      ]
    },
    {
      id: 8,
      category: 'social',
      question: 'Your preferred practice routine:',
      options: [
        { text: 'Alone with headphones', value: 'F' },
        { text: 'Make friends at the range', value: 'C' },
        { text: 'Quick and purposeful', value: 'F' },
        { text: "Join the regulars' putting contests", value: 'C' }
      ]
    },
    // Information Processing Questions (9-16)
    {
      id: 9,
      category: 'processing',
      question: 'Club selection process:',
      options: [
        { text: 'See the shot, grab the club', value: 'I' },
        { text: 'Rangefinder, wind, elevation, temperature', value: 'C' },
        { text: 'Whatever feels right today', value: 'I' },
        { text: 'Check yardage book notes from last round', value: 'C' }
      ]
    },
    {
      id: 10,
      category: 'processing',
      question: 'Reading putts:',
      options: [
        { text: 'See the line immediately', value: 'I' },
        { text: 'Walk around, use AimPoint, plumb-bob', value: 'C' },
        { text: 'First instinct is usually right', value: 'I' },
        { text: 'Check from all four sides', value: 'C' }
      ]
    },
    {
      id: 11,
      category: 'processing',
      question: 'Your swing thought:',
      options: [
        { text: 'One feeling, maybe none', value: 'I' },
        { text: 'Checkpoint sequence', value: 'C' },
        { text: '"Smooth" or "easy"', value: 'I' },
        { text: 'Specific positions and angles', value: 'C' }
      ]
    },
    {
      id: 12,
      category: 'processing',
      question: 'When buying new clubs:',
      options: [
        { text: 'Hit them once, know immediately', value: 'I' },
        { text: 'Launch monitor data decides', value: 'C' },
        { text: 'Whatever looks good at address', value: 'I' },
        { text: 'Spreadsheet comparing all specs', value: 'C' }
      ]
    },
    {
      id: 13,
      category: 'processing',
      question: 'Course strategy:',
      options: [
        { text: "Play what's in front of you", value: 'I' },
        { text: 'Planned approach before each round', value: 'C' },
        { text: "Depends on how I'm hitting it", value: 'I' },
        { text: 'Strokes gained analysis from last time', value: 'C' }
      ]
    },
    {
      id: 14,
      category: 'processing',
      question: 'Practice philosophy:',
      options: [
        { text: 'Hit balls until it feels good', value: 'I' },
        { text: 'Structured drills with measurements', value: 'C' },
        { text: "Work on whatever's bothering me", value: 'I' },
        { text: 'Track percentages and patterns', value: 'C' }
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
        { text: 'Check multiple weather apps', value: 'C' }
      ]
    },
    {
      id: 16,
      category: 'processing',
      question: 'Learning new shots:',
      options: [
        { text: 'Experiment until it works', value: 'I' },
        { text: 'YouTube tutorials and slow motion', value: 'C' },
        { text: 'Copy what I saw someone do', value: 'I' },
        { text: 'Lesson with launch monitor feedback', value: 'C' }
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
        { text: 'Fine if the course is backed up', value: 'D' }
      ]
    },
    {
      id: 21,
      category: 'pace',
      question: 'Looking for a lost ball:',
      options: [
        { text: 'Two minutes max, take the penalty', value: 'U' },
        { text: 'Use the full time allowed', value: 'D' },
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
        { text: 'Track every stat meticulously', value: 'D' }
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
        { text: 'Strict handicap guidelines', value: 'C' },
        { text: 'Back tees always, need the challenge', value: 'C' },
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
        { text: "It's supposed to be fun", value: 'R' }
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
        { text: 'The louder the better', value: 'R' }
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
      description: 'Lives for the Saturday morning game with stakes. Makes friends easily but wants to take their money.',
      motto: 'Ready golf for $20 a side',
      strengths: ['Energizes the group', 'Keeps pace moving', 'Makes golf fun and competitive'],
      challenges: ['May overwhelm quiet players', 'Competition focus might annoy recreators'],
      bestWith: ['CCUC', 'CIUC', 'FCUC'],
      avoidWith: ['FIDR', 'FCDR']
    },
    'CIUR': {
      name: 'The Weekend Warrior',
      description: 'Here for a good time, not a long time. First to suggest music, last to leave the bar.',
      motto: 'Saturday fun day!',
      strengths: ['Makes every round enjoyable', 'Never slows down play', 'Great energy'],
      challenges: ['Might annoy serious competitors', 'Can be too loud for some'],
      bestWith: ['CCUR', 'CIUR', 'CIDR'],
      avoidWith: ['FCDC', 'FIDC']
    },
    'CIDC': {
      name: 'The Tournament Director',
      description: 'Organizes the club championships. Knows everyone, plays by feel, takes their time.',
      motto: 'Do it right and enjoy it',
      strengths: ['Natural organizer', 'Balances fun with competition', 'Great at reading people'],
      challenges: ['Can be too structured', 'Pace might frustrate urgent players'],
      bestWith: ['CCDC', 'CIDC', 'FIDC'],
      avoidWith: ['FCUR', 'FIUR']
    },
    'CIDR': {
      name: 'The Social Ambassador',
      description: 'Makes every round a social event. Never rushed, always chatting. Golf is the excuse to hang out.',
      motto: 'No hurry, we are golfing!',
      strengths: ['Creates welcoming atmosphere', 'Remembers everyone', 'Makes golf relaxing'],
      challenges: ['Too slow for many', 'May talk too much for focused players'],
      bestWith: ['CCDR', 'CIDR', 'FIDR'],
      avoidWith: ['FCUC', 'FIUC']
    },
    'CCUC': {
      name: 'The Stats Socialite',
      description: 'Tracks everything, shares with everyone. Rangefinder in one hand, story in the other.',
      motto: 'According to my Arccos data...',
      strengths: ['Data-driven improvement', 'Helps others with strategy', 'Fast despite calculations'],
      challenges: ['Can over-analyze', 'May bore non-technical players'],
      bestWith: ['CIUC', 'CCUC', 'FCUC'],
      avoidWith: ['FIDR', 'CIDR']
    },
    'CCUR': {
      name: 'The Techno Recreator',
      description: 'Has all the gadgets, none of the pressure. Loves discussing equipment specs.',
      motto: 'My launch monitor says...',
      strengths: ['Makes technology fun', 'Helpful with equipment', 'Keeps things light'],
      challenges: ['Gadget talk may annoy purists', 'Can get distracted by tech'],
      bestWith: ['CIUR', 'CCUR', 'FCUR'],
      avoidWith: ['FIDC', 'FCDC']
    },
    'CCDC': {
      name: 'The Club Champion',
      description: 'Takes the game seriously but socially. Methodical, measured, but engaging.',
      motto: 'Let me show you the proper way',
      strengths: ['Excellent course knowledge', 'Natural teacher', 'Respects the game'],
      challenges: ['Can be pedantic', 'Pace frustrates urgent players'],
      bestWith: ['CIDC', 'CCDC', 'FCDC'],
      avoidWith: ['CIUR', 'FIUR']
    },
    'CCDR': {
      name: 'The Teaching Pro Friend',
      description: 'Loves helping others improve. All the knowledge, none of the pressure.',
      motto: 'Have you tried this drill?',
      strengths: ['Generous with knowledge', 'Makes learning fun', 'Very patient'],
      challenges: ['May give too much advice', 'Can slow down play'],
      bestWith: ['CIDR', 'CCDR', 'FCDR'],
      avoidWith: ['FIUC', 'FCUC']
    },
    'FIUC': {
      name: 'The Efficient Assassin',
      description: 'Quiet, fast, deadly. Feels their way to low scores quickly. Minimal talk, maximum efficiency.',
      motto: 'Nods, hits, walks',
      strengths: ['Never slows play', 'Clutch under pressure', 'Leads by example'],
      challenges: ['Can seem unfriendly', 'May intimidate others'],
      bestWith: ['FCUC', 'FIUC', 'CIUC'],
      avoidWith: ['CCDR', 'CIDR']
    },
    'FIUR': {
      name: 'The Zen Speedster',
      description: 'Plays by feel, quickly, for joy. In their own world but happy. Meditative but efficient.',
      motto: 'I just love being out here',
      strengths: ['Peaceful presence', 'Never holds up play', 'Pure joy for the game'],
      challenges: ['May seem disconnected', 'Not competitive enough for some'],
      bestWith: ['FCUR', 'FIUR', 'CIUR'],
      avoidWith: ['CCDC', 'FCDC']
    },
    'FIDC': {
      name: 'The Feel Player',
      description: 'Takes time to feel each shot competitively. Quiet intensity, artistic approach.',
      motto: 'I need to see it first',
      strengths: ['Great touch around greens', 'Excellent visualization', 'Clutch performer'],
      challenges: ['Can be too slow', 'May overthink shots'],
      bestWith: ['FCDC', 'FIDC', 'CIDC'],
      avoidWith: ['CCUR', 'CIUR']
    },
    'FIDR': {
      name: 'The Golf Monk',
      description: 'Golf as meditation. Slow, quiet, peaceful, content. In no rush to anywhere.',
      motto: 'Listen to the course',
      strengths: ['Never rattled', 'Appreciates the game deeply', 'Calming presence'],
      challenges: ['Too slow for many', 'Not social enough for some'],
      bestWith: ['FCDR', 'FIDR', 'CIDR'],
      avoidWith: ['FIUC', 'FCUC', 'CIUC']
    },
    'FCUC': {
      name: 'The Calculated Assassin',
      description: 'Efficiency expert with a scorecard. Every number matters, no time to waste.',
      motto: '137 yards, half-club wind, go',
      strengths: ['Extremely precise', 'Fast despite calculations', 'Data-driven success'],
      challenges: ['Can seem robotic', 'May frustrate feel players'],
      bestWith: ['FIUC', 'FCUC', 'CCUC'],
      avoidWith: ['CIDR', 'FIDR']
    },
    'FCUR': {
      name: 'The Quick Thinker',
      description: 'Analyzes everything but doesn\'t stress. Efficient processor playing for fun.',
      motto: 'Interesting data point',
      strengths: ['Makes math fun', 'Efficient without pressure', 'Good pace'],
      challenges: ['May overanalyze', 'Can confuse non-math types'],
      bestWith: ['FIUR', 'FCUR', 'CCUR'],
      avoidWith: ['CIDC', 'FIDC']
    },
    'FCDC': {
      name: 'The Grinder',
      description: 'Maximum focus, maximum analysis. Every shot carefully planned and executed.',
      motto: 'This putt breaks 3.5 inches',
      strengths: ['Extremely consistent', 'Great under pressure', 'Course management expert'],
      challenges: ['Can slow down play', 'May seem antisocial'],
      bestWith: ['FIDC', 'FCDC', 'CCDC'],
      avoidWith: ['CIUR', 'CCUR']
    },
    'FCDR': {
      name: 'The Range Scientist',
      description: 'Loves perfecting technique alone. Not worried about score, focused on process.',
      motto: 'Working on something',
      strengths: ['Always improving', 'Very consistent', 'Shares technical knowledge'],
      challenges: ['Can be too technical', 'May lose sight of scoring'],
      bestWith: ['FIDR', 'FCDR', 'CCDR'],
      avoidWith: ['CIUC', 'FIUC']
    }
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculatePersonality(newAnswers);
    }
  };

const calculatePersonality = (allAnswers: Record<number, string>) => {
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
  };

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
              {description.strengths.map((strength: string, idx: number) => (
                <li key={idx} className="text-gray-700">✓ {strength}</li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-3">Watch Out For</h3>
            <ul className="space-y-2">
              {description.challenges.map((challenge: string, idx: number) => (
                <li key={idx} className="text-gray-700">! {challenge}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={resetTest}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Take Test Again
          </button>
        </div>
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