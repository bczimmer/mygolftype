'use client';
import { useState } from 'react';
import Link from 'next/link';

// JavaScript variables and functions go HERE (outside the component)
const personalityTypes = [
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
];

// Complete compatibility matrix - 16x16 data
const compatibilityMatrix: { [key: string]: { [key: string]: number } } = {
  'CIUC': { 'CIUC': 100, 'CIUR': 87, 'CIDC': 78, 'CIDR': 65, 'CCUC': 89, 'CCUR': 73, 'CCDC': 71, 'CCDR': 58, 'FIUC': 85, 'FIUR': 76, 'FIDC': 67, 'FIDR': 23, 'FCUC': 79, 'FCUR': 68, 'FCDC': 52, 'FCDR': 31 },
  'CIUR': { 'CIUC': 87, 'CIUR': 100, 'CIDC': 61, 'CIDR': 84, 'CCUC': 74, 'CCUR': 92, 'CCDC': 29, 'CCDR': 56, 'FIUC': 63, 'FIUR': 88, 'FIDC': 55, 'FIDR': 41, 'FCUC': 58, 'FCUR': 82, 'FCDC': 18, 'FCDR': 33 },
  'CIDC': { 'CIUC': 78, 'CIUR': 61, 'CIDC': 100, 'CIDR': 79, 'CCUC': 82, 'CCUR': 64, 'CCDC': 94, 'CCDR': 87, 'FIUC': 69, 'FIUR': 57, 'FIDC': 83, 'FIDR': 62, 'FCUC': 76, 'FCUR': 31, 'FCDC': 88, 'FCDR': 54 },
  'CIDR': { 'CIUC': 65, 'CIUR': 84, 'CIDC': 79, 'CIDR': 100, 'CCUC': 67, 'CCUR': 81, 'CCDC': 72, 'CCDR': 96, 'FIUC': 22, 'FIUR': 59, 'FIDC': 63, 'FIDR': 85, 'FCUC': 37, 'FCUR': 66, 'FCDC': 28, 'FCDR': 77 },
  'CCUC': { 'CIUC': 89, 'CIUR': 74, 'CIDC': 82, 'CIDR': 67, 'CCUC': 100, 'CCUR': 78, 'CCDC': 86, 'CCDR': 81, 'FIUC': 73, 'FIUR': 65, 'FIDC': 71, 'FIDR': 19, 'FCUC': 84, 'FCUR': 77, 'FCDC': 75, 'FCDR': 49 },
  'CCUR': { 'CIUC': 73, 'CIUR': 92, 'CIDC': 64, 'CIDR': 81, 'CCUC': 78, 'CCUR': 100, 'CCDC': 24, 'CCDR': 61, 'FIUC': 56, 'FIUR': 86, 'FIDC': 48, 'FIDR': 35, 'FCUC': 31, 'FCUR': 79, 'FCDC': 24, 'FCDR': 42 },
  'CCDC': { 'CIUC': 71, 'CIUR': 29, 'CIDC': 94, 'CIDR': 72, 'CCUC': 86, 'CCUR': 24, 'CCDC': 100, 'CCDR': 91, 'FIUC': 67, 'FIUR': 28, 'FIDC': 83, 'FIDR': 47, 'FCUC': 89, 'FCUR': 52, 'FCDC': 92, 'FCDR': 61 },
  'CCDR': { 'CIUC': 58, 'CIUR': 56, 'CIDC': 87, 'CIDR': 96, 'CCUC': 81, 'CCUR': 61, 'CCDC': 91, 'CCDR': 100, 'FIUC': 21, 'FIUR': 44, 'FIDC': 74, 'FIDR': 82, 'FCUC': 56, 'FCUR': 63, 'FCDC': 78, 'FCDR': 89 },
  'FIUC': { 'CIUC': 85, 'CIUR': 63, 'CIDC': 69, 'CIDR': 22, 'CCUC': 73, 'CCUR': 56, 'CCDC': 67, 'CCDR': 21, 'FIUC': 100, 'FIUR': 81, 'FIDC': 77, 'FIDR': 39, 'FCUC': 93, 'FCUR': 83, 'FCDC': 68, 'FCDR': 34 },
  'FIUR': { 'CIUC': 76, 'CIUR': 88, 'CIDC': 57, 'CIDR': 59, 'CCUC': 65, 'CCUR': 86, 'CCDC': 28, 'CCDR': 44, 'FIUC': 81, 'FIUR': 100, 'FIDC': 74, 'FIDR': 62, 'FCUC': 78, 'FCUR': 91, 'FCDC': 41, 'FCDR': 53 },
  'FIDC': { 'CIUC': 67, 'CIUR': 55, 'CIDC': 83, 'CIDR': 63, 'CCUC': 71, 'CCUR': 48, 'CCDC': 83, 'CCDR': 74, 'FIUC': 77, 'FIUR': 74, 'FIDC': 100, 'FIDR': 91, 'FCUC': 88, 'FCUR': 69, 'FCDC': 88, 'FCDR': 76 },
  'FIDR': { 'CIUC': 23, 'CIUR': 41, 'CIDC': 62, 'CIDR': 85, 'CCUC': 19, 'CCUR': 35, 'CCDC': 47, 'CCDR': 82, 'FIUC': 39, 'FIUR': 62, 'FIDC': 91, 'FIDR': 100, 'FCUC': 51, 'FCUR': 58, 'FCDC': 64, 'FCDR': 94 },
  'FCUC': { 'CIUC': 79, 'CIUR': 58, 'CIDC': 76, 'CIDR': 37, 'CCUC': 84, 'CCUR': 31, 'CCDC': 89, 'CCDR': 56, 'FIUC': 93, 'FIUR': 78, 'FIDC': 88, 'FIDR': 51, 'FCUC': 100, 'FCUR': 85, 'FCDC': 91, 'FCDR': 59 },
  'FCUR': { 'CIUC': 68, 'CIUR': 82, 'CIDC': 31, 'CIDR': 66, 'CCUC': 77, 'CCUR': 79, 'CCDC': 52, 'CCDR': 63, 'FIUC': 83, 'FIUR': 91, 'FIDC': 69, 'FIDR': 58, 'FCUC': 85, 'FCUR': 100, 'FCDC': 64, 'FCDR': 72 },
  'FCDC': { 'CIUC': 52, 'CIUR': 18, 'CIDC': 88, 'CIDR': 28, 'CCUC': 75, 'CCUR': 24, 'CCDC': 92, 'CCDR': 78, 'FIUC': 68, 'FIUR': 41, 'FIDC': 88, 'FIDR': 64, 'FCUC': 91, 'FCUR': 64, 'FCDC': 100, 'FCDR': 83 },
  'FCDR': { 'CIUC': 31, 'CIUR': 33, 'CIDC': 54, 'CIDR': 77, 'CCUC': 49, 'CCUR': 42, 'CCDC': 61, 'CCDR': 89, 'FIUC': 34, 'FIUR': 53, 'FIDC': 76, 'FIDR': 94, 'FCUC': 59, 'FCUR': 72, 'FCDC': 83, 'FCDR': 100 }
};

function getCompatibilityClass(score: number): string {
  if (score === 100) return 'bg-gray-800 text-white';
  if (score >= 85) return 'bg-green-200 text-green-800';
  if (score >= 70) return 'bg-green-300 text-green-800';
  if (score >= 50) return 'bg-yellow-200 text-yellow-800';
  return 'bg-red-200 text-red-800';
}

export default function CompatibilityMatrixClient() {
  const [selectedType, setSelectedType] = useState<string>('');

  // Get compatibility data for selected type, sorted by score
  const getCompatibilityForType = (typeCode: string) => {
    if (!typeCode || !compatibilityMatrix[typeCode]) return [];
    
    return personalityTypes
      .map(type => ({
        ...type,
        score: compatibilityMatrix[typeCode][type.code]
      }))
      .sort((a, b) => b.score - a.score);
  };

  const compatibilityData = getCompatibilityForType(selectedType);

  return (
    <>
      {/* DESKTOP: Full Matrix Table */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm min-w-[1200px]">
              <thead>
                <tr>
                  <th className="bg-emerald-600 text-white p-2 sm:p-3 font-bold text-center sticky left-0 z-20"></th>
                  {personalityTypes.map((type) => (
                    <th key={type.code} className="bg-emerald-600 text-white p-1 sm:p-2 font-bold text-center min-w-[100px] relative">
                      <div className="whitespace-nowrap">
                        <div className="font-bold text-xs">{type.code}</div>
                        <div className="text-xs opacity-90 mt-1">{type.name.split(' ').map(word => word.charAt(0)).join('')}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {personalityTypes.map((rowType) => (
                  <tr key={rowType.code}>
                    <td className="bg-emerald-600 text-white p-2 sm:p-3 font-bold text-center sticky left-0 z-10 min-w-[120px]">
                      <div className="text-sm font-bold">{rowType.code}</div>
                      <div className="text-xs opacity-90">{rowType.name}</div>
                    </td>
                    {personalityTypes.map((colType) => {
                      const score = compatibilityMatrix[rowType.code][colType.code];
                      return (
                        <td
                          key={colType.code}
                          className={`text-center p-2 border border-gray-200 font-bold text-xs ${getCompatibilityClass(score)}`}
                        >
                          {score}%
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-200 rounded border"></div>
              <span>85-100%: Dream Pairing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-300 rounded border"></div>
              <span>70-84%: Great Match</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-200 rounded border"></div>
              <span>50-69%: Good Compatibility</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-200 rounded border"></div>
              <span>Below 50%: Challenging</span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE/TABLET: Type Selector + Sorted Results */}
      <div className="lg:hidden">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Find Your Perfect Playing Partners
          </h2>
          
          {/* Type Selector */}
          <div className="mb-6">
            <label htmlFor="type-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Your Golf Personality Type:
            </label>
            <select
              id="type-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Choose your type...</option>
              {personalityTypes.map((type) => (
                <option key={type.code} value={type.code}>
                  {type.code} - {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Don't know your type CTA */}
          {!selectedType && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
              <p className="text-emerald-800 font-medium mb-2">Don't know your type yet?</p>
              <Link 
                href="/" 
                className="inline-block bg-emerald-600 text-white font-bold py-2 px-4 rounded hover:bg-emerald-700 transition-colors"
              >
                Take Free Assessment →
              </Link>
            </div>
          )}

          {/* Compatibility Results */}
          {selectedType && compatibilityData.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Your Compatibility Matches (Best to Worst)
              </h3>
              <div className="space-y-2">
                {compatibilityData.map((match, index) => (
                  <div
                    key={match.code}
                    className={`flex justify-between items-center p-3 rounded-lg border ${getCompatibilityClass(match.score)} ${
                      match.code === selectedType ? 'ring-2 ring-gray-800' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <div className="font-bold text-sm">
                        {match.code}
                        {match.code === selectedType && ' (You)'}
                      </div>
                      <div className="text-xs opacity-75">
                        {match.name}
                      </div>
                    </div>
                    <div className="font-bold text-lg ml-4">
                      {match.score}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick insights */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Quick Insights:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>
                    🎯 <strong>Best Match:</strong> {compatibilityData[1]?.name} ({compatibilityData[1]?.score}%)
                  </div>
                  <div>
                    ⚠️ <strong>Avoid:</strong> {compatibilityData[compatibilityData.length - 1]?.name} ({compatibilityData[compatibilityData.length - 1]?.score}%)
                  </div>
                  <div>
                    📊 <strong>Great Matches (85%+):</strong> {compatibilityData.filter(m => m.score >= 85 && m.code !== selectedType).length} types
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}