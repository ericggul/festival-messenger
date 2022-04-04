import React, { useState, useEffect } from "react";
import PopupModal from "@F/modal/PopupModal";

const useModal = (ContentComponent: any, listenOpenChange: any = true, props?: any, onModalChange?: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (listenOpenChange && !isModalOpen && onModalChange) {
      onModalChange();
    }
  }, [listenOpenChange, isModalOpen]);

  const modalComponent = (
    <PopupModal width={props?.width} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} closeOnDocumentClick>
      <ContentComponent setIsModalOpen={setIsModalOpen} {...props} />
    </PopupModal>
  );

  return { modalComponent, isModalOpen, setIsModalOpen };
};

export default useModal;
