// app/terms/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | MyGolfType.com',
  description: 'Terms of Service for MyGolfType.com - Learn about your rights and responsibilities when using our golf personality assessment platform.',
  robots: 'index, follow',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="text-sm text-gray-600 mb-8">
              <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using MyGolfType.com (&quot;Service,&quot; &quot;Platform,&quot; or &quot;Website&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Service.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">
                  <strong>Service Availability:</strong> MyGolfType.com is available to US residents only.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description of Service</h2>
              <p className="text-gray-700 mb-3">MyGolfType.com provides golf personality assessments and related services including:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>32-question golf personality assessment</li>
                <li>Personalized golf type results and insights</li>
                <li>Email delivery of assessment results and related content</li>
                <li>Future matching services to connect compatible golfers</li>
                <li>Premium reports and course strategy guides</li>
                <li>Additional features as we develop and launch them</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Accounts and Registration</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Account Creation</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>You must provide accurate and complete information during registration</li>
                <li>You are responsible for maintaining the confidentiality of your account information</li>
                <li>You must be at least 18 years old to use our Service</li>
                <li>One account per person; multiple accounts are prohibited</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Data Accuracy</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>You agree to provide truthful responses to assessment questions</li>
                <li>Location information (zip code, geolocation) must be accurate for matching services</li>
                <li>You will update your information if it changes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Collection and Use</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Information We Collect</h3>
              <p className="text-gray-700 mb-3">You consent to our collection and use of:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Personal Information:</strong> Email address, name, location data (zip code, geolocation)</li>
                <li><strong>Assessment Data:</strong> Your responses to personality questions and calculated results</li>
                <li><strong>Technical Data:</strong> Session identifiers, user IDs (UUIDs), device information, usage analytics</li>
                <li><strong>Communication Preferences:</strong> Email subscription status and interaction data</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">How We Use Your Data</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Service Delivery:</strong> Calculate personality types, deliver results, provide matching services</li>
                <li><strong>Communication:</strong> Send assessment results, golf tips, premium service offers, and platform updates</li>
                <li><strong>Matching Services:</strong> Connect you with compatible golfers based on personality and location</li>
                <li><strong>Analytics:</strong> Improve our algorithms, user experience, and service offerings</li>
                <li><strong>Business Operations:</strong> Fraud prevention, customer support, legal compliance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Premium Services and Pricing</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Premium Features</h3>
              <p className="text-gray-700 mb-3">We offer premium services including:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Detailed compatibility reports</li>
                <li>Advanced course strategy guides</li>
                <li>Priority matching services</li>
                <li>Enhanced analytics and insights</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Pricing and Payment</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Premium service pricing will be clearly displayed before purchase</li>
                <li>All sales are final unless otherwise stated</li>
                <li>We reserve the right to change pricing with 30 days notice</li>
                <li>Existing subscribers will be grandfathered at current pricing for one billing cycle</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Matching Services</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Future Matching Platform</h3>
              <p className="text-gray-700 mb-3">We plan to offer services to connect golfers based on:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Personality compatibility scores</li>
                <li>Geographic proximity (zip code, location data)</li>
                <li>Playing preferences and skill level</li>
                <li>Course and schedule preferences</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Matching Disclaimers</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Matching suggestions are based on algorithmic analysis, not personal endorsements</li>
                <li>We do not guarantee compatibility or successful connections</li>
                <li>Users are responsible for their own safety when meeting matched golfers</li>
                <li>We are not liable for interactions between matched users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Conduct and Prohibited Uses</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Prohibited Activities</h3>
              <p className="text-gray-700 mb-3">You may NOT:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Provide false or misleading information</li>
                <li>Create multiple accounts or impersonate others</li>
                <li>Reverse engineer, scrape, or attempt to extract our assessment algorithms</li>
                <li>Use automated tools to access or interact with our Service</li>
                <li>Interfere with or disrupt our Service or servers</li>
                <li>Use the Service for commercial purposes without authorization</li>
                <li>Harass, abuse, or harm other users through our matching services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimers and Limitations</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Assessment Accuracy</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Our golf personality assessment is for entertainment and informational purposes</li>
                <li>Results are based on algorithmic analysis, not professional psychological evaluation</li>
                <li>We make no guarantees about the accuracy or completeness of personality insights</li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="text-lg font-medium text-yellow-900 mb-2">Important Limitation</h4>
                <p className="text-yellow-800">
                  <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong> Our Service is provided &quot;AS IS&quot; without warranties of any kind. Our total liability is limited to the amount you paid us in the past 12 months.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dispute Resolution</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-medium text-red-900 mb-2">Arbitration Agreement</h3>
                <p className="text-red-800 mb-2">
                  <strong>PLEASE READ CAREFULLY - THIS AFFECTS YOUR LEGAL RIGHTS</strong>
                </p>
                <ul className="list-disc pl-6 text-red-800 text-sm">
                  <li>Most disputes will be resolved through binding arbitration rather than courts</li>
                  <li>You waive your right to a jury trial and class action lawsuits</li>
                  <li>Small claims court disputes (under $10,000) may be filed in court</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Informal Resolution</h3>
              <p className="text-gray-700">
                Before filing any formal dispute, you agree to contact us at legal@mygolftype.com to attempt informal resolution.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-3">For questions about these Terms of Service:</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@mygolftype.com<br/>
                  <strong>Subject Line:</strong> Terms of Service Inquiry<br/>
                  <strong>Response Time:</strong> We aim to respond within 5 business days.
                </p>
                <div className="mt-3 pt-3 border-t border-gray-300">
                  <p className="text-sm text-gray-600">
                    Technical support: support@mygolftype.com<br/>
                    Privacy requests: privacy@mygolftype.com
                  </p>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">
                  <strong>By using MyGolfType.com, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
                </p>
              </div>
              <p className="text-sm text-gray-600 italic mt-4">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}