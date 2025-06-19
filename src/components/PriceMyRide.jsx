
// import React, { useState } from "react";
// import VehiclePriceModal from "./VehiclePriceModal";
// import image from "../../public/calculator-icon.png";

// const PriceMyRide = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isIconVisible, setIsIconVisible] = useState(true);

//   return (
//     <section
//       style={{
//         position: "relative",
//         width: "100%",
//         overflow: "hidden",
//       }}
//     >
//       {isIconVisible && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "1rem",
//             right: "1rem",
//             cursor: "pointer",
        
//             transition: "opacity 0.3s ease",
//             opacity: isIconVisible ? 1 : 0,
//             pointerEvents: isIconVisible ? "auto" : "none",
//           }}
//         >
//           <div
//             style={{
//               position: "relative",
//               width: "75px",
//               height: "90px",
//               maxWidth: "10vw",
//               maxHeight: "12vh",
//               transition: "background-color 0.3s ease, border-color 0.3s ease",
//               border: "4px solid #2563eb",
//               borderRadius: "1rem",
//               backgroundColor: "transparent",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.backgroundColor = "#2563eb";
//               e.currentTarget.style.borderColor = "#2563eb";
//               e.currentTarget.children[0].style.opacity = "0";
//               e.currentTarget.children[1].style.opacity = "1";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.backgroundColor = "transparent";
//               e.currentTarget.style.borderColor = "#2563eb";
//               e.currentTarget.children[0].style.opacity = "1";
//               e.currentTarget.children[1].style.opacity = "0";
//             }}
//             onClick={() => {
//               setIsModalVisible(true);
//               setIsIconVisible(false);
//             }}
//           >
//             <img
//               src={image}
//               alt="Calculator Icon"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 borderRadius: "0.75rem",
//                 objectFit: "cover",
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 transition: "opacity 0.3s ease",
//               }}
//             />
//             <span
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 color: "white",
//                 fontSize: "clamp(0.6rem, 2.5vw, 0.75rem)",
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 opacity: 0,
//                 transition: "opacity 0.3s ease",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               Calculator Price
//             </span>
//           </div>
//         </div>
//       )}

//       <VehiclePriceModal
//         isVisible={isModalVisible}
//         onClose={() => setIsModalVisible(false)}
//         setIsIconVisible={setIsIconVisible}
//       />
//     </section>
//   );
// };

// export default PriceMyRide;
import React, { useState } from "react";
import VehiclePriceModal from "./VehiclePriceModal";
import image from "../../public/calculator-icon.png";
import axios from "axios";

const PriceMyRide = () => {
  const widgetId = "pricemyride"; 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);

  const handleOpenChat = async () => {
    setIsModalVisible(true);
    setIsIconVisible(false);
    window.parent.postMessage(
      {
        event: 'iframeButtonClick',
      },
      '*'
    );
    let userIP = '';
    try {
      const ipRes = await axios.get('https://api64.ipify.org?format=json');
      userIP = ipRes.data.ip;
      console.log(userIP);
    } catch (e) {
      console.error('IP fetch failed', e);
    }
    try {
      await axios.post(`https://widgetsanalytics.vercel.app/api/track-visitor`, {
        event: "chat_opened",
        timestamp: new Date().toISOString(),
        widgetId,
        ip: userIP,
      });
    } catch (error) {
      console.error("Failed to track visitor:", error);
    }
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {isIconVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            cursor: "pointer",
            transition: "opacity 0.3s ease",
            opacity: isIconVisible ? 1 : 0,
            pointerEvents: isIconVisible ? "auto" : "none",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "75px",
              height: "90px",
              maxWidth: "10vw",
              maxHeight: "12vh",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
              border: "4px solid #2563eb",
              borderRadius: "1rem",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
              e.currentTarget.style.borderColor = "#2563eb";
              e.currentTarget.children[0].style.opacity = "0";
              e.currentTarget.children[1].style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "#2563eb";
              e.currentTarget.children[0].style.opacity = "1";
              e.currentTarget.children[1].style.opacity = "0";
            }}
            onClick={handleOpenChat}
          >
            <img
              src={image}
              alt="Calculator Icon"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0.75rem",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                transition: "opacity 0.3s ease",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "clamp(0.6rem, 2.5vw, 0.75rem)",
                fontWeight: "bold",
                textAlign: "center",
                opacity: 0,
                transition: "opacity 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              Calculator Price
            </span>
          </div>
        </div>
      )}

      <VehiclePriceModal
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setIsIconVisible(true);
        }}
        setIsIconVisible={setIsIconVisible}
      />
    </section>
  );
};

export default PriceMyRide;