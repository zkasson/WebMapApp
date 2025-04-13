"use client"
import React, { useState } from 'react'

function Counter() {
    const [count,setCount] = useState(0);
    const increment = () => setCount(count +1)
    const decrement = () => setCount(count - 1)
    const incrementFive = () => setCount(count +5)
    const decrementFive = () => setCount(count - 5)
    return (
        <div className="flex flex-col items-center gap-4 mt-4">
          {/* Count Display */}
          <div className="text-2xl font-semibold">Count: {count}</div>
      
          {/* Buttons Row */}
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={incrementFive} className="px-6 py-3 bg-blue-500 text-white rounded-lg border border-blue-700 hover:bg-blue-600 transition duration-200" title="Increase by 5">Increment by 5</button>
            <button onClick={increment} className="px-6 py-3 bg-green-500 text-white rounded-lg border border-green-700 hover:bg-green-600 transition duration-200" title="Increase by 1">Increment by 1</button>
            <button onClick={decrement} className="px-6 py-3 bg-red-500 text-white rounded-lg border border-red-700 hover:bg-red-600 transition duration-200" title="Decrease by 1">Decrement by 1</button>
            <button onClick={decrementFive} className="px-6 py-3 bg-yellow-500 text-black rounded-lg border border-yellow-700 hover:bg-yellow-600 transition duration-200" title="Decrease by 5">Decrement by 5</button>
          </div>
        </div>
      );      
}

export default Counter