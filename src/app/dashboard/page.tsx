"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Home() {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const [period, setPeriod] = useState<'1h' | '1d' | '7d'>('1h');

  const fetchBTCData = async () => {
    try {
      let url = '';
      if (period === '1h') {
        url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=minutely';
      } else if (period === '1d') {
        url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1';
      } else if (period === '7d') {
        url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7';
      }

      const response = await fetch(url);
      const data = await response.json();

      const prices: number[] = data.prices.map((p: number[]) => p[1]);
      const times: string[] = data.prices.map((p: number[]) =>
        new Date(p[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );

      setPriceHistory(prices);
      setTimestamps(times);

      const latestPrice = prices[prices.length - 1];
      setBtcPrice(latestPrice);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchBTCData();
    const interval = setInterval(fetchBTCData, 60000); // 1분마다 업데이트
    return () => clearInterval(interval);
  }, [period]);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: `비트코인 가격 (${period})`,
        data: priceHistory,
        fill: false,
        borderColor: '#3b82f6', // Tailwind blue-500
        tension: 0.1,
      },
    ],
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <h1 className="text-3xl font-bold mb-2 text-blue-600">🚀 Crypto Alpha 플랫폼</h1>
      <p className="mb-2 text-gray-700">가상화폐 투자자를 위한 온체인 데이터 기반 시장 해석 플랫폼 MVP</p>
      <p className="text-xl mb-4 text-gray-800">
        🪙 비트코인 현재 가격: {btcPrice ? `$${btcPrice.toLocaleString()}` : "로딩 중..."}
      </p>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setPeriod('1h')}
          className={`px-4 py-2 rounded ${period === '1h' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}
        >
          1시간
        </button>
        <button
          onClick={() => setPeriod('1d')}
          className={`px-4 py-2 rounded ${period === '1d' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}
        >
          1일
        </button>
        <button
          onClick={() => setPeriod('7d')}
          className={`px-4 py-2 rounded ${period === '7d' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}
        >
          7일
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white p-4 rounded shadow mb-4">
        <Line data={data} />
      </div>

      <Link href="/dashboard">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          대시보드로 이동
        </button>
      </Link>
    </main>
  );
}

