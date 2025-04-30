import React, { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import SellVehicleModal from "./SellVehicleModal";
import config from "../../config";

const VehiclePriceResultModal = ({ isVisible, onClose, vehicleDetails }) => {
  const [isSellModalVisible, setIsSellModalVisible] = useState(false);
  const [isVisibleWithAnimation, setIsVisibleWithAnimation] = useState(false);
  const [retailPrice, setRetailPrice] = useState("");
  const [wholesalePrice, setWholesalePrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isVisible) {
      setIsVisibleWithAnimation(true);
      fetchPrice();
    } else {
      setTimeout(() => setIsVisibleWithAnimation(false), 500);
    }
  }, [isVisible]);

  const fetchPrice = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");

      const backendUrl = config.backendUrl.endsWith("/")
        ? config.backendUrl
        : `${config.backendUrl}/`;
      const response = await fetch(`${backendUrl}api/predict/price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehicleDetails),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend Error:", errorText);
        throw new Error("Failed to fetch prices");
      }

      const data = await response.json();
      console.log("Price API Response:", data);

      setRetailPrice(data.retail_price ?? "N/A");
      setWholesalePrice(data.wholesale_price ?? "N/A");
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMsg("Error fetching vehicle price.");
      setRetailPrice("N/A");
      setWholesalePrice("N/A");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisibleWithAnimation(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleSellVehicleModalOpen = () => {
    setIsSellModalVisible(true);
    handleClose();
  };

  const handleSellVehicleModalClose = () => {
    setIsSellModalVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-4 right-4 z-50 w-[360px] max-w-md transition-all duration-500 ease-out ${
            isVisibleWithAnimation
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
           <div
  className="fixed bottom-2 right-2 w-[80%] sm:w-full sm:max-w-md sm:bottom-2 sm:right-2 z-50"
>
          <div className="rounded-xl shadow-lg bg-white overflow-hidden">
            <div className="bg-blue-600 rounded-t-xl px-4 py-3 relative">
              <h2 className="text-white font-semibold text-lg text-center">
                Get Your Vehicle Price
              </h2>
              <CloseOutlined
                onClick={handleClose}
                className="text-white absolute top-3 right-4 text-lg cursor-pointer hover:text-gray-200"
              />
            </div>

            <div className="bg-white px-6 py-4 rounded-b-xl">
              <p className="text-black font-semibold text-base mb-1">
                Price for your car
              </p>
              <p className="text-sm mb-1">
                With Kilometer Driven: {vehicleDetails.odometer} Km
              </p>
              <p className="text-sm mb-4">
                Including Specs: {vehicleDetails.specifications}
              </p>

              {errorMsg && (
                <p className="text-red-600 text-sm font-semibold mb-2">
                  {errorMsg}
                </p>
              )}

              <div className="mb-4">
                <p className="font-bold mb-1">Wholesale Value</p>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Fetching..."
                  value={isLoading ? "Fetching..." : wholesalePrice}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <p className="font-bold mb-1">Retail Value</p>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Fetching..."
                  value={isLoading ? "Fetching..." : retailPrice}
                  readOnly
                />
              </div>

              <button
                onClick={handleSellVehicleModalOpen}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded"
              >
                Would you like to sell your vehicle now?
              </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSellModalVisible && (
        <SellVehicleModal
          isVisible={isSellModalVisible}
          onClose={handleSellVehicleModalClose}
        />
      )}
    </>
  );
};

export default VehiclePriceResultModal;
