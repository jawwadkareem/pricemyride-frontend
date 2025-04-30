import React, { useState } from "react";
import VehiclePriceModal from "./VehiclePriceModal";

const PriceMyRide = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center flex items-start justify-center pt-10"
      // style={{
      //   backgroundImage: "url('./background.png')",
      // }}
    >
      {/* <div className="relative w-full max-w-[900px] px-4">
        
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-34 z-10">
          <img
            src="./pricemyride.png"
            alt="Price My Ride Logo"
            className="w-[420px] md:w-[460px] lg:w-[480px]"
          />
        </div>

        
        <div className="pt-63 flex flex-col items-center gap-5 w-full">
          {[
            "INSTANT LIVE MARKETS APPRAISALS",
            "NO MORE JUMPING THROUGH HOOPS",
            "BONUS INSTANT CASH OFFER*",
          ].map((text, index) => (
            <div
              key={index}
              className="bg-[#3da4fb] text-[#c4ff00] text-center text-[18px] sm:text-[20px] md:text-[28px] lg:text-[35px] font-semibold uppercase px-6 py-6 rounded-xl w-full shadow-xl tracking-wide leading-snug break-words"
            >
              {text}
            </div>
          ))}
        </div>
      </div> */}

     {/* Calculator Box */}
<div className="absolute bottom-6 right-6 group cursor-pointer transition-all duration-300">
  {/* Hover Text */}
  <div
    onClick={() => setIsModalVisible(true)}
    className="absolute bottom-28 sm:bottom-32 right-2 sm:right-4 bg-[#3da4fb] text-white text-[10px] sm:text-sm md:text-base w-[8rem] sm:w-[12rem] md:w-[14rem] px-2 py-2 text-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
  >
    Calculator Price
  </div>

  {/* Calculator Image with border */}
  <img
    src="./calculator-icon.png"
    alt="Calculator Icon"
    onClick={() => setIsModalVisible(true)}
    className="w-[40px] sm:w-[60px] md:w-[80px] h-[70px] sm:h-[90px] md:h-[110px] border-4 border-[#277ec5] rounded-2xl transition-all duration-300"
  />
</div>

{/* Modal */}
<div className="absolute bottom-40">
  <VehiclePriceModal
    isVisible={isModalVisible}
    onClose={() => setIsModalVisible(false)}
  />
</div>

    </section>
  );
};

export default PriceMyRide;
