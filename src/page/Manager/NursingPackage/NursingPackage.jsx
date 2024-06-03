import { useContext, useEffect, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import TableNursingPackage from "./TableNursingPackage";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateNursingPackage from "./CreateNursingPackage";

export default function NursingPackage() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const modal = useModalState();
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 pb-2">
       
      </div>
      <div className="flex items-end pb-2">
        <ComButton onClick={modal.handleOpen}>Tạo mới</ComButton>
      </div>
      <TableNursingPackage />
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <CreateNursingPackage
          isOpen={modal?.isModalOpen}
          onClose={modal?.handleClose}
        />
      </ComModal>
    </>
  );
}
