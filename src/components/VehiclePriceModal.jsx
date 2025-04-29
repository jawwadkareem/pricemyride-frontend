import React, { useState, useEffect } from "react";
import VehiclePriceResultModal from "./VehiclePriceResultModal";
import config from "../../config";

const VehiclePriceModal = ({ isVisible, onClose }) => {
  const [buildYear, setBuildYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [odometer, setOdometer] = useState("");
  const [specification, setSpecification] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isVisibleWithAnimation, setIsVisibleWithAnimation] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsVisibleWithAnimation(true);
    } else {
      setTimeout(() => setIsVisibleWithAnimation(false), 500);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisibleWithAnimation(false);
    setTimeout(onClose, 500);
  };

  const handleSubmit = async () => {
    // Frontend validation
    if (!buildYear || !make || !model || !odometer) {
      alert(
        "Please fill all required fields: Build Year, Make, Model, Odometer."
      );
      return;
    }
    if (isNaN(buildYear) || isNaN(odometer)) {
      alert("Build Year and Odometer must be numeric.");
      return;
    }

    const payload = {
      year: buildYear.trim(),
      make: make.trim(),
      model: model.trim(),
      odometer: odometer.trim(),
      specifications: specification.trim(),
    };

    setVehicleDetails(payload);
    setLoading(true);

    try {
      const backendUrl = config.backendUrl.endsWith("/")
        ? config.backendUrl
        : `${config.backendUrl}/`;
      const res = await fetch(`${backendUrl}api/record/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        console.log(" Record added successfully:", data);
        setShowResult(true);
      } else {
        alert(`Error: ${data.error || "Something went wrong!"}`);
      }
    } catch (err) {
      console.error("API Error:", err);
      alert("Failed to connect to the server.");
    }

    setLoading(false);
    onClose();
  };

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-4 right-4 z-50 w-[420px] max-w-sm transition-all duration-500 ease-out ${
            isVisibleWithAnimation
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="rounded-xl shadow-lg bg-white overflow-hidden">
            <div className="relative mb-6 px-4 pt-4">
              <div className="absolute inset-x-0 top-0 h-12 bg-blue-600 rounded-t-xl" />
              <button
                onClick={handleClose}
                className="absolute top-2 right-3 text-white text-xl font-bold z-20"
              >
                &times;
              </button>
              <h2 className="relative text-2xl font-bold text-white text-center z-10">
                Enter Vehicle Details
              </h2>
            </div>

            <div className="flex flex-col gap-4 px-6 pb-6">
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-600"
                placeholder="Build Year"
                value={buildYear}
                onChange={(e) => setBuildYear(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-600"
                placeholder="Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-600"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-600"
                placeholder="Odometer (in KM)"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-600"
                placeholder="Specification (optional)"
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm mt-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "fetching..." : "Get Price"}
              </button>
            </div>
          </div>
        </div>
      )}

      <VehiclePriceResultModal
        isVisible={showResult}
        onClose={() => setShowResult(false)}
        vehicleDetails={vehicleDetails}
      />
    </>
  );
};

export default VehiclePriceModal;
