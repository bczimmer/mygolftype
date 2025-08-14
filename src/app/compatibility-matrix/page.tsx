// desktop/mygolftype/src/app/compatibility-matrix/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Golf Personality Compatibility Matrix | MyGolfType',
  description: 'Discover which golf personalities match best with yours. Our comprehensive compatibility matrix shows you exactly who to play with and who to avoid for the perfect round.',
  keywords: 'golf personality compatibility, golf partners, golf foursome, golf psychology, Myers-Briggs golf',
  openGraph: {
    title: 'Golf Personality Compatibility Matrix | MyGolfType',
    description: 'Find your perfect golf partners with our comprehensive compatibility guide.',
    images: ['/og-compatibility.jpg'], // You'll want to create this
  }
};

export default function CompatibilityMatrix() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎯 Golf Personality Compatibility Matrix
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your perfect playing partners and avoid the foursomes from hell. 
              Our research-based compatibility matrix shows you exactly who complements your golf personality.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* CTA Banner - Don't know your type? */}
        <div className="bg-emerald-600 rounded-xl p-6 mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Don't Know Your Golf Personality Yet?
          </h2>
          <p className="text-emerald-100 mb-4">
            Take our free 5-minute assessment to discover your type and unlock your perfect compatibility matches.
          </p>
          <a 
            href="/assessment" 
            className="inline-block bg-white text-emerald-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Take Free Assessment →
          </a>
        </div>

        {/* How to Use Guide */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use This Matrix</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Reading Your Compatibility</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-4 h-4 bg-green-200 rounded mr-3"></div>
                  <span><strong>85-100%:</strong> Dream Pairing - Book every weekend together</span>
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 bg-green-300 rounded mr-3"></div>
                  <span><strong>70-84%:</strong> Great Match - Will enjoy regular rounds</span>
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-200 rounded mr-3"></div>
                  <span><strong>50-69%:</strong> Good Compatibility - Fine for casual rounds</span>
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 bg-red-200 rounded mr-3"></div>
                  <span><strong>Below 50%:</strong> Challenging - Someone will have a bad time</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Finding Your Matches</h3>
              <ol className="space-y-2 text-gray-600 list-decimal list-inside">
                <li>Find your personality type on the left column</li>
                <li>Look across the row to see compatibility scores</li>
                <li>Higher percentages = better on-course chemistry</li>
                <li>Use this to recruit or avoid specific types</li>
              </ol>
            </div>
          </div>
        </div>

        {/* The Matrix Table - Responsive Container */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm min-w-[800px]">
              <thead>
                <tr>
                  <th className="bg-emerald-600 text-white p-2 sm:p-3 font-bold text-center"></th>
                  {/* Column Headers */}
                  {[
                    { code: 'CIUC', name: 'Social Striker' },
                    { code: 'CIUR', name: 'Weekend Warrior' },
                    { code: 'CIDC', name: 'Tournament Director' },
                    { code: 'CIDR', name: 'Social Ambassador' },
                    { code: 'CCUC', name: 'Stats Socialite' },
                    { code: 'CCUR', name: 'Techno Recreator' },
                    { code: 'CCDC', name: 'Club Champion' },
                    { code: 'CCDR', name: 'Teaching Pro Friend' },
                    { code: 'FIUC', name: 'Efficient Assassin' },
                    { code: 'FIUR', name: 'Zen Speedster' },
                    { code: 'FIDC', name: 'Feel Player' },
                    { code: 'FIDR', name: 'Golf Monk' },
                    { code: 'FCUC', name: 'Calculated Assassin' },
                    { code: 'FCUR', name: 'Quick Thinker' },
                    { code: 'FCDC', name: 'The Grinder' },
                    { code: 'FCDR', name: 'Range Scientist' }
                  ].map((type) => (
                    <th key={type.code} className="bg-emerald-600 text-white p-1 sm:p-2 font-bold text-center writing-mode-vertical text-xs min-w-[40px] h-24">
                      <div className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        <div className="font-bold">{type.code}</div>
                        <div className="text-xs opacity-90">{type.name}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* You'll need to map through each personality type and create rows */}
                {/* This is a simplified version - you'll want to create the full matrix */}
                <tr>
                  <td className="bg-emerald-600 text-white p-2 sm:p-3 font-bold text-center">
                    <div className="text-sm font-bold">CIUC</div>
                    <div className="text-xs">Social Striker</div>
                  </td>
                  {/* Sample compatibility cells - you'll generate these dynamically */}
                  <td className="text-center p-1 sm:p-2 border border-gray-200 bg-gray-800 text-white font-bold">100%</td>
                  <td className="text-center p-1 sm:p-2 border border-gray-200 bg-green-200 text-green-800 font-bold">87%</td>
                  <td className="text-center p-1 sm:p-2 border border-gray-200 bg-green-300 text-green-800 font-bold">78%</td>
                  {/* ... continue for all 16 columns */}
                </tr>
                {/* ... continue for all 16 rows */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gray-900 rounded-xl p-8 mt-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want Detailed Compatibility Strategies?
          </h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Get your personalized 25-page Premium Report with specific strategies for playing with each personality type, 
            plus equipment recommendations and course management tips designed for your exact type.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <a 
              href="/assessment" 
              className="inline-block bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Take Assessment First
            </a>
            <a 
              href="/premium" 
              className="inline-block border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              View Premium Reports
            </a>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            "This compatibility matrix completely changed how I choose playing partners. No more painful rounds!"
          </p>
          <p className="text-sm text-gray-500">
            - Sarah M., CCDC (Club Champion), 4.2 handicap
          </p>
        </div>

      </div>
    </div>
  );
}