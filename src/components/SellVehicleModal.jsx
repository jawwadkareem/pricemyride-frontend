import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import config from "../../config";

const SellVehicleModal = ({ isVisible, onClose }) => {
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
      const backendUrl = config.backendUrl.endsWith('/')
        ? config.backendUrl
        : `${config.backendUrl}/`;
      const response = await fetch(`${backendUrl}api/email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          modal: "N/A",
          make: "N/A",
          odometer: "N/A",
          buildYear: "N/A",
          specs: "N/A",
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
      width="90vw"
      style={{ maxWidth: "320px", margin: "0 auto", padding: "0 clamp(0.5rem, 2vw, 1rem)" }}
      bodyStyle={{
        padding: "clamp(1rem, 3vw, 1.25rem)",
        borderRadius: "0.75rem",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(1rem, 4vw, 1.25rem)",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "clamp(1rem, 3vw, 1.5rem)",
        }}
      >
        Enter Your Details
      </h2>

      {message && (
        <div
          style={{
            color: "white",
            padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.5rem, 2vw, 1rem)",
            borderRadius: "0.25rem",
            marginBottom: "clamp(0.5rem, 2vw, 1rem)",
            textAlign: "center",
            backgroundColor: messageType === "success" ? "#16a34a" : "#dc2626",
            fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
          }}
        >
          {message}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.5rem, 2vw, 0.75rem)",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          style={{
            border: "1px solid #d1d5db",
            borderRadius: "0.25rem",
            padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
            fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
            width: "100%",
            boxSizing: "border-box",
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          style={{
            border: "1px solid #d1d5db",
            borderRadius: "0.25rem",
            padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
            fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
            width: "100%",
            boxSizing: "border-box",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          style={{
            border: "1px solid #d1d5db",
            borderRadius: "0.25rem",
            padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
            fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
            width: "100%",
            boxSizing: "border-box",
          }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "clamp(1rem, 3vw, 1.5rem)",
            gap: "clamp(0.25rem, 1vw, 0.5rem)",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.5rem, 2vw, 1rem)",
              borderRadius: "0.25rem",
              border: "none",
              cursor: "pointer",
              transition: "background-color 150ms ease",
              fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
              flex: "1",
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#b91c1c")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc2626")}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              backgroundColor: loading ? "#93c5fd" : "#2563eb",
              color: "white",
              padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.5rem, 2vw, 1rem)",
              borderRadius: "0.25rem",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 150ms ease",
              fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
              flex: "1",
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = "#2563eb")}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SellVehicleModal;