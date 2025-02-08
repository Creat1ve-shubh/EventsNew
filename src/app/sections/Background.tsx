import React from "react";
import { Vortex } from "../components/Vortex";

  
export function VortexDemo() {
  return (
    <div className="w-full mx-auto rounded-md  h-[70rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        
        <h1 className="text-white text-7xl text-center font-serif">
    Discover <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"> Onerios 25 Events</span>
  </h1>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
    
        </div>
      </Vortex>
    </div>
  );
}
