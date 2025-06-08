import React from 'react';

export default function HomePage() {
  return (
    <div className="w-full px-4">
      <h1 className="text-2xl font-semibold text-[#FA5804] mb-6">Welcome to KaamMaa</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="bg-white shadow p-4 rounded-lg border border-gray-100">
            <h2 className="text-lg font-medium mb-2">Job #{i + 1}</h2>
            <p className="text-sm text-gray-600">This is a sample job card to demonstrate scrollable content.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
