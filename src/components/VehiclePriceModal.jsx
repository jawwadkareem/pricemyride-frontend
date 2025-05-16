// import React, { useState, useEffect } from "react";
// import VehiclePriceResultModal from "./VehiclePriceResultModal";
// import config from "../../config";

// const VehiclePriceModal = ({ isVisible, onClose, setIsIconVisible }) => {
//   const [buildYear, setBuildYear] = useState("");
//   const [make, setMake] = useState("");
//   const [model, setModel] = useState("");
//   const [odometer, setOdometer] = useState("");
//   const [specification, setSpecification] = useState("");
//   const [showResult, setShowResult] = useState(false);
//   const [isVisibleWithAnimation, setIsVisibleWithAnimation] = useState(false);
//   const [vehicleDetails, setVehicleDetails] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isVisible) {
//       setIsVisibleWithAnimation(true);
//     } else {
//       setTimeout(() => setIsVisibleWithAnimation(false), 500);
//     }
//   }, [isVisible]);

//   const handleClose = () => {
//     setIsVisibleWithAnimation(false);
//     setTimeout(() => {
//       onClose();
//       setIsIconVisible(true); // Show icon when closing directly
//     }, 500);
//   };

//   const handleSubmit = async () => {
//     if (!buildYear || !make || !model || !odometer) {
//       alert(
//         "Please fill all required fields: Build Year, Make, Model, Odometer."
//       );
//       return;
//     }
//     if (isNaN(buildYear) || isNaN(odometer)) {
//       alert("Build Year and Odometer must be numeric.");
//       return;
//     }

//     const payload = {
//       year: buildYear.trim(),
//       make: make.trim(),
//       model: model.trim(),
//       odometer: odometer.trim(),
//       specifications: specification.trim(),
//     };

//     setVehicleDetails(payload);
//     setLoading(true);

//     try {
//       const backendUrl = config.backendUrl.endsWith("/")
//         ? config.backendUrl
//         : `${config.backendUrl}/`;
//       const res = await fetch(`${backendUrl}api/record/create`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         console.log("Record added successfully:", data);
//         setShowResult(true);
//       } else {
//         alert(`Error: ${data.error || "Something went wrong!"}`);
//       }
//     } catch (err) {
//       console.error("API Error:", err);
//       alert("Failed to connect to the server.");
//     }

//     setLoading(false);
//     onClose();
//   };

