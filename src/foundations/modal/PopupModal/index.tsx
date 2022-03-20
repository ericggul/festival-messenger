import React from "react";

import Popup from "reactjs-popup";

function PopupModal({ isModalOpen, setIsModalOpen, children, closeOnDocumentClick, width }: any) {
  return (
    <Popup
      nested
      modal
      open={isModalOpen}
      closeOnDocumentClick={closeOnDocumentClick}
      onClose={() => setIsModalOpen(false)}
      overlayStyle={{ background: "transparent" }}
      contentStyle={{
        width,
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        border: "none",
        padding: 0,
      }}
    >
      {children}
    </Popup>
  );
}

export default PopupModal;
