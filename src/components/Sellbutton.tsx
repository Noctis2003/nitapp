"use client"
import React from 'react'
import {useState} from 'react'
import {Poppins} from 'next/font/google'
const poppins = Poppins({ 
    subsets: ['latin'],
    weight: ['400', '500', '700'],
})  
function Sellbutton() {
    const [isOpen, setIsOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
  return (
    <>
    <button
    type="button"
    className=" flex items-center gap-2 py-1 px-4 text-xl font-bold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
    onClick={() => setIsOpen(true)}
  >    Sell
  </button>

  {isOpen && (
  <div className={`${poppins.className} font-medium fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md`}>
    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-500 w-[90%] md:w-[50%]">
      <h2 className="text-lg font-bold text-white">Add a Product</h2>

      {/* Product Name Input */}
      <input
        type="text"
        className="w-full text-sm mt-3 p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none placeholder-gray-400"
        placeholder="Enter product name..."
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      {/* Product Description Textarea */}
      <textarea
        className="w-full mt-3 text-sm p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none placeholder-gray-400"
        placeholder="Enter product description..."
        rows={3}
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      ></textarea>

      {/* Product Price Input */}
      <input
        type="number"
        className="w-full text-sm mt-3 p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none placeholder-gray-400"
        placeholder="Enter price..."
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />

      {/* Product Image Upload */}
      <input
        type="file"
        accept="image/*"
        className="w-full text-sm  mt-3 p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none"
        onChange={(e) => setProductImage(e.target.files[0])}
      />

      {/* Buttons */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-gray-600 text-base text-white rounded-lg hover:bg-gray-500 font-bold"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white text-base rounded-lg hover:bg-green-500 font-bold"
        >
          Add Product
        </button>
      </div>
    </div>
  </div>
)}

</>

  )
}

export default Sellbutton