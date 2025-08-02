"use client";
import React from 'react'

function loading() {
  return (
    <div className='flex items-center justify-center h-screen w-full bg-gray-950'>
      <div className="text-center">
     
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <div className="w-12 h-12 border-4 border-transparent border-t-purple-500 rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2"></div>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-2 animate-pulse">
          Loading...
        </h2>
        
        <p className="text-gray-400 text-sm">
          Please wait while we prepare your experience
        </p>
        
        <div className="flex justify-center space-x-1 mt-6">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  )
}

export default loading