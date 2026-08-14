export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">✅ Vercel is Working!</h1>
        <p className="text-gray-600 mb-2">If you can see this page, your deployment is successful.</p>
        <p className="text-sm text-gray-500">Test page: /test</p>
        <a href="/" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Go to Invoice Generator
        </a>
      </div>
    </div>
  );
}
