import { useContext, useEffect, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import TableServicePackage from "./TableServicePackage";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateServicePackage from "./CreateServicePackage";

export default function ServicePackage() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const modal = useModalState();
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 pb-2"></div>
      <div className="flex items-end pb-2">
        <ComButton onClick={modal.handleOpen}>Tạo mới</ComButton>
      </div>
      <TableServicePackage />
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <CreateServicePackage
          isOpen={modal?.isModalOpen}
          onClose={modal?.handleClose}
        />
      </ComModal>
    </>
  );
}