//   return (
//     <>
//       {isVisible && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "1rem",
//             right: "1rem",
//             zIndex: 50,
//             width: "90vw",
//             maxWidth: "320px",
//             transition: "all 500ms ease-out",
//             opacity: isVisibleWithAnimation ? 1 : 0,
//             transform: isVisibleWithAnimation ? "translateY(0)" : "translateY(2.5rem)",
//           }}
//         >
//           <div
//             style={{
//               borderRadius: "0.75rem",
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//               backgroundColor: "white",
//               overflow: "hidden",
//             }}
//           >
//             <div
//               style={{
//                 position: "relative",
//                 backgroundColor: "#2563eb",
//                 padding: "clamp(0.5rem, 2vw, 1rem)",
//                 borderTopLeftRadius: "0.75rem",
//                 borderTopRightRadius: "0.75rem",
//               }}
//             >
//               <h2
//                 style={{
//                   fontSize: "clamp(1rem, 4vw, 1.25rem)",
//                   fontWeight: "bold",
//                   color: "white",
//                   textAlign: "center",
//                 }}
//               >
//                 Enter Vehicle Details
//               </h2>
//               <button
//                 onClick={handleClose}
//                 style={{
//                   position: "absolute",
//                   top: "0.5rem",
//                   right: "0.5rem",
//                   color: "white",
//                   fontSize: "clamp(0.75rem, 3vw, 1rem)",
//                   fontWeight: "bold",
//                   backgroundColor: "#e5e7eb",
//                   borderRadius: "0.25rem",
//                   padding: "0.1rem 0.3rem",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 ×
//               </button>
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "clamp(0.5rem, 2vw, 0.75rem)",
//                 padding: "clamp(0.5rem, 2vw, 1rem)",
//               }}
//             >
//               <input
//                 style={{
//                   border: "1px solid #d1d5db",
//                   borderRadius: "0.25rem",
//                   padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
//                   fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
//                   outline: "none",
//                   width: "100%",
//                   boxSizing: "border-box",
//                 }}
//                 placeholder="Build Year"
//                 value={buildYear}
//                 onChange={(e) => setBuildYear(e.target.value)}
//                 onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2563eb")}
//                 onBlur={(e) => (e.target.style.boxShadow = "none")}
//               />
//               <input
//                 style={{
//                   border: "1px solid #d1d5db",
//                   borderRadius: "0.25rem",
//                   padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
//                   fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
//                   outline: "none",
//                   width: "100%",
//                   boxSizing: "border-box",
//                 }}
//                 placeholder="Make"
//                 value={make}
//                 onChange={(e) => setMake(e.target.value)}
//                 onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2563eb")}
//                 onBlur={(e) => (e.target.style.boxShadow = "none")}
//               />
//               <input
//                 style={{
//                   border: "1px solid #d1d5db",
//                   borderRadius: "0.25rem",
//                   padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
//                   fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
//                   outline: "none",
//                   width: "100%",
//                   boxSizing: "border-box",
//                 }}
//                 placeholder="Model"
//                 value={model}
//                 onChange={(e) => setModel(e.target.value)}
//                 onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2563eb")}
//                 onBlur={(e) => (e.target.style.boxShadow = "none")}
//               />
//               <input
//                 style={{
//                   border: "1px solid #d1d5db",
//                   borderRadius: "0.25rem",
//                   padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
//                   fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
//                   outline: "none",
//                   width: "100%",
//                   boxSizing: "border-box",
//                 }}
//                 placeholder="Odometer (in KM)"
//                 value={odometer}
//                 onChange={(e) => setOdometer(e.target.value)}
//                 onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2563eb")}
//                 onBlur={(e) => (e.target.style.boxShadow = "none")}
//               />
//               <input
//                 style={{
//                   border: "1px solid #d1d5db",
//                   borderRadius: "0.25rem",
//                   padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
//                   fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
//                   outline: "none",
//                   width: "100%",
//                   boxSizing: "border-box",
//                 }}
//                 placeholder="Specification (optional)"
//                 value={specification}
//                 onChange={(e) => setSpecification(e.target.value)}
//                 onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2563eb")}
//                 onBlur={(e) => (e.target.style.boxShadow = "none")}
//               />
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 style={{
//                   backgroundColor: loading ? "#93c5fd" : "#2563eb",
//                   color: "white",
//                   padding: "clamp(0.25rem, 1.5vw, 0.5rem)",
//                   borderRadius: "0.25rem",
//                   fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
//                   border: "none",
//                   cursor: loading ? "not-allowed" : "pointer",
//                   transition: "background-color 150ms ease",
//                   width: "100%",
//                   boxSizing: "border-box",
//                 }}
//                 onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = "#1d4ed8")}
//                 onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = "#2563eb")}
//               >
//                 {loading ? "Fetching..." : "Get Price"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <VehiclePriceResultModal
//         isVisible={showResult}
//         onClose={() => {
//           setShowResult(false);
//           setIsIconVisible(true); // Show icon when VehiclePriceResultModal closes
//         }}
//         vehicleDetails={vehicleDetails}
//         setIsIconVisible={setIsIconVisible}
//       />
//     </>
//   );
// };

// export default VehiclePriceModal;


import React, { useState, useEffect } from "react";
import VehiclePriceResultModal from "./VehiclePriceResultModal";
import config from "../../config";

const VehiclePriceModal = ({ isVisible, onClose, setIsIconVisible }) => {
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
    setTimeout(() => {
      onClose();
      setIsIconVisible(true);
    }, 500);
  };

  const handleSubmit = async () => {
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
        console.log("Record added successfully:", data);
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
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            zIndex: 10000, // Updated to high z-index
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
                Enter Vehicle Details
              </h2>
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  color: "white",
                  fontSize: "clamp(0.75rem, 3vw, 1rem)",
                  fontWeight: "bold",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "0.25rem",
                  padding: "0.1rem 0.3rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(0.5rem, 2vw, 0.75rem)",
                padding: "clamp(0.5rem, 2vw, 1rem)",
              }}
            >
              <input
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "0.25rem",
                  padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
                  fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                placeholder="Build Year"
                value={buildYear}
                onChange={(e) => setBuildYear(e.target.value)}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2563eb")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
              <input
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "0.25rem",
                  padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
                  fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                placeholder="Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2563eb")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
              <input
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "0.25rem",
                  padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
                  fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2563eb")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
              <input
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "0.25rem",
                  padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
                  fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                placeholder="Odometer (in KM)"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2563eb")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
              <input
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "0.25rem",
                  padding: "clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.25rem, 1.5vw, 0.75rem)",
                  fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                placeholder="Specification (optional)"
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #2563eb")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  backgroundColor: loading ? "#93c5fd" : "#2563eb",
                  color: "white",
                  padding: "clamp(0.25rem, 1.5vw, 0.5rem)",
                  borderRadius: "0.25rem",
                  fontSize: "clamp(0.75rem, 3vw, 0.875rem)",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background-color 150ms ease",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = "#1d4ed8")}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = "#2563eb")}
              >
                {loading ? "Fetching..." : "Get Price"}
              </button>
            </div>
          </div>
        </div>
      )}

      <VehiclePriceResultModal
        isVisible={showResult}
        onClose={() => {
          setShowResult(false);
          setIsIconVisible(true);
        }}
        vehicleDetails={vehicleDetails}
        setIsIconVisible={setIsIconVisible}
      />
    </>
  );
};

export default VehiclePriceModal;