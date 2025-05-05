import React, { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import SellVehicleModal from "./SellVehicleModal";
import config from "../../config";

const VehiclePriceResultModal = ({ isVisible, onClose, vehicleDetails, setIsIconVisible }) => {
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
    setTimeout(onClose, 500);
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
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            zIndex: 50,
            width: "90vw",
            maxWidth: "320px",
            transition: "all 500ms ease-out",
            opacity: isVisibleWithAnimation ? 1 : 0,
            transform: isVisibleWithAnimation ? "translateY(0)" : "translateY(2.5rem)",
          }}
        >
          <div
            style={{
              borderRadius: "0.75rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "relative",
                backgroundColor: "#2563eb",
                padding: "clamp(0.5rem, 2vw, 1rem)",
                borderTopLeftRadius: "0.75rem",
                borderTopRightRadius: "0.75rem",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1rem, 4vw, 1.25rem)",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Get Your Vehicle Price
              </h2>
              <CloseOutlined
                onClick={handleClose}
                style={{
                  color: "white",
                  position: "absolute",
                  top: "0.75rem",
                  right: "0.75rem",
                  fontSize: "clamp(0.875rem, 3vw, 1.125rem)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#e5e7eb")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              />
            </div>

            <div
              style={{
                padding: "clamp(1rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem)",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(0.5rem, 2vw, 0.75rem)",
              }}
            >
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "clamp(0.875rem, 3.5vw, 1rem)",
                  marginBottom: "clamp(0.25rem, 1vw, 0.25rem)",
                }}
              >
                Price for your car
              </p>
              <p style={{ fontSize: "clamp(0.75rem, 3vw, 0.875rem)" }}>
                With Kilometer Driven: {vehicleDetails.odometer} Km
              </p>
              <p style={{ fontSize: "clamp(0.75rem, 3vw, 0.875rem)" }}>
                Including Specs: {vehicleDetails.specifications}
              </p>

              {errorMsg && (
                <p
                  style={{
                    color: "#dc2626",
                    fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
                    fontWeight: "600",
                    marginBottom: "clamp(0.25rem, 1vw, 0.5rem)",
                  }}
                >
                  {errorMsg}
                </p>
              )}

              <div style={{ marginBottom: "clamp(0.5rem, 2vw, 0.75rem)" }}>
                <p style={{ fontWeight: "700", marginBottom: "clamp(0.25rem, 1vw, 0.25rem)", fontSize: "clamp(0.75rem, 3vw, 0.875rem)" }}>
                  Wholesale Value
                </p>
                <input
                  type="text"
                  style={{
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.25rem",
                    padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
                    fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
                    boxSizing: "border-box",
                  }}
                  value={isLoading ? "Fetching..." : wholesalePrice}
                  readOnly
                />
              </div>

              <div style={{ marginBottom: "clamp(0.5rem, 2vw, 0.75rem)" }}>
                <p style={{ fontWeight: "700", marginBottom: "clamp(0.25rem, 1vw, 0.25rem)", fontSize: "clamp(0.75rem, 3vw, 0.875rem)" }}>
                  Retail Value
                </p>
                <input
                  type="text"
                  style={{
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.25rem",
                    padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
                    fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
                    boxSizing: "border-box",
                  }}
                  value={isLoading ? "Fetching..." : retailPrice}
                  readOnly
                />
              </div>

              <button
                onClick={handleSellVehicleModalOpen}
                style={{
                  backgroundColor: "#16a34a",
                  color: "white",
                  padding: "clamp(0.25rem, 1.5vw, 0.5rem)",
                  borderRadius: "0.25rem",
                  fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 150ms ease",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#15803d")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#16a34a")}
              >
                Would you like to sell your vehicle now?
              </button>
            </div>
          </div>
        </div>
      )}

      {isSellModalVisible && (
        <SellVehicleModal
          isVisible={isSellModalVisible}
          onClose={() => {
            handleSellVehicleModalClose();
            setIsIconVisible(true); // Show icon when SellVehicleModal closes
          }}
        />
      )}
    </>
  );
};

export default VehiclePriceResultModal;