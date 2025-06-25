"use client"
import React from 'react'
import { useState } from 'react'
function page() {
    const [count, setCount] = useState(0);
  return (
    <div>
    <div>{count}</div>
    <button onClick={()=>{setCount(prev=>prev+1)}} >Click</button>

    </div>
  )
}

export default page