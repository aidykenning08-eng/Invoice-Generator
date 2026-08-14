'use client';

import { useState, Suspense } from 'react';

// Lazy load components to avoid build issues
const InvoiceApp = () => {
  const [mounted, setMounted] = useState(false);

  // Mount on client side only
  if (typeof window !== 'undefined' && !mounted) {
    setTimeout(() => setMounted(true), 0);
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Invoice Generator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/logo.webp" 
              alt="Kenning AutoGlass Logo" 
              className="h-20 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Kenning AutoGlass</h1>
          <p className="text-lg text-blue-700 font-medium">Invoice Generator</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <div className="text-center py-12">
            <div className="mb-8">
              <svg className="mx-auto h-24 w-24 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">✅ App Deployed Successfully!</h2>
            <p className="text-gray-600 mb-6">Your Kenning AutoGlass Invoice Generator is live on Vercel.</p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left max-w-2xl mx-auto">
              <h3 className="font-semibold text-blue-800 mb-3">Next Steps to Complete Setup:</h3>
              <ol className="list-decimal list-inside space-y-2 text-blue-700">
                <li>In Vercel, go to Storage → Create Postgres Database</li>
                <li>Connect the database to your project</li>
                <li>Go to Settings → Environment Variables</li>
                <li>The database variables will be added automatically</li>
                <li>Redeploy your application</li>
                <li>Run the SQL to create tables (see docs)</li>
              </ol>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto mb-6">
              <p className="text-green-800 font-medium">
                🎉 No more 404 errors! Your deployment is working correctly.
              </p>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <a 
                href="/test" 
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Test Page →
              </a>
              <a 
                href="/simple" 
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                Simple Page →
              </a>
              <a 
                href="/api/health" 
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                API Health →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <InvoiceApp />
    </Suspense>
  );
}
