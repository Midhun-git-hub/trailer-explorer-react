import React, { useState } from 'react'
import { GiSpikedDragonHead } from "react-icons/gi";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="flex items-center gap-2 text-xl font-bold whitespace-nowrap">
          <GiSpikedDragonHead className="text-red-500 text-2xl" />
          Trailer Explorer
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-yellow-400 transition">Home</a>
          <a href="#" className="hover:text-yellow-400 transition">Interested</a>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3">
          <a href="#" className="hover:text-yellow-400 transition">Home</a>
          <a href="#" className="hover:text-yellow-400 transition">Interested</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar