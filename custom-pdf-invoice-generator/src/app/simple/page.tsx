'use client';

export default function SimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Kenning AutoGlass</h1>
        <h2 className="text-xl text-gray-800 mb-4">Invoice Generator</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-800">✅ Deployment Successful!</p>
            <p className="text-sm text-green-600 mt-1">Your app is live on Vercel.</p>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-blue-800">Next Steps:</p>
            <ol className="list-decimal list-inside text-sm text-blue-600 mt-2 space-y-1">
              <li>Add DATABASE_URL environment variable in Vercel</li>
              <li>Create Vercel Postgres database</li>
              <li>Redeploy the application</li>
            </ol>
          </div>
          
          <div className="mt-6">
            <a 
              href="/" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Try Full Invoice Generator →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
