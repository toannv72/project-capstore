import { useRef, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import {  TableBills, } from "./TableBills";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";

function Bill() {
  const modal = useModalState();
  const tableRef = useRef(null);
  
  return (
    <div>
      {/* <div className="grid grid-cols-3 gap-4 pb-4">
        {cardData.map((card, index) => (
          <ComCard
            key={index} // Sử dụng index làm key
            onClick={() => handleCardClick(index)}
            isSelected={selectedCardIndex === index}
            {...card}
          />
        ))}
      </div> */}
      {/* <div className="flex justify-end pb-2">
        <div>
          <ComButton onClick={modal.handleOpen}>Tạo mới</ComButton>
        </div>
      </div> */}
      <ComModal
        width={800}
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      ></ComModal>
      <TableBills ref={tableRef} />
    </div>
  );
}

export default Bill;
