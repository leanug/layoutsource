import { useState } from "react";

export function useModal () {
  let [modal, setModal] = useState(false);
  let [modalContent, setModalContent] = useState("I'm the Modal Content");

  let handleModal = (content = null) => {
    setModal(prevModal => ! prevModal);
    if (content) {
      setModalContent(content);
    }
  };

  return { modal, handleModal, modalContent };
};