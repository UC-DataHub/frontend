'use client';
import React from 'react';

export default function LoadingOverlay({ message = 'Loading...', fullscreen = true }) {
  return (
    <div
      className={`z-50 ${fullscreen ? 'fixed inset-0' : 'absolute inset-0'} bg-black bg-opacity-50 flex items-center justify-center`}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-white text-sm">{message}</p>
      </div>
    </div>
  );
}
