import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">🚀 Crypto Alpha 플랫폼</h1>
      <p className="mb-4">가상화폐 투자자를 위한 온체인 데이터 기반 시장 해석 플랫폼 MVP</p>
      <Link href="/dashboard">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          대시보드로 이동
        </button>
      </Link>
    </main>
  );
}
