// app/privacy/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | MyGolfType.com',
  description: 'Privacy Policy for MyGolfType.com - Learn how we protect and handle your personal information.',
  robots: 'index, follow',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="text-sm text-gray-600 mb-8">
              <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                MyGolfType.com (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you visit our website and use our golf personality assessment platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Contact Information:</strong> Email address, name (if provided)</li>
                <li><strong>Assessment Data:</strong> Responses to our 32-question golf personality assessment</li>
                <li><strong>Communication Preferences:</strong> Email subscription status and preferences</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Usage Analytics:</strong> Page views, session duration, assessment completion rates</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, operating system</li>
                <li><strong>Performance Metrics:</strong> Response times, user journey tracking, interaction patterns</li>
                <li><strong>Cookies and Tracking Technologies:</strong> As described in our Cookie Policy below</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Primary Uses</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Assessment Processing:</strong> To calculate your golf personality type and generate personalized results</li>
                <li><strong>Email Communications:</strong> To deliver assessment results and send relevant golf content</li>
                <li><strong>Platform Improvement:</strong> To analyze user behavior and optimize the assessment experience</li>
                <li><strong>Customer Support:</strong> To respond to inquiries and provide technical assistance</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Marketing and Business Development</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Premium Offerings:</strong> To inform you about compatibility reports and course strategy guides</li>
                <li><strong>Content Personalization:</strong> To tailor recommendations based on your golf personality type</li>
                <li><strong>Performance Analytics:</strong> To measure conversion rates and improve our services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Sharing and Disclosure</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Service Providers</h3>
              <p className="text-gray-700 mb-3">We share information with trusted third-party providers:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Supabase:</strong> Database hosting and management (PostgreSQL)</li>
                <li><strong>Resend:</strong> Email delivery and automation services</li>
                <li><strong>Vercel:</strong> Website hosting and content delivery</li>
                <li><strong>Analytics Providers:</strong> For usage tracking and performance monitoring</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Privacy Rights</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">All Users</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Access:</strong> Request information about data we collect and how it&apos;s used</li>
                <li><strong>Correction:</strong> Update or correct inaccurate personal information</li>
                <li><strong>Deletion:</strong> Request removal of your personal information</li>
                <li><strong>Unsubscribe:</strong> Opt out of marketing emails at any time</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">California Residents (CCPA Rights)</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Right to Know:</strong> Detailed information about personal information collection and use</li>
                <li><strong>Right to Delete:</strong> Request deletion of personal information</li>
                <li><strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (Note: We do not sell personal information)</li>
                <li><strong>Non-Discrimination:</strong> Equal service regardless of privacy rights exercised</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookie Policy</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Essential Cookies</h3>
              <p className="text-gray-700 mb-3">Required for basic website functionality, including:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Session management and user preferences</li>
                <li>Security and fraud prevention</li>
                <li>Assessment progress tracking</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Analytics Cookies</h3>
              <p className="text-gray-700 mb-3">Used to understand website usage and improve user experience:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Page view tracking and user journey analysis</li>
                <li>Performance monitoring and error detection</li>
                <li>A/B testing and conversion optimization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Email Communications</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Types of Emails</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Transactional:</strong> Assessment results and account-related communications</li>
                <li><strong>Marketing:</strong> Golf tips, premium service offers, and relevant content</li>
                <li><strong>Operational:</strong> Service updates and important notices</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Unsubscribe Options</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Click unsubscribe links in any marketing email</li>
                <li>Contact us directly at privacy@mygolftype.com</li>
                <li>Manage preferences in your account settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-3">We implement industry-standard security measures including:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Encryption:</strong> Data transmission secured with SSL/TLS protocols</li>
                <li><strong>Access Controls:</strong> Limited access to personal information on a need-to-know basis</li>
                <li><strong>Regular Monitoring:</strong> Ongoing security assessments and vulnerability testing</li>
                <li><strong>Secure Infrastructure:</strong> Cloud-based hosting with enterprise-grade security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-3">For privacy-related questions, requests, or concerns:</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@mygolftype.com<br/>
                  <strong>Subject Line:</strong> Privacy Policy Inquiry<br/>
                  <strong>Response Time:</strong> We aim to respond to all privacy requests within 30 days.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy periodically. Changes will be posted on this page 
                with an updated &quot;Last Modified&quot; date. For significant changes, we will provide 
                additional notice through email or website notifications.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 mb-2">Service Availability</h3>
                <p className="text-blue-800">
                  <strong>MyGolfType.com is available to US residents only.</strong> This Privacy Policy 
                  is designed to comply with US federal and state privacy laws including the California 
                  Consumer Privacy Act (CCPA) and CAN-SPAM Act.
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-sm text-gray-600 italic">
                This Privacy Policy was last updated on {new Date().toLocaleDateString()}. 
                Please review it regularly for any changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}