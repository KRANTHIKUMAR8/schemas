import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

import Modal from "./modal";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
    console.log("show modal is true");
  };

  const handleModalClose = () => {
    setShowModal(false);
    console.log("show modal is false");
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          // height: "10%",
          height: "48px",
          color: "#fff",
          backgroundColor: "#78d1fe",
          // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          style={{
            background: "none",
            color: "#fff",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            margin: "0",
          }}
        >
          <FaChevronLeft />
        </button>
        <h4 style={{ fontSize: "18px", fontWeight: "500" }}>View Audience</h4>
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={handleModalOpen}
          style={{
            fontSize: "16px",
            backgroundColor: "#78d1fe",
            color: "#000",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "75px",
            marginLeft: "10px",
          }}
        >
          Add Segment
        </button>
        {/* {showModal && <Modal onClose={() => setShowModal(false)} />} */}
      </div>

      {showModal && (
        <Modal onClose={handleModalClose} onOpen={handleModalOpen} />
      )}
    </>
  );
}

export default App;
