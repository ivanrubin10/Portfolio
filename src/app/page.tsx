import Link from 'next/link';

export default function RootPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to my Portfolio</h1>
      <p className="mb-6">Please select your preferred language:</p>
      <div className="flex gap-4">
        <Link 
          href="/en" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          English
        </Link>
        <Link 
          href="/es" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Español
        </Link>
      </div>
    </div>
  );
} 