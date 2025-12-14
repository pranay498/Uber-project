import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-between bg-[#f3e2e6] overflow-hidden">
      {/* Header */}
      <header className="w-full p-6 flex items-center">
        <img
          src="/uber-logo.png"   // 👈 your Uber logo file (place it in /public folder)
          alt="Uber Logo"
          className="h-10 md:h-12 object-contain"
        />
      </header>

      {/* Illustration */}
      <main className="flex-1 flex justify-center items-center">
        <img
          src="/traffic.png"
          alt="Uber Traffic Light"
          className="w-4/5 max-w-md object-contain drop-shadow-md"
        />
      </main>

      {/* Footer */}
      <footer className="bg-white rounded-t-3xl p-8 md:p-10 text-center shadow-2xl">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">
          Get started with Uber
        </h2>

        <Link
          to="/login"
          className="bg-black text-white py-3 md:py-4 px-6 md:px-8 rounded-full font-semibold flex items-center justify-center w-full hover:bg-gray-800 transition-all duration-200"
        >
          Continue
          <span className="ml-2 text-2xl">→</span>
        </Link>
      </footer>
    </div>
  );
};

export default Home;
