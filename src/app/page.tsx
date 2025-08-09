'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Save email to database
    console.log('Capturing email:', { email, name });
    
    // For now, just redirect to assessment
    setTimeout(() => {
      router.push('/assessment');
    }, 500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-800 mb-6">
            Discover Your Golf Personality Type
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Find your perfect playing partners and unlock your potential on the course
          </p>
          <p className="text-lg text-gray-600">
            Join 10,000+ golfers who've discovered their type
          </p>
        </div>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">2-Minute Assessment</h3>
            <p className="text-gray-600">Quick, scientifically-designed questions about your golf preferences</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant Results</h3>
            <p className="text-gray-600">Get your personalized golf type with strengths and playing style insights</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Better Golf</h3>
            <p className="text-gray-600">Find compatible playing partners and improve your on-course experience</p>
          </div>
        </div>

        {/* Email Capture Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-2">Get Your Free Golf Type</h2>
          <p className="text-gray-600 text-center mb-6">Enter your details to start the assessment</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your first name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Starting Assessment...' : 'Start My Assessment →'}
            </button>
          </form>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            Free assessment • No spam • Unsubscribe anytime
          </p>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Trusted by golfers at:</p>
          <div className="flex justify-center space-x-8 text-gray-500">
            <span>Augusta CC</span>
            <span>Pebble Beach</span>
            <span>TPC Sawgrass</span>
            <span>Whistling Straits</span>
          </div>
        </div>
      </div>
    </main>
  );
}