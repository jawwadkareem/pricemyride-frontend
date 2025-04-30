import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import config from "../../config";

const SellVehicleModal = ({ isVisible, onClose, vehicleData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); 
  const [messageType, setMessageType] = useState("success"); 

  const handleClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage(null);
    onClose();
  };

  const showToast = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      showToast("Please fill all fields before submitting.", "error");
      return;
    }

    setLoading(true);

    try {
      const backendUrl = config.backendUrl.endsWith('/') ? config.backendUrl : `${config.backendUrl}/`;
      const response = await fetch(`${backendUrl}api/email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          modal: vehicleData?.modal || "N/A",
          make: vehicleData?.make || "N/A",
          odometer: vehicleData?.odometer || "N/A",
          buildYear: vehicleData?.buildYear || "N/A",
          specs: vehicleData?.specs || "N/A",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Details sent to admin successfully!", "success");
        handleClose();
      } else {
        showToast(data.message || "Failed to send details.", "error");
      }
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isVisible}
      onCancel={handleClose}
      footer={null}
      centered
      maskClosable
      width={420}
      bodyStyle={{
        padding: "30px",
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      <h2 className="text-xl font-bold text-center mb-6">Enter Your Details</h2>

      {/* Tailwind Toast Message */}
      {message && (
        <div
          className={`text-white px-4 py-2 rounded mb-4 text-center ${
            messageType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message}
        </div>
      )}
     <div className="fixed bottom-2 right-4 w-[70%] sm:w-full sm:max-w-md sm:bottom-4 sm:right-2 z-50"></div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border border-black rounded px-4 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-black rounded px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="border border-black rounded px-4 py-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="flex justify-between mt-6">
          <button
            onClick={handleClose}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`${
              loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            } text-white px-6 py-2 rounded`}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SellVehicleModal;
